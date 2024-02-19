import ErrorPage from '@/components/ErrorPage';
import type { NextPage } from 'next';

type IErrorProps = {
    statusCode?: number
}

const Error: NextPage<IErrorProps> = (({ statusCode }) => {
    return (
        <ErrorPage title="Unexpected error" code={500} />
    )
})

Error.getInitialProps = ({ res, err }) => {
    const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
    return { statusCode }
}

export default Error;
