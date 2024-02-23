import Img from "@/components/Img";
import Packages from "@/components/packages";
import { SvgArt1 } from "@/components/svg/Art";
import { maxWidth } from "@/config";
import { FONT_SECONDARY } from "@/themes/typography";
import Box from "@mui/material/Box/Box";
import Container from "@mui/material/Container/Container";
import Grid from "@mui/material/Grid/Grid";
import Stack from "@mui/material/Stack/Stack";
import Typography from "@mui/material/Typography/Typography";
import { useTranslation } from "next-i18next";

export default function SectionOurPrograms() {
    const [t] = useTranslation("main")
    return (
        <Container sx={{ py: 12, px: 2, zIndex: 1, position: "relative" }}>
            <Grid container justifyContent="center" spacing={8} >
                <Grid item xs={12} sm={6} display="flex" alignItems="stretch">
                    <Stack direction="column" spacing={4} justifyContent="space-between" alignItems={{ xs: "center", sm: "start" }}>
                        <Typography variant="h2" color="primary.main" fontFamily={FONT_SECONDARY} >Our Programs</Typography>
                        <Typography variant="h1" >Trusted Care, Tailored for You: Explore Our Comprehensive Programs</Typography>
                        <Typography variant="body1" >At Unicare, we prioritize your well-being. Uncover a spectrum of programs crafted to go beyond the ordinary, ensuring you receive the care you deserve for a healthier life.</Typography>
                    </Stack>
                </Grid>
                <Grid item xs={12} sm={6} display="flex" alignItems="stretch">
                    <Img src="assets/aboutus1.png" width="100%" height="auto" sx={{ objectFit: "cover", borderRadius: 2 }} />
                </Grid>
            </Grid>

            <Grid item xs={12} py={8} /> {/* Spacer */}

            <Packages />
        </Container>
    );
}