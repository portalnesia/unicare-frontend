import { type Theme, type SxProps, styled } from "@mui/material/styles";
import type { SystemCssProperties } from '@mui/system/styleFunctionSx';

export type SvgProps = {
    size?: SystemCssProperties<Theme>['fontSize']
    maxSize?: SystemCssProperties<Theme>['maxWidth']
    sx?: SxProps<Theme>
    viewBox?: string;
}

export const ObjComp = styled('object')(() => ({}))