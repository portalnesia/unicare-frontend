import Button from "@/components/Button";
import Img from "@/components/Img";
import Pages from "@/components/Pages";
import Recaptcha from "@/components/Recaptcha";
import LoginSwiper from "@/components/SwiperLogin";
import TextField from "@/components/TextField";
import { SvgLogo } from "@/components/svg/Logo";
import useAPI, { ApiError } from "@/hooks/api";
import AuthLayout from "@/layout/AuthLayout";
import { Auth, IRoles } from "@/model/auth";
import wrapper, { useDispatch } from "@/redux/store";
import { FONT_SECONDARY } from "@/themes/typography";
import Alert from "@mui/material/Alert/Alert";
import Box from "@mui/material/Box/Box";
import Card from "@mui/material/Card/Card";
import Container from "@mui/material/Container/Container";
import Stack from "@mui/material/Stack/Stack";
import Typography from "@mui/material/Typography/Typography";
import styled from "@mui/material/styles/styled";
import { setCookie } from "cookies-next";
import Link from "next/link";
import Router from "next/router";
import React from "react";
import { userLoginSwiper } from "root/data/content-data";

export const getServerSideProps = wrapper(async ({}) => {
    return {
        props: {
            data: {},
        }
    }
});

// export const getStaticProps = wrapperStatic({ translation: "main" });

const RootStyle = styled('div')(({ theme }) => ({
    backgroundColor: "#F9F9F9",
    [theme.breakpoints.up('md')]: {
        display: 'flex'
    }
}));
const SectionStyle = styled(Card)(({ theme }) => ({
    width: '100%',
    maxWidth: "calc(100svw / 2.2)",
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
    margin: theme.spacing(0, 0, 0, 36),
    // padding: theme.spacing(3, 0, 2, 0),
    position: "relative"
}));

export default function LoginUserPage() {
    // const [t] = useTranslation("main");
    const dispatch = useDispatch();
    // const setNotif = useNotification();
    const [err, setErr] = React.useState<string>();
    const [input, setInput] = React.useState({ username: "", password: "" });
    const [loading, setLoading] = React.useState(false);
    const { post } = useAPI();
    const captchaRef = React.useRef<Recaptcha>(null)

    const login = React.useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            setLoading(true);
            const resp = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJybCI6IkNVU1RPTUVSIiwiZXhwIjoxNzExNzM1MjAwLCJpZCI6MTIzLCJpYXQiOjE3MTAwMjI5Mzd9.Nspn8rs4C44It9JyFotmCe_gDhN0_ijM3ERNEZw6Ouc";
            // const resp = await post<Auth>(`/customer/login`, input);
            // const resp: Auth = {
            //     roles: IRoles.CUSTOMER,
            //     expired_at: 1711735200,
            //     id: 123
            // } // mock login
            const dateExpired = new Date(1711735200 * 1000);
            // const dateExpired = new Date(resp.expired_at * 1000);
            setCookie("_auth", resp, { expires: dateExpired, secure: process.env.NODE_ENV === "production" })
            setTimeout(() => {
                Router.replace("/managed-care");
            }, 200);
        } catch (e) {
            let msg = "Something went wrong";
            if (e instanceof ApiError) msg = e.message;
            setLoading(false);
            setErr(msg);
            // setNotif(msg, true)
        }
    }, [input, dispatch, post])

    return (
        <Pages title="Login" canonical="/login" noIndex admin={false}>
            <RootStyle>
                <AuthLayout>
                </AuthLayout>

                <Container sx={{

                }}>
                    <ContentStyle>
                        <Link href="/">
                            <SvgLogo sx={{ width: 125, position: "absolute", top: 0, left: 0, mt: 3 }} />
                        </Link>
                        <Box padding={"0px 0px"} gap={"80px"} alignItems="center" borderRadius={3}>
                            <form onSubmit={login}>
                                <Stack sx={{ mt: 12, alignItems: 'start' }}>
                                    <Typography variant="h2" fontFamily={FONT_SECONDARY} color="primary.main" gutterBottom>
                                        {/* {t("sign_in")} */}
                                    </Typography>

                                    <Typography variant="h1" paddingRight={12}>Securely Access Your Coverage</Typography>

                                    <Stack alignItems="start" spacing={3} mt={5} width="100%">
                                        <TextField
                                            value={input.username}
                                            placeholder="Nomor Induk Kependudukan"
                                            onChange={e => { setErr(undefined); setInput({ ...input, username: e.target.value }) }}
                                            disabled={loading}
                                            sx={{ mb: 1, width: "50%" }}
                                            required
                                            helperText="Input your registered 16 digit personal identity number"
                                        // bgcolor="white"
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
                                        <Typography variant="subtitle2" >sign_in</Typography>
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
                            height: "100%",
                            // zIndex: -1
                        }} />
                        <Box sx={{
                            zIndex: 1,
                            width: "75%",
                            height: "100%"
                        }}>
                            <LoginSwiper contents={userLoginSwiper} />
                        </Box>
                    </Stack>
                </SectionStyle>
            </RootStyle>
        </Pages>
    );
}