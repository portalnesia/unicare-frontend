import Img from "@/components/Img";
import { FONT_SECONDARY } from "@/themes/typography";
import Stack from "@mui/material/Stack/Stack";
import Box from "@mui/material/Box/Box";
import Typography from "@mui/material/Typography/Typography";
import { useTranslation } from "next-i18next";
import useResponsive from "@/hooks/responsive";
import { styled } from "@mui/material/styles";
import React from "react";
import Router, { useRouter } from "next/router";
import { INavbar, NAVBAR_HEIGHT, getNavbarMenu } from "@/layout/navbar.config";
import Iconify from "@/components/Iconify";
import Link from "@mui/material/Link/Link";

const LinkMenu = styled("a")(({ theme }) => ({
    textDecoration: "none",
    "&::after": {
        content: '""',
        display: "block",
        margin: "auto",
        width: 0,
        height: 2,
        backgroundColor: "white",
        transition: theme.transitions.create(["width"], {
            duration: 225,
        }),
    },
    "&:hover": {
        "&::after": {
            width: "100%"
        }
    }
}))

export const onMenuClick = (d: INavbar, isMd: boolean) => (e: React.MouseEvent<HTMLAnchorElement>) => {
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

export default function SectionFooter() {
    const [t] = useTranslation("main");
    const isMd = useResponsive("down", 462)
    const router = useRouter();
    const menu = React.useMemo(() => {
        return getNavbarMenu();
    }, []);

    const onClick = React.useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
        if (router.pathname === "/") {
            e.preventDefault();
            Router.replace("/", undefined, { shallow: true, scroll: false })
            window.scrollTo({ left: 0, top: 0, behavior: 'smooth' })
        }
    }, [router.pathname])

    return (
        <Box flexDirection="column" display="flex" >
            {!isMd && (
                <Stack direction="row" justifyContent="space-between" alignItems="start" zIndex={1}>
                    <Link href="/" onClick={onClick}>
                        <Img src="logo_white.svg" />
                    </Link>
                    <Stack spacing={3} alignItems="start">
                        <Typography pb={2} variant="h3" color="white" fontFamily={FONT_SECONDARY}>{t("title_pages")}</Typography>
                        {menu.map((d, i) => (
                            <LinkMenu key={`${d.name}-${i}`} href={d.link} onClick={onMenuClick(d, isMd)}>
                                <Typography variant="body1" color="white" >{t(d.name as any)}</Typography>
                            </LinkMenu>
                        ))}
                    </Stack>
                    <Stack spacing={3} alignItems="start">
                        <Typography pb={2} variant="h3" color="white" fontFamily={FONT_SECONDARY}>{t("title_services")}</Typography>
                        <LinkMenu href="/" target="_blank">
                            <Typography variant="body1" color="white" >{t("doctor_tele")}</Typography>
                        </LinkMenu>
                        <LinkMenu href="/" target="_blank">
                            <Typography variant="body1" color="white" >{t("oncall_services")}</Typography>
                        </LinkMenu>
                        <LinkMenu href="/" target="_blank">
                            <Typography variant="body1" color="white" >{t("managed_care")}</Typography>
                        </LinkMenu>
                        <LinkMenu href="/" target="_blank">
                            <Typography variant="body1" color="white" >{t("laboratory_test")}</Typography>
                        </LinkMenu>
                        <LinkMenu href="/" target="_blank">
                            <Typography variant="body1" color="white" >{t("ambulance_services")}</Typography>
                        </LinkMenu>
                    </Stack>
                    <Stack spacing={3} alignItems="start">
                        <Typography pb={2} variant="h3" color="white" fontFamily={FONT_SECONDARY}>{t("address")}</Typography>
                        <Stack direction="row" alignItems="start" >
                            <Link href="/" target="_blank">
                                <Box display="flex" flexDirection="row">
                                    <Box sx={{
                                        width: "48px",
                                        display: "flex",
                                    }}>
                                        <Iconify icon="tdesign:location" color="white" />
                                    </Box>
                                    <Typography variant="body1" color="white" maxWidth="270px">Ring No.2, Jl. Patih Jelantik, Komp. Istana Kuta Galeria Lingkungan Abianbase, Kuta, Bali 80361</Typography>
                                </Box>
                            </Link>
                        </Stack>
                        <Stack direction="row" >
                            <LinkMenu href="/" target="_blank">
                                <Box display="flex" flexDirection="row">
                                    <Box sx={{
                                        width: "48px",
                                        display: "flex",
                                    }}>
                                        <Iconify icon="iconoir:facebook" color="white" />
                                    </Box>
                                    <Typography variant="body1" color="white" maxWidth="270px">UNICARECLINIC</Typography>
                                </Box>
                            </LinkMenu>
                        </Stack>
                        <Stack direction="row" >
                            <LinkMenu href="/" target="_blank">
                                <Box display="flex" flexDirection="row">
                                    <Box sx={{
                                        width: "48px",
                                        display: "flex",
                                    }}>
                                        <Iconify icon="iconoir:twitter" color="white" />
                                    </Box>
                                    <Typography variant="body1" color="white" maxWidth="270px">UNICARE_CLINIC</Typography>
                                </Box>
                            </LinkMenu>
                        </Stack>
                        <Stack direction="row" >
                            <LinkMenu href="/" target="_blank">
                                <Box display="flex" flexDirection="row">
                                    <Box sx={{
                                        width: "48px",
                                        display: "flex",
                                    }}>
                                        <Iconify icon="iconoir:instagram" color="white" />
                                    </Box>
                                    <Typography variant="body1" color="white" maxWidth="270px">UNICARECLINIC</Typography>
                                </Box>
                            </LinkMenu>
                        </Stack>
                    </Stack>
                </Stack>
            )}
            <Typography pt={{ xs: 0, sm: 12 }} variant="body1" color="white" >Copyright © 2019 - 2024 | PT. Unicare Indonesia Gumilang</Typography>
        </Box>
    );
}