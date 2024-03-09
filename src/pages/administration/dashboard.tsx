import Pages from "@/components/Pages";
import DashboardLayout from "@/layout/dashboard";
import wrapper from "@/redux/store";

export const getServerSideProps = wrapper(async ({ }) => {
    return {
        props: {
            data: {},
        },
    };
});

export default function ManagedCare() {
    return (
        <Pages title="Administration - Dashboard" canonical="/administration/dashboard">
            <DashboardLayout title="Administration">
                <h1>ADMIN</h1>
            </DashboardLayout>
        </Pages>
    );
}