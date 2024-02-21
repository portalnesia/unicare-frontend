import CardPackageHome from "@/components/CardPackageHome";
import Img from "@/components/Img";
import Pages from "@/components/Pages";
import { maxWidth } from "@/config";
import HomepageLayout from "@/layout/homepage";
import { wrapperStatic } from "@/redux/store";
import SectionAboutUs from "@/sections/AboutUs";
import SectionHome from "@/sections/Home";
import SectionOurServices from "@/sections/OurServices";
import Box from "@mui/material/Box/Box";
import Container from "@mui/material/Container/Container";
import Typography from "@mui/material/Typography/Typography";
import { useTranslation } from "next-i18next";
import { useEffect } from "react";
import Marquee from "react-fast-marquee";
import partners from "root/data/partners.json"

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
                    <SectionHome />
                </Container>

                <Box sx={{ backgroundColor: "#F3F3F3", display: "flex", flexDirection: { xs: "column", sm: "row" } }}>
                    <Container sx={{
                        py: 6,
                        position: "relative",
                        zIndex: 1,
                        width: "45%",
                        display: "flex",
                        justifyContent: { xs: "center", sm: "end" },
                        alignItems: "flex-end"
                    }}>
                        <Typography variant="subtitle1" fontWeight={400} sx={{ flex: "none" }}>{t("proud_to_partner_with")}</Typography>
                    </Container>
                    <Marquee autoFill gradient gradientColor="#F3F3F3" gradientWidth={100} style={{

                    }}>
                        {partners.map((d, i) => (
                            <Img lazy={false} key={i} src={d.src} sx={{ px: 4 }} />
                        ))}
                    </Marquee>
                </Box>

                <Box sx={{ backgroundColor: "#F9F9F9" }}>
                    <Container id="about-us" className="section-northbit-home" maxWidth={maxWidth} sx={{ py: 12, px: 2, zIndex: 1 }}>
                        <SectionAboutUs />
                    </Container>
                    <Container id="our-services" className="section-northbit-home" maxWidth={maxWidth} sx={{ py: 12, px: 2, zIndex: 1 }}>
                        <SectionOurServices />
                    </Container>
                </Box>

                <Container id="contact-us" className="section-northbit-home" sx={{ py: 50, zIndex: 1 }}>
                    <h1>contact-us</h1>
                    {/* <CardPackageHome /> */}
                </Container>

                <Container sx={{ my: 50, px: 2, zIndex: 1 }}>
                    <h1>Footer</h1>
                </Container>
            </HomepageLayout>
        </Pages>
    )
}