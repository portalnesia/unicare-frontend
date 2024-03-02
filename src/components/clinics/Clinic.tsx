import { Clinic } from "@/model/clinic";
import Grid from "@mui/material/Grid/Grid";
import Stack from "@mui/material/Stack/Stack";
import Iconify from "../Iconify";
import Link from "next/link";
import Typography from "@mui/material/Typography/Typography";
import Box from "@mui/material/Box/Box";
import IconButton from "@mui/material/IconButton/IconButton";
import { FONT_SECONDARY } from "@/themes/typography";
import useResponsive from "@/hooks/responsive";
import Img from "../Img";
import { SxProps, Theme } from "@mui/material";

export interface ClinicProps {
    clinic: Clinic | null;
    step: {
        index: number;
        totalStep: number;
    };
    onNext?(): void;
    sx?: SxProps<Theme>;
}

// sx: {
//     pl: 8,
//     pr: 4,
//     py: 8
// }
export default function Clinic({ clinic, step, onNext, sx }: ClinicProps) {
    const isMd = useResponsive("down", 462);
    let images: string[] = [
        "clinic_first_1.png",
        "clinic_first_2.png",
        "clinic_first_3.png",
        "clinic_first_4.png",
        "clinic_first_5.png",
    ]
    if (clinic) {
        images = clinic.images
    }

    return (
        <Grid container height={{ xs: "auto", sm: "auto" }} sx={{ ...sx }} >
            <Grid item xs={12} sm={6}
                sx={
                    !isMd ? {
                        pl: 8,
                        py: 8,
                        pr: 4,
                    } : {
                        px: 3,
                        pt: 4
                    }
                }
            >
                <Stack alignItems="start" height="100%" spacing={3}>
                    <Typography variant="h1" color="white">
                        {clinic ? clinic.name : "Unicare Managed Care Clinics"}
                    </Typography>
                    {clinic ? (
                        <>
                            <Stack direction="row" >
                                <Box sx={{
                                    width: "48px",
                                    display: "flex",
                                }}>
                                    <Iconify icon="tdesign:location" color="white" />
                                </Box>
                                <Typography variant="body1" color="white" width="100%">{clinic?.address}</Typography>
                            </Stack>
                            <Stack direction="row" >
                                <Box sx={{
                                    width: "48px",
                                    display: "flex",
                                }}>
                                    <Iconify icon="mi:call" color="white" />
                                </Box>
                                <Stack width="100%">
                                    {clinic?.call_center.map((phoneNumber, i) => (
                                        <Typography key={i} variant="body1" color="white">
                                            {`Call Center ${i + 1}: ${phoneNumber}`}
                                        </Typography>
                                    ))}
                                </Stack>
                            </Stack>
                            <Link href={clinic?.maps_link || ""}>
                                <Typography variant="body1" color="white" fontSize={14} sx={{ textDecoration: "underline" }}>View on Maps</Typography>
                            </Link>
                        </>
                    ) : (
                        <Typography variant="body1" color="white">Discover excellence in healthcare at Unicare Managed Care Clinics. Our clinics are committed to providing comprehensive and personalized medical services, ensuring your well-being is our top priority.</Typography>
                    )}

                    <Box sx={{
                        height: "100%",
                        width: "100%",
                        display: "flex",
                        alignItems: "end",
                        justifyContent: "center",
                    }}>
                        <Box width="100%" alignItems="center" display="flex" justifyContent="space-between" flexDirection="row">
                            <IconButton onClick={onNext} sx={{
                                bgcolor: "white",
                                "&:hover": {
                                    bgcolor: "#D6D6D6"
                                }
                            }}>
                                <Iconify icon="ic:round-arrow-forward" height={32} width={32} color="primary.main" />
                            </IconButton>
                            <Typography fontFamily={FONT_SECONDARY} fontSize={32} fontWeight={400} color="white">
                                {`${step.index}/${step.totalStep}`}
                            </Typography>
                        </Box>
                    </Box>
                </Stack>
            </Grid>
            <Grid item height="600px" xs={12} sm={6} sx={{
                ...(isMd
                    ? { px: 3, pt: 4 }
                    : { pl: 8, py: 8, pr: 4 }),
                zIndex: 1,
            }}>
                <Stack spacing={3} direction="row">
                    <Stack spacing={3} sx={{
                        display: "flex",
                        // position: "absolute",
                        // height: "100%",
                        width: "50%",
                        flexDirection: "column",
                        overflow: "hidden",
                        justifyContent: "center",
                        alignItems: "center",
                        transform: "translateY(-20%)"
                    }}>
                        <Img src={`assets/${images[0]}`} sx={{
                            borderRadius: 1,
                            width: "100%",
                            height: "300px",
                            // height: "300px",
                            objectFit: "cover",
                            overflow: "hidden",
                        }} />
                        <Img src={`assets/${images[1]}`} sx={{
                            borderRadius: 1,
                            // height: "300px",
                            width: "100%",
                            height: "300px",
                            objectFit: "cover",
                            overflow: "hidden",
                        }} />
                        <Img src={`assets/${images[2]}`} sx={{
                            borderRadius: 1,
                            // height: "300px",
                            width: "100%",
                            height: "300px",
                            objectFit: "cover",
                            overflow: "hidden",
                        }} />
                    </Stack>
                    <Stack spacing={3} sx={{
                        display: "flex",
                        // position: "absolute",
                        // height: "100%",
                        width: "50%",
                        flexDirection: "column",
                        overflow: "hidden",
                        justifyContent: "center",
                        alignItems: "center",
                        transform: "translateY(-44%)"
                    }}>
                        <Img src={`assets/${images[3]}`} sx={{
                            borderRadius: 1,
                            width: "100%",
                            height: "300px",
                            // height: "300px",
                            objectFit: "cover",
                            overflow: "hidden",
                        }} />
                        <Img src={`assets/${images[4]}`} sx={{
                            borderRadius: 1,
                            // height: "300px",
                            width: "100%",
                            height: "300px",
                            objectFit: "cover",
                            overflow: "hidden",
                        }} />
                    </Stack>
                </Stack>
            </Grid>
        </Grid>
    );
}