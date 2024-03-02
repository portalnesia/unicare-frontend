import Card from "@mui/material/Card/Card";
import React from "react";
import Clinic from "./Clinic";
import { clinics } from "root/data/content-data";
import Box from "@mui/material/Box/Box";
import { SvgArt1 } from "../svg/Art";

export default function Clinics() {
    const totalStep = clinics.length + 1
    const [step, setStep] = React.useState<{ index: number, totalStep: number }>({ index: 1, totalStep: totalStep });
    const [opacity, setOpacity] = React.useState(1);

    const handleNext = React.useCallback((index: number) => () => {
        setOpacity(0);
        setTimeout(() => {
            setStep({ ...step, index: index });
            setOpacity(1);
        }, 200);

    }, [])

    React.useEffect(() => {
        setOpacity(1);
    }, [step]);

    return (
        <Card sx={{
            bgcolor: "primary.main",
            borderTopLeftRadius: 8,
            borderTopRightRadius: 8,
            borderBottomLeftRadius: 0,
            borderBottomRightRadius: 0,
        }}>
            <Box sx={{
                transition: 'opacity 0.5s ease-in-out',
                opacity: opacity,
                overflow: "hidden",
                position: "relative"
            }}>
                {step.index === 1 ? (
                    <Clinic clinic={null} step={step} onNext={handleNext(2)} sx={{ zIndex: 1 }} />
                ) : step.index === 2 ? (
                    <Clinic clinic={clinics[0]} step={step} onNext={handleNext(3)} sx={{ zIndex: 1 }} />
                ) : step.index === 3 ? (
                    <Clinic clinic={clinics[1]} step={step} onNext={handleNext(4)} sx={{ zIndex: 1 }} />
                ) : step.index === 4 ? (
                    <Clinic clinic={clinics[2]} step={step} onNext={handleNext(5)} sx={{ zIndex: 1 }} />
                ) : step.index === 5 ? (
                    <Clinic clinic={clinics[3]} step={step} onNext={handleNext(1)} sx={{ zIndex: 1 }} />
                ) : null}

                <SvgArt1 size={400} sx={{
                    position: "absolute",
                    right: 400,
                    bottom: -450,
                    display: { xs: "none", lg: "block" },
                    zIndex: 0,
                    transform: "scaleX(-1)",
                }} />
                <SvgArt1 size={400} sx={{
                    position: "absolute",
                    right: 400,
                    top: 0,
                    display: { xs: "none", lg: "block" },
                    zIndex: 0,
                    transform: "scaleX(-1)",
                }} />
            </Box>
        </Card>
    );
}