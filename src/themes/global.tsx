import React from 'react'
import { useTheme, Theme } from '@mui/material/styles';
import GlobalThemeStyles from '@mui/material/GlobalStyles'
import type { Interpolation } from '@mui/styled-engine'
import { alpha } from '@mui/system/colorManipulator';
// ----------------------------------------------------------------------

export interface GlobalStylesProps {
    styles?: Interpolation<Theme>
}
const underlinePaddingX = "0.12em";
const underlineOffsetY = "-2px";

export default function GlobalStyles({ styles }: GlobalStylesProps) {
    const theme = useTheme();
    return (
        <GlobalThemeStyles
            styles={{
                '*': {
                    boxSizing: 'border-box'
                },
                ".underlined": {
                    backgroundImage: 'url(/assets/underline.svg)',
                    backgroundRepeat: 'no-repeat',
                    boxDecorationBreak: "clone",
                    backgroundPosition: 'bottom',
                    backgroundSize: '100% 25%', // Adjust the height of the underline here
                    display: 'inline',
                    paddingLeft: 10,
                    paddingRight: 10,
                    paddingBottom: 10,
                },
                "a": {
                    textDecoration: "unset",
                    WebkitHighlight: "none",
                    color: "inherit"
                },
                "a.underline:hover, .underline:hover": {
                    textDecoration: "underline",
                    cursor: "pointer"
                },
                '.sticky-col': {
                    position: 'sticky',
                    right: 0,
                    minWidth: 100,
                    backgroundColor: alpha(theme.palette.background.default, 0.97),
                    zIndex: 1,
                    '&.bgpaper': {
                        backgroundColor: alpha(theme.palette.background.paper, 0.97),
                    }
                },
                '.sticky-row': {
                    position: 'sticky',
                    backgroundColor: alpha(theme.palette.background.default, 0.97),
                    zIndex: 1,
                    '&.bgpaper': {
                        backgroundColor: alpha(theme.palette.background.paper, 0.97),
                    }
                },
                'thead .tr-custom': {
                    backgroundColor: "#DCDCDC"
                },
                'thead .tr-custom th:first-of-type': {
                    borderRadius: "24px 0 0px 0px",

                },
                'thead .tr-custom th:last-of-type': {
                    borderRadius: "0 24px 0px 0px",

                },
                'tbody .tr-custom:nth-child(even)': {
                    backgroundColor: theme.palette.primary.lighter
                },
                'tbody .tr-custom td': {
                    borderBottom: "unset"
                },
                '.MuiAutocomplete-endAdornment':{
                    right: '5px!important'
                },
                ...styles as unknown as object
            }}
        />
    )
}