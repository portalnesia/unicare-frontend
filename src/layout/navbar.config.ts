import { Auth } from "@/model/auth";

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

export const getManagedCareNavbar = (auth?: Auth | null): INavbar[] => [
    {
        name: "Dashboard",
        link: "/dashboard",
        icon: "material-symbols:team-dashboard",
        // child: getDashboardChild(auth?.role).filter((a) => typeof a?.submenu === "undefined"),
    },
    {
        name: "Services",
        link: "/services",
        icon: "clarity:employee-group-solid",
    },
];

export const getCMSNavbarSecondary = (): INavbar[] => [
    {
        name: "Logout",
        link: "#",
        fn: "logout",
        icon: "majesticons:logout",
    },
];