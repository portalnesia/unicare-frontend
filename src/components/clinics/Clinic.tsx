import { Clinic } from "@/model/clinic";
import Grid from "@mui/material/Grid/Grid";
import Stack from "@mui/material/Stack/Stack";
import Iconify from "../Iconify";
import Link from "next/link";
import Typography from "@mui/material/Typography/Typography";
import Box from "@mui/material/Box/Box";
import IconButton from "@mui/material/IconButton/IconButton";

export interface ClinicProps {
    clinic: Clinic | null;
    step: {
        index: number;
        totalStep: number;
    };
    onNext?(): void;
}

export default function Clinic({ clinic, step, onNext }: ClinicProps) {

    return (
        <Grid container>
            <Grid item xs={12} sm={6}>
                <Stack>
                    <Typography variant="h1">
                        {clinic ? clinic.name : "Unicare Managed Care Clinics"}
                    </Typography>
                    {clinic ? (
                        <>
                            <Stack direction="row">
                                <Iconify icon="jam:location" />
                                <Typography variant="body1" color="white">{clinic?.address}</Typography>
                            </Stack>
                            <Stack direction="row">
                                <Iconify icon="jam:phone" />
                                <Stack>
                                    {clinic?.call_center.map((phoneNumber, i) => (
                                        <Typography key={i} variant="body1" color="white">
                                            {`Call Center ${i + 1}: ${phoneNumber}`}
                                        </Typography>
                                    ))}
                                </Stack>
                            </Stack>
                            <Link href={clinic?.maps_link || ""}>
                                <Typography variant="body1" color="white">View on Maps</Typography>
                            </Link>
                        </>
                    ) : (
                        <Typography variant="body1" color="white">Discover excellence in healthcare at Unicare Managed Care Clinics. Our clinics are committed to providing comprehensive and personalized medical services, ensuring your well-being is our top priority.</Typography>
                        )}

                    <Box>
                        <IconButton onClick={onNext}>
                            <Iconify icon="ic:round-arrow-forward" />
                        </IconButton>
                        <Typography variant="body1" color="white">{`${step.index}/${step.totalStep}`}</Typography>
                    </Box>
                </Stack>
            </Grid>
            <Grid item xs={12} sm={6}>
                <h1>Photos</h1>
            </Grid>
        </Grid>
    );
}