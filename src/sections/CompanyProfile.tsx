import CardMission from "@/components/CardMission";
import Img from "@/components/Img";
import { SvgArt1 } from "@/components/svg/Art";
import { SvgArrow, SvgCallCenter, SvgMoneyBag, SvgProtect, SvgStar, SvgVerified, SvgWallet } from "@/components/svg/Icons";
import useResponsive from "@/hooks/responsive";
import { FONT_SECONDARY } from "@/themes/typography";
import Box from "@mui/material/Box/Box";
import Container from "@mui/material/Container/Container";
import Grid from "@mui/material/Grid/Grid";
import Stack from "@mui/material/Stack/Stack";
import Typography from "@mui/material/Typography/Typography";
import { missions } from "root/data/content-data";

export default function SectionCompanyProfile() {
    const isMd = useResponsive("down", 462);
    return (
        <>
            {/* Motto what can we do */}
            <Box sx={{ backgroundColor: "primary.main", overflow: "hidden" }}>
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

            {/* Nurturing Employee Wellbeing: Our Core Values */}
            <Box sx={{ backgroundColor: "#F3F3F3" }}>
                <Container sx={{ py: 12, zIndex: 1, position: "relative" }}>
                    <Grid container spacing={10} height={800}>
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
                                        overflow: "hidden"
                                    }}>
                                        <Box sx={{
                                            height: "60%",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            flexDirection: "column"
                                        }}>
                                            <SvgStar sx={{
                                                position: "relative",
                                                top: 7,
                                                right: 50
                                            }} />
                                            <Typography color="white" fontWeight={700} fontFamily={FONT_SECONDARY} textAlign="center">Employee<br />-centric<br />Focus</Typography>
                                        </Box>
                                        <Img src="assets/company1.png" height="40%" width="100%" sx={{
                                            objectFit: "cover",
                                        }} />
                                    </Box>
                                </Grid>
                                <Grid item xs={4} display="flex" alignItems="center" py="calc(25% / 2)">
                                    <Box sx={{
                                        bgcolor: "primary.dark",
                                        height: "100%",
                                        width: "100%",
                                        borderRadius: "8px",
                                        overflow: "hidden"
                                    }}>
                                        <Img src="assets/company2.png" height="40%" width="100%" sx={{
                                            objectFit: "cover",
                                        }} />
                                        <Box sx={{
                                            height: "60%",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            flexDirection: "column"
                                        }}>
                                            <SvgStar />
                                            <Typography color="white" fontWeight={700} fontFamily={FONT_SECONDARY} textAlign="center">Trustworthy<br />Partnership</Typography>
                                        </Box>
                                    </Box>
                                </Grid>
                                <Grid item xs={4} display="flex" alignItems="end" pt="25%">
                                    <Box sx={{
                                        bgcolor: "primary.darker",
                                        height: "100%",
                                        width: "100%",
                                        borderRadius: "8px"
                                    }}>
                                        <Box sx={{
                                            height: "60%",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            flexDirection: "column"
                                        }}>
                                            <SvgStar sx={{
                                                position: "relative",
                                                top: 7,
                                                left: 50
                                            }} />
                                            <Typography color="white" fontWeight={700} fontFamily={FONT_SECONDARY} textAlign="center">Inclusivity<br />&<br />Accessibility</Typography>
                                        </Box>
                                        <Img src="assets/company3.png" height="40%" width="100%" sx={{
                                            objectFit: "cover",
                                        }} />
                                    </Box>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>

                    <SvgArt1 size={400} sx={{
                        position: "absolute",
                        left: { xs: 0, lg: 150 },
                        bottom: -300,
                        display: { xs: "none", lg: "block" },
                        zIndex: -1,
                        transform: "scaleX(-1)"
                    }} />
                    <SvgArt1 size={400} sx={{
                        position: "absolute",
                        left: { xs: 0, lg: -125 },
                        bottom: -325,
                        display: { xs: "none", lg: "block" },
                        zIndex: -1,
                        transform: "scaleX(-1)"
                    }} />
                </Container>
            </Box>

            <Box sx={{ backgroundColor: "#F9F9F9" }}>
                {/* Vision & Missions */}
                <Container sx={{ py: 12, zIndex: 1, position: "relative" }}>
                    <Stack spacing={3} justifyContent="center">
                        <Typography variant="h1">Vision & Missions</Typography>
                        <Typography variant="body1" textAlign="center" width={{ xs: "100%", lg: "65%" }}>Become a company with the best and trusted Managed Care services for company employees in Bali, by providing holistic, simple and comprehensive services, and committed to providing secure and sustainable protection on the future health of the company.</Typography>
                    </Stack>
                    <Grid container pt={10} spacing={{ xs: 3, sm: 3 }} width="100%">
                        {missions.map((d, i) => (
                            <Grid item xs={12} sm={4} >
                                <CardMission data={d} sx={{ width: "100%" }} />
                            </Grid>
                        ))}
                    </Grid>
                </Container>

                {/* Discover benefits */}
                <Container sx={{ zIndex: 1, position: "relative" }}>
                    <Grid container alignItems="start" >
                        <Grid item xs={12} sm={6} pb={5}>
                            <Typography variant="h1" textAlign={{ xs: "center", sm: "start" }}>Discover the Benefits of Unicare Managed Care</Typography>
                        </Grid>
                        <Grid item container rowSpacing={{xs: 0, sm: 8}} justifyContent="center" px={{xs: 5, sm: 0}} >
                            <Grid item xs={12} sm={4} py={3}>
                                <Stack spacing={1} justifyContent="center" alignItems="center">
                                    <SvgProtect />
                                    <Typography variant="subtitle1">Comprehensive Benefit</Typography>
                                    <Typography variant="body2" textAlign="center">Managed care is a health care system that provides quality health services through efficient financing.</Typography>
                                </Stack>
                            </Grid>
                            <Grid item xs={12} sm={4} py={3}>
                                <Stack spacing={1} justifyContent="center" alignItems="center">
                                    <SvgMoneyBag />
                                    <Typography variant="subtitle1">Financial Incentives at Provider</Typography>
                                    <Typography variant="body2" textAlign="center">Managed care is a health care system that provides quality health services through efficient financing.</Typography>
                                </Stack>
                            </Grid>
                            <Grid item xs={12} sm={4} py={3}>
                                <Stack spacing={1} justifyContent="center" alignItems="center">
                                    <SvgWallet />
                                    <Typography variant="subtitle1">Convenient Form of Payment</Typography>
                                    <Typography variant="body2" textAlign="center">Managed care is a health care system that provides quality health services through efficient financing.</Typography>
                                </Stack>
                            </Grid>
                            <Grid item xs={12} sm={4} py={3}>
                                <Stack spacing={1} justifyContent="center" alignItems="center">
                                    <SvgVerified />
                                    <Typography variant="subtitle1">High Quality Services</Typography>
                                    <Typography variant="body2" textAlign="center">Managed care is a health care system that provides quality health services through efficient financing.</Typography>
                                </Stack>
                            </Grid>
                            <Grid item xs={12} sm={4} py={3}>
                                <Stack spacing={1} justifyContent="center" alignItems="center">
                                    <SvgCallCenter />
                                    <Typography variant="subtitle1">24 Hours Call Center</Typography>
                                    <Typography variant="body2" textAlign="center">Managed care is a health care system that provides quality health services through efficient financing.</Typography>
                                </Stack>
                            </Grid>
                        </Grid>
                    </Grid>
                </Container>
            </Box>
        </>
    );
}