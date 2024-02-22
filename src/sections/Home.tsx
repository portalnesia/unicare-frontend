import typography, { FONT_SECONDARY } from "@/themes/typography";
import Box from "@mui/material/Box/Box";
import Stack from "@mui/material/Stack/Stack";
import { useTranslation } from "next-i18next";
import { Wrapper } from "@googlemaps/react-wrapper";
import HospitalMap from "@/components/HospitalMap";
import Grid from "@mui/material/Grid/Grid";
import Typography from "@mui/material/Typography/Typography";
import { SvgArt1 } from "@/components/svg/Art";

export default function SectionHome() {
    const [t] = useTranslation("main");
    return (
        <Box position="relative" >
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

            <SvgArt1 size={160} sx={{
                position: "absolute",
                right: { xs: 0, lg: -75 },
                top: 20,
                display: { xs: "none", lg: "block" },
                zIndex: -1,
            }} />

            <SvgArt1 size={160} sx={{
                position: "absolute",
                right: { xs: 0, lg: -75 },
                top: 140,
                display: { xs: "none", lg: "block" },
                zIndex: -1,
            }} />

            <SvgArt1 size={700} sx={{
                position: "absolute",
                left: { xs: 0, lg: -300 },
                bottom: -600,
                display: { xs: "none", lg: "block" },
                zIndex: -1,
                transform: "scaleX(-1)"
            }} />
        </Box>
    )
}