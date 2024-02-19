import Pages from "@/components/Pages";
import { SvgLogo } from "@/components/svg/Logo";
import HomepageLayout from "@/layout/homepage";
import Navbar from "@/layout/homepage/Navbar";
import { wrapperStatic } from "@/redux/store";
import { Typography } from "@mui/material";
import Container from "@mui/material/Container/Container";
import { useTranslation } from "next-i18next";
import { useEffect } from "react";

export const getStaticProps = wrapperStatic({ translation: "main" })

export default function HomePage() {
    const [t] = useTranslation("main");
    useEffect(() => {
        window.scrollTo({ top: 1, left: 0, behavior: "smooth" })
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" })
    }, [])
    return (
        <Pages>
            <HomepageLayout>
                <Container id="home" className="section-northbit-home" sx={{ pt: 19, px: 2, zIndex: 1 }}>
                    <Typography sx={{backgroundColor: "red", height: "500px"}}>home section</Typography>
                </Container>
                <Container id="about-us" className="section-northbit-home" sx={{ pt: 50, px: 2, zIndex: 1 }}>
                    <h1>about us section</h1>
                </Container>
                <Container id="our-services" className="section-northbit-home" sx={{ pt: 50, px: 2, zIndex: 1 }}>
                    <h1>our-services</h1>
                </Container>
                <Container id="contact-us" className="section-northbit-home" sx={{ py: 50, px: 2, zIndex: 1 }}>
                    <h1>contact-us</h1>
                </Container>
                <Container sx={{ my: 50, px: 2, zIndex: 1 }}>
                    <h1>Footer</h1>
                </Container>
            </HomepageLayout>
        </Pages>
    )
}