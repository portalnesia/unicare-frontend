import { Theme } from "@emotion/react";
import { Wrapper } from "@googlemaps/react-wrapper";
import { CardContent, Grid, Typography } from "@mui/material";
import Box from "@mui/material/Box/Box";
import Card from "@mui/material/Card/Card";
import Stack from "@mui/material/Stack/Stack";
import { SxProps } from "@mui/material/styles";
import React from "react";
import Button from "./Button";
import Scrollbar from "./Scrollbar";
import { useTranslation } from "next-i18next";
import TextField from "./TextField";

export type MapProps = {
    sx?: SxProps<Theme> | undefined
};

export default function HospitalMap({ sx }: MapProps) {
    const ref = React.useRef<HTMLElement | null>(null);
    const [t] = useTranslation("main");

    const [locationField, setLocationField] = React.useState("");

    const onLocationFieldChange = React.useCallback((value: string) => {
        setLocationField(value)
    }, [locationField])

    React.useEffect(() => {
        if (ref.current) {
            new window.google.maps.Map(ref.current, {
                center: { lat: -34.397, lng: 150.644 },
                zoom: 4
            })
        }
    }, [ref.current]);

    return (
        <Card sx={{
            ...sx,
            width: "100%",
            // height: "500px",
        }}>
            <Stack direction="row" width="100%" height="100%">
                <Box sx={{
                    width: "30%",
                    height: "100%",
                    backgroundColor: "#F3F3F3",
                    boxShadow: "-1px 2px 20px 5px rgba(0, 0, 0, 0.25)",
                }}>
                    <Scrollbar sx={{
                        width: "100%",
                        height: "100%",
                        padding: 3
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
                            <Button fullWidth icon="jam:search" iconifyProps={{ml: -1}}><Typography variant="subtitle2">Find Provider</Typography></Button>
                            {[...Array(10)].map((_, i) => (
                                <Box key={i} sx={{
                                    borderRadius: 1,
                                    width: "100%",
                                    minHeight: "35%",
                                    backgroundColor: "white"
                                }}>
                                    <Stack direction="column">
                                        <Typography variant="h2">{i}</Typography>
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