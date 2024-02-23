import { PackageType, getPackageTypeName } from "@/models/package";
import Box from "@mui/material/Box/Box";
import Stack from "@mui/material/Stack/Stack";
import { SxProps, Theme } from "@mui/material/styles";
import Img from "../Img";
import Typography from "@mui/material/Typography/Typography";
import { FONT_SECONDARY } from "@/themes/typography";
import { useTranslation } from "next-i18next";

export interface DetailPackageProps {
    packageType: PackageType;
    sx?: SxProps<Theme>;
}

export default function DetailPackage({ packageType, sx }: DetailPackageProps) {
    const [t] = useTranslation("main");
    return (
        <Box sx={{
            bgcolor: "#F9F9F9",
            borderRadius: 1,
            ...sx
        }}>
            <Stack spacing={2}>
                <Stack pt={6} direction="row" justifyContent="center" spacing={{ xs: 5 }}>
                    <Img src={`assets/${packageType}_front.png`} width="30%" height="auto" sx={{ borderRadius: 1 }} />
                    <Img src={`assets/${packageType}_back.png`} width="30%" height="auto" sx={{ borderRadius: 1 }} />
                </Stack>
                <Typography pt={3} variant="h3" color="primary.main" fontFamily={FONT_SECONDARY} >{getPackageTypeName(packageType)}</Typography>
                <Typography px={{ xs: 0, sm: 12 }} variant="body1" textAlign="center">{t(`description_${packageType}` as any)}</Typography>
            </Stack>
        </Box>
    );
}