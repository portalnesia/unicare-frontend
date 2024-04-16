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
import { useSelector } from "@/redux/store";
import IconButton from '@mui/material/IconButton/IconButton';
import Iconify from '@/components/Iconify';
import { ICustomer } from '@/model/user';
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
    flexDirection: "column",
    minHeight: '100%'
});

function Header({ showDate, title }: { title: string, showDate?: boolean }) {
    const user = useSelector(s => s.user as ICustomer | null );
    const user1 = useSelector((s) => {
        console.log(s)
    });
    return (
        <Stack direction="row" justifyContent="space-between" spacing={1} width="100%" alignItems="center" sx={{
            // backgroundColor: "primary.main"
        }}>

            {/* <ButtonBase sx={{ py: 1, px: 1.5, borderRadius: 3 }}> */}
            <Stack direction="row" justifyContent="space-between" spacing={2}>
                <Avatar sx={{
                    width: 48,
                    height: 48
                }} />
                <Box>
                    {/* <Typography sx={{ fontWeight: "bold" }}>{auth?.role||""}</Typography> */}
                    {/* <Typography sx={{ color: "#969696" }}>{auth?.username||""}</Typography> */}
                    <Typography variant='h4' color="white">{user?.name ? `Hi, ${user.name}` : ""}</Typography>
                    <Typography variant="body2" color="white">{user?.roles || ""}</Typography>
                </Box>
            </Stack>
            {/* </ButtonBase> */}

            <Box>
                <IconButton>
                    <Iconify icon="jam:bell" width={32} height={32} color="white" />
                </IconButton>

                {showDate && (
                    <Typography sx={{ color: "#969696" }}>{getDayJs().format("ddd, DD MMM YYYY")}</Typography>
                )}
            </Box>

        </Stack>
    )
}

export default function DashboardLayout({ sx, children, withoutContainer, title, showDate }: DashboardLayoutProps) {
    const [open, setOpen] = React.useState(false);

    return (
        <RootStyle>
            <DashboardNavbar onOpenSidebar={() => setOpen(true)} />
            <DashboardSidebar isOpenSidebar={open} onCloseSidebar={() => setOpen(false)} />

            <Box sx={{
                bgcolor: "primary.main",
                pt: { xs: `${NAVBAR_HEIGHT + 24}px`, lg: "24px" },
                pb: 4,
                px: { xs: 2, lg: 3 },
                ml: { xs: 0, lg: `${DRAWER_WIDTH}px` },
            }}>
                <Header title={title} showDate={showDate} />
            </Box>

            <Container maxWidth={false} sx={{
                pt: { xs: `${NAVBAR_HEIGHT + 24}px`, lg: "24px" },
                ...(withoutContainer ? { px: '0 !important' } : { pb: 10, mb: 8 }),
                position: 'relative',
                width: { xs: '100%', lg: `calc(100% - ${DRAWER_WIDTH}px)` },
                ml: { xs: 0, lg: `${DRAWER_WIDTH}px` },
                ...sx
            }}>

                <Box mt={5}>
                    {children}
                </Box>
            </Container>
        </RootStyle>
    )
}
