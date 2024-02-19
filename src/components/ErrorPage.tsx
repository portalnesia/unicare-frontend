import Box from "@mui/material/Box";
import React from "react";
import Pages, { PageProps } from "./Pages";
import { CopyPartial } from "@/types/general";
import Stack from "@mui/material/Stack";
import Iconify from "./Iconify";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

export interface ErrorPage extends CopyPartial<PageProps, 'children'> {
    code?: 404 | 500
    name?: string
    msg?: string
}

export default function ErrorPage({ code = 500, name = "Unexpected error", msg = "We are working on fixing the problem.\nBe back soon.", ...pages }: ErrorPage) {
    return (
        <Pages admin={false} {...pages}>
            {/* <LogoBackground position="absolute" right={0} height="100vh" maxWidth="100%" viewBox="0 0 607 1672" /> */}
            <Stack minHeight={"100svh"} justifyContent="center" bgcolor="primary.main">
                <Container sx={{ height: '100%' }}>
                    <Stack justifyContent="center" height="100%">
                        {code === 404 ? (
                            <Iconify icon="bi:exclamation-circle" sx={{ color: "white", width: { xs: 100, sm: 110, md: 130, lg: 150 }, height: { xs: 100, sm: 110, md: 130, lg: 150 } }} />
                        ) : (
                            <Box position="relative">
                                {/* <Zzzz size={{ xs: 50, sm: 70, md: 80, lg: 90 }} sx={{ color:"white",position: "absolute", right: { xs: -40, sm: -60, md: -80, lg: -80 }, top: { xs: 0, sm: -7, md: -10, lg: -10 } }} /> */}
                                <Iconify icon="mdi:robot-dead-outline" sx={{ color: "white", width: { xs: 100, sm: 110, md: 130, lg: 150 }, height: { xs: 100, sm: 110, md: 130, lg: 150 } }} />
                            </Box>
                        )}

                        <Stack mt={4} direction="row" textAlign="left" spacing={{ xs: 1, sm: 4 }}>
                            <Box>
                                <Typography variant="h1" sx={{ color: "white", fontSize: { xs: 40, sm: 50, md: 70, lg: 100 } }}>{code}</Typography>
                            </Box>
                            <Box>
                                <Typography variant="body2" sx={{ color: "white", fontSize: { xs: 20, sm: 32, md: 40, lg: 48 }, mb: 3 }}>{name}</Typography>
                                {msg.split("\n").map((d, i) => (
                                    <Typography key={`${d}-${i}`} variant="body2" sx={{ color: "white", fontSize: { xs: 10.35, sm: 16, md: 20, lg: 24 }, lineHeight: 1.2 }}>{d}</Typography>
                                ))}
                            </Box>
                        </Stack>
                    </Stack>
                </Container>
            </Stack>
        </Pages>
    )
}
