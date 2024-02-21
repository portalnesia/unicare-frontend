import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
// import { numberFormat } from "@portalnesia/utils"
import Iconify from "./Iconify";
import Button from "./Button";
import { SxProps } from "@mui/material/styles";
import { numberFormat } from "@/utils/main";
import Img from "./Img";
import { ourServices } from "root/data/content-data";
import { useTranslation } from "next-i18next";
import Grid from "@mui/material/Grid/Grid";

export interface CardPackageProps {
    data: typeof ourServices[number]
    onClick?: () => () => void;
    sx?: SxProps;
}

export default function CardPackageHome({ data, onClick, sx }: CardPackageProps) {
    const [t] = useTranslation("main")
    return (
        <Card sx={{
            padding: 3,
            height: "100%",
            ...sx
        }}>
            <Stack direction="column" justifyContent="center" alignItems="start" spacing={3}>
                <Img src={data.image_path} width={"100%"} />
                <Typography variant="subtitle1" fontSize={20}>{data.name}</Typography>
                <Typography variant="body1" fontSize={20}>{t(data.description_t as any)}</Typography>
                <Button variant="text" sx={{ width: "calc(100% - 200px)", alignContent: "left" }} onClick={onClick}>
                    Learn More
                </Button>
            </Stack>
        </Card>
    )
}