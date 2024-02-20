import { ThemeOptions } from "@mui/material";

function pxToRem(value: number) {
    return `${value / 16}rem`;
}

function responsiveFontSizes({ sm, md, lg }: { sm: number, md: number, lg: number }) {
    return {
        '@media (min-width:600px)': {
            fontSize: pxToRem(sm)
        },
        '@media (min-width:900px)': {
            fontSize: pxToRem(md)
        },
        '@media (min-width:1200px)': {
            fontSize: pxToRem(lg)
        }
    };
}

const FONT_PRIMARY = [
    'Inter', 'Sans-serif'
].join(", ")

export const FONT_SECONDARY = [
    'DM Sans', 'Sans-serif'
].join(", ")

const typography: ThemeOptions['typography'] = {
    fontFamily: FONT_PRIMARY,
    // fontFamily: FONT_SECONDARY,
    fontWeightRegular: 400,
    fontWeightMedium: 600,
    fontWeightBold: 700,
    h1: {
        fontWeight: 700,
        lineHeight: 80 / 64,
        fontSize: pxToRem(36),
        fontFamily: FONT_SECONDARY,
        ...responsiveFontSizes({ sm: 38, md: 40, lg: 42 })
    },
    h2: {
        fontWeight: 700,
        lineHeight: 64 / 48,
        fontSize: pxToRem(30),
        ...responsiveFontSizes({ sm: 32, md: 32, lg: 32 })
    },
    h3: {
        fontWeight: 700,
        lineHeight: 1.5,
        fontSize: pxToRem(24),
        ...responsiveFontSizes({ sm: 26, md: 26, lg: 26 })
    },
    h4: {
        fontWeight: 700,
        lineHeight: 1.5,
        fontSize: pxToRem(20),
        ...responsiveFontSizes({ sm: 22, md: 22, lg: 22 })
    },
    h5: {
        fontWeight: 700,
        lineHeight: 1.5,
        fontSize: pxToRem(18),
        ...responsiveFontSizes({ sm: 20, md: 20, lg: 20 })
    },
    h6: {
        fontWeight: 700,
        lineHeight: 1.5,
        fontSize: pxToRem(16),
        ...responsiveFontSizes({ sm: 18, md: 18, lg: 18 })
    },
    subtitle1: {
        fontWeight: 600,
        lineHeight: 1.5,
        fontSize: pxToRem(16)
    },
    subtitle2: {
        fontWeight: 600,
        lineHeight: 22 / 14,
        fontSize: pxToRem(14)
    },
    body1: {
        lineHeight: 1.5,
        fontSize: pxToRem(16)
    },
    body2: {
        lineHeight: 22 / 14,
        fontSize: pxToRem(14)
    },
    caption: {
        lineHeight: 1.5,
        fontSize: pxToRem(12)
    },
    overline: {
        fontWeight: 700,
        lineHeight: 1.5,
        fontSize: pxToRem(12),
        letterSpacing: 1.1,
        textTransform: 'uppercase'
    },
    button: {
        fontWeight: 700,
        lineHeight: 24 / 14,
        fontSize: pxToRem(18),
        textTransform: 'capitalize'
    },
    
};

export default typography;