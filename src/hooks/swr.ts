import nativeUseSWR, { SWRConfiguration } from "swr";
import useAPI, { ApiError, ResponseData } from "./api";
import { useSelector } from "@/redux/store";

export type { SWRConfiguration };

export default function useSWR<D = any, Pages = false, Additional extends object = {}>(
    path: string | null,
    config: SWRConfiguration<ResponseData<D>> = {},
) {
    const auth = useSelector((s) => s.auth);
    const { get } = useAPI();
    const { fallback, ...rest } = config;
    const swr = nativeUseSWR<ResponseData<D>, ApiError>(typeof auth === "undefined" ? null : path, {
        fetcher: get,
        revalidateOnReconnect: true,
        revalidateOnFocus: false,
        revalidateIfStale: true,
        ...rest,
    });
    return swr;
}
