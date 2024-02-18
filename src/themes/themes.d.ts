import type { LoadingButtonTypeMap } from '@mui/lab'

declare module '@mui/material/styles' {
    export interface SimplePaletteColorOptions {
        lighter?: string;
        darker?: string
    }
    export interface PaletteColor {
        lighter?: string;
        darker?: string
    }
}

declare module '@mui/lab' {
    type CustomProps = {
        component?: string,
        download?: string,
        target?: string,
        rel?: string
    }
    export type LoadingButtonProps<
        D extends ElementType = LoadingButtonTypeMap['defaultComponent'],
        P = CustomProps,
    > = OverrideProps<LoadingButtonTypeMap<P, D>, D>;
}

declare module '@mui/material/ListItemButton' {
    export interface ListItemButtonBaseProps {
        component?: string
    }
}

declare module '@mui/material/ButtonBase' {
    export interface ButtonBaseProps {
        component?: string
    }
}

declare module '@mui/lab/TimelineContent' {
    export interface TimelineContentProps {
        component?: string
    }
}