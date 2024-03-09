import React, { useState, useCallback, useMemo, MouseEvent, ComponentProps } from 'react';
import Router, { useRouter } from 'next/router'
import Link from 'next/link'
import { useTheme, styled, SxProps, Theme } from '@mui/material/styles';
import { alpha } from '@mui/system/colorManipulator';
import Iconify from '@/components/Iconify';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import List from '@mui/material/List';
import Box, { BoxProps } from '@mui/material/Box';
import { INavbar, INavbarChild } from '../navbar.config';
import { webUrl } from '@/utils/main';
import Storage from '@/utils/local-storage';
import Backdrop from '@/components/Modal';
import ButtonBase from '@mui/material/ButtonBase';
import { Without } from '@/types/general';
import Stack from '@mui/material/Stack';
import Portal from '@mui/material/Portal';
import IconButton from '@mui/material/IconButton';

// ----------------------------------------------------------------------

export const ButtonStyle = styled(ButtonBase)<{ target?: string, href?: string, component?: string, active?: boolean }>(
    ({ theme, active }) => ({
        ...theme.typography.body2,
        width: '100%',
        justifyContent: "start",
        borderRadius: 12,
        height: 48,
        position: 'relative',
        textTransform: 'capitalize',
        paddingLeft: theme.spacing(2.5),
        paddingRight: theme.spacing(2.5),
        ...active ? {
            color: '#fff',
            fontWeight: 'bold',
            backgroundColor: theme.palette.primary.main,
            "& svg": {
                color: '#fff',
            }
        } : {
            color: theme.palette.primary.main,
            "& svg": {
                color: theme.palette.primary.main,
            }
        },
        "&:hover": {
            color: theme.palette.primary.main,
            "& svg": {
                color: theme.palette.primary.main,
            },
            backgroundColor: alpha(theme.palette.primary.light, 0.2)
        }
    })
);

export const ButtonStyleChild = styled(ButtonBase)<{ target?: string, href?: string, component?: string, active?: boolean }>(
    ({ theme, active }) => ({
        ...theme.typography.body2,
        justifyContent: "start",
        width: 'calc(100% - 40px)',
        borderRadius: 12,
        position: 'relative',
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),
        paddingTop: theme.spacing(0.6),
        paddingBottom: theme.spacing(0.6),
        ...active ? {
            color: theme.palette.primary.main,
            fontWeight: 'bold',
            "& svg": {
                color: theme.palette.primary.main,
            }
        } : {
            color: theme.palette.primary.light,
            "& svg": {
                color: theme.palette.primary.light,
            }
        },
        "&:hover": {
            backgroundColor: alpha(theme.palette.primary.light, 0.2)
        }
    })
);

export const ListItemIconStyle = styled(ListItemIcon)({
    width: 22,
    height: 22,
    display: 'flex',
    marginRight: 16,
    alignItems: 'center',
    justifyContent: 'start',
    minWidth: 'unset'
});

// ----------------------------------------------------------------------

export interface NavItemProps {
    item: INavbar,
    active(path: INavbar): boolean
    linkProps?: Partial<ComponentProps<typeof Link>>
    rootSx?: SxProps<Theme>
    onClick?: (path: INavbar | INavbarChild) => (e: MouseEvent<HTMLButtonElement>) => void
};

export function NavItem({ item, active, linkProps, onClick, rootSx }: NavItemProps) {
    const theme = useTheme();
    const isActiveRoot = active(item);
    const { name, link, icon, child, desc, blank, fn, shallow } = item;
    const [open, setOpen] = useState(true);
    const [loading, setLoading] = useState(false);

    const handleOpen = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        e.stopPropagation();

        setOpen((prev) => !prev);
    }, [setOpen]);

    const logout = useCallback((e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setLoading(true);
        Storage.remove('auth');
        setTimeout(() => {
            Router.push("/logout");
        }, 500);
    }, []);

    const profitLoss = useCallback((e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

    }, []);

    return (
        <>
            <Box width="calc(100% - 32px)" ml="auto !important" mr="auto !important">
                <Link href={link} passHref legacyBehavior shallow={shallow} {...linkProps}>
                    <ButtonStyle
                        onClick={fn === "logout" ? logout : onClick?.(item)}
                        component='a'
                        // disableGutters
                        className='no-underline no-blank'
                        active={isActiveRoot}
                        sx={{
                            ...rootSx
                        }}
                        {...(blank ? { target: "_blank" } : {})}
                    >
                        {icon && <ListItemIconStyle><Iconify icon={icon} /></ListItemIconStyle>}
                        <ListItemText disableTypography primary={name} />
                        {desc && desc}
                        {/* {child && (
                            <IconButton onClick={handleOpen} sx={{ zIndex: 1, ml: 1 }}>
                                <Iconify
                                    icon={open ? 'eva:arrow-ios-downward-fill' : 'eva:arrow-ios-forward-fill'}
                                    sx={{ width: 16, height: 16 }}
                                />
                            </IconButton>
                        )} */}
                    </ButtonStyle>
                </Link>
                {child && (
                    <Collapse in={open} timeout="auto">
                        <Stack spacing={0.5} mt={0.5} alignItems="start" width="calc(100% - 40px)" ml={5}>
                            {child.map((item) => {
                                const { name, link, shallow, fn } = item;
                                const isActiveSub = active(item);

                                return (
                                    <Link key={item.link} href={link} passHref shallow={shallow} legacyBehavior {...linkProps}>
                                        <ButtonStyleChild
                                            onClick={onClick?.(item)}
                                            component='a'
                                            className="no-underline no-blank"
                                            key={name}
                                            active={isActiveSub}
                                            sx={{width:"100%"}}
                                            {...(item.blank ? { target: "_blank" } : {})}
                                        >
                                            <ListItemText disableTypography primary={name} />
                                            <Iconify
                                                icon={'tabler:chevron-right'}
                                                sx={{ width: 16, height: 16 }}
                                            />
                                        </ButtonStyleChild>
                                    </Link>
                                );
                            })}
                        </Stack>
                    </Collapse>
                )}
            </Box>

            {Boolean(fn) && (
                <Portal>
                    <Backdrop open={loading} loading />
                </Portal>
            )}
        </>
    );
}

export interface NavConfigProps extends Partial<Without<BoxProps, 'onClick'>> {
    navConfig: INavbar[]
    indexPath?: string
    isActive?: (path: INavbar) => boolean
    onClick?(e: MouseEvent<HTMLButtonElement>): void
};

export default function NavSection({ navConfig, indexPath, isActive, onClick: _a, ...other }: NavConfigProps) {
    const router = useRouter()
    // const [__a, __b, closeDashboardForm] = useDashboardForm();
    // const [__c, __d, closeOperationalCost] = useOperationalCostForm();

    const match = useCallback((path: INavbar | INavbarChild): boolean => {
        if (path.fn) return false;
        if (isActive) return isActive(path);
        if (path.link.startsWith("http")) return false;
        const routerUrl = new URL(router.asPath, webUrl());
        const pathUrl = new URL((path.link), webUrl());
        const a = new RegExp((`${pathUrl.pathname}`), 'i').test(routerUrl.pathname || '/')

        if (!a) {
            if (path?.child) {
                return path?.child?.some?.(child => match(child));
            }
        }

        return a;
    }, [isActive, router.asPath]);

    // const onClick = useCallback((path: INavbar | INavbarChild) => () => {
    //     if (path.shallow) {
    //         closeDashboardForm();
    //         closeOperationalCost();
    //     }
    // }, [closeDashboardForm, closeOperationalCost]);

    // React.useEffect(() => {
    //     function closeForm() {
    //         closeDashboardForm();
    //         closeOperationalCost();
    //     }

    //     Router.events.on('routeChangeComplete', closeForm);

    //     return () => {
    //         Router.events.off('routeChangeComplete', closeForm);
    //     }
    // }, [closeDashboardForm, closeOperationalCost]);

    return (
        <Box {...other}>
            <Stack width="100%" spacing={1} alignItems="start">
                {navConfig.map((item) => (
                    <NavItem key={item.name} item={item} active={match} />
                ))}
            </Stack>
        </Box>
    );
}
