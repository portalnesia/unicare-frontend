import React, { useCallback, useState, forwardRef } from 'react';
import IconButton from '@mui/material/IconButton';
import OutlinedInput, { OutlinedInputProps } from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Iconify from './Iconify';
import TextField, { TextFieldProps } from './TextField';

export interface PasswordFormProps extends TextFieldProps {
    helperText?: string
}

const PasswordForm = forwardRef<HTMLInputElement, PasswordFormProps>((props, ref) => {
    const { fullWidth, id, label, helperText, required, error, type: _a, ...rest } = props
    const [show, setShow] = useState(false);

    const handleShowPassword = useCallback(() => {
        setShow(true);
    }, [])
    const handleHidePassword = useCallback(() => {
        setShow(false);
    }, [])

    return (
        <TextField
            inputRef={ref}
            id={id}
            type={show ? 'text' : 'password'}
            required={required}
            error={error}
            fullWidth={fullWidth}
            endAdornment={
                <InputAdornment position="end">
                    <IconButton
                        tabIndex={-1}
                        disableRipple
                        aria-label="toggle password visibility"
                        onMouseDown={handleShowPassword}
                        onMouseUp={handleHidePassword}
                        onTouchStart={handleShowPassword}
                        onTouchEnd={handleHidePassword}
                        title="Show Password"
                        edge="end"
                    >
                        <Iconify icon={show ? "ic:baseline-visibility" : "ic:baseline-visibility-off"} />
                    </IconButton>
                </InputAdornment>
            }
            label={label}
            helperText={helperText}
            {...rest}
        />
    )
})
PasswordForm.displayName = "PasswordForm"
export default PasswordForm;