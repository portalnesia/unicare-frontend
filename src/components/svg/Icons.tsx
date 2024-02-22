import SvgIcon from "@mui/material/SvgIcon/SvgIcon"
import { generateRandom } from "@portalnesia/utils"
import { SvgProps } from "./type"
import React from "react"

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

export function SvgProtect({ size = 80, maxSize, sx }: SvgProps) {
    const id = React.useRef(generateRandom(5))
    return (
        <SvgIcon {...(size || maxSize ? { sx: { fontSize: size, maxWidth: maxSize, height: 'auto', bgcolor: "transparent", color: "transparent", ...sx } } : { sx })}
            fill="none"
            viewBox="0 0 80 80"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                stroke="#003FB5"
                strokeLinejoin="round"
                strokeWidth={5}
                d="M17.5 29.57 40.011 23 62.5 29.57v13.472A32.895 32.895 0 0 1 40.004 74.25 32.9 32.9 0 0 1 17.5 43.036V29.57Z"
            />
            <path
                stroke="#003FB5"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={5}
                d="m28.75 46.75 8.75 8.75 15-15"
            />
            <path
                fill="#8AD82B"
                d="M13 7a12.997 12.997 0 0 0 9 9 12.997 12.997 0 0 0-9 9 12.997 12.997 0 0 0-9-9 12.997 12.997 0 0 0 9-9Z"
            />
        </SvgIcon>
    )
}
export function SvgMoneyBag({ size = 80, maxSize, sx }: SvgProps) {
    const id = React.useRef(generateRandom(5))
    return (
        <SvgIcon {...(size || maxSize ? { sx: { fontSize: size, maxWidth: maxSize, height: 'auto', bgcolor: "transparent", color: "transparent", ...sx } } : { sx })}
            fill="none"
            viewBox="0 0 80 80"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                fill="#8AD82B"
                d="M60.72 5a14.036 14.036 0 0 0 9.72 9.72 14.036 14.036 0 0 0-9.72 9.72A14.036 14.036 0 0 0 51 14.72 14.036 14.036 0 0 0 60.72 5Z"
            />
            <path
                stroke="#003FB5"
                strokeWidth={4}
                d="M50 30c0-4.715 0-7.07-1.465-8.535C47.07 20 44.715 20 40 20s-7.07 0-8.535 1.465C30 22.93 30 25.285 30 30M15 50c0-9.428 0-14.142 2.93-17.07C20.858 30 25.573 30 35 30h10c9.428 0 14.142 0 17.07 2.93C65 35.858 65 40.572 65 50s0 14.142-2.93 17.07C59.142 70 54.428 70 45 70H35c-9.427 0-14.142 0-17.07-2.93C15 64.143 15 59.428 15 50Z"
            />
            <path
                stroke="#003FB5"
                strokeLinecap="round"
                strokeWidth={4}
                d="M40 58.333c2.763 0 5-1.865 5-4.166 0-2.3-2.237-4.167-5-4.167s-5-1.865-5-4.167c0-2.3 2.237-4.166 5-4.166m0 16.666c-2.763 0-5-1.865-5-4.166m5 4.166V60m0-18.333V40m0 1.667c2.763 0 5 1.865 5 4.166"
            />
        </SvgIcon>
    )
}
export function SvgWallet({ size = 80, maxSize, sx }: SvgProps) {
    const id = React.useRef(generateRandom(5))
    return (
        <SvgIcon {...(size || maxSize ? { sx: { fontSize: size, maxWidth: maxSize, height: 'auto', bgcolor: "transparent", color: "transparent", ...sx } } : { sx })}
            fill="none"
            viewBox="0 0 80 80"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                fill="#8AD82B"
                d="M13.72 10a14.036 14.036 0 0 0 9.72 9.72 14.036 14.036 0 0 0-9.72 9.72A14.036 14.036 0 0 0 4 19.72 14.036 14.036 0 0 0 13.72 10Z"
            />
            <path
                stroke="#003FB5"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={4}
                d="M36.23 56.444h17.232M19 41.667h56M62.077 56.444h4.308M23.308 29C21.154 29 19 31.111 19 33.222v29.556C19 64.888 21.154 67 23.308 67h47.384C72.846 67 75 64.889 75 62.778V33.222C75 31.112 72.846 29 70.692 29H23.308Z"
            />
        </SvgIcon>
    )
}
export function SvgVerified({ size = 80, maxSize, sx }: SvgProps) {
    const id = React.useRef(generateRandom(5))
    return (
        <SvgIcon {...(size || maxSize ? { sx: { fontSize: size, maxWidth: maxSize, height: 'auto', bgcolor: "transparent", color: "transparent", ...sx } } : { sx })}
            fill="none"
            viewBox="0 0 80 80"
            xmlns="http://www.w3.org/2000/svg"
        >
            <g clipPath="url(#a)">
                <path
                    fill="#003FB5"
                    d="m39.263 46.46-4.21-4.176c-.533-.537-1.198-.806-1.995-.806-.798 0-1.488.294-2.071.88-.532.537-.799 1.22-.799 2.051 0 .83.267 1.514.799 2.052l6.244 6.3c.58.587 1.258.88 2.032.88.775 0 1.452-.293 2.033-.88l12.342-12.455c.58-.586.859-1.27.834-2.051a3.12 3.12 0 0 0-.834-2.052c-.58-.586-1.27-.89-2.068-.914-.797-.024-1.487.257-2.07.84L39.263 46.462Zm-8.13 26.524-4.212-7.18-7.985-1.759a2.739 2.739 0 0 1-1.743-1.134 2.738 2.738 0 0 1-.508-2.017l.799-8.279-5.446-6.3a2.753 2.753 0 0 1-.726-1.906c0-.733.243-1.367.727-1.905l5.444-6.3-.798-8.28a2.743 2.743 0 0 1 .508-2.017 2.724 2.724 0 0 1 1.742-1.134l7.986-1.758 4.211-7.18c.387-.635.92-1.063 1.597-1.284.678-.22 1.356-.184 2.033.111l7.55 3.224 7.55-3.224c.678-.293 1.356-.33 2.034-.111.677.219 1.21.647 1.597 1.284l4.21 7.18 7.986 1.758a2.735 2.735 0 0 1 1.743 1.137c.436.612.605 1.283.508 2.014l-.799 8.28 5.445 6.3c.484.538.727 1.172.727 1.905 0 .733-.243 1.368-.727 1.905l-5.445 6.301.8 8.28a2.743 2.743 0 0 1-.51 2.016 2.724 2.724 0 0 1-1.742 1.134l-7.985 1.758-4.211 7.18c-.387.636-.92 1.064-1.597 1.284-.678.221-1.355.184-2.033-.11l-7.55-3.225-7.55 3.224c-.678.293-1.356.33-2.034.111-.677-.218-1.21-.646-1.597-1.283Zm3.774-5.275 7.406-3.224 7.55 3.224 4.065-7.034 7.986-1.905-.726-8.206 5.373-6.155-5.373-6.3.726-8.207-7.986-1.758-4.21-7.034-7.406 3.224-7.55-3.224-4.065 7.034-7.986 1.758.726 8.206-5.373 6.301 5.373 6.155-.726 8.352 7.986 1.759 4.21 7.034Z"
                />
                <path
                    fill="#8AD82B"
                    d="M14 5a12.997 12.997 0 0 0 9 9 12.997 12.997 0 0 0-9 9 12.997 12.997 0 0 0-9-9 12.997 12.997 0 0 0 9-9Z"
                />
            </g>
            <defs>
                <clipPath id="a">
                    <path fill="#fff" d="M5 5h69v70H5z" />
                </clipPath>
            </defs>
        </SvgIcon>
    )
}
export function SvgCallCenter({ size = 80, maxSize, sx }: SvgProps) {
    const id = React.useRef(generateRandom(5))
    return (
        <SvgIcon {...(size || maxSize ? { sx: { fontSize: size, maxWidth: maxSize, height: 'auto', bgcolor: "transparent", color: "transparent", ...sx } } : { sx })}
            fill="none"
            viewBox="0 0 80 80"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                fill="#8AD82B"
                d="M63.72 0a14.036 14.036 0 0 0 9.72 9.72 14.036 14.036 0 0 0-9.72 9.72A14.036 14.036 0 0 0 54 9.72 14.036 14.036 0 0 0 63.72 0Z"
            />
            <path
                fill="#003FB5"
                d="M61.652 31.089h2.896a5.455 5.455 0 0 1 5.455 5.455v10.91a5.455 5.455 0 0 1-5.455 5.454h-2.896A21.822 21.822 0 0 1 40.002 72v-5.455a16.365 16.365 0 0 0 16.364-16.364V33.816a16.364 16.364 0 1 0-32.729 0v19.092h-8.182A5.455 5.455 0 0 1 10 47.453v-10.91a5.455 5.455 0 0 1 5.455-5.454h2.896a21.822 21.822 0 0 1 43.3 0Zm-46.197 5.455v10.91h2.727v-10.91h-2.727Zm46.366 0v10.91h2.727v-10.91h-2.727ZM28.437 52.322l2.891-4.626a16.288 16.288 0 0 0 8.674 2.485 16.288 16.288 0 0 0 8.673-2.485l2.89 4.626a21.72 21.72 0 0 1-11.563 3.314 21.716 21.716 0 0 1-11.565-3.314Z"
            />
        </SvgIcon>
    )
}