import Pages from "@/components/Pages";
import DashboardLayout from "@/layout/dashboard";
import { getManagedCareNavbar } from "@/layout/navbar.config";
import wrapper from "@/redux/store";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import React from "react";

export const getServerSideProps = wrapper(async ({ params, redirect, locale, getTranslation }) => {
    if (typeof params?.slug?.[0] !== "string") return redirect();
    if (
        ![
            "dashboard",
            "services",
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

export default function ManagedCare() {
    const router = useRouter();
    const type = router.query?.slug?.[0];
    const [t] = useTranslation("main");

    const title = React.useMemo(() => {
        return getManagedCareNavbar(t).find((d) => d.key === type)?.name
    }, [type, t])

    return (
        <Pages title={`${title} - Managed Care`} canonical={`/managed-care/${type}`} noIndex>
            <DashboardLayout title="Managed Care">
                {type === "dashboard" ? (
                    <h1>USER dashboard</h1>
                ) : type === "services" ? (
                    <h1>USER services</h1>
                ) : null}
            </DashboardLayout>
        </Pages>
    );
}