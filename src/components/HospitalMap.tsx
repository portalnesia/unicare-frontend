import { Theme } from "@emotion/react";
import { Wrapper } from "@googlemaps/react-wrapper";
import Box from "@mui/material/Box/Box";
import Card from "@mui/material/Card/Card";
import { SxProps } from "@mui/material/styles";
import React from "react";

export type MapProps = {
    sx?: SxProps<Theme> | undefined
};

export default function HospitalMap({ sx }: MapProps) {
    const ref = React.useRef<HTMLDivElement | null>(null);
    // const { Map } = await google.maps.importLibrary("maps")

    React.useEffect(() => {
        if (ref.current) {
            new window.google.maps.Map(ref.current, {
                center: { lat: -34.397, lng: 150.644 },
                zoom: 4
            })
        }
    }, [ref.current]);

    return (
        <Card
            sx={{
                ...sx,
                width: "100%",
                // height: "500px",
            }}
        >
            <Box ref={ref} style={{ height: '100%', width: '100%' }} />
        </Card >
    );
}