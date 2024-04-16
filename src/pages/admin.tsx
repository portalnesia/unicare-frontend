import Button from "@/components/Button";
import Iconify from "@/components/Iconify";
import Img from "@/components/Img";
import Pages from "@/components/Pages";
import PasswordForm from "@/components/PasswordForm";
import LoginSwiper from "@/components/SwiperLogin";
import TextField from "@/components/TextField";
import { SvgArrowBack } from "@/components/svg/Icons";
import { SvgLogo } from "@/components/svg/Logo";
import useAPI, { ApiError } from "@/hooks/api";
import AuthLayout from "@/layout/AuthLayout";
import { IRoles, adminRolesArray, getAdminRoleName } from "@/model/auth";
import wrapper, { useDispatch } from "@/redux/store";
import { FONT_SECONDARY } from "@/themes/typography";
import Alert from "@mui/material/Alert/Alert";
import Box from "@mui/material/Box/Box";
import Card from "@mui/material/Card/Card";
import CardActionArea from "@mui/material/CardActionArea/CardActionArea";
import Container from "@mui/material/Container/Container";
import Stack from "@mui/material/Stack/Stack";
import Typography from "@mui/material/Typography/Typography";
import styled from "@mui/material/styles/styled";
import { setCookie } from "cookies-next";
import { useTranslation } from "next-i18next";
import Link from "next/link";
import Router from "next/router";
import React from "react";
import { adminLoginSwiper } from "root/data/content-data";

export const getServerSideProps = wrapper(async ({ getTranslation, locale }) => {
    return {
        props: {
            data: {},
            ...await getTranslation("main", locale),
        }
    }
});

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
    const [t] = useTranslation("main");
    const dispatch = useDispatch();
    const { post } = useAPI();

    const [signInType, setSignInType] = React.useState<IRoles | null>(null);
    const [startIndex, setStartIndex] = React.useState(0);

    const [err, setErr] = React.useState<string>();
    const [input, setInput] = React.useState({ username: "", password: "" });
    const [loading, setLoading] = React.useState(false);

    const onClickAdminType = React.useCallback((iRole: IRoles) => {
        setSignInType(iRole);
        setStartIndex(adminRolesArray.indexOf(iRole));
    }, [])

    const onBackClick = React.useCallback(() => {
        setSignInType(null);
    }, [])

    const login = React.useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            setLoading(true);
            let resp = ""
            switch (signInType) { // mock login admin token
                case IRoles.PROVIDER:
                    resp = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJybCI6IlBST1ZJREVSIiwiZXhwIjoxNzExNzM1MjAwLCJpZCI6MywiaWF0IjoxNzEwMTQzOTczfQ.fyN4Ekf6bZfcuX1OpZVW0T7mI63vp_4UER4o1uxvReo";
                    break;
                case IRoles.ADMIN:
                    resp = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJybCI6IkFETUlOIiwiZXhwIjoxNzExNzM1MjAwLCJpZCI6MiwiaWF0IjoxNzEwMTQzOTYyfQ.w4W_0_wCKZYn4GjzcxctlY74VzZiR0l8ThOMI7Da59c";
                    break;
                case IRoles.MASTER:
                    resp = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJybCI6Ik1BU1RFUiIsImV4cCI6MTcxMTczNTIwMCwiaWQiOjEsImlhdCI6MTcxMDE0Mzk0M30.pudHbkZPwZKburPW3Qek5Tgan0210ITEV9FBJ2G4Y7k";
                    break;
                default:
                    resp = "";
            }
            // const resp = await post<Auth>(`/customer/login`, input);
            const dateExpired = new Date(1721735200 * 1000);
            // const dateExpired = new Date(resp.expired_at * 1000);
            setCookie("_auth", resp, { expires: dateExpired, secure: process.env.NODE_ENV === "production" })
            setTimeout(() => {
                Router.replace("/administration");
            }, 200);
        } catch (e) {
            let msg = "Something went wrong";
            if (e instanceof ApiError) msg = e.message;
            setLoading(false);
            setErr(msg);
        }
    }, [input, dispatch, post, signInType])

    return (
        <Pages title="Administration" canonical="/admin" noIndex admin={false}>
            <RootStyle>
                <AuthLayout>
                </AuthLayout>

                <Container sx={{

                }}>
                    <ContentStyle>
                        <Link href="/" style={{ zIndex: 1 }}>
                            <SvgLogo sx={{ width: 125, position: "absolute", top: 0, left: 0, mt: 3 }} />
                        </Link>
                        {signInType && (
                            <Box sx={{
                                mt: 3,
                                width: "100%",
                                height: "125px",
                                position: "absolute",
                                top: 0,
                                right: 0,
                                display: "flex",
                                justifyContent: "end",
                            }}>

                                <Button
                                    variant="text"
                                    onClick={onBackClick}
                                    sx={{
                                        border: 0,
                                        "&:hover": {
                                            bgcolor: "#F9F9F9"
                                        }
                                    }}>
                                    <SvgArrowBack />
                                    Back
                                </Button>
                            </Box>
                        )}
                        <Box pr={8} gap={"80px"} alignItems="center" borderRadius={3}>
                            {!signInType ? (
                                <Stack
                                    spacing={3}
                                    sx={{
                                        mt: 12,
                                        height: "100%",
                                        alignItems: 'start',
                                    }}>
                                    <Typography pb={3} variant="h2" fontFamily={FONT_SECONDARY} color="primary.main" gutterBottom>
                                        Sign in as
                                    </Typography>
                                    {adminRolesArray.map((iRole, i) => {
                                        const renderAdminIcon = (role: IRoles) => {
                                            switch (role) {
                                                case IRoles.PROVIDER:
                                                    return <Img src="/assets/provider.svg" width={122} />;
                                                case IRoles.ADMIN:
                                                    return <Img src="/assets/admin.svg" width={122} />;
                                                case IRoles.MASTER:
                                                    return <Img src="/assets/master1.svg" width={122} />;
                                                default:
                                                    return null;
                                            }
                                        };
                                        return (
                                            <Card key={i} sx={{ width: "100%" }}>
                                                <CardActionArea
                                                    onClick={() => onClickAdminType(iRole)}
                                                    sx={{
                                                        display: "flex",
                                                        flexDirection: "row",
                                                        justifyContent: "start",
                                                        padding: 3
                                                    }}>
                                                    {renderAdminIcon(iRole)}
                                                    <Typography ml={3} variant="h3" fontFamily={FONT_SECONDARY} color="text.secondary" gutterBottom>
                                                        {getAdminRoleName(iRole)}
                                                    </Typography>
                                                </CardActionArea>
                                            </Card>
                                        );
                                    })}
                                </Stack>
                            ) : (
                                <form onSubmit={login}>
                                    <Stack sx={{ mt: 12, alignItems: 'start' }}>
                                        <Typography variant="h3" fontFamily={FONT_SECONDARY} color="primary.main" gutterBottom>
                                            Sign in as
                                        </Typography>

                                        <Typography variant="h1" >{getAdminRoleName(signInType)}</Typography>

                                        <Stack alignItems="start" spacing={3} mt={5} width="100%">
                                            <TextField
                                                value={input.username}
                                                placeholder="Username"
                                                onChange={e => { setErr(undefined); setInput({ ...input, username: e.target.value }) }}
                                                disabled={loading}
                                                autoComplete="username"
                                                startAdornment={<Iconify icon="jam:user" width={18} mr={1} color="#858585" />}
                                                required
                                                sx={{ mb: 1, width: "75%", borderRadius: "4px" }}
                                            />
                                            <PasswordForm
                                                value={input.password}
                                                placeholder="Password"
                                                onChange={e => { setErr(undefined); setInput({ ...input, password: e.target.value }) }}
                                                fullWidth
                                                required
                                                disabled={loading}
                                                startAdornment={<Iconify icon="jam:padlock-open" width={18} mr={1} color="#858585" />}
                                                autoComplete="password"
                                                sx={{ mb: 1, width: "75%", borderRadius: "4px" }}
                                            />
                                        </Stack>

                                        <Button type="submit" sx={{ mt: 3, px: 4 }} disabled={loading} loading={loading}>
                                            <Typography variant="subtitle2" >{t("sign_in")}</Typography>
                                        </Button>
                                        {typeof err === 'string' && (
                                            <Alert variant='outlined' sx={{ mt: 2, minWidth: { xs: '90%', md: 400, justifyContent: 'center' } }} severity='error'>{decodeURIComponent(err.replace(/\+/gim, ' '))}</Alert>
                                        )}
                                    </Stack>
                                </form>
                            )}
                        </Box>
                    </ContentStyle>
                </Container>

                <SectionStyle elevation={0} sx={{ display: { xs: 'none', md: 'flex' } }}>
                    <Stack alignItems="center" justifyContent="center" height="100%" sx={{
                        position: "relative",
                        backgroundColor: "transparent"
                    }}>
                        <Img src="/assets/wave_resize.png" sx={{
                            position: "absolute",
                            borderRadius: 2,
                            width: "100%",
                            height: "100%",
                        }} />
                        <Box sx={{
                            zIndex: 1,
                            width: "75%",
                            height: "100%"
                        }}>
                            <LoginSwiper
                                contents={adminLoginSwiper}
                                startIndex={startIndex}
                                autoPlay={!signInType}
                                onActiveIndexChange={(i) => setStartIndex(i)}
                            />
                        </Box>
                    </Stack>
                </SectionStyle>
            </RootStyle>
        </Pages>
    );
}