import {CellState} from "@/type/GameBoard";

type CellProps = {
    color: CellState
    positionXY: string
}

export function Cell({color, positionXY}: CellProps) {
    return (
        <div className={`${color} ${color !== "transparent" && "pieceGame"}`} id={`${positionXY}`}>
        </div>
    )
}