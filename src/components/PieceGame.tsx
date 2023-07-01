import {CellState} from "@/type/GameBoard";
import {forwardRef, Ref} from 'react';
import {PlayerColor} from "@/type/PlayerColor";
import Image from "next/image";

type PieceProps = {
    color: CellState | PlayerColor;
    id: string;
    colorPlayer : PlayerColor
};

function PieceGame({color, id, colorPlayer}: PieceProps, ref: Ref<HTMLImageElement | null> | undefined) {
    let index: number = 0;
    if (id === "0" || id === "108" || id === "9" || id === "99")
        index = 0
    else if (id === "1" || id === "109" || id === "10" || id === "100")
        index = 1
    else if (id === "11" || id === "119" || id === "20" || id === "110")
        index = 2
    else
        index = 3

    return (
        <Image width={0}
        height={0} src={color === colorPlayer ? `./img/person-${color}.svg` : `./img/robot-${color}.svg`} className={`piece`} id={`piece-${color}-${index}`} ref={ref} alt="piece game"/>
        
    )
}

export default forwardRef(PieceGame)
