import Iconify from "@/components/Iconify";
import ProductCard from "@/components/ProductCard";
import styled from "@emotion/styled";
import Box from "@mui/material/Box/Box";
import Fade from "@mui/material/Fade";
import Grid from "@mui/material/Grid/Grid";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography/Typography";
import { useTranslation } from "next-i18next";
import React from "react";
import { Navigation, Swiper as SwiperClass } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import CardPackageHome from "@/components/CardPackageHome";
import { ourServices } from "root/data/content-data";

const BoxGrid = styled(Box)(({ theme }) => ({
    "&:hover": {
        "& .images": {
            transform: 'scale(1.1)'
        }
    }
}))

export default function SectionOurServices() {
    const [t] = useTranslation("main");
    const navLeft = React.useRef<HTMLButtonElement>(null);
    const navRight = React.useRef<HTMLButtonElement>(null);
    const swiperRef = React.useRef<SwiperClass>();
    const [hide, setHide] = React.useState({ left: true, right: false });
    const northbitProduct = [...Array(6)]

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
        // <Grid container>
        //     <Grid item xs={12}>
        //         <Typography variant="h1">{t("title_our_services")}</Typography>
        //     </Grid>
            
        // </Grid>

        <BoxGrid position="relative">
            <Swiper onInit={ref => swiperRef.current = ref} onSlideChange={onSlideChange} slidesPerView={1} spaceBetween={30} modules={[Navigation]}
                navigation={{
                    prevEl: navLeft.current,
                    nextEl: navRight.current,
                }}
                style={{ padding: 24 }}
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
                        <CardPackageHome data={d} sx={{}} />
                    </SwiperSlide>
                ))}
            </Swiper>

            <Fade in={!hide.left}>
                <IconButton onClick={handleNavigationClick("left")} ref={navLeft} sx={{ zIndex: 1, position: "absolute", left: { xs: 0, lg: -50 }, top: `calc(55% - 48px)`, color: "#B8BAAD" }}>
                    <Iconify icon="material-symbols:arrow-circle-left-outline-rounded" width={48} height={48} />
                </IconButton>
            </Fade>
            <Fade in={!hide.right}>
                <IconButton onClick={handleNavigationClick("right")} ref={navRight} sx={{ zIndex: 1, position: "absolute", right: { xs: 0, lg: -50 }, top: `calc(55% - 48px)`, color: "#B8BAAD" }}>
                    <Iconify icon="material-symbols:arrow-circle-right-outline-rounded" width={48} height={48} />
                </IconButton>
            </Fade>
        </BoxGrid>
    );
}