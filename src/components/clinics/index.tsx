import Card from "@mui/material/Card/Card";
import CardContent from "@mui/material/CardContent/CardContent";
import React from "react";
import Clinic from "./Clinic";
import { clinics } from "root/data/content-data";

export default function Clinics() {
    const totalStep = clinics.length + 1
    const [step, setStep] = React.useState<{ index: number, totalStep: number }>({ index: 1, totalStep: totalStep });

    const handleNext = React.useCallback((index: number) => () => {
        setStep({ ...step, index: index })
    }, [])

    return (
        <Card sx={{
            bgcolor: "primary.main",
            borderTopLeftRadius: 8,
            borderTopRightRadius: 8,
            borderBottomLeftRadius: 0,
            borderBottomRightRadius: 0,
        }}>
            {/* <CardContent> */}
                {step.index === 1 ? (
                    <Clinic clinic={null} step={step} onNext={handleNext(2)} />
                ) : step.index === 2 ? (
                    <Clinic clinic={clinics[0]} step={step} onNext={handleNext(3)} />
                ) : step.index === 3 ? (
                    <Clinic clinic={clinics[1]} step={step} onNext={handleNext(4)} />
                ) : step.index === 4 ? (
                    <Clinic clinic={clinics[2]} step={step} onNext={handleNext(5)} />
                ) : step.index === 5 ? (
                    <Clinic clinic={clinics[3]} step={step} onNext={handleNext(1)} />
                ) : null}
            {/* </CardContent> */}
        </Card>
    );
}