import {PlayerColor} from "@/type/PlayerColor";
import React from "react";

type ColorButtonProps = {
    color: PlayerColor
    handleColor?: (color: PlayerColor) => void
}

export function ColorButton({color, handleColor}: ColorButtonProps) {
    if (handleColor)
        return (
            <button className={`${color} h-6 w-6 rounded-full`} onClick={() => handleColor ? handleColor(color) : ""}></button>
        )
    return (
        <button className={`${color} h-6 w-6 rounded-full ml-1 mr-1`}></button>
    )
}