import { Theme } from "@emotion/react";
import Box from "@mui/material/Box/Box";
import Card from "@mui/material/Card/Card";
import Stack from "@mui/material/Stack/Stack";
import { SxProps } from "@mui/material/styles";
import React from "react";
import Button from "./Button";
import Scrollbar from "./Scrollbar";
import { useTranslation } from "next-i18next";
import TextField from "./TextField";
import Typography from "@mui/material/Typography/Typography";
import Link from "@mui/material/Link/Link";

export type MapProps = {
    sx?: SxProps<Theme> | undefined
};

export default function HospitalMap({ sx }: MapProps) {
    const ref = React.useRef<HTMLElement | null>(null);
    const [t] = useTranslation("main");

    const [locationField, setLocationField] = React.useState("");

    const onLocationFieldChange = React.useCallback((value: string) => {
        setLocationField(value)
    }, [])

    React.useEffect(() => {
        if (ref.current) {
            new window.google.maps.Map(ref.current, {
                center: { lat: -34.397, lng: 150.644 },
                zoom: 4
            })
        }
    }, []);

    return (
        <Card sx={{
            ...sx,
            width: "100%",
            // height: "500px",
        }}>
            <Stack direction="row" width="100%" height="100%">
                <Box sx={{
                    width: "35%",
                    height: "100%",
                    backgroundColor: "#F3F3F3",
                    boxShadow: "-1px 2px 20px 5px rgba(0, 0, 0, 0.25)",
                }}>
                    <Scrollbar sx={{
                        width: "100%",
                        height: "100%",
                        px: 3,
                        pt: 3,
                        // backgroundColor: "#F3F3F3",
                        // boxShadow: "-1px 2px 20px 5px rgba(0, 0, 0, 0.25)",
                    }}>
                        <Stack direction="column" spacing={2} height="100%" width="100%">
                            <TextField
                                placeholder={t("enter_location")}
                                centeredPlaceholder
                                value={locationField}
                                onChange={(e) => onLocationFieldChange(e.target.value)}
                            />
                            <Button fullWidth icon="jam:search" iconifyProps={{ ml: -1 }}><Typography variant="subtitle2">Find Provider</Typography></Button>
                            {[...Array(10)].map((_, i) => (
                                <Box key={i} sx={{
                                    borderRadius: 1,
                                    width: "100%",
                                    minHeight: "35%",
                                    backgroundColor: "white",
                                    padding: 3,
                                    display: "flex",
                                    justifyContent: "center"
                                }}>
                                    <Stack direction="column" alignItems="start" >
                                        <Typography variant="h4">RS Mata Bali Mandara</Typography>
                                        <Typography variant="body2">Jl. Angsoka No.8, Dangin Puri Kangin, Kec. Denpasar Utara, Kota Denpasar, Bali 80236</Typography>
                                        <Typography pt={2} variant="body2" color="primary.main">Call Center 1: 0877-1699-6175</Typography>
                                        <Typography variant="body2" color="primary.main">Call Center 2: 0822-9829-8911</Typography>
                                        <Link pt={2} href="/" target="_blank">
                                            <Typography variant="body2" color="primary.main">View on maps</Typography>
                                        </Link>
                                    </Stack>
                                </Box>
                            ))}
                        </Stack>
                    </Scrollbar>
                </Box>

                <Box ref={ref} style={{ height: '100%', width: '70%' }} />
            </Stack>
        </Card >
    );
}