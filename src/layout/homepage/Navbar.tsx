import Router, { useRouter } from "next/router";
import { DRAWER_WIDTH, INavbar, NAVBAR_HEIGHT, getNavbarMenu } from "../navbar.config";
import React from "react";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
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
import { webUrl } from "@/utils/main";

const RootStyle = styled(AppBar, { shouldForwardProp: (prop: string) => !['transparent'].includes(prop) })<{ transparent?: boolean }>(({ theme, transparent, position }) => ({
    top: 0,
    boxShadow: "none",
    backgroundColor: 'transparent'
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
            const top = div.offsetTop - NAVBAR_HEIGHT - 24;
            Router.replace("/", undefined, { shallow: true, scroll: false })
            window.scrollTo({ left: 0, top, behavior: 'smooth' })
        }
    }
}

const MenuButton = styled(Box, {
    shouldForwardProp: (p: string) => !['activeMenu'].includes(p)
})<{ component?: any, activeMenu?: boolean }>(({ theme, activeMenu }) => ({
    color: "#A9C0C6",
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
            width: "100%"
        } : {})
    },
    ...(activeMenu ? {
        color: theme.palette.secondary.main,
    } : {}),
    "&.active": {
        color: theme.palette.secondary.main,
        "&::after": {
            width: "100%"
        }
    }
}))


export default function Navbar() {
    const router = useRouter();
    const [open, setOpen] = React.useState(false);
    // const isSwipe = useResponsive('down', 651);
    const isMd = useResponsive("down", 462);
    const [transparent, setTransparent] = React.useState(false);


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
        <RootStyle transparent={transparent} position="fixed">
            <ToolbarStyle transparent={transparent}>
                <Container sx={{ bgcolor: transparent ? "transparent" : "white", height: "100%" }}>
                    <Stack direction="row" justifyContent="space-between" spacing={2}>
                        {!isMd ? (
                            <>
                                <Link href={"/"} onClick={onClick()}>
                                    {/* <SvgLogo sx={{ mt: 1 }} /> */}
                                </Link>

                                <Stack direction="row" spacing={2}>
                                    {navbar.map((d, i) => (
                                        <MenuButton key={`${d.name}-${i}`} className={`section-hash-button`} data-hash={d.link} activeMenu={isActive(d)}>
                                            <Link href={d.link} legacyBehavior passHref>
                                                <ButtonBase component="a" onClick={onClick(d)} sx={{ py: 1, px: { xs: 2, md: 3, lg: 4 }, borderRadius: 2, ":hover": { bgcolor: "action.hover" } }}><Typography variant="button" component="span">{d.name}</Typography></ButtonBase>
                                            </Link>
                                        </MenuButton>
                                        // <MenuButton key={`${d.name}-${i}`} className={`section-hash-button`} data-hash={d.link} activeMenu={isActive(d)}><Link href={d.link} legacyBehavior passHref><ButtonBase component="a" onClick={onClick(d)} sx={{ py: 1, px: { sm: 1, md: 2, lg: 3 }, borderRadius: 2, fontSize: { xs: 13, sm: 16, md: 18, lg: 20 }, ":hover": { bgcolor: "action.hover" } }}>{d.name}</ButtonBase></Link></MenuButton>
                                    ))}
                                </Stack>
                            </>
                        ) : (
                            <>
                                <IconButton onClick={handleToogle}>
                                    <Iconify icon="mingcute:menu-fill" sx={{ color: "white", width: 30, height: 30, }} />
                                </IconButton>

                                <Link href={"/"} onClick={onClick()}>
                                    {/* <SvgLogo sx={{ mt: 1 }} /> */}
                                </Link>

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
                                            // borderBottom={theme => `2px solid ${theme.palette.divider}`}
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
