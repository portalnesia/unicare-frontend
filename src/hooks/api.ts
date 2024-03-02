import { useSelector } from "@/redux/store";
import API from "@/utils/axios";
import { isAuthExpired } from "@/utils/main";
import axios, { AxiosError, AxiosRequestConfig } from "axios";
import Router from "next/router";
import React from "react";

type ApiErrorTypes = boolean | {
    name: string,
    code: number,
    description: string
}

export interface ResponseData<R = any> {
    error: ApiErrorTypes,
    data: R;
    message: string;
}

export type PaginationResponse<D, Other extends {} = {}> = {
    page: number,
    total_page: number,
    can_load: boolean,
    total: number,
    data: D[]
} & Other

class CatchApiError extends Error {
    constructor(dt: ResponseData<any>) {
        let msg = "";
        if (typeof dt?.error === 'boolean') {
            msg = dt?.message;
        } else {
            msg = dt?.error?.description;
        }
        super(msg);
        this.name = "CatchApiError";
    }
}

export class ApiError extends Error {
    constructor(msg?: string) {
        super(msg);
        this.name = "ApiError";
    }
}

function catchError(e: any) {
    if (e instanceof CatchApiError) {
        if (typeof e?.message === 'string') {
            return e.message;
        }
        else {
            console.error(e);
            return "Something went wrong";
        }
    } else if (e instanceof AxiosError) {
        if (e?.code === 'ECONNABORTED') {
            return "Connection timeout"
        }
        if (e?.response?.status && e?.response?.data?.error?.description) {
            return (e?.response?.data?.error?.description || "Something went wrong") as string
        }
        if ((e?.response?.status && ![500, 503].includes(e?.response?.status)) && typeof e?.response?.data.error === 'boolean') {
            return (e?.response?.data?.message || "Something went wrong") as string
        }
        if ((e?.response?.status && ![500, 503].includes(e?.response?.status)) && e?.response?.status == 440) {
            return "Token expired. Please refresh browser"
        }
        if (axios.isCancel(e)) {
            return "Cancelled";
        }
    }
    if (process.env.NODE_ENV !== "production") console.error(e);
    return "Something went wrong";
}

export default function useAPI() {
    const auth = useSelector(s => s.auth);

    const getHeaders = React.useCallback((opt?: AxiosRequestConfig) => {
        if (auth) {
            if (isAuthExpired(auth.expired_at)) {
                setTimeout(() => {
                    Router.push("/logout");
                }, 500);
                throw new CatchApiError({ message: "Login expired", error: true, data: null });
            }
        }

        return {
            ...opt,
            withCredentials: true
        }
    }, [auth])

    /**
     * @example
     * ```js
     * const response = get<IResponse>(url: string)
     * ```
     */
    const get = React.useCallback(async<R = any>(url: string): Promise<R> => {
        try {
            const opt = getHeaders();
            const res = await API.get<ResponseData<R>>(url, opt);

            if (res?.data?.error) {
                throw new CatchApiError(res?.data)
            }
            return res.data.data;
        } catch (e: any) {
            const string = catchError(e);
            throw new ApiError(string);
        }
    }, [getHeaders]);

    /**
     * @example
     * ```js
     * const response = post<IResponse>(url: string,data: object)
     * ```
     */
    const post = React.useCallback(async<R = any>(url: string, data: Record<string, any> | null | FormData, config?: AxiosRequestConfig): Promise<R> => {
        const dt = data === null ? {} : data;
        const opt = getHeaders(config);
        try {
            const res = await API.post<ResponseData<R>>(url, dt, opt);

            if (res?.data?.error) {
                throw new CatchApiError(res?.data)
            }
            return res.data.data;
        } catch (e: any) {
            const string = catchError(e);
            throw new ApiError(string);
        }
    }, [getHeaders]);

    /**
     * @example
     * ```js
     * const response = del<IResponse>(url: string)
     * ```
     */
    const del = React.useCallback(async<R = any>(url: string, config?: AxiosRequestConfig): Promise<R> => {
        try {
            const opt = getHeaders();
            const res = await API.delete<ResponseData<R>>(url, opt);

            if (res?.data?.error) {
                throw new CatchApiError(res?.data)
            }
            return res.data.data;
        } catch (e: any) {
            const string = catchError(e);
            throw new ApiError(string);
        }
    }, [getHeaders]);

    /**
     * @example
     * ```js
     * const response = put<IResponse>(url: string,data: object)
     * ```
     */
    const put = React.useCallback(async<R = any>(url: string, data: Record<string, any> | null | FormData, config?: AxiosRequestConfig): Promise<R> => {
        const dt = data === null ? {} : data
        const opt = getHeaders(config);
        try {
            const res = await API.put<ResponseData<R>>(url, dt, opt);

            if (res?.data?.error) {
                throw new CatchApiError(res?.data);
            }
            return res.data.data;
        } catch (e: any) {
            const string = catchError(e);
            throw new ApiError(string);
        }
    }, [getHeaders]);

    return { get, post, put, del }
}