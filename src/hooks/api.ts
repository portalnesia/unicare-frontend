import { useSelector } from "@/redux/store";
import API from "@/utils/axios";
import LocalStorage from "@/utils/local-storage";
import { isAuthExpired } from "@/utils/main";
import axios, { AxiosError, AxiosRequestConfig } from "axios";
import Router from "next/router";
import React from "react";

export type ResponseData<R = any, Pages = false, Additional extends {} = {}> = {
    message: string | { message: string };
    success: boolean;
    result: R;
} & (Pages extends true ? {
    pages: {
        current_page: number;
        total_data: number;
        total_page: number;
    }
} : {}) & Additional

class CatchApiError extends Error {
    constructor(dt: ResponseData<any>) {
        if (typeof dt.message === "string") super(dt.message);
        else if (typeof dt?.message?.message === "string") super(dt.message.message);
        else super("Something went wrong");
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
            return "Something went wrong";
        }
    } else if (e instanceof AxiosError) {
        if (e?.code === 'ECONNABORTED') {
            return "Connection timeout"
        }
        else if (typeof e?.response?.data?.message === 'string' && typeof e?.response?.data?.success === 'boolean' && e?.response?.data?.success === false) {
            return (e?.response?.data?.message || "Something went wrong") as string
        }
        else if (e?.response?.status === 401) {
            return "Missing authorization";
        }
        else if (axios.isCancel(e)) {
            return "Canceled";
        }
    }
    if (process.env.NODE_ENV !== "production") console.error(e);
    return "Something went wrong";
}

export enum UploadFlag {
    Outlet,
    Gallery,
    Passport,
    Imei
}

export default function useAPI() {
    const auth = useSelector(s => s.auth);

    const getOptions = React.useCallback((opt?: AxiosRequestConfig) => {
        if (auth) {
            if (isAuthExpired(auth.expired_at)) {
                setTimeout(() => {
                    Router.push("/logout");
                }, 500);
                throw new CatchApiError({ message: "Login expired", result: {}, success: false });
            }
        }
        return {
            ...opt,
            headers: {
                ...auth ? {
                    Authorization: `Bearer ${auth.token}`
                } : {},
                ...opt?.headers,
            }
        }
    }, [auth])

    const get = React.useCallback(async<R = any, Pages = false>(url: string): Promise<ResponseData<R, Pages>> => {
        try {
            const opt = getOptions();
            const res = await API.get<ResponseData<R, Pages>>(url, opt);
            if (!res?.data?.success) {
                throw new CatchApiError(res?.data)
            }
            return res.data;
        } catch (e: any) {
            const string = catchError(e);
            throw new ApiError(string);
        }
    }, [getOptions]);

    /**
     * @example
     * ```js
     * const response = upload<IResponse>(url: string,data: FormData)
     * ```
     */
    const upload = React.useCallback(async<R = any>(url: string, data: FormData, config?: AxiosRequestConfig): Promise<R> => {
        const opt = getOptions(config);
        opt.headers = {
            ...opt.headers,
            'Content-Type': 'multipart/form-data'
        }
        try {
            const res = await API.post<ResponseData<R>>(url, data, opt);

            if (!res?.data?.success) {
                throw new CatchApiError(res?.data)
            }
            return res.data.result;
        } catch (e: any) {
            const string = catchError(e);
            throw new ApiError(string);
        }
    }, [getOptions]);

    /**
     * @example
     * ```js
     * const response = post<IResponse>(url: string,data: object)
     * ```
     */
    const post = React.useCallback(async<R = any>(url: string, data: Record<string, any> | null | FormData, config?: AxiosRequestConfig): Promise<R> => {
        const dt = data === null ? {} : data;
        const opt = getOptions(config);
        try {
            const res = await API.post<ResponseData<R>>(url, dt, opt);

            if (!res?.data?.success) {
                throw new CatchApiError(res?.data)
            }
            return res.data.result;
        } catch (e: any) {
            const string = catchError(e);
            throw new ApiError(string);
        }
    }, [getOptions]);

    /**
     * @example
     * ```js
     * const response = del<IResponse>(url: string)
     * ```
     */
    const del = React.useCallback(async<R = any>(url: string, config?: AxiosRequestConfig): Promise<ResponseData<R>> => {
        const opt = getOptions(config);
        try {
            const res = await API.delete<ResponseData<R>>(url, opt);

            if (!res?.data?.success) {
                throw new CatchApiError(res?.data)
            }
            return res.data;
        } catch (e: any) {
            const string = catchError(e);
            throw new ApiError(string);
        }
    }, [getOptions]);

    /**
     * @example
     * ```js
     * const response = put<IResponse>(url: string,data: object)
     * ```
     */
    const put = React.useCallback(async<R = any>(url: string, data: Record<string, any> | null | FormData, config?: AxiosRequestConfig): Promise<R> => {
        const dt = data === null ? {} : data;
        const opt = getOptions(config);
        try {
            const res = await API.put<ResponseData<R>>(url, dt, opt);

            if (!res?.data?.success) {
                throw new CatchApiError(res?.data)
            }
            return res.data.result;
        } catch (e: any) {
            const string = catchError(e);
            throw new ApiError(string);
        }
    }, [getOptions]);

    return { get, post, put, del, upload }
}