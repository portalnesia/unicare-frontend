import wrapper from "@/redux/store";
import { webUrl } from "@/utils/main";


// export const getServerSideProps = wrapper(async ({ auth,query, redirect }) => {
//     if(typeof query?.token === "string") {
//         // session.auth = query?.token;
//     }
//     return redirect(webUrl("/dashboard"))
// })

export const getServerSideProps = wrapper(async ({ redirect, locale }) => {
    return redirect(webUrl(`/managed-care/dashboard`));
})

export default function ManagedCarePages() {
    return null;
}
