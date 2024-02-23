import React from 'react'
import { type ModalProps as NativeModalProps } from '@mui/material'
import { styled } from '@mui/material/styles';
import dynamic from 'next/dynamic'
import { Without } from '@/types/general';

const Modals = dynamic(() => import('@mui/material/Modal'))
const CircularProgress = dynamic(() => import('@mui/material/CircularProgress'))

export interface BackdropProps extends Partial<Without<NativeModalProps, 'children'>> {
    open: boolean,
    children?: React.ReactNode,
    loading?: boolean;
    textColor?: 'theme' | 'white'
}

const Div = styled('div')(({ theme }) => ({
    width: '100%',
    textAlign: 'center',
    [theme.breakpoints.up('md')]: {
        margin: '0 100px'
    },
    [theme.breakpoints.down('sm')]: {
        margin: '0 20px'
    }
}))

export default function Modal(props: BackdropProps) {
    const { open, children, loading = true, textColor = 'theme', ...other } = props;

    return (
        <Modals slotProps={{
            backdrop: {
                unmountOnExit: true
            }
        }} open={open} sx={{ zIndex: 2000, bgcolor: "rgba(0,0,0,0.8)", ...(textColor === 'white' ? { color: '#fff' } : { color: "primary.main" }), display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }} {...other}>
            <Div>
                {loading ? (
                    <div>
                        <CircularProgress color='inherit' thickness={5} size={50} />
                    </div>
                ) : children}
            </Div>
        </Modals>
    )
}