import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Button from "./Button";
import { SxProps } from "@mui/material/styles";
import Img from "./Img";
import { ourServices } from "root/data/content-data";
import { useTranslation } from "next-i18next";

export interface CardServicesProps {
    data: typeof ourServices[number]
    onClick?: () => () => void;
    sx?: SxProps;
}

export default function CardServices({ data, onClick, sx }: CardServicesProps) {
    const [t] = useTranslation("main")
    return (
        <Card sx={{
            position: "relative",
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
                        height: "40%"
                    }}
                />
                <Typography variant="subtitle1" fontSize={20}>
                    {data.name}
                </Typography>
                <div style={{
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    display: "-webkit-box",
                    WebkitBoxOrient: "vertical",
                    WebkitLineClamp: 5,
                }}>
                    <Typography variant="body1" fontSize={20}>
                        {t(data.description_t as any)}
                    </Typography>
                </div>
            </Stack>

            <Button
                variant="text"
                sx={{
                    position: "absolute",
                    bottom: 0,
                    width: "35%",
                    mb: 3
                }}
                onClick={onClick}
            >
                <Typography color="primary" variant="subtitle2" flex={"none"}>{t("learn_more")}</Typography>
            </Button>
        </Card>
    )
}