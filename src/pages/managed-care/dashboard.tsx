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
        <Pages title="Managed Care - Dashboard" canonical="/managed-care/dashboard">
            <DashboardLayout title="Managed Care">
                <h1>USER</h1>
            </DashboardLayout>
        </Pages>
    );
}