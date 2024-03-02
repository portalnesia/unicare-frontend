import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Navbar from "./Navbar";
import { useMemo } from "react";
import { maxWidth } from "@/config";

export type HomePageLayoutProps = {
    children: React.ReactNode
    rich?: boolean
    navbar?: boolean
    slider?: boolean
}

export default function HomepageLayout({ children, rich = true, navbar = true, slider }: HomePageLayoutProps) {

    const height = useMemo(() => {
        return slider ? { xs: 350, sm: 500, md: 665 } : { xs: 300, md: 450 };
    }, [slider])

    const pt = useMemo(() => {
        return slider ? { xs: 15, sm: 18, md: 27 } : navbar ? { xs: 13, md: 19 } : 5;
    }, [slider, navbar])

    return (
        <Box position="relative" >
            {rich ? (
                <Container maxWidth={maxWidth} sx={{ position: "relative" }}>
                    {/* <Redbox id="homepage-box" homepage={slider} sx={{
                        position: "absolute",
                        width: "100%",
                        height,
                        left: 0,
                        top: 0,
                    }} /> */}
                </Container>
            ) : null}
            {navbar ? (
                <Navbar />
            ) : null}
            <Box mt={0} {...!navbar ? { mb: 7 } : {}}>{children}</Box>
        </Box>
    )
}