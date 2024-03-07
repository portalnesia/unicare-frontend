import SvgIcon from "@mui/material/SvgIcon";
import { SvgProps } from "./type";
import { generateRandom } from "@portalnesia/utils";
import React from "react";

export function SvgArt1({ size = 120, maxSize, sx }: SvgProps) {
    const id = React.useRef(generateRandom(5))
    return (
        <SvgIcon {...(size || maxSize ? { sx: { fontSize: size, maxWidth: maxSize, height: 'auto', bgcolor: "transparent", color: "transparent", ...sx } } : { sx })}
            fill="none"
            viewBox="0 0 209 359"
            xmlns="http://www.w3.org/2000/svg"
        >
            <rect
                width={477}
                height={71}
                x={322.716}
                y={373.494}
                fill="url(#a)"
                opacity={0.1}
                rx={35.5}
                transform="rotate(-135 322.716 373.494)"
            />
            <defs>
                <linearGradient
                    id="a"
                    x1={800.445}
                    x2={595.996}
                    y1={409.189}
                    y2={512.995}
                    gradientUnits="userSpaceOnUse"
                >
                    <stop stopColor="#6B9EFF" />
                    <stop offset={1} stopColor="#003FB5" stopOpacity={0} />
                </linearGradient>
            </defs>
        </SvgIcon>
    )
}

export function SvgArtLogin({ size = 4000, maxSize, sx }: SvgProps) {
    const id = React.useRef(generateRandom(5))
    return (
        <SvgIcon {...(size || maxSize ? { sx: { fontSize: size, maxWidth: maxSize, height: "auto", bgcolor: "transparent", color: "transparent", ...sx } } : { sx })}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 4000 4000"
        >
        </SvgIcon>
    )
}
