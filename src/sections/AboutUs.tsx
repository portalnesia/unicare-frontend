import Img from "@/components/Img";
import Box from "@mui/material/Box/Box";
import Stack from "@mui/material/Stack/Stack";
import Typography from "@mui/material/Typography/Typography";
import { useTranslation } from "next-i18next";

export default function SectionAboutUs() {
    const [t] = useTranslation("main")

    return (
        <Stack direction="column" spacing={10}>
            <Typography variant="body1" px={12} fontWeight={400} textAlign="center">{t("description_welcome_to_unicare")}</Typography>
            <Stack direction="row" width="100%" justifyContent="space-around">
                <Box sx={{ flexDirection: "column", justifyContent: "center", alignItems: "center", display: "flex" }}>
                    <Typography fontFamily={"Lora"} fontSize={60} fontWeight={700} color="primary.main">150+</Typography>
                    <Typography variant="body1" fontWeight={400}>{t("healthcare_providers")}</Typography>
                </Box>
                <Box sx={{ flexDirection: "column", justifyContent: "center", alignItems: "center", display: "flex" }}>
                    <Typography fontFamily={"Lora"} fontSize={60} fontWeight={700} color="primary.main">{t("over_17")}</Typography>
                    <Typography variant="body1" fontWeight={400}>{t("business_partnership")}</Typography>
                </Box>
                <Box sx={{ flexDirection: "column", justifyContent: "center", alignItems: "center", display: "flex" }}>
                    <Typography fontFamily={"Lora"} fontSize={60} fontWeight={700} color="primary.main">170+</Typography>
                    <Typography variant="body1" fontWeight={400}>{t("total_insured_members")}</Typography>
                </Box>
            </Stack>
            <Stack width="100%" direction="row" spacing={8}>
                <Img src="assets/aboutus1.png" sx={{ objectFit: "cover", borderRadius: 2, maxWidth: "500px" }} />
                <Stack direction="column" spacing={4} justifyContent="space-between">
                    <Typography variant="h2" color="primary.main">{t("title_about_us")}</Typography>
                    <Typography variant="h1" color="#333333">{t("title_unicare_profile")}</Typography>
                    <Typography variant="body1" color="#333333">{t("description_unicare_profile")}</Typography>
                </Stack>
            </Stack>
        </Stack>
    );
}