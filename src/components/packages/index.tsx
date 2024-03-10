import { PackageType, getPackageTypeName } from "@/model/package";
import Box from "@mui/material/Box/Box";
import Stack from "@mui/material/Stack/Stack";
import React from "react";
import Button from "../Button";
import DetailPackage from "./DetailPackage";
import PhotoSwipe, { PhotoSwipeOptions } from 'photoswipe';
import 'photoswipe/style.css';
import Typography from "@mui/material/Typography/Typography";
import Modal from "../Modal";
import { SvgProcedureDiamondPlus, SvgProcedurePremium, SvgProcedureSmartHealthPlus } from "../svg/Procedure";
import { FONT_SECONDARY } from "@/themes/typography";
import IconButton from "@mui/material/IconButton/IconButton";
import Iconify from "../Iconify";
import useResponsive from "@/hooks/responsive";

export default function Packages() {
    const isMd = useResponsive("down", 462);
    const [packageType, setPackageType] = React.useState<PackageType>("smart_health_plus")
    const [modalOpen, setModalOpen] = React.useState(false);

    const handleDetailClick = React.useCallback(() => {
        // const options: PhotoSwipeOptions = {
        //     dataSource: [{src: "/assets/procedure_1.svg", width: 1102, height: 460}],
        //     secondaryZoomLevel: 2,
        //     maxZoomLevel: 2
        // }
        // const pswp = new PhotoSwipe(options);
        // pswp.init();
        setModalOpen(true)
    }, [])

    return (
        <>
            <Box height="100%">
                <Stack justifyContent="center" direction="row" spacing={1} mb={4} width="100%">
                    {(["smart_health_plus", "premium", "diamond_plus"] as PackageType[]).map((t) => (
                        <Button
                            key={t}
                            {...(t !== packageType ? {
                                variant: "text"
                            } : {

                            })}
                            onClick={() => setPackageType(t)}
                            sx={{
                                py: 2,
                                // height: "100%",
                                ...(t !== packageType && {
                                    borderColor: "white"
                                })
                            }}
                            fullWidth
                        >
                            {getPackageTypeName(t)}
                        </Button>
                    ))}
                </Stack>

                {/* Specified package type manually instead of passing state to prevent glitch when changing content tab */}
                <DetailPackage packageType={"smart_health_plus"} onDetailClick={handleDetailClick} sx={{
                    display: packageType === "smart_health_plus" ? "block" : "none",
                    opacity: packageType === "smart_health_plus" ? 1 : 0,
                    transition: (t) => t.transitions.create("opacity", { duration: t.transitions.duration.leavingScreen }),
                }} />
                <DetailPackage packageType={"premium"} onDetailClick={handleDetailClick} sx={{
                    display: packageType === "premium" ? "block" : "none",
                    opacity: packageType === "premium" ? 1 : 0,
                    transition: (t) => t.transitions.create("opacity", { duration: t.transitions.duration.leavingScreen }),
                }} />
                <DetailPackage packageType={"diamond_plus"} onDetailClick={handleDetailClick} sx={{
                    display: packageType === "diamond_plus" ? "block" : "none",
                    opacity: packageType === "diamond_plus" ? 1 : 0,
                    transition: (t) => t.transitions.create("opacity", { duration: t.transitions.duration.leavingScreen }),
                }} />
            </Box>

            <Modal
                open={modalOpen}
                onClose={() => setModalOpen(false)}
                loading={false}
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    px: "10%",
                }}>
                <Box sx={{
                    bgcolor: "#F9F9F9",
                    borderRadius: 2,
                    px: 6,
                    pt: 6,
                    pb: 12,
                    display: 'flex',
                    flexDirection: "column",
                    alignItems: 'center',
                    justifyContent: 'center',
                    overflowX: 'scroll',
                    overflowY: "scroll",
                    scrollbarWidth: "none",
                }}>
                    <Box sx={{
                        display: "flex",
                        width: "100%",
                        justifyContent: "end",
                    }}>
                        <IconButton onClick={() => setModalOpen(false)} size="small">
                            <Iconify icon="ic:baseline-clear" />
                        </IconButton>
                    </Box>
                    {/* <Typography pb={6} variant="h3" fontFamily={FONT_SECONDARY} color={packageType === "premium" ? "#B49649" : packageType === "diamond_plus" ? "#5C5C5C" : "primary.main"} sx={{ flex: "none" }}>{`${getPackageTypeName(packageType)} Claim Procedure`}</Typography> */}
                    {packageType === "smart_health_plus" ? (
                        <SvgProcedureSmartHealthPlus sx={{  }} />
                    ) : packageType === "premium" ? (
                        <SvgProcedurePremium sx={{ height: "100%" }} />
                    ) : packageType === "diamond_plus" ? (
                        <SvgProcedureDiamondPlus sx={{ height: "100%" }} />
                    ) : null}
                </Box>
            </Modal>
        </>
    );
}