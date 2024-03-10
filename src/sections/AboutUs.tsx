import Img from "@/components/Img";
import { FONT_SECONDARY } from "@/themes/typography";
import Box from "@mui/material/Box/Box";
import Grid from "@mui/material/Grid/Grid";
import Stack from "@mui/material/Stack/Stack";
import Typography from "@mui/material/Typography/Typography";
import { useTranslation } from "next-i18next";

export default function SectionAboutUs() {
    const [t] = useTranslation("main")

    return (
        <Grid container justifyContent="center" spacing={10} >
            <Grid item xs={12} sm={10}>
                <Typography variant="body1" px={0} fontWeight={400} textAlign="center">
                    {t("description_welcome_to_unicare")}
                </Typography>
            </Grid>

            <Grid item xs={12} sm={4}>
                <Box sx={{ flexDirection: "column", justifyContent: "center", alignItems: "center", display: "flex" }}>
                    <Typography fontFamily={"Lora"} fontSize={60} fontWeight={700} color="primary.main">150+</Typography>
                    <Typography variant="body1" fontWeight={400}>{t("healthcare_providers")}</Typography>
                </Box>
            </Grid>
            <Grid item xs={12} sm={4}>
                <Box sx={{ flexDirection: "column", justifyContent: "center", alignItems: "center", display: "flex" }}>
                    <Typography fontFamily={"Lora"} fontSize={60} fontWeight={700} color="primary.main">{t("over_17")}</Typography>
                    <Typography variant="body1" fontWeight={400}>{t("business_partnership")}</Typography>
                </Box>
            </Grid>
            <Grid item xs={12} sm={4}>
                <Box sx={{ flexDirection: "column", justifyContent: "center", alignItems: "center", display: "flex" }}>
                    <Typography fontFamily={"Lora"} fontSize={60} fontWeight={700} color="primary.main">170+</Typography>
                    <Typography variant="body1" fontWeight={400}>{t("total_insured_members")}</Typography>
                </Box>
            </Grid>

            <Grid id="about-us" className="section-northbit-home" item xs={12} py={5} /> {/* Spacer */}

            <Grid item xs={12} sm={5} display="flex" alignItems="stretch">
                <Img src="/assets/aboutus1.png" width="100%" height="auto" sx={{ objectFit: "cover", borderRadius: 2 }} />
            </Grid>
            <Grid item xs={12} sm={7}>
                <Stack direction="column" spacing={4} justifyContent="space-between" alignItems={{ xs: "center", sm: "start" }}>
                    <Typography variant="h2" color="primary.main" fontFamily={FONT_SECONDARY} >{t("title_about_us")}</Typography>
                    <Typography variant="h1" >{t("title_unicare_profile")}</Typography>
                    <Typography variant="body1" >{t("description_unicare_profile")}</Typography>
                </Stack>
            </Grid>
        </Grid>
    );
}