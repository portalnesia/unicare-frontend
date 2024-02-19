import Pages from "@/components/Pages";
import HomepageLayout from "@/layout/homepage";
import { wrapperStatic } from "@/redux/store";
import Container from "@mui/material/Container/Container";
import { useTranslation } from "next-i18next";

export const getStaticProps = wrapperStatic({ translation: "main" })

export default function HomePage() {
    const [t] = useTranslation("main");
    return (
        <Pages>
            <HomepageLayout>
                <Container id="home" className="section-northbit-home" sx={{ mt: 50, px: 2, zIndex: 1 }}>
                    <h1>home section</h1>
                </Container>
                <Container id="about-us" className="section-northbit-home" sx={{ mt: 50, px: 2, zIndex: 1 }}>
                    <h1>about us section</h1>
                </Container>
                <Container id="our-services" className="section-northbit-home" sx={{ mt: 50, px: 2, zIndex: 1 }}>
                    <h1>our-services</h1>
                </Container>
                <Container id="contact-us" className="section-northbit-home" sx={{ my: 50, px: 2, zIndex: 1 }}>
                    <h1>contact-us</h1>
                </Container>
            </HomepageLayout>
        </Pages>
    )
}