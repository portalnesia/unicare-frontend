import Pages from "@/components/Pages";
import { SvgLogo } from "@/components/svg/Logo";
import HomepageLayout from "@/layout/homepage";
import Navbar from "@/layout/homepage/Navbar";
import { wrapperStatic } from "@/redux/store";
import SectionAboutUs from "@/sections/AboutUs";
import SectionHome from "@/sections/Home";
import SectionPartners from "@/sections/Partners";
import Box from "@mui/material/Box/Box";
import Container from "@mui/material/Container/Container";
import Stack from "@mui/material/Stack/Stack";
import Typography from "@mui/material/Typography/Typography";
import { useTranslation } from "next-i18next";
import { useEffect } from "react";

export const getStaticProps = wrapperStatic({ translation: "main" })

export default function HomePage() {
    const [t] = useTranslation("main");
    useEffect(() => {
        // window.scrollTo({ top: 1, left: 0, behavior: "smooth" })
        // window.scrollTo({ top: 0, left: 0, behavior: "smooth" })
    }, [])
    return (
        <Pages>
            <HomepageLayout>
                <Container id="home" className="section-northbit-home" sx={{ pt: 19, pb: 8, zIndex: 1 }}>
                    {/* <Typography sx={{backgroundColor: "red", height: "500px"}}>home section</Typography> */}
                    <SectionHome />
                </Container>

                <Box sx={{ backgroundColor: "#F3F3F3" }}>
                    <Container sx={{ position: "relative", py: 6, px: 2, zIndex: 1 }}>
                        <SectionPartners />
                    </Container>
                </Box>

                <Box id="about-us" className="section-northbit-home" sx={{ backgroundColor: "#F9F9F9" }}>
                    <Container sx={{ position: "relative", py: 12, px: 2, zIndex: 1 }}>
                        <SectionAboutUs />
                    </Container>
                </Box>

                <Container id="our-services" className="section-northbit-home" sx={{ pt: 50, zIndex: 1 }}>
                    <h1>our-services</h1>
                </Container>

                <Container id="contact-us" className="section-northbit-home" sx={{ py: 50, zIndex: 1 }}>
                    <h1>contact-us</h1>
                </Container>

                <Container sx={{ my: 50, px: 2, zIndex: 1 }}>
                    <h1>Footer</h1>
                </Container>
            </HomepageLayout>
        </Pages>
    )
}