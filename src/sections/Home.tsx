import typography, { FONT_SECONDARY } from "@/themes/typography";
import { ThemeContext, ThemeProvider } from "@emotion/react";
import { Grid, Typography } from "@mui/material";
import Box from "@mui/material/Box/Box";
import Stack from "@mui/material/Stack/Stack";
import { useTranslation } from "next-i18next";

export default function SectionHome() {
    const [t] = useTranslation("main");

    return (
        <Stack direction="column" pt={10}>
            <Grid container alignItems="center">
                <Grid sm={4}>
                    <Typography fontFamily={FONT_SECONDARY} variant="h1">{t("heading_title_check_out_our_providers")}</Typography>
                </Grid>
                <Grid sm={8}>
                    <Typography variant="body1" pl={12}>{t("description_explore_our_network")}</Typography>

                </Grid>
            </Grid>
        </Stack>
    )
}