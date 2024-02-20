import FormControl from "@mui/material/FormControl";
import InputBase, { InputBaseProps } from "@mui/material/InputBase";
import InputLabel from "@mui/material/InputLabel";
import Typography from "@mui/material/Typography";
import { StyledComponentProps, styled } from "@mui/material/styles";
import { alpha } from '@mui/system/colorManipulator';
import React from "react";

export type BootstrapInputProps = InputBaseProps & StyledComponentProps<"input"> & {
    bgcolor?: string | undefined;
}

export const BootstrapInput = styled(InputBase, {
    shouldForwardProp: (props: string) => !['bgcolor', 'label'].includes(props || "")
})<{ bgcolor?: string, centeredPlaceholder?: boolean }>(({ theme, error, bgcolor = "#F9F9F9", disabled, value, centeredPlaceholder }) => ({
    'label + &': {
        marginTop: theme.spacing(3),
    },
    border: "1px solid " + theme.palette.divider,
    borderRadius: 8,
    position: 'relative',
    backgroundColor: disabled ? theme.palette.grey[300] : bgcolor,
    fontSize: 13,
    [theme.breakpoints.up('md')]: {
        fontSize: 16
    },
    width: '100%',
    padding: '8px 12px',
    color: "black",
    transition: theme.transitions.create([
        'border-color',
        'background-color',
        'box-shadow'
    ]),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
        'Montserrat',
        'sans-serif',
    ].join(','),
    ...error ? {
        borderColor: theme.palette.error.main,
    } : {},
    '&:focus, &.Mui-focused': {
        // boxShadow: `${alpha(error ? theme.palette.error.main : theme.palette.primary.main, 0.25)} 0 0 0 0.1rem`,
        borderColor: error ? theme.palette.error.main : theme.palette.primary.main,
        textAlignLast: "start"
    },
    ...value as string ? {
        borderColor: "#ADADAD",
    } : {
        textAlignLast: centeredPlaceholder ? "center" : "start"
    },
    '&::placeholder': {
        color: "black",
        opacity: 0.5
    },
    '& input::-webkit-outer-spin-button,& input::-webkit-inner-spin-button': {
        WebkitAppearance: "none"
    },
    '& .MuiSelect-select, & .MuiNativeSelect-select': {
        backgroundColor: "transparent",
        ":focus": {
            backgroundColor: "transparent",
        }
    },
}));

const Label = styled(InputLabel)(() => ({
    fontSize: 18,
    '&.Mui-focused': {
        // color: 'white',
        fontWeight: "medium"
    },
}))

export interface TextFieldProps extends InputBaseProps {
    label?: React.ReactNode
    helperText?: string
    bgcolor?: "white" | "grey"
    error?: boolean,
    centeredPlaceholder?: boolean
}

const TextField = React.forwardRef<any, TextFieldProps>(({ label, fullWidth = true, inputRef, helperText, error, centeredPlaceholder, required, ...rest }, ref) => {

    return (
        <FormControl variant="standard" required={required} fullWidth={fullWidth}>
            {label ? <Label required={required} shrink>{label}</Label> : null}
            <BootstrapInput ref={ref} centeredPlaceholder={centeredPlaceholder} inputRef={inputRef} fullWidth={fullWidth} {...rest} />
            {helperText && <Typography variant="caption" sx={{ px: 1, color: error ? "text.secondary" : "text.primary" }}>{helperText}</Typography>}
        </FormControl>
    )
})

TextField.displayName = "TextField"
export default TextField;