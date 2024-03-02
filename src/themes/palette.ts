import type { PaletteOptions } from '@mui/material/styles';
import { alpha } from '@mui/system/colorManipulator';

export const PRIMARY = {
    lighter: '#D9EBFD',
    light: '#82BCF7',
    main: '#003FB5',
    dark: '#002F86',
    darker: '#001E56',
    contrastText: '#fff'
};

const SECONDARY = {
    lighter: '#D9EBFD',
    light: '#82BCF7',
    main: '#328AE2',
    dark: '#0B63BB',
    darker: '#004182',
    contrastText: '#fff'
};
const INFO = {
    lighter: '#D0F2FF',
    light: '#74CAFF',
    main: '#1890FF',
    dark: '#0C53B7',
    darker: '#04297A',
};
const SUCCESS = {
    lighter: '#E9FCD4',
    light: '#AAF27F',
    main: '#54D62C',
    dark: '#229A16',
    darker: '#08660D',
};
const WARNING = {
    lighter: '#FFF7CD',
    light: '#FFE16A',
    main: '#FFC107',
    dark: '#B78103',
    darker: '#7A4F01',
};
const ERROR = {
    lighter: '#FFE7D9',
    light: '#FFA48D',
    main: '#FF4842',
    dark: '#B72136',
    darker: '#7A0C2E',
};

export const TEXT_SECONDARY_COLOR = "#333333"

const palette: PaletteOptions = {
    mode: 'light',
    common: { black: '#000', white: '#fff' },
    background: { paper: '#FBFBFB', default: '#FFFFFF' },
    text: { primary: "#5C5C5C", secondary: TEXT_SECONDARY_COLOR },
    primary: PRIMARY,
    secondary: SECONDARY,
    info: INFO,
    success: SUCCESS,
    warning: WARNING,
    error: ERROR,
};


export default palette;