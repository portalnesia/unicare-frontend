import { getCookie } from "cookies-next";
import { useRouter } from "next/router";
import { useEffect } from "react";


export default function useInit() {
    const router = useRouter();
    const isReady = router.isReady

    useEffect(() => {
        if (isReady) {
            const localeCookie = getCookie('NEXT_LOCALE');
            let locale = typeof localeCookie === 'string' ? localeCookie : undefined;

            if ((router.locale || 'en') !== locale) {
                const { pathname, query, asPath } = router;
                router.replace({ pathname, query }, asPath, { locale: locale })
            }
        }
        /* eslint-disable-next-line react-hooks/exhaustive-deps */
    }, [isReady])
}