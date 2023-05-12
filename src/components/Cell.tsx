import {CellState} from "@/type/GameBoard";
import {PieceGame} from "@/components/PieceGame";

type CellProps = {
    color: CellState
    id: string
}

export function Cell({color, id}: CellProps) {
    if (color === "transparent") {
        return (
            <div className={`${color}`} id={`${id}`}>
            </div>
        )
    }
    if (id === "0" || id === "1" || id === "11" || id === "12" ||
        id === "108" || id === "109" || id === "119" || id === "120" ||
        id === "9" || id === "10" || id === "20" || id === "21" ||
        id === "99" || id === "100" || id === "110" || id === "111"
    ) {
        return (
            <div className={`${color} pieceGame`} id={`${id}`}>
                <PieceGame color={color} id={id} />
            </div>
        )
    }
    return (
        <div className={`${color} pieceGame`} id={`${id}`}>
        </div>
    )
}