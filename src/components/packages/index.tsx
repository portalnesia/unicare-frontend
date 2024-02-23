import { PackageType, getPackageTypeName } from "@/models/package";
import Box from "@mui/material/Box/Box";
import Stack from "@mui/material/Stack/Stack";
import React from "react";
import Button from "../Button";
import DetailPackage from "./DetailPackage";

export default function Packages() {
    const [packageType, setPackageType] = React.useState<PackageType>("smart_health_plus")

    return (
        <Box>
            <Stack justifyContent="center" direction="row" spacing={1} mb={4} width="100%">
                {(["smart_health_plus" , "premium" , "diamond_plus"] as PackageType[]).map((t) => (
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

            <DetailPackage packageType={packageType} sx={{
                display: packageType === "smart_health_plus" ? "block" : "none",
                opacity: packageType === "smart_health_plus" ? 1 : 0,
                transition: (t) => t.transitions.create("opacity", { duration: t.transitions.duration.leavingScreen }),
            }} />
            <DetailPackage packageType={packageType} sx={{
                display: packageType === "premium" ? "block" : "none",
                opacity: packageType === "premium" ? 1 : 0,
                transition: (t) => t.transitions.create("opacity", { duration: t.transitions.duration.leavingScreen }),
            }} />
            <DetailPackage packageType={packageType} sx={{
                display: packageType === "diamond_plus" ? "block" : "none",
                opacity: packageType === "diamond_plus" ? 1 : 0,
                transition: (t) => t.transitions.create("opacity", { duration: t.transitions.duration.leavingScreen }),
            }} />
        </Box>
    );
}