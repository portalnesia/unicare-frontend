import { useState, useCallback, useMemo, ElementType } from 'react'
import Router, { useRouter } from 'next/router';

export default function useTablePagination(initialPage: number | true = 1, initialPerPage: number | true = 10) {
    const router = useRouter();
    const rPage = router.query?.page;
    const rPerPage = router.query?.page_size;
    const [sPage, setPage] = useState(typeof initialPage === 'number' ? initialPage : Number(rPage || 1));
    const [sRowsPerPage, setRowsPerPage] = useState(typeof initialPerPage === 'number' ? initialPerPage : Number(rPerPage || 10));

    const page = useMemo(() => {
        if (typeof initialPage === 'number') return sPage;
        if (typeof rPage === 'string') {
            const page = Number(rPage);
            if (Number.isNaN(page)) return 1;
            return page;
        }
        return sPage;
    }, [sPage, rPage, initialPage])

    const rowsPerPage = useMemo(() => {
        if (typeof initialPerPage === 'number') return sRowsPerPage;
        if (typeof rPerPage === 'string') {
            const page = Number(rPerPage);
            if (Number.isNaN(page)) return 1;
            return page;
        }
        return sRowsPerPage;
    }, [sRowsPerPage, rPerPage, initialPerPage])

    const onPageChange = useCallback((_e: any, newPage: number) => {
        if (typeof initialPage === 'number') {
            setPage(newPage + 1);
        } else {
            const { pathname, query, asPath } = Router;
            const q = { ...query, page: newPage + 1 };
            const url = new URL(`${process.env.NEXT_PUBLIC_URL}/${asPath}`);
            const quer = url.searchParams;
            quer.set('page', `${newPage + 1}`)
            const path = `${url.pathname}?${quer.toString()}`
            Router.replace({ pathname, query: q }, path, { shallow: true })
            window.scrollTo({ left: 0, top: 0, behavior: 'smooth' })
        }
    }, [initialPage]);

    const onRowsPerPageChange = useCallback((event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        let newPage = parseInt(event.target.value, 10);
        const { asPath } = Router;
        const url = new URL(`${process.env.NEXT_PUBLIC_URL}/${asPath}`);
        const quer = url.searchParams;

        function changePage(forceRouter?: boolean) {
            if (typeof initialPage === 'number') {
                setPage(1);
            } else {
                quer.set('page', `1`)
                if (forceRouter) {
                    const path = `${url.pathname}?${quer.toString()}`
                    Router.replace(path, undefined, { shallow: true })
                }
            }
        }

        if (typeof initialPerPage === 'number') {
            setRowsPerPage(parseInt(event.target.value, 10));
            if (page !== 1) changePage(true);
        } else {
            if (page !== 1) changePage();
            quer.set('page_size', `${newPage}`)
            const path = `${url.pathname}?${quer.toString()}`
            Router.replace(path, undefined, { shallow: true })
            window.scrollTo({ left: 0, top: 0, behavior: 'smooth' })
        }
    }, [page, initialPerPage, initialPage]);

    return { page, rowsPerPage, onPageChange, onRowsPerPageChange, component: 'div' as ElementType<any>, rowsPerPageOptions: [10, 25, 50], showFirstButton: true, showLastButton: true }
}