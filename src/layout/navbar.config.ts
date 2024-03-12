import { Auth } from "@/model/auth";
import { TFunction } from "i18next";

export const NAVBAR_HEIGHT = 120;
export const DRAWER_WIDTH = 270;

export type INavbarChild = {
    name: string;
    link: string;
    tooltip?: string;
    icon?: string;
    desc?: string;
    blank?: boolean;
    fn?: string;
    shallow?: boolean;
    child?: INavbarChild[];
}

export type INavbar = {
    fn?: string;
    name: string;
    link: string;
    tooltip?: string;
    icon?: string;
    iconActive?: string;
    shallow?: boolean;
    desc?: string;
    child?: INavbarChild[];
    blank?: boolean;
    key?: string;
}

export const getNavbarMenu = (): INavbar[] => ([{
    name: "title_home",
    link: "/#home",
}, {
    name: "title_about_us",
    link: "/#about-us",
}, {
    name: "title_our_services",
    link: "/#our-services",
}, {
    name: "title_contact_us",
    link: "/#contact-us",
},
])

export const getManagedCareNavbar = (t: TFunction<"main">, auth?: Auth | null): INavbar[] => [
    {
        name: t("title_dashboard"),
        link: "/managed-care/dashboard",
        icon: "jam:home",
        key: "dashboard"
        // child: getDashboardChild(auth?.role).filter((a) => typeof a?.submenu === "undefined"),
    },
    {
        name: t("title_services"),
        link: "/managed-care/services",
        icon: "jam:medical",
        key: "services"
    },
];

export const getAdminNavbar = (auth?: Auth | null): INavbar[] => [
    {
        name: "Dashboard",
        link: "/administration/dashboard",
        icon: "jam:home",
        key: "dashboard"
        // child: getDashboardChild(auth?.role).filter((a) => typeof a?.submenu === "undefined"),
    },
    {
        name: "Data Pasien",
        link: "/administration/data-pasien",
        icon: "jam:users",
        key: "data-pasien"
    },
];

export const getCMSNavbarSecondary = (): INavbar[] => [
    {
        name: "Sign out",
        link: "#",
        fn: "logout",
        icon: "jam:log-out",
    },
];