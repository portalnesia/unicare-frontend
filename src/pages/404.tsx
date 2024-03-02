import ErrorPage from "@/components/ErrorPage";


export default function Custom404() {
    return (
        <ErrorPage title="Page Not Found" name="PAGE NOT FOUND" msg={`We looked everywhere for this page.\nAre you sure the website URL is correct?\nGet in touch with the site owner`} code={404} />
    )
}
