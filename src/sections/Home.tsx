import typography, { FONT_SECONDARY } from "@/themes/typography";
import { ThemeContext, ThemeProvider } from "@emotion/react";
import { Grid, Typography } from "@mui/material";
import Box from "@mui/material/Box/Box";
import Stack from "@mui/material/Stack/Stack";
import { useTranslation } from "next-i18next";
import React, { Fragment, useEffect, useRef } from "react";
import { Wrapper } from "@googlemaps/react-wrapper";
import HospitalMap from "@/components/HospitalMap";

export default function SectionHome() {
    const [t] = useTranslation("main");


    return (
        <Stack direction="column" pt={{ xs: 2, md: 8 }}>
            <Grid container alignItems="center" spacing={4}>
                <Grid item xs={12} sm={5}>
                    <Typography fontFamily={FONT_SECONDARY} variant="h1" color="#333333">{t("heading_title_check_out_our_providers")}</Typography>
                </Grid>
                <Grid item xs={12} sm={7}>
                    <Typography variant="body1">{t("description_explore_our_network")}</Typography>
                </Grid>
            </Grid>
            <Wrapper apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ? process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY : ""}>
                <HospitalMap sx={{ height: "700px", my: 5 }} />
            </Wrapper>
        </Stack>
    )
}