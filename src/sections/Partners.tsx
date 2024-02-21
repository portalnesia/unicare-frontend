import Img from "@/components/Img";
import Stack from "@mui/material/Stack/Stack";
import Typography from "@mui/material/Typography/Typography";
import { useTranslation } from "next-i18next";
import Marquee from "react-fast-marquee";
import partners from "root/data/partners.json"

export default function SectionPartners() {
    const [t] = useTranslation("main")
    return (
        <Stack width="80vw" direction="row" alignItems="center" spacing={6} >
            <Typography variant="subtitle1" fontWeight={400} sx={{ flex: "none" }}>{t("proud_to_partner_with")}</Typography>
            <Marquee autoFill gradient gradientColor="#F3F3F3" gradientWidth={100}>
                {partners.map((d, i) => (
                    <Img key={i} src={d.src} sx={{ px: 4 }} />
                ))}
            </Marquee>
        </Stack>
    );
}