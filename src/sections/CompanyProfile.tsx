import Img from "@/components/Img";
import { SvgArrow, SvgArt1 } from "@/components/svg/Art";
import useResponsive from "@/hooks/responsive";
import { FONT_SECONDARY } from "@/themes/typography";
import Box from "@mui/material/Box/Box";
import Container from "@mui/material/Container/Container";
import Grid from "@mui/material/Grid/Grid";
import Stack from "@mui/material/Stack/Stack";
import Typography from "@mui/material/Typography/Typography";
import { isMobile } from "react-device-detect";

export default function SectionCompanyProfile() {
    const isMd = useResponsive("down", 462);
    return (
        <>
            <Box sx={{ backgroundColor: "primary.main" }}>
                <Container sx={{ py: 12, px: 2, zIndex: 1, position: "relative" }}>
                    <Stack spacing={3}>
                        <Typography variant="h4" color="white">WHAT CAN WE DO</Typography>
                        <Typography fontFamily="Lora" fontWeight={700} fontSize={60} textAlign="center" color="white">
                            “Protect Your Team, Protect Your Company”
                        </Typography>
                        <Typography variant="body1" fontWeight={400} color="white">Secure your occupational health tomorrow today and ensure your company gets maximum protection.</Typography>
                    </Stack>
                    <SvgArt1 size={700} sx={{
                        position: "absolute",
                        left: { xs: 0, lg: -450 },
                        top: 100,
                        display: { xs: "none", lg: "block" },
                        zIndex: -1,
                        transform: "scaleX(-1)"
                    }} />
                </Container>
            </Box>
            <Box sx={{ backgroundColor: "#F3F3F3" }}>
                <Container sx={{ py: 12, px: 2, zIndex: 1, position: "relative" }}>
                    <Grid container spacing={10}>
                        <Grid item xs={12} sm={6}>
                            <Stack spacing={3} alignItems="start">
                                <Typography variant="h1">Nurturing Employee Wellbeing: Our Core Values</Typography>
                                <Typography variant="body1" >At Unicare Managed Care,  our commitment to employee wellbeing is deeply ingrained in our core values. As a health insurance provider, we recognize the vital role that a thriving workforce plays in the success of any organization. Explore the principles that guide us in delivering top-notch employee health insurance solutions and fostering a culture of wellness.</Typography>
                                {!isMd ? <SvgArrow /> : null}
                            </Stack>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Grid container height={"100%"} minHeight={400} >
                                <Grid item container xs={4} display="flex" alignItems="start" pb="25%">
                                    <Box sx={{
                                        bgcolor: "primary.main",
                                        height: "100%",
                                        width: "100%",
                                        borderRadius: "8px",
                                    }}>
                                        <Box sx={{
                                            height: "60%",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                        }}>
                                            <Typography color="white" fontSize={"24px"} fontWeight={700} fontFamily={FONT_SECONDARY}>Employee<br />-centric<br />Focus</Typography>
                                        </Box>
                                        <Img src="https://dummyimage.com/400x300" height="40%" width="100%" />
                                    </Box>
                                </Grid>
                                <Grid item xs={4} display="flex" alignItems="center" py="calc(25% / 2)">
                                    <Box sx={{
                                        bgcolor: "primary.dark",
                                        height: "100%",
                                        width: "100%",
                                        borderRadius: "8px"
                                    }}>

                                    </Box>
                                </Grid>
                                <Grid item xs={4} display="flex" alignItems="end" pt="25%">
                                    <Box sx={{
                                        bgcolor: "primary.darker",
                                        height: "100%",
                                        width: "100%",
                                        borderRadius: "8px"
                                    }}>

                                    </Box>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>

                    {/* <Stack spacing={3}>
                        <Typography variant="h1">Nurturing Employee Wellbeing: Our Core Values</Typography>
                        <Typography fontFamily="Lora" fontWeight={700} fontSize={60} textAlign="center" color="white">
                            “Protect Your Team, Protect Your Company”
                        </Typography>
                        <Typography variant="body1" fontWeight={400} color="white">Secure your occupational health tomorrow today and ensure your company gets maximum protection.</Typography>
                    </Stack> */}
                    <SvgArt1 size={500} sx={{
                        position: "absolute",
                        left: { xs: 0, lg: -450 },
                        top: 100,
                        display: { xs: "none", lg: "block" },
                        zIndex: -1,
                        transform: "scaleX(-1)"
                    }} />
                </Container>
            </Box>
        </>
    );
}