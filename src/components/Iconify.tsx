import React, { forwardRef } from 'react'
import { Icon } from '@iconify/react';
import type { BoxProps } from '@mui/material';
import { ReactElement } from 'react'
import Box from '@mui/material/Box';
// ----------------------------------------------------------------------


export interface IconifyProps extends BoxProps {
    icon: ReactElement | string
}

const IconComp = forwardRef<HTMLDivElement, IconifyProps>(({ icon, sx, width = 24, height = 24, ...other }, ref) => (
    <Box ref={ref} component={Icon} icon={icon} sx={{ ...sx }} width={width} height={height} {...other} />
))
IconComp.displayName = "Iconify"

/**
 * 
 * Custom Iconify Components
 * 
 * Homepage: [Portalnesia](https://portalnesia.com)
 */
export default IconComp
