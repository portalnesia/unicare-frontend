import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea"
import Typography from "@mui/material/Typography";
import React from "react";
import { SxProps, Theme } from "@mui/material/styles";
import Img from "./Img";
import { CardContent } from "@mui/material";

export type ProductCardProps = {
    data: any
    cardSx?: SxProps<Theme>
}

export default function ProductCard({ data, cardSx }: ProductCardProps) {
    return (
        <Card elevation={3} sx={{
            width: "100%",
            background: "rgba(221, 226, 232, 0.2);",
            borderRadius: '8px',
            position: "relative",
            transition: t => t.transitions.create("transform"),
            ":hover": {
                transform: "scale(1.1)"
            },
            ...cardSx
        }}>
            {/* <CardActionArea onClick={() => { }}> */}
            <CardContent>
                <Box minHeight={200} height="auto" width="100%" position="relative">
                    <Img src={"https://dummyimage.com/414x288/"} alt={""} sx={{
                        objectFit: 'cover'
                    }} />
                </Box>

                <Box width="100%" bgcolor="primary.main" textAlign="center" py={2}>
                    <Typography sx={{ color: "white", fontWeight: "normal" }} variant="button" component="span">See Details</Typography>
                </Box>
            </CardContent>
            {/* </CardActionArea> */}
        </Card>
    )
}