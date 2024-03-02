//import SimpleBarReact from 'simplebar-react';
import { OverlayScrollbarsComponent, OverlayScrollbarsComponentProps } from "overlayscrollbars-react";
import { OverlayScrollbars } from 'overlayscrollbars'
// material
import { styled, SxProps, Theme, useTheme } from '@mui/material/styles';
import { alpha } from '@mui/system/colorManipulator';
import Box from '@mui/material/Box';
import { isMobile as nativeIsMobile } from 'react-device-detect'
import { ReactNode, useEffect, useRef, useState, useCallback } from 'react'
// ----------------------------------------------------------------------
//import 'simplebar-react/dist/simplebar.min.css'
import 'overlayscrollbars/overlayscrollbars.css';

const RootStyle = styled('div')({
    flexGrow: 1,
    height: '100%',
    overflow: 'hidden'
});

const OverlayScrollbarsComponentStyles = styled(OverlayScrollbarsComponent)(({ theme }) => ({
    maxHeight: '100%',
    maxWidth: '100%'
}));

// ----------------------------------------------------------------------

export interface ScrollbarProps extends Partial<Pick<OverlayScrollbarsComponentProps, 'options'>> {
    children: ReactNode,
    sx?: SxProps<Theme>
    onScroll?(e: Event): void
    rootSx?: SxProps<Theme>
}

export default function Scrollbar({ children, sx, onScroll, options, rootSx }: ScrollbarProps) {
    const theme = useTheme();
    const [isMobile, setIsMobile] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);
    const [overlayRef, setOverlayRef] = useState<OverlayScrollbars>();

    const initialized = useCallback((i: OverlayScrollbars) => {
        setOverlayRef(i);
    }, []);

    const scroll = useCallback((i: OverlayScrollbars, e: Event) => {
        if (onScroll) onScroll(e);
    }, [onScroll]);

    useEffect(() => {
        const ref = scrollRef.current;
        if (onScroll && isMobile && ref) {
            ref?.addEventListener('scroll', onScroll)
        }

        return () => {
            if (onScroll && isMobile && ref) {
                ref?.removeEventListener('scroll', onScroll)
            }
        }
    }, [onScroll, isMobile])

    useEffect(() => {
        setIsMobile(nativeIsMobile);
    }, [])

    useEffect(() => {
        if (overlayRef) {
            overlayRef?.update();
        }
    }, [theme, overlayRef])

    if (isMobile) {
        return (
            <Box ref={scrollRef} sx={{ overflow: 'auto', ...sx }}>
                {children}
            </Box>
        );
    }

    return (
        <RootStyle sx={rootSx}>
            <OverlayScrollbarsComponentStyles id='scrollbar' sx={sx} defer events={{ scroll, initialized }} options={{
                paddingAbsolute: true,
                scrollbars: {
                    theme: theme.palette.mode === 'dark' ? 'os-theme-light' : 'os-theme-dark',
                    autoHide: 'leave',
                    autoHideDelay: 500,
                    pointers: ['mouse'],
                    ...(options ? options.scrollbars : {})
                },
                ...(options || {})
            }}>
                {children}
            </OverlayScrollbarsComponentStyles>
        </RootStyle>
    );
}