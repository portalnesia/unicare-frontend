import Iconify from '@/components/Iconify';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import { styled } from '@mui/material/styles';
import { SnackbarKey, useSnackbar } from 'notistack';
import { ReactNode, useCallback } from 'react';

export type OptionSnack = {
    content?: (key: string | number, message: string | React.ReactNode) => React.ReactNode,
    action?: (key: string | number) => React.ReactNode,
    autoHideDuration?: number | null
}

const CustomIconBtn = styled(IconButton, { shouldForwardProp: prop => prop !== "variant" })<IconButtonProps & ({ variant: VariantOption })>(({ variant }) => ({
    ...(typeof variant === 'boolean' ? {
        '& svg': {
            color: '#FFF'
        }
    } : {})
}))

/**
 * true => `error`   
 * false => `success`
 */
export type VariantOption = 'default' | 'error' | 'success' | 'warning' | 'info' | boolean;

export default function useNotification() {
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();

    /**
     * @param {string | ReactNode} message - Notification message
     * @param {VariantOption} variantOptions - Notification variant. `true` => error, `false` => success
     * @param {OptionSnack} options - Snackbar options
     */
    const sendNotification = useCallback((message: string | React.ReactNode, variant: VariantOption, option?: OptionSnack) => {
        option = option || {};
        if (typeof option?.content === 'undefined') {
            option = {
                ...option,
                action: (key) => (
                    <CustomIconBtn
                        variant={variant}
                        onClick={() => closeSnackbar(key)}
                        size="large">
                        <Iconify icon="ic:baseline-close" />
                    </CustomIconBtn>
                )
            }
        }
        const vari = typeof variant === 'string' ? variant : (variant === true ? 'error' : 'success');
        enqueueSnackbar(message, { variant: vari, ...option })
    }, [enqueueSnackbar, closeSnackbar]);

    return sendNotification;
}