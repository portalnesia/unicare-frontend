import Button from "@/components/Button";
import Img from "@/components/Img";
import { SvgEmail, SvgLocation, SvgPhone } from "@/components/svg/Icons";
import useResponsive from "@/hooks/responsive";
import { FONT_SECONDARY } from "@/themes/typography";
import Divider from "@mui/material/Divider/Divider";
import Grid from "@mui/material/Grid/Grid";
import Stack from "@mui/material/Stack/Stack";
import Typography from "@mui/material/Typography/Typography";
import { useTranslation } from "next-i18next";

export default function SectionContactUs() {
    const [t] = useTranslation("main")
    const isMd = useResponsive("down", 462);
    return (
        <Grid container justifyContent="center" spacing={10} >
            <Grid item xs={12} sm={6} display="flex" alignItems="stretch">
                <Img src="assets/contact_us.png" width="100%" height="100%" sx={{ objectFit: "cover", borderRadius: 2 }} />
            </Grid>
            <Grid py={1} item xs={12} sm={6}>
                <Stack direction="column" spacing={4} justifyContent="space-between" alignItems={{ xs: "center", sm: "start" }}>
                    <Typography variant="h2" color="primary.main" fontFamily={FONT_SECONDARY} >{t("title_contact_us")}</Typography>
                    <Typography variant="h1" >{t("subtitle_contact_us")}</Typography>
                    <Typography variant="body1" >{t("description_contact_us")}</Typography>
                </Stack>
            </Grid>

            <Grid item container xs={12} justifyContent="center">
                <Grid item xs={12} sm={3} py={3}>
                    <Stack spacing={1} direction="column" justifyContent="center" >
                        <SvgEmail />
                        <Typography variant="subtitle1">Send Us E-mail</Typography>
                        <Typography pb={2} variant="body2" textAlign="center">callcenter@unicare-clinic.com</Typography>
                        <Button small variant="text" onClick={() => { }} sx={{ px: 3, flex: "none" }}>
                            <Typography color="primary.main" variant="subtitle2" >Email us</Typography>
                        </Button>
                    </Stack>
                </Grid>
                {!isMd && (
                    <Grid item xs={0} sm={1} py={3} justifyContent="center" alignItems="center" display="flex">
                        <Divider orientation="vertical" sx={{ height: "100%", borderColor: "#D6D6D6", display: { xs: "none", md: "block" } }} flexItem />
                    </Grid>
                )}
                <Grid item xs={12} sm={3} py={3}>
                    <Stack spacing={1} direction="column" justifyContent="center" >
                        <SvgPhone />
                        <Typography variant="subtitle1">Call Center</Typography>
                        <Typography pb={2} variant="body2" textAlign="center">+62 877-1699-6175</Typography>
                        <Button small variant="text" onClick={() => { }} sx={{ px: 3, flex: "none" }}>
                            <Typography color="primary.main" variant="subtitle2" >Call now</Typography>
                        </Button>
                    </Stack>
                </Grid>
                {!isMd && (
                    <Grid item xs={0} sm={1} py={3} justifyContent="center" alignItems="center" display="flex">
                        <Divider orientation="vertical" sx={{ height: "100%", borderColor: "#D6D6D6", display: { xs: "none", md: "block" } }} flexItem />
                    </Grid>
                )}
                <Grid item xs={12} sm={3} py={3} >
                    <Stack spacing={1} direction="column" justifyContent="center" >
                        <SvgLocation />
                        <Typography variant="subtitle1">Visit Us</Typography>
                        <Typography width="100%" pb={2} variant="body2" textAlign="center" >Jl. Patih Jelantik, Istana Galleria Ring No. 2</Typography>
                        <Button small variant="text" onClick={() => { }} sx={{ px: 3, flex: "none" }}>
                            <Typography color="primary.main" variant="subtitle2" >View on maps</Typography>
                        </Button>
                    </Stack>
                </Grid>
            </Grid>
        </Grid>
    );
}