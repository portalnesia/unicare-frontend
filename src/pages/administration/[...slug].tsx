import Pages from "@/components/Pages";
import DashboardLayout from "@/layout/dashboard";
import { getAdminNavbar, getManagedCareNavbar } from "@/layout/navbar.config";
import wrapper from "@/redux/store";
import { useRouter } from "next/router";
import React from "react";

export const getServerSideProps = wrapper(async ({ params, redirect, getTranslation, locale }) => {
    if (typeof params?.slug?.[0] !== "string") return redirect();
    if (
        ![
            "dashboard",
            "data-pasien",
        ].includes(params?.slug?.[0])
    ) {
        return redirect();
    }
    return {
        props: {
            ...await getTranslation("main", locale),
            data: {},
        },
    };
});

export default function Administration() {
    const router = useRouter();
    const type = router.query?.slug?.[0];

    const title = React.useMemo(() => {
        return getAdminNavbar().find((d) => d.key === type)?.name
    }, [type])

    return (
        <Pages title={`${title} - Administration`} canonical={`/administration/${type}`} noIndex>
            <DashboardLayout title="Administration">
                {type === "dashboard" ? (
                    <h1>ADMIN dashboard</h1>
                ) : type === "data-pasien" ? (
                    <h1>ADMIN data-pasien</h1>
                ) : null}
            </DashboardLayout>
        </Pages>
    );
}