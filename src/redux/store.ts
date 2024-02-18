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
import { Session, SessionRecord } from "next-session/lib/types";
import { CookieValueTypes, getCookie } from 'cookies-next';

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
    auth_cookies?: CookieValueTypes
    // session: Session<SessionRecord>;
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
            const auth_cookies = getCookie("_auth", { req: ctx.req, res: ctx.res });

            const fetchAPI = async<R = any>(url: string) => {
                try {
                    const resp = await axios.get<ResponseData<R>>(url)
                    return resp.data.result;
                } catch (e) {
                    if (e instanceof AxiosError) {
                        console.log(e.response?.data)
                        let message = "Something went wrong";
                        if (typeof e.response?.data?.success === "boolean" && !e?.response?.data?.success) {
                            if (typeof e.response?.data?.message === "string") message = e.response?.data?.message;
                            else if (typeof e.response?.data?.message?.message) message = e.response?.data?.message?.message;
                        }
                        throw new BackendError(e.response?.status || 503, message);
                    }
                    throw new BackendError(503, "Something went wrong");
                }
            }
            if (!auth_cookies && (!ctx.resolvedUrl.startsWith("/login") && !ctx.resolvedUrl.startsWith("/logout") && !ctx.resolvedUrl.startsWith("/reset-password"))) {
                return redirect<P>(webUrl("/login")) as GetServerSidePropsResult<IPages<P>>;
            }

            const result = await callback({ store, redirect, fetchAPI, auth_cookies, ...ctx });
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