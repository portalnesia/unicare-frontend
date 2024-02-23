import { PackageType, getPackageTypeName } from "@/models/package";
import Box from "@mui/material/Box/Box";
import Stack from "@mui/material/Stack/Stack";
import React from "react";
import Button from "../Button";
import DetailPackage from "./DetailPackage";
import PhotoSwipe, { PhotoSwipeOptions } from 'photoswipe';
import 'photoswipe/style.css';
import Typography from "@mui/material/Typography/Typography";

export default function Packages() {
    const [packageType, setPackageType] = React.useState<PackageType>("smart_health_plus")

    const handleDetailClick = React.useCallback(() => {
        const options: PhotoSwipeOptions = {
            dataSource: [{src: "assets/mission3.png", width: 1440, height: 900}],
            secondaryZoomLevel: 2,
            maxZoomLevel: 2
        }
        const pswp = new PhotoSwipe(options);
        pswp.init();
    }, [packageType])

    return (
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
                            // py: 0.6,
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
    );
}