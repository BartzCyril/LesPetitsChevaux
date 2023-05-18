import {CellState} from "@/type/GameBoard";
import {forwardRef, LegacyRef} from 'react';

type PieceProps = {
    color: CellState;
    id: string;
};

function PieceGame({color, id}: PieceProps, ref: LegacyRef<HTMLDivElement> | undefined) {
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
        <div className={`${color} piece`} id={`piece-${color}-${index}`} ref={ref}>
        </div>
    )
}

export default forwardRef(PieceGame)
