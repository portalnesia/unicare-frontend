import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Button from "./Button";
import { SxProps } from "@mui/material/styles";
import Img from "./Img";
import { missions, ourServices } from "root/data/content-data";
import { useTranslation } from "next-i18next";
import { FONT_SECONDARY } from "@/themes/typography";

export interface CardMissionProps {
    data: typeof missions[number]
    sx?: SxProps;
}

export default function CardMission({ data, sx }: CardMissionProps) {
    const [t] = useTranslation("main");
    return (
        <Card sx={{
            // position: "relative",
            padding: 3,
            height: "100%",
            bgcolor: "white",
            ...sx
        }}>

            <Stack
                direction="column"
                alignItems="start"
                spacing={3}
                height="100%"
            >
                <Img
                    src={data.image_path}
                    width={"100%"}
                    sx={{
                        objectFit: "cover",
                        height: "60%"
                    }}
                />
                <Stack direction="row" alignItems="start" spacing={2} height="100%">
                    <Typography variant="h3" fontFamily={FONT_SECONDARY} color="primary.main">
                        {data.index}
                    </Typography>
                    {/* <div style={{
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        display: "-webkit-box",
                        WebkitBoxOrient: "vertical",
                        WebkitLineClamp: 5,
                    }}> */}
                    <Typography variant="body1" fontSize={16}>
                        {t(data.description_t as any)}
                    </Typography>
                    {/* </div> */}
                </Stack>
            </Stack>
        </Card>
    )
}