export const NAVBAR_HEIGHT = 64;
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
    name: "Home",
    link: "/#home",
}, {
    name: "About Us",
    link: "/#about-us",
}, {
    name: "Our Services",
    link: "/#our-services",
}, {
    name: "Contact Us",
    link: "/#contact-us",
},
])