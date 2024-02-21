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

export interface CardPackageProps {
    onClick?: () => () => void;
    sx?: SxProps;
}

export default function CardPackageHome({ onClick, sx }: CardPackageProps) {

    return (
        <Card sx={{ borderRadius: "10px", zIndex: 2, height: "100%", bgcolor: "white", position: "relative", ...sx }} elevation={0}>
            <CardContent sx={{ height: "100%", position: "relative", px: 0 }}>
                <Stack direction="column" spacing={3}>
                    <Img src="https://dummyimage.com/414x288/" />
                    <Button variant="text" sx={{ width: "calc(100% - 200px)" }} onClick={onClick}>
                        Learn More
                    </Button>
                </Stack>

                {/* <Stack spacing={2} alignItems="start" pb={3} px={2}>
                    <Box><Typography variant="subtitle1" sx={{ borderBottom: `3px solid #E8C341`, display: "inline" }}>{pkg.name}</Typography></Box>
                    <Box>
                        <Stack direction="row" spacing={1}>
                            <Typography variant="h2" component="h2" sx={{ color: "primary.main", fontSize: 32 }}>{`${pkg.quota}`}</Typography>
                            <Divider orientation="vertical" flexItem sx={{ borderColor: "primary.main" }} />
                            <Typography variant="h4" component="h4" sx={{ color: "primary.main", fontSize: 18 }}>{`${pkg.period}`}</Typography>
                        </Stack>
                    </Box>
                    <Box>
                        <Typography variant="subtitle1">IDR 200`}</Typography>
                    </Box>
                    <Stack alignItems="start" spacing={1} pb={2} flexGrow={1} flexShrink={1}>
                        {[pkg?.feature_1, pkg?.feature_2, pkg?.feature_3]?.filter(f => f?.length)?.map((f, i) => (
                            <Stack direction="row" spacing={1} key={`${i}-${f}`}>
                                <Iconify icon="material-symbols:check" />
                                <Typography sx={{ fontSize: 14, lineHeight: "22px" }}>{f}</Typography>
                            </Stack>
                        ))}
                    </Stack>
                </Stack>
                <Box width="100%" position="absolute" left={8} bottom={16}>
                    <Button sx={{ width: "calc(100% - 16px)" }} onClick={onClick}>Buy now</Button>
                </Box> */}
            </CardContent>
        </Card>
    )
}