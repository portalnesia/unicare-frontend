import useResponsive from "@/hooks/responsive";
import Box from "@mui/material/Box/Box";
import Typography from "@mui/material/Typography/Typography";
import { useTranslation } from "next-i18next";
import React from "react";
import { userLoginSwiper } from "root/data/content-data";
import { Swiper, SwiperClass, SwiperSlide } from "swiper/react";
import CardServices from "./CardServices";
import { Navigation } from "swiper";
import Fade from "@mui/material/Fade/Fade";
import IconButton from "@mui/material/IconButton/IconButton";
import Iconify from "./Iconify";
import styled from "@emotion/styled";
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import Stack from "@mui/material/Stack/Stack";
import Img from "./Img";
import { FONT_SECONDARY } from "@/themes/typography";
import Divider from "@mui/material/Divider/Divider";

interface SwiperLoginProps {
    contents: (typeof userLoginSwiper[number])[]
}

export default function LoginSwiper({ contents }: SwiperLoginProps) {
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
        // <>
        <Box
            // position="relative"
            // width="100px"
            // flexDirection="row"
            // display="grid"
            sx={{
                // bgcolor: "red",
                height: "100%",
                width: "100%",
                borderRadius: "80px",
                // display: "flex",
                // flexDirection: "row",
                // p: 3,
                // position: "relative"
            }}
        >
            <Swiper onInit={ref => swiperRef.current = ref} onSlideChange={onSlideChange} slidesPerView={1} spaceBetween={30} modules={[Navigation]}
                navigation={{
                    prevEl: navLeft.current,
                    nextEl: navRight.current,
                }}
                style={
                    // isMd ? { padding: 24, height: "650px" }
                    //     : { padding: 24, height: "650px", marginLeft: 48, marginRight: 48 }
                    {
                        height: "650px",
                        // position: "absolute",
                        // backgroundColor: "yellow",
                        borderRadius: 3
                    }
                }
                breakpoints={{
                    0: {
                        slidesPerView: 1,
                    },
                    600: {
                        slidesPerView: 1,
                    },
                    768: {
                        slidesPerView: 1,
                    },
                    1024: {
                        slidesPerView: 1,
                    }
                }}
            >
                {contents.map((d, i) => (
                    <SwiperSlide key={`${i}`} style={{ paddingTop: 16, paddingBottom: 16, }}>
                        <Box sx={{
                            padding: 3,
                            // height: "550px",
                            // width: "100%",
                            bgcolor: "white",
                            borderRadius: 1,
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "start",
                            mx: "10%",
                            mt: "20%"
                        }}>
                            <Box sx={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                flexDirection: "column",
                            }}>
                                <Img src={`assets/${d.image}`} height="50%" width="50%" />
                                <Stack spacing={2} width="100%">
                                    <Typography variant="h3" fontFamily={FONT_SECONDARY} color="primary.main">{d.title}</Typography>
                                    <Typography variant="subtitle1" fontWeight={500} textAlign="center" sx={{
                                        display: "-webkit-box",
                                        WebkitBoxOrient: "vertical",
                                        overflow: "hidden",
                                        WebkitLineClamp: 2, // Set the desired number of lines
                                        minHeight: "calc(1.5em * 2)", // Adjust the multiplier based on your font size and line height
                                        textOverflow: "ellipsis",
                                    }}>{d.description}</Typography>
                                    <Divider orientation="horizontal" sx={{ height: "100%", borderColor: "#D6D6D6", display: "block" }} flexItem />
                                    {d.items.map((item, j) => (
                                        <Box key={j} sx={{
                                            height: "100%",
                                            width: "100%",
                                            flexDirection: "row",
                                            display: "flex",
                                        }}>
                                            <Iconify icon="lucide:check-circle" color="primary.main" mr={2} />
                                            <Typography >{item}</Typography>
                                        </Box>
                                    ))}
                                </Stack>
                            </Box>
                        </Box>
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
        </Box>
        // </>
    );
}