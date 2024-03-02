import React from 'react'
import type { TooltipProps } from '@mui/material'
import Buttonn, { LoadingButtonProps } from '@mui/lab/LoadingButton'
import { styled } from '@mui/material/styles';
import dynamic from 'next/dynamic'
import Iconify, { IconifyProps } from './Iconify';

const Tooltip = dynamic(() => import('@mui/material/Tooltip'))

const LoadingButton = styled(Buttonn, { shouldForwardProp: (prop: string) => !['small'].includes(prop) })<{  small?: boolean }>(({ theme, small }) => ({
    borderRadius: "8px",
    border: `2px ${theme.palette.primary.main} solid`,
    padding: small ? "8px 8px" : "12px 12px",
    gap: "8px",
    boxShadow: "none",
    // ...(!small ? {
    //     minWidth: 200
    // } : {
    //     fontSize: 13
    // })
}))

export interface ButtonProps extends LoadingButtonProps {
    /**
    * Message for tooltip components.
    */
    tooltip?: string;
    /**
    * If `true`, the button will use variant outline.
    */
    outlined?: boolean;
    /**
    * Props for tooltip component
    */
    tooltipProps?: TooltipProps
    children?: React.ReactNode
    disabled?: boolean;
    icon?: string | React.ReactNode | undefined
    iconPosition?: 'start' | 'end'
    small?: boolean;
    iconifyProps?: Partial<IconifyProps>;
    component?: any
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
    const { size = "medium", loadingPosition: loadingPosisi, disabled = false, outlined = false, children, color = 'primary', variant = "contained", tooltip, endIcon, icon, iconifyProps, tooltipProps, loading, iconPosition = 'end', startIcon, name = 'button', small, ...other } = props;
    const loadingPosition = loadingPosisi ? loadingPosisi : (icon) && children ? iconPosition : "center";
    const cusIcon = React.useMemo((): React.ReactNode | undefined => {
        if (endIcon && iconPosition === 'end') return endIcon;
        if (startIcon && iconPosition === 'start') return startIcon
        if (typeof icon === 'string') {
            if (icon === 'submit') return <Iconify {...iconifyProps} ref={null} icon="material-symbols:arrow-right-alt" />
            else return <Iconify {...iconifyProps} ref={null} icon={icon} />
        }
        return undefined;
    }, [icon, endIcon, startIcon, iconPosition, iconifyProps])

    if (tooltip && !disabled) {
        return (
            <Tooltip title={tooltip} {...tooltipProps}>
                <LoadingButton
                    small={small}
                    loading={loading}
                    disabled={disabled}
                    size={size}
                    {...(outlined ? { variant: 'outlined' } : { variant })}
                    ref={ref}
                    loadingPosition={loadingPosition}
                    {...(cusIcon ? iconPosition === 'end' ? { endIcon: cusIcon } : { startIcon: cusIcon } : { startIcon, endIcon })}
                    color={color}
                    {...other}
                >
                    {children}
                </LoadingButton>
            </Tooltip>
        )
    }

    return (
        <LoadingButton
            small={small}
            loading={loading}
            disabled={disabled}
            size={size}
            ref={ref}
            loadingPosition={loadingPosition}
            {...(outlined ? { variant: 'outlined' } : { variant })}
            {...(cusIcon ? iconPosition === 'end' ? { endIcon: cusIcon } : { startIcon: cusIcon } : { startIcon, endIcon })}
            color={color}
            {...other}
        >
            {children}
        </LoadingButton>
    )

})
Button.displayName = 'CustomButton'
export default Button
