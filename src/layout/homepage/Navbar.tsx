import Router, { useRouter } from "next/router";
import { DRAWER_WIDTH, INavbar, NAVBAR_HEIGHT, getNavbarMenu } from "../navbar.config";
import React from "react";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { styled, useThemeProps } from "@mui/material/styles";
import Link from "next/link";
import ButtonBase from "@mui/material/ButtonBase";
import useResponsive from "@/hooks/responsive";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import Iconify from "@/components/Iconify";
import Portal from "@mui/material/Portal";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import { isIOS } from "react-device-detect";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import { getDayJs, webUrl } from "@/utils/main";
import { SvgLogo } from "@/components/svg/Logo";
import Button from "@/components/Button";
import { useTranslation } from "next-i18next";
import Card from "@mui/material/Card/Card";
import Divider from "@mui/material/Divider/Divider";
import { setCookie } from "cookies-next";
import { domainCookie } from "@/config";
import { Icon } from "@iconify/react";
import { SvgIcon } from "@mui/material";

const RootStyle = styled(AppBar, { shouldForwardProp: (prop: string) => !['transparent'].includes(prop) })<{ transparent?: boolean }>(({ theme, transparent, position }) => ({
    top: 0,
    boxShadow: "none",
    backgroundColor: 'transparent',
    // ...(boxShadow ? {} : { boxShadow: "none" }),
}));

const ToolbarStyle = styled(Toolbar, { shouldForwardProp: (prop: string) => !['transparent'].includes(prop) })<{ transparent?: boolean }>(({ theme, transparent }) => ({
    height: NAVBAR_HEIGHT,
    alignItems: "center",
    paddingLeft: "0 !important",
    paddingRight: "0 !important",
    // transition: theme.transitions.create(['top', 'box-shadow', 'background-color']),
}));

export const onMenuClick = (d: Pick<INavbar, 'link'>) => (e?: React.MouseEvent<HTMLAnchorElement>) => {
    const url = new URL(window.location.href);
    if (url.pathname === "/" && d.link.startsWith("/#")) {
        if (e) e.preventDefault();
        const div = document.getElementById(d.link.replace("/#", ""))
        if (div) {
            const top = div.offsetTop - NAVBAR_HEIGHT + 80;
            Router.replace("/", undefined, { shallow: true, scroll: false })
            window.scrollTo({ left: 0, top, behavior: 'smooth' })
        }
    }
}

const MenuButton = styled(Box, {
    shouldForwardProp: (p: string) => !['activeMenu'].includes(p)
})<{ component?: any, activeMenu?: boolean }>(({ theme, activeMenu }) => ({
    color: "#858585",
    fontSize: 20,
    textAlign: "center",
    position: "relative",
    "&::after": {
        content: '""',
        display: "block",
        margin: "auto",
        width: 0,
        height: 0,
        backgroundColor: theme.palette.secondary.main,
        transition: theme.transitions.create(["width"], {
            duration: theme.transitions.duration.enteringScreen,
        }),
        ...(activeMenu ? {
            width: "100%",
        } : {})
    },
    ...(activeMenu ? {
        color: theme.palette.primary.main,
    } : {}),
    "&.active": {
        color: theme.palette.primary.main,
        "&::after": {
            width: "100%",
        }
    }
}))


export default function Navbar() {
    const router = useRouter();
    const [open, setOpen] = React.useState(false);
    // const isSwipe = useResponsive('down', 651);
    const isMd = useResponsive("down", 462);
    const [transparent, setTransparent] = React.useState(false);
    const [t] = useTranslation("main");

    const navbar = React.useMemo(() => {
        return getNavbarMenu();
    }, []);

    const isActive = React.useCallback((menu: INavbar) => {
        // if ('activeLink' in menu && menu.activeLink) {
        //     if (menu.activeLink.startsWith("http")) return false;
        //     const routerUrl = new URL(router.asPath, webUrl());
        //     const pathUrl = new URL((menu.activeLink), webUrl());
        //     const a = new RegExp((`${pathUrl.pathname}(\/|$)` || '/'), 'i').test(routerUrl.pathname || '/')
        //     return a;
        // } else {
        //     return false;
        // }
        return false;
    }, [])

    const handleToogle = React.useCallback(() => {
        setOpen(e => !e);
    }, [setOpen]);


    const onClick = React.useCallback((d?: INavbar) => (e: React.MouseEvent<HTMLAnchorElement>) => {
        setOpen(false)
        if (d) onMenuClick(d)(e)
        else if (router.pathname === "/") {
            e.preventDefault();
            window.scrollTo({ top: 0, left: 0, behavior: "smooth" })
        }
    }, [router.pathname])

    const handleChangeLanguage = React.useCallback((lang: 'id' | 'en') => {
        setCookie(
            "NEXT_LOCALE",
            lang,
            { domain: domainCookie, expires: getDayJs().add(1, 'year').toDate(), sameSite: "lax", secure: process.env.NODE_ENV === "production" }
        )
        const { pathname, query, asPath } = router
        router.replace({ pathname, query }, asPath, { locale: lang })
    }, [router])

    React.useEffect(() => {
        function onScroll() {
            const scroll = document?.documentElement?.scrollTop || document.body.scrollTop;
            if (scroll > 50) {
                // setTransparent(false)
            } else {
                // setTransparent(true);
            }
        }
        window.addEventListener('scroll', onScroll);

        return () => {
            window.removeEventListener('scroll', onScroll);
        }

    }, [])

    React.useEffect(() => {
        if (router.pathname === '/') {
            if (window.location.hash?.length) {
                console.log(window.location.hash);
                setTimeout(onMenuClick({ link: `/${window.location.hash}` }), 500);
            }
            const state = window.history.state;
            if (typeof state?.url !== "undefined" && typeof state?.as !== "undefined") {
                window.history.replaceState({ ...state, url: "/", as: "/" }, "", "/");
            }
        }
    }, [router.pathname])

    React.useEffect(() => {
        function onScroll() {
            if (router.pathname === '/') {
                const hash = window.location.hash;
                const scroll = document?.documentElement?.scrollTop || document.body.scrollTop;

                let activeId: string | undefined;
                document.querySelectorAll(".section-northbit-home").forEach(el => {
                    const elHeight = window.scrollY + el.getBoundingClientRect().top;
                    if (el.id) {
                        if (scroll >= elHeight - 100) {
                            activeId = el.id;
                        }
                    }
                })

                document.querySelectorAll(`.section-hash-button[data-hash]`).forEach(l => {
                    l.classList.remove('active');
                })
                if (activeId && activeId !== hash) {
                    const menu = document.querySelector(`.section-hash-button[data-hash="/#${activeId}"]`);
                    if (menu) {
                        menu.classList.add("active");
                    }

                    const state = window.history.state;
                    if (typeof state?.url !== "undefined" && typeof state?.as !== "undefined") {
                        window.history.replaceState({ ...state, url: "/", as: `/#${activeId}` }, "", "/");
                    }

                    //Router.replace({ pathname: "/", hash: activeId }, `#${activeId}`, { shallow: true, scroll: false })
                } else {
                    const state = window.history.state;
                    if (typeof state?.url !== "undefined" && typeof state?.as !== "undefined") {
                        window.history.replaceState({ ...state, url: "/", as: "/" }, "", "/");
                    }
                }
            }
        }

        window.addEventListener('scroll', onScroll);
        return () => {
            window.removeEventListener('scroll', onScroll);
        }
    }, [router.pathname])

    return (
        <RootStyle transparent={transparent} position="fixed" sx={{ boxShadow: theme => theme.shadows[1] }}>
            <ToolbarStyle transparent={transparent}>
                <Container maxWidth={"xl"} sx={{ bgcolor: transparent ? "transparent" : "white", height: "100%" }}>
                    <Stack direction="row" justifyContent="space-around" spacing={2} height="100%">
                        {!isMd ? (
                            <>
                                <Link href={"/"} onClick={onClick()}>
                                    <SvgLogo sx={{ mt: 1 }} />
                                </Link>

                                <Stack direction="row" spacing={1} height="50%">
                                    {navbar.map((d, i) => (
                                        <MenuButton key={`${d.name}-${i}`} className={`section-hash-button`} data-hash={d.link} activeMenu={isActive(d)} sx={{
                                            height: "100%",
                                        }}>
                                            <Link href={d.link} legacyBehavior passHref>
                                                <ButtonBase
                                                    component="a"
                                                    onClick={onClick(d)}
                                                    sx={{
                                                        py: 1,
                                                        px: { xs: 1, md: 2, lg: 2 },
                                                        borderRadius: 20,
                                                        height: "100%",
                                                        // ":hover": { background: "linear-gradient(to bottom, transparent 0%, lightgrey 50%, transparent 100%)", opacity: "25%" },
                                                        // position: "relative",
                                                        // overflow: "hidden",
                                                        "&:active": {
                                                            // height: "25%"
                                                            // content: '""',
                                                            // position: "absolute",
                                                            // top: "50%",
                                                            // left: 0,
                                                            // right: 0,
                                                            // bottom: 0,
                                                            // borderRadius: 20,
                                                            // background: "linear-gradient(to bottom, transparent 0%, lightgrey 50%, transparent 100%)",
                                                            // height: "50%",
                                                            // opacity: "25%",
                                                            // transform: "translateY(-50%)"
                                                        },
                                                        "&:hover::after": {
                                                            content: '""',
                                                            position: "absolute",
                                                            top: "50%",
                                                            left: 0,
                                                            right: 0,
                                                            bottom: 0,
                                                            borderRadius: 20,
                                                            background: "linear-gradient(to bottom, transparent 0%, lightgrey 50%, transparent 100%)",
                                                            height: "100%",
                                                            opacity: "25%",
                                                            transform: "translateY(-50%)"
                                                        },
                                                    }}
                                                >
                                                    <Typography variant="h6" fontWeight={500} component="span">{t(d.name as any)}</Typography>
                                                </ButtonBase>
                                                {/* <Box sx={{
                                                    height: "100%",
                                                    position: "relative",
                                                    display: "flex",
                                                    justifyContent: "center",
                                                    alignItems: "center",
                                                }}>
                                                    <Box sx={{
                                                        height: "50%",
                                                        display: "flex",
                                                        position: "absolute",
                                                        top: 0,
                                                        left: 0,
                                                        right: 0,
                                                        bottom: 0,
                                                        ":hover": { bgcolor: "action.hover" },
                                                        zIndex: 1, // Ensure the hover box is behind the button
                                                    }} />
                                                    <ButtonBase
                                                        component="a"
                                                        onClick={onClick(d)}
                                                        sx={{
                                                            py: 1,
                                                            px: { xs: 1, md: 2, lg: 2 },
                                                            borderRadius: 20,
                                                            height: "100%",
                                                            // backgroundColor: "transparent"
                                                            // position: "relative",
                                                            // zIndex: -1
                                                        }}
                                                    >
                                                        <Typography variant="h6" fontWeight={500} component="span">{t(d.name as any)}</Typography>
                                                    </ButtonBase>
                                                </Box> */}

                                            </Link>
                                        </MenuButton>
                                    ))}
                                </Stack>
                                <Stack direction="row" spacing={2}>
                                    <MenuButton>
                                        <ButtonBase
                                            component="a"
                                            onClick={() => {
                                                handleChangeLanguage("en")
                                            }}
                                            sx={{
                                                py: 1, px: 0, borderRadius: 2,
                                                ":hover": { bgcolor: "action.hover" },
                                            }}
                                        >
                                            <Typography variant="h6" component="span" color={"primary.main"} sx={{
                                                "&::after": {
                                                    content: '""',
                                                    display: "block",
                                                    position: 'absolute',
                                                    margin: "auto",
                                                    width: 0,
                                                    height: 2,
                                                    backgroundColor: "primary.main",
                                                    ...(router.locale == "en" ? {
                                                        width: "100%",
                                                    } : {})
                                                }
                                            }}>EN</Typography>
                                        </ButtonBase>
                                    </MenuButton>
                                    <MenuButton>
                                        <ButtonBase
                                            component="a"
                                            onClick={() => {
                                                handleChangeLanguage("id")
                                            }}
                                            sx={{ py: 1, mr: 1, borderRadius: 2, ":hover": { bgcolor: "action.hover" } }}
                                        >
                                            <Typography variant="h6" component="span" color={"primary.main"} sx={{
                                                "&::after": {
                                                    content: '""',
                                                    display: "block",
                                                    position: 'absolute',
                                                    margin: "auto",
                                                    width: 0,
                                                    height: 2,
                                                    backgroundColor: "primary.main",
                                                    ...(router.locale == "id" ? {
                                                        width: "100%",
                                                    } : {})
                                                },
                                            }}>ID</Typography>
                                        </ButtonBase>
                                    </MenuButton>
                                    <Button variant="text" sx={{ px: 5 }}><Typography color="primary" variant="subtitle1">{t("sign_in")}</Typography></Button>
                                    <Button
                                        icon="ci:menu-alt-05"
                                        iconPosition="start"
                                        sx={{ transform: "scaleX(-1);" }}
                                    >
                                        <Typography variant="subtitle1" sx={{ transform: "scaleX(-1);" }}>{t("administration")}</Typography>
                                    </Button>
                                </Stack>
                            </>
                        ) : (
                            <>
                                <IconButton onClick={handleToogle}>
                                    <Iconify icon="mingcute:menu-fill" sx={{ color: "primary.main", width: 30, height: 30, }} />
                                </IconButton>

                                <Link href={"/"} onClick={onClick()}>
                                    <SvgLogo sx={{ mt: 1 }} />
                                </Link>
1
                                <Portal>
                                    <SwipeableDrawer
                                        open={open}
                                        onClose={handleToogle}
                                        onOpen={handleToogle}
                                        disableSwipeToOpen
                                        PaperProps={{
                                            sx: { width: "80%" }
                                        }}
                                        disableBackdropTransition={!isIOS}
                                        disableDiscovery
                                    >
                                        <Box
                                            bgcolor="primary.main"
                                            color="white"
                                            zIndex={2}
                                        >
                                            <Link href={"/"} onClick={onClick()} passHref legacyBehavior>
                                                <ListItemButton aria-label="Bali Telkomsel" component="a" onClick={onClick()} sx={{
                                                    p: 2,
                                                    width: "100%",
                                                    justifyContent: "flex-start"
                                                }}>
                                                    <Typography sx={{ fontWeight: "bold" }}>Bali Telkomsel Sim Card</Typography>
                                                </ListItemButton>
                                            </Link>
                                        </Box>

                                        <List>
                                            {navbar.map((d, i) => (
                                                <Link key={`${d.name}-${i}`} href={d.link} passHref legacyBehavior>
                                                    <ListItemButton aria-label={d.name} component="a" onClick={onClick(d)} sx={{
                                                        p: 2,
                                                        width: "100%",
                                                        justifyContent: "flex-start"
                                                    }}>
                                                        <Typography>{d.name}</Typography>
                                                    </ListItemButton>
                                                </Link>
                                            ))}
                                        </List>
                                    </SwipeableDrawer>
                                </Portal>
                            </>
                        )}
                    </Stack>
                </Container>
            </ToolbarStyle>
        </RootStyle>
    )
}
