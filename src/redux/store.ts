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
import { getDayJs, isAuthExpired, webUrl } from '@/utils/main';
import { getCookie, setCookie } from 'cookies-next';
import nextI18nextConfig from 'root/next-i18next.config';
import { SSRConfig } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import jwt from 'jsonwebtoken'
import { IRoles, rolesArray } from '@/model/auth';
import { domainCookie } from '@/config';

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
    getTranslation(translation?: string | string[], locale?: string): Promise<SSRConfig>;
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
            const auth_token = getCookie("_auth", { req: ctx.req, res: ctx.res });
            let auth: State["auth"] = null;
            let user: State["user"] = null;
            user = {
                id: 123,
                name: "Jane Doe",
                bpjs_number: "123",
                package: "smart_health_plus",
                nik: "367105123123123123"
            }

            if (typeof auth_token === "string") {
                try {
                    const token = jwt.decode(auth_token) // for development only
                    // const token = jwt.verify(auth_token, process.env.SECRET_JWT || "", { issuer: "northbit", audience: "unicare" })
                    if (typeof token === "object" && typeof token?.id === "number" && typeof token?.rl === "string" && token.exp) {
                        if (rolesArray.includes(token.rl)) {
                            // to get user data, request to /api/user/me
                            auth = {
                                id: token.id,
                                roles: token.rl as IRoles,
                                expired_at: token.exp
                            }
                            if (isAuthExpired(token.exp) && !["/reset-password", "/login_in", "/"]) {
                                return redirect<P>(webUrl("/")) as GetServerSidePropsResult<IPages<P>>;
                            }
                            stored(store, { auth })
                            stored(store, { user })
                        }
                    }
                } catch (err) {
                    console.error("ERROR AUTH", err)
                }
            }

            const fetchAPI = async<R = any>(url: string) => {
                try {
                    const resp = await axios.get<ResponseData<R>>(url)
                    return resp.data.data;
                } catch (e: any) {
                    if (e instanceof AxiosError) {
                        console.error("Err Response", e)
                        const message = e.response?.data?.error === "object" && 'description' in e.response?.data.error ? e.response?.data.error.description : (e.response?.data.message || "Something went wrong")
                        throw new BackendError(e.response?.status || 503, message);
                    }
                    throw new BackendError(503, "Something went wrong");
                }
            }

            const url = new URL(ctx.resolvedUrl, webUrl());
            if (!auth_token &&
                (
                    !ctx.resolvedUrl.startsWith("/login") &&
                    ctx.resolvedUrl !== "/admin" &&
                    !ctx.resolvedUrl.startsWith("/logout") &&
                    !ctx.resolvedUrl.startsWith("/reset-password") &&
                    ctx.resolvedUrl.startsWith("/administration") ||
                    ctx.resolvedUrl.startsWith("/managed-care")
                )
            ) {
                if (!ctx.resolvedUrl.startsWith("/administration")) {
                    return redirect<P>(webUrl(`/login`)) as GetServerSidePropsResult<IPages<P>>;
                } else {
                    return redirect<P>(webUrl(`/admin`)) as GetServerSidePropsResult<IPages<P>>;
                }
            } else if (!!auth_token && auth?.roles !== IRoles.CUSTOMER && ctx.resolvedUrl.startsWith("/managed-care")) {
                return redirect<P>(webUrl(`/login`)) as GetServerSidePropsResult<IPages<P>>;
            } else if (!!auth_token && auth && !rolesArray.filter(item => item !== IRoles.CUSTOMER).includes(auth.roles) && ctx.resolvedUrl.startsWith("/administration")) {
                return redirect<P>(webUrl(`/admin`)) as GetServerSidePropsResult<IPages<P>>;
            } else if (!!auth_token && ["/reset-password", "/login", "/admin"].includes(url.pathname)) {
                if (!ctx.resolvedUrl.startsWith(`/admin`)) {
                    if (auth?.roles === IRoles.CUSTOMER) {
                        return redirect<P>(webUrl(`/managed-care`)) as GetServerSidePropsResult<IPages<P>>;
                    }
                } else {
                    if (auth && rolesArray.filter(item => item !== IRoles.CUSTOMER).includes(auth.roles)) {
                        return redirect<P>(webUrl(`/administration`)) as GetServerSidePropsResult<IPages<P>>;
                    }
                }
            }
            const result = await callback({ store, redirect, fetchAPI, auth, getTranslation, ...ctx });
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

async function getTranslation(translation?: string | string[], locale: string = 'en') {
    const translations = translation ? ['main'].concat(typeof translation === 'string' ? [translation] : translation) : ['main'];
    return await serverSideTranslations(locale, translations, nextI18nextConfig)
}

type CallbackStaticParams = GetStaticPropsContext<ParsedUrlQuery, any> & ({
    store: Store<State, ActionType> & {
        dispatch: Dispatch<ActionType>;
    }
}) & ({
    getTranslation(translation?: string | string[], locale?: string): Promise<SSRConfig>;
})
type CallbackStatic<P extends {}> = (params: CallbackStaticParams) => Promise<GetStaticPropsResult<IPages<P>>>

export function wrapperStatic<P extends {}>(config?: CallbackStatic<P> | Pick<IConfig, 'translation'>) {
    return wrapperRoot.getStaticProps((store) => async (ctx) => {
        try {
            let props = { props: {} } as any

            if (typeof config === 'function') {
                props = await config({ store, getTranslation, ...ctx })
            } else {
                props = {
                    props: {
                        ...props.props,
                        ...(await getTranslation(config?.translation, ctx?.locale || "en"))
                    },
                }
            }
            return props;
        } catch (err) {
            return { notFound: true }
        }
    })
}