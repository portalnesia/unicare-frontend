import { Dispatch, Store } from 'redux'
import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk'
import { createWrapper } from 'next-redux-wrapper';
import rootReducer from './reducers/root';
import type { State, ActionType } from '@/types/redux'
import type { IPages } from '@/types/general'
import { GetServerSidePropsContext, GetServerSidePropsResult, GetStaticPropsContext, GetStaticPropsResult } from 'next'
import { ParsedUrlQuery } from 'querystring'
import { useDispatch as originalUseDispatch, useSelector as originalUseSelector } from 'react-redux';
import { AxiosError } from 'axios';
import axios from '@/utils/axios';
import { ResponseData } from '@/hooks/api';
import { isAuthExpired, webUrl } from '@/utils/main';
import jwt from 'jsonwebtoken'
import getSession from "@/redux/session";
import { Session, SessionRecord } from "next-session/lib/types";

export const useDispatch = () => originalUseDispatch<Dispatch<ActionType>>()
export const useSelector = <D = State>(selector: (state: State) => D) => originalUseSelector<State, D>(selector)

function stored(store: Store<State, ActionType> & { dispatch: Dispatch<ActionType> }, data: Partial<State>) {
    store.dispatch({
        type: 'CUSTOM',
        payload: {
            ...data,
        }
    })
}

export const makeStore = () => {
    const store = configureStore({
        reducer: rootReducer,
        middleware(getDefaultMiddleware) {
            return [
                ...getDefaultMiddleware(),
                thunk
            ]
        },
        devTools: process.env.NODE_ENV !== 'production',
    })
    if (process.env.NODE_ENV !== 'production' && (module as any)?.hot) {
        (module as any).hot.accept('./reducers/root', () => store.replaceReducer(rootReducer))
    }

    return store;
};

export const wrapperRoot = createWrapper(makeStore);

type IConfig = {
    translation?: string | string[]
}

const redirect = <P>(destination?: string) => {
    if (destination) {
        destination = destination.startsWith("http") ? destination : webUrl(destination)
        return {
            redirect: {
                destination: destination,
                permanent: false
            }
        } as GetServerSidePropsResult<P>
    } else {
        return {
            notFound: true
        } as GetServerSidePropsResult<P>
    }
}

type CallbackParams<P extends {}> = GetServerSidePropsContext<ParsedUrlQuery, any> & ({
    store: Store<State, ActionType> & {
        dispatch: Dispatch<ActionType>;
    }
}) & ({
    redirect(destination?: string, message?: string): GetServerSidePropsResult<IPages<P>>
    // only use when auth is available
    fetchAPI: <D = any>(url: string) => Promise<D>
    auth?: State['auth'] | null,
    session: Session<SessionRecord>;
})

type Callback<P extends {}> = (params: CallbackParams<P>) => Promise<GetServerSidePropsResult<IPages<P>>>

export class BackendError {
    status: number
    message: string
    constructor(status: number, message: string) {
        this.status = status;
        this.message = message
    }
}

export default function wrapper<P extends {}>(callback: Callback<P>) {
    return wrapperRoot.getServerSideProps((store) => async (ctx) => {
        try {
            let auth: State["auth"] = null;
            const session = await getSession(ctx.req, ctx.res)

            const auth_token = session?.auth;

            if (typeof auth_token === "string") {
                try {
                    const token = jwt.decode(auth_token)
                    if (typeof token === "object" && typeof token?.given_name === "string" && typeof token?.preferred_username === "string" && token.exp) {
                        auth = {
                            token: auth_token,
                            role: token.given_name,
                            username: token.preferred_username,
                            expired_at: token.exp
                        }
                        if (isAuthExpired(token.exp) && !["/reset-password", "/login_in", "/"]) {
                            return redirect<P>(webUrl("/")) as GetServerSidePropsResult<IPages<P>>;
                        }
                        stored(store, { auth })
                    }
                } catch (err) {
                    console.error("ERROR AUTH", err)
                }
            }

            // only use when auth is available
            const fetchAPI = async<R = any>(url: string) => {
                try {
                    const resp = await axios.get<ResponseData<R>>(url, {
                        ...(auth ? {
                            headers: {
                                "Authorization": `Bearer ${auth.token}`
                            }
                        } : {})
                    })
                    return resp.data.result;
                } catch (e) {
                    if (e instanceof AxiosError) {
                        console.log(e.response?.data)
                        let message = "Something went wrong";
                        if (!e?.response?.status || e?.response?.status >= 500) {
                            throw new Error(`Error fetchAPI: ${e.response?.status}: ${e?.response?.data}`)
                        }
                        throw new BackendError(e.response.status, e.message)
                    }
                    else if (e instanceof Error) throw new Error(`Error fetchAPI: ${e.message}`)
                    else throw new Error(`Error fetchAPI: ${e}`)
                }
            }

            const url = new URL(ctx.resolvedUrl, webUrl());
            if (!auth && !["/reset-password", "/login_in", "/"].includes(url.pathname)) {
                return redirect<P>(webUrl("/")) as GetServerSidePropsResult<IPages<P>>;
            }
            else if (!!auth && ["/reset-password", "/"].includes(url.pathname)) {
                if (!ctx.resolvedUrl.startsWith("/dashboard")) return redirect<P>(webUrl("/dashboard")) as GetServerSidePropsResult<IPages<P>>;
            }

            session.touch();
            const result = await callback({ store, redirect, fetchAPI, session, auth, ...ctx })
            return result;
        } catch (err) {
            if (process.env.NODE_ENV !== 'production' && err instanceof Error) console.log(err.message, err.stack)
            if (ctx.res) {
                ctx.res.statusCode = 503;
                ctx.res.setHeader('Retry-After', 3600);
            }
            throw err;
        }
    })
}

type CallbackStaticParams = GetStaticPropsContext<ParsedUrlQuery, any> & ({
    store: Store<State, ActionType> & {
        dispatch: Dispatch<ActionType>;
    }
}) & ({

})
type CallbackStatic<P extends {}> = (params: CallbackStaticParams) => Promise<GetStaticPropsResult<IPages<P>>>

export function wrapperStatic<P extends {}>(config?: CallbackStatic<P> | Pick<IConfig, 'translation'>) {
    return wrapperRoot.getStaticProps((store) => async (ctx) => {
        try {
            let props = { props: {} } as any

            if (typeof config === 'function') {
                props = await config({ store, ...ctx })
            } else {
                props = {
                    props: {
                        ...props.props,
                    },
                }
            }
            return props;
        } catch (err) {
            return { notFound: true }
        }

    })
}