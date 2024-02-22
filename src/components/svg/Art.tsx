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

export function SvgArrow({ size = 12, maxSize, sx }: SvgProps) {
    const id = React.useRef(generateRandom(5))
    return (
        <SvgIcon {...(size || maxSize ? { sx: { fontSize: size, maxWidth: maxSize, height: 'auto', bgcolor: "transparent", color: "transparent", ...sx } } : { sx })}
            fill="none"
            viewBox="0 0 18 436"
            xmlns="http://www.w3.org/2000/svg"
        >
            <g
                stroke="#003FB5"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                clipPath="url(#a)"
            >
                <path d="M9 .998v432.009M17 427.021l-8 7.981-8-7.981" />
            </g>
            <defs>
                <clipPath id="a">
                    <path fill="#fff" d="M18 0v436H0V0z" />
                </clipPath>
            </defs>
        </SvgIcon>
    )
}

export function SvgStar({ size = 16, maxSize, sx }: SvgProps) {
    const id = React.useRef(generateRandom(5))
    return (
        <SvgIcon {...(size || maxSize ? { sx: { fontSize: size, maxWidth: maxSize, height: 'auto', bgcolor: "transparent", color: "transparent", ...sx } } : { sx })}
            fill="none"
            viewBox="0 0 18 18"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                fill="#8AD82B"
                d="M9 0a12.997 12.997 0 0 0 9 9 12.997 12.997 0 0 0-9 9 12.997 12.997 0 0 0-9-9 12.997 12.997 0 0 0 9-9Z"
            />
        </SvgIcon>
    )
}