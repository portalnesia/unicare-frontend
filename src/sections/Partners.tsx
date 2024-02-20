import Img from "@/components/Img";
import Box from "@mui/material/Box/Box";
import Stack from "@mui/material/Stack/Stack";
import Typography from "@mui/material/Typography/Typography";
import { useTranslation } from "next-i18next";
import Marquee from "react-fast-marquee";
import partners from "root/data/partners.json"

export default function SectionPartners() {
    const [t] = useTranslation("main")
    return (
        <Stack maxWidth="xl" direction="column">
            <Stack direction="row" alignItems="center" spacing={6} width="100%">
                <Typography variant="subtitle1" fontWeight={400} sx={{ flex: "none" }}>PROUD TO PARTNER WITH</Typography>
                <Box sx={{
                    // width: "100%",
                    // height: "125px",
                    justifyContent: "center",
                    alignItems: "center"
                }}>
                    <Marquee autoFill gradient gradientColor="#F3F3F3">
                        {partners.map((d, i) => (
                        <Img key={i} src={d.src} sx={{px: 4}} />
                        ))}
                    </Marquee>
                </Box>
            </Stack>
        </Stack>
    );
}