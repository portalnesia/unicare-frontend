import Card from "@mui/material/Card/Card";
import CardContent from "@mui/material/CardContent/CardContent";
import React from "react";

export default function Clinics() {
    const [step, setStep] = React.useState(1);

    const handleNext = React.useCallback((index: number) => {
        setStep(index)
    }, [])

    return (
        <Card sx={{
            bgcolor: "primary.main",
            borderTopLeftRadius: 8,
            borderTopRightRadius: 8,
            borderBottomLeftRadius: 0,
            borderBottomRightRadius: 0,
        }}>
            <CardContent>
                {step === 1 ? (
                    <>asdasd</>
                ) : step === 2 ? (
                    <>123213</>
                ) : step === 3 ? (
                    <>!@$!@$</>
                ) : step === 4 ? (
                    <>!@$!@$</>
                ) : step === 5 ? (
                    <>!@$!@$</>
                ) : null}
            </CardContent>
        </Card>
    );
}