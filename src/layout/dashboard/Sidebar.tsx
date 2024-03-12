import { alpha } from '@mui/system/colorManipulator';
import { styled } from '@mui/material/styles';
import { useEffect, useMemo } from 'react';
import { useRouter } from 'next/router'
import Link from 'next/link';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Typography from '@mui/material/Typography';
import { getManagedCareNavbar, getCMSNavbarSecondary, DRAWER_WIDTH, NAVBAR_HEIGHT, getAdminNavbar } from '@/layout/navbar.config';
import useResponsive from '@/hooks/responsive';
import Scrollbar from '@/components/Scrollbar';
// import Logo from '@comp/Logo';
import NavSection from './NavSection';
import Stack from '@mui/material/Stack';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import { isIOS } from 'react-device-detect';
import { useSelector } from '@/redux/store';
import Img from '@/components/Img';
import { IRoles, adminRolesArray } from '@/model/auth';
import { useTranslation } from 'next-i18next';

const RootStyle = styled('div')(({ theme }) => ({
    [theme.breakpoints.up('lg')]: {
        flexShrink: 0,
        width: DRAWER_WIDTH
    }
}));

export interface DashboardSidebarProps {
    isOpenSidebar: boolean,
    onCloseSidebar(): void,
    title?: string,
    // subtitle?: string
};

export default function DashboardSidebar({ isOpenSidebar, onCloseSidebar, title }: DashboardSidebarProps) {
    const router = useRouter();
    const asPath = useMemo(() => router.asPath, [router.asPath]);
    const isDesktop = useResponsive('up', 'lg');
    const auth = useSelector(s => s.auth);
    const [t] = useTranslation("main")

    const indexPath = useMemo(() => {
        return "/dashboard"
    }, [])

    const [navConfig, navSecondary] = useMemo(() => {
        let nav;
        if (adminRolesArray.includes(auth?.roles ? auth.roles : IRoles.CUSTOMER)) {
            nav = getAdminNavbar(auth);
        } else {
            nav = getManagedCareNavbar(t, auth);
        }
        const secondary = getCMSNavbarSecondary();
        return [nav, secondary]
    }, [auth, t])

    useEffect(() => {
        if (isOpenSidebar) {
            onCloseSidebar();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [asPath]);

    const renderContent = useMemo(() => (
        <Scrollbar
            sx={{
                height: 1, display: 'flex', flexDirection: 'column', pt: 3,
                '& .os-viewport, & div[data-overlayscrollbars-viewport]': { height: 1, display: 'flex', flexDirection: 'column' }
            }}
            options={{
                overflow: {
                    x: 'hidden'
                }
            }}
        >
            <Stack zIndex={1} position="absolute" px={2.5} py={1.5} width={DRAWER_WIDTH - 0.5} height={NAVBAR_HEIGHT} direction='row' alignItems='center' justifyContent="center" spacing={1} sx={{
                boxShadow: 'none',
                backdropFilter: 'blur(6px)',
                WebkitBackdropFilter: 'blur(6px)', // Fix on Mobile
                backgroundColor: t => alpha(isDesktop ? t.palette.background.default : t.palette.background.paper, 0.72),
            }}>
                {/* <Link href="/"><Typography variant="h4" sx={{ color: t => t.palette.primary.main, letterSpacing: 5, textTransform: 'uppercase', fontWeight: 'bold' }}>Unicare</Typography></Link> */}
                <Link href="/"><Img src="/logo.svg" width={100} /></Link>
            </Stack>

            <Box sx={{ mt: 10, mx: 2.5 }} />

            <NavSection mt={8} indexPath={indexPath} navConfig={navConfig} />

            <Box sx={{ flexGrow: 1 }} />

            <Box sx={{ pb: 3, mt: 5 }}>
                <NavSection mt={2} indexPath={indexPath} navConfig={navSecondary} defaultButton />
            </Box>
        </Scrollbar>
    ), [indexPath, navConfig, isDesktop, navSecondary]);

    return (
        <RootStyle>
            {!isDesktop ? (
                <SwipeableDrawer
                    open={isOpenSidebar}
                    onClose={onCloseSidebar}
                    onOpen={() => { }}
                    disableSwipeToOpen
                    PaperProps={{
                        sx: { width: DRAWER_WIDTH, bgcolor: 'background.default', },
                    }}
                    disableBackdropTransition={!isIOS}
                    disableDiscovery
                >
                    {renderContent}
                </SwipeableDrawer>
            ) : (
                <Drawer
                    open
                    variant="persistent"
                    PaperProps={{
                        sx: {
                            width: DRAWER_WIDTH,
                            bgcolor: 'background.default',
                            borderRightStyle: 'dashed'
                        }
                    }}
                >
                    {renderContent}
                </Drawer>
            )}
        </RootStyle>
    );
}
