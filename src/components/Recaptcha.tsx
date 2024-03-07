import React from "react";
import ReCAPTCHA from "react-google-recaptcha";
import Stack from "@mui/material/Stack";
import dynamic from 'next/dynamic'
import { config } from "@/config";

const Dialog = dynamic(() => import("@mui/material/Dialog"));

type RecaptchaState = {
    open: boolean
}

const captchaID = "g-recaptcha"

export default class Recaptcha extends React.PureComponent<{}, RecaptchaState> {
    constructor(props: any) {
        super(props);
        this.state = {
            open: true
        }
    }
    captcha = React.createRef<ReCAPTCHA>()

    private resolve: ((token: string | null) => void) | undefined;

    private handleClose() {
        this.setState({ open: false })
        if (this.resolve) {
            this.resolve(null)
            this.resolve = undefined;
        }
    }

    private onChange(token: string | null) {
        if (this.resolve) {
            this.resolve(token)
            this.resolve = undefined;
        }
        this.handleClose();
    }

    private onError() {
        if (this.resolve) {
            this.resolve(null)
            this.resolve = undefined;
        }
        this.handleClose();
    }

    /*componentDidUpdate(prevProps: Readonly<{}>, prevState: Readonly<RecaptchaState>, snapshot?: any): void {
        if (this.state.open && prevState.open !== this.state.open) {
            try {
                console.log((window as any)?.grecaptcha);
                (window as any)?.grecaptcha?.render(document.getElementById(captchaID), {
                    siteKey: config.recaptcha,
                    size: "normal"
                })
            } catch { }
        }
    }*/

    execute() {
        return new Promise<string | null>((res, rej) => {
            this.captcha.current?.reset();
            this.resolve = res;
            this.setState({ open: true });
        })
    }

    render() {
        return (
            // <Dialog open={this.state.open} onClose={() => this.handleClose()}>
                <Stack justifyContent="center" >
                    <ReCAPTCHA
                        id={captchaID}
                        ref={this.captcha}
                        sitekey={config.recaptcha}
                        onChange={(value) => this.onChange(value)}
                        onErrored={() => this.onError()}
                    />
                </Stack>
            // </Dialog>
        )
    }
}