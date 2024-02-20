export const NAVBAR_HEIGHT = 120;
export const DRAWER_WIDTH = 270;

export type INavbarChild = {
    name: string,
    link: string
    tooltip?: string
    icon?: string
    desc?: string
    blank?: boolean
}

export type INavbar = {
    name: string,
    link: string,
    tooltip?: string
    icon?: string
    iconActive?: string
    desc?: string
    child?: INavbarChild[]
    blank?: boolean
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