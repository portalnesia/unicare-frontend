import { DRAWER_WIDTH, NAVBAR_HEIGHT } from '@/layout/navbar.config';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { SxProps, Theme, styled } from '@mui/material/styles';
import React from 'react';
import DashboardNavbar from './Navbar';
import DashboardSidebar from './Sidebar';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { getDayJs } from '@/utils/main';
import Avatar from '@mui/material/Avatar';
import ButtonBase from '@mui/material/ButtonBase';
import {useSelector} from "@/redux/store";
// import { getCookieMsg, removeCookieMsg } from '@utils/cookie';

export type DashboardLayoutProps = {
    children: React.ReactNode
    withoutContainer?: boolean
    sx?: SxProps<Theme>
    title: string
    showDate?: boolean
}

const RootStyle = styled('div')({
    display: 'flex',
    minHeight: '100%'
});

function Header({ showDate, title }: { title: string, showDate?: boolean }) {
    const auth = useSelector(s=>s.auth)
    return (
        <Stack direction="row" justifyContent="space-between" spacing={1} width="100%" alignItems="start">
            <Box>
                <Typography variant="h1" sx={{ color: "primary.main" }}>{title}</Typography>
                {showDate && (
                    <Typography sx={{ color: "#969696" }}>{getDayJs().format("ddd, DD MMM YYYY")}</Typography>
                )}
            </Box>

            {/* <ButtonBase sx={{ py: 1, px: 1.5, borderRadius: 3 }}> */}
            <Stack direction="row" justifyContent="space-between" spacing={1}>
                <Avatar />
                <Box>
                    {/* <Typography sx={{ fontWeight: "bold" }}>{auth?.role||""}</Typography> */}
                    {/* <Typography sx={{ color: "#969696" }}>{auth?.username||""}</Typography> */}
                    <Typography sx={{ fontWeight: "bold" }}>{auth?.roles||""}</Typography>
                    <Typography sx={{ color: "#969696" }}>{auth?.id||""}</Typography>
                </Box>
            </Stack>
            {/* </ButtonBase> */}
        </Stack>
    )
}

export default function DashboardLayout({ sx, children, withoutContainer, title, showDate }: DashboardLayoutProps) {
    const [open, setOpen] = React.useState(false);

    return (
        <RootStyle>
            <DashboardNavbar onOpenSidebar={() => setOpen(true)} />
            <DashboardSidebar isOpenSidebar={open} onCloseSidebar={() => setOpen(false)} />

            <Container maxWidth={false} sx={{ pt: { xs: `${NAVBAR_HEIGHT + 24}px`, lg: "24px" }, ...(withoutContainer ? { px: '0 !important' } : { pb: 10, mb: 8 }), position: 'relative', width: { xs: '100%', lg: `calc(100% - ${DRAWER_WIDTH}px)` }, ...sx }}>
                <Header title={title} showDate={showDate} />

                <Box mt={5}>
                    {children}
                </Box>
            </Container>
        </RootStyle>
    )
}
