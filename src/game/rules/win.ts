import {PlayerColors} from "@/interface/GameBoard";
import {PlayerColor} from "@/type/PlayerColor";

export function win(playerColors: PlayerColors, gameBoard: HTMLElement, turn: PlayerColor): boolean {
    const playerColor = playerColors[turn]
    for (let i=playerColor.pathPiece.length - 4; i < playerColor.pathPiece.length; i++) {
        const cell = gameBoard.querySelector(`#cell-${playerColor.pathPiece[i]}`)
        if (!(cell && cell.hasChildNodes()))
            return false
    }
    return true
}