import wrapper from "@/redux/store";
import { webUrl } from "@/utils/main";

export const getServerSideProps = wrapper(async ({ redirect, locale }) => {
    return redirect(webUrl(`/administration/dashboard`));
})

export default function AdministrationPages() {
    return null;
}
