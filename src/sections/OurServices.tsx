import Iconify from "@/components/Iconify";
import styled from "@emotion/styled";
import Box from "@mui/material/Box/Box";
import Fade from "@mui/material/Fade";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography/Typography";
import { useTranslation } from "next-i18next";
import React from "react";
import { Navigation, Swiper as SwiperClass } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import CardServices from "@/components/CardServices";
import { coverages, ourServices } from "root/data/content-data";
import useResponsive from "@/hooks/responsive";
import Stack from "@mui/material/Stack/Stack";

const BoxGrid = styled(Box)(({ theme }) => ({
    "&:hover": {
        "& .images": {
            transform: 'scale(1.1)'
        }
    }
}))

export default function SectionOurServices() {
    const [t] = useTranslation("main");
    const isMd = useResponsive("down", 462);
    const navLeft = React.useRef<HTMLButtonElement>(null);
    const navRight = React.useRef<HTMLButtonElement>(null);
    const swiperRef = React.useRef<SwiperClass>();
    const [hide, setHide] = React.useState({ left: true, right: false });

    const handleNavigationClick = React.useCallback((type: "left" | "right") => () => {
        if (swiperRef.current) {
            if (type === "left") swiperRef.current.slidePrev();
            else swiperRef.current.slideNext();
        }
    }, [])

    const onSlideChange = React.useCallback((sw: SwiperClass) => {
        if (sw.isBeginning) setHide({ left: true, right: false });
        else if (sw.isEnd) setHide({ left: false, right: true });
        else setHide({ left: false, right: false });
    }, [])

    return (
        <>
            <BoxGrid position="relative">
                <Typography variant="h1">{t("title_our_services")}</Typography>
                <Swiper onInit={ref => swiperRef.current = ref} onSlideChange={onSlideChange} slidesPerView={1} spaceBetween={30} modules={[Navigation]}
                    navigation={{
                        prevEl: navLeft.current,
                        nextEl: navRight.current,
                    }}
                    style={
                        isMd ? { padding: 24, height: "650px" }
                            : { padding: 24, height: "650px", marginLeft: 48, marginRight: 48 }
                    }
                    breakpoints={{
                        0: {
                            slidesPerView: 1,
                        },
                        600: {
                            slidesPerView: 2,
                        },
                        768: {
                            slidesPerView: 3,
                        },
                        1024: {
                            slidesPerView: 3,
                        }
                    }}
                >
                    {ourServices.map((d, i) => (
                        <SwiperSlide key={`${i}`} style={{ paddingTop: 16, paddingBottom: 16, height: "100%" }}>
                            <CardServices data={d} />
                        </SwiperSlide>
                    ))}
                </Swiper>

                <Fade in={!hide.left}>
                    <IconButton onClick={handleNavigationClick("left")} ref={navLeft} sx={{
                        zIndex: 1,
                        position: "absolute",
                        left: { xs: 0, lg: 0 },
                        top: `calc(55% - 48px)`,
                        color: "primary.main",
                        border: "2px solid",
                        backgroundColor: "#F9F9F9"
                    }}>
                        <Iconify icon="ic:round-arrow-back" width={32} height={32} />
                    </IconButton>
                </Fade>
                <Fade in={!hide.right}>
                    <IconButton onClick={handleNavigationClick("right")} ref={navRight} sx={{
                        zIndex: 1,
                        position: "absolute",
                        right: { xs: 0, lg: 0 },
                        top: `calc(55% - 48px)`,
                        color: "primary.main",
                        border: "2px solid",
                        backgroundColor: "#F9F9F9"
                    }}>
                        <Iconify icon="ic:round-arrow-forward" width={32} height={32} />
                    </IconButton>
                </Fade>
            </BoxGrid>

            <Typography variant="h1" pt={5}>{t("title_coverages")}</Typography>
            <Stack direction={{ xs: "column", sm: "row" }} justifyContent="center" py={3} spacing={3}>
                {coverages.map((d, i) => (
                    <CardServices data={d} sx={{ height: "500px", width: "100%" }} />
                ))}
            </Stack>
        </>
    );
}