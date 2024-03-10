import Img from "../Img";
import { SvgProps } from "./type";
import React from "react";

export function SvgLogo({ size = 50, maxSize, sx }: SvgProps) {
  return (
    <Img src="/logo.svg" sx={sx}  />
   )
}