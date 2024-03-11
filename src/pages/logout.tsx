import { IRoles } from "@/model/auth";
import wrapper from "@/redux/store";
import { webUrl } from "@/utils/main";
import { deleteCookie } from "cookies-next";


export const getServerSideProps = wrapper(async ({ req, res, store, redirect, auth, locale }) => {
    const role = auth?.roles;
    store.dispatch({
        type: "CUSTOM",
        payload: {
            auth: undefined
        }
    })
    deleteCookie("_auth", { req, res });
    if (role === IRoles.CUSTOMER) {
        return redirect(webUrl(`/login`));
    } else {
        return redirect(webUrl(`/admin`));
    }
})

export default function LogoutPages() {
    return null;
}