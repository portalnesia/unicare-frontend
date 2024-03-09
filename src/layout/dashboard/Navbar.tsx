import { alpha } from '@mui/system/colorManipulator';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import { NAVBAR_HEIGHT, DRAWER_WIDTH } from '@/layout/navbar.config';
import Iconify from '@/components/Iconify';

const RootStyle = styled(AppBar)(({ theme }) => ({
    boxShadow: 'none',
    backdropFilter: 'blur(6px)',
    WebkitBackdropFilter: 'blur(6px)', // Fix on Mobile
    backgroundColor: alpha(theme.palette.background.default, 0.72),
    color: theme.palette.text.primary,
    '& svg': {
        color: theme.palette.text.primary,
    },
    [theme.breakpoints.up('lg')]: {
        width: `calc(100% - ${DRAWER_WIDTH + 1}px)`
    }
}));

const ToolbarStyle = styled(Toolbar)(({ theme }) => ({
    height: NAVBAR_HEIGHT,
    [theme.breakpoints.up('lg')]: {
        padding: theme.spacing(0, 5)
    }
}));

export interface DashboardNavbarProps {
    onOpenSidebar(): void
};

export default function DashboardNavbar({ onOpenSidebar }: DashboardNavbarProps) {
    return (
        <RootStyle sx={{ display: { lg: 'none' } }}>
            <ToolbarStyle>
                <IconButton
                    onClick={onOpenSidebar}
                    sx={{ mr: 1, color: 'text.primary', display: { lg: 'none' } }}
                >
                    <Iconify icon="eva:menu-2-fill" />
                </IconButton>

                <Box sx={{ flexGrow: 1 }} />

                <Stack direction="row" alignItems="center" spacing={{ xs: 0.5, sm: 1.5 }}>
                    {/* Dashboard Menu, Profile, Language, etc */}
                </Stack>
            </ToolbarStyle>
        </RootStyle>
    );
}
