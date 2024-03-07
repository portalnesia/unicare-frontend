import Button from "@/components/Button";
import Img from "@/components/Img";
import Pages from "@/components/Pages";
import Recaptcha from "@/components/Recaptcha";
import TextField from "@/components/TextField";
import { SvgArtLogin } from "@/components/svg/Art";
import { SvgLogo } from "@/components/svg/Logo";
import useAPI from "@/hooks/api";
import AuthLayout from "@/layout/AuthLayout";
import wrapper, { useDispatch, wrapperStatic } from "@/redux/store";
import { FONT_SECONDARY } from "@/themes/typography";
import Alert from "@mui/material/Alert/Alert";
import Box from "@mui/material/Box/Box";
import Card from "@mui/material/Card/Card";
import Container from "@mui/material/Container/Container";
import Stack from "@mui/material/Stack/Stack";
import Typography from "@mui/material/Typography/Typography";
import styled from "@mui/material/styles/styled";
import { useTranslation } from "next-i18next";
import Link from "next/link";
import React from "react";

// export const getServerSideProps = wrapper(async ({}) => {
//     return {
//         props: {
//             data: {},
//         }
//     }
// })

export const getStaticProps = wrapperStatic({ translation: "main" })

const RootStyle = styled('div')(({ theme }) => ({
    backgroundColor: "#FFF",
    [theme.breakpoints.up('md')]: {
        display: 'flex'
    }
}));
const SectionStyle = styled(Card)(({ theme }) => ({
    width: '100%',
    maxWidth: "calc(100svw / 2)",
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    margin: theme.spacing(3, 3, 3, 3),
    backgroundColor: "#FFF",
    // position: "relative"
}));
const ContentStyle = styled('div')(({ theme }) => ({
    // maxWidth: 480,
    // margin: 'auto',
    display: 'flex',
    minHeight: '100vh',
    // height: "100vh",
    flexDirection: 'column',
    justifyContent: 'center',
    // backgroundColor: "red",
    // margin: theme.spacing(3, 0, 3, 20),
    margin: theme.spacing(0, 0, 0, 32),
    // padding: theme.spacing(3, 0, 2, 0),
    position: "relative"
}));

export default function LoginUserPage() {
    const [t] = useTranslation("main");
    const [err, setErr] = React.useState<string>();
    const [input, setInput] = React.useState({ username: "", password: "" });
    const [loading, setLoading] = React.useState(false);
    const { post } = useAPI();
    const captchaRef = React.useRef<Recaptcha>(null)

    return (
        <Pages title="Login" canonical="/login" noIndex admin={false}>
            <RootStyle>
                <AuthLayout>
                </AuthLayout>

                <Container sx={{

                }}>
                    <ContentStyle>
                        <Link href="/">
                            <SvgLogo sx={{ width: 100, height: 100, position: "absolute", top: 0, left: 0, mt: 3 }} />
                        </Link>
                        <Box padding={"80px 0px"} gap={"80px"} alignItems="center" borderRadius={3}>
                            <form onSubmit={() => { }}>
                                <Stack sx={{ mb: 5, alignItems: 'start' }}>
                                    <Typography variant="h2" fontFamily={FONT_SECONDARY} color="primary.main" gutterBottom>
                                        {t("sign_in")}
                                    </Typography>

                                    <Typography variant="h1" paddingRight={20}>Securely Access Your Coverage</Typography>

                                    <Stack alignItems="start" spacing={3} mt={5} width="100%">
                                        <TextField
                                            value={input.username}
                                            placeholder="Nomor Induk Kependudukan"
                                            onChange={e => { setErr(undefined); setInput({ ...input, username: e.target.value }) }}
                                            disabled={loading}
                                            sx={{ mb: 1, width: "50%" }}
                                            required
                                            helperText="Input your registered 16 digit personal identity number"
                                            bgcolor="white"
                                        />
                                        <Recaptcha ref={captchaRef} />

                                        {/* <PasswordForm
                                            value={input.password}
                                            placeholder="Password"
                                            onChange={e => { setErr(undefined); setInput({ ...input, password: e.target.value }) }}
                                            fullWidth
                                            required
                                            disabled={loading}
                                            autoComplete="password"
                                            bgcolor="white"
                                        /> */}

                                        {/* <Link href="/reset-password" legacyBehavior passHref><A className="underline" sx={{ color: "info.main", ...loading ? { pointerEvents: "none", color: "grey" } : {} }}>Reset password</A></Link> */}
                                    </Stack>

                                    <Button type="submit" sx={{ mt: 3, px: 4 }} disabled={loading} loading={loading}>
                                        <Typography variant="subtitle2" >{t("sign_in")}</Typography>
                                    </Button>
                                    {typeof err === 'string' && (
                                        <Alert variant='outlined' sx={{ mt: 2, minWidth: { xs: '90%', md: 400, justifyContent: 'center' } }} severity='error'>{decodeURIComponent(err.replace(/\+/gim, ' '))}</Alert>
                                    )}
                                </Stack>
                            </form>

                        </Box>
                    </ContentStyle>
                </Container>

                <SectionStyle elevation={0} sx={{ display: { xs: 'none', md: 'flex' } }}>
                    <Stack alignItems="center" justifyContent="center" height="100%" sx={{
                        position: "relative",
                        backgroundColor: "transparent"
                    }}>
                        {/* <SvgArtLogin /> */}
                        <Img src="assets/wave_resize.png" sx={{
                            position: "absolute",
                            borderRadius: 2,
                            width: "100%",
                            maxHeight: "100%",
                            // zIndex: -1
                        }} />
                        <Box sx={{
                            zIndex: 1
                        }}>
                            <Typography variant="h3" sx={{ px: 5, mt: 10, mb: 5 }}>Hi, Welcome Back</Typography>
                        </Box>
                    </Stack>
                </SectionStyle>
            </RootStyle>
        </Pages>
    );
}