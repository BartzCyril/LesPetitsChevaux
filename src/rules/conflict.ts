import {PlayerColor} from "@/type/PlayerColor";
import {Index} from "@/type/GameBoard";
import {PlayerColors} from "@/interface/GameBoard";
import {ErrorMessage} from "@/type/ErrorMessage";
import {inflate} from "zlib";
import {getMaxAge} from "next/dist/server/image-optimizer";

export function isConflictBetweenSameColor(turn: PlayerColor, gameBoard: HTMLElement, indexPath: Index, handleError: (message: ErrorMessage | null) => void) {
    const cell = gameBoard.querySelector(`#cell-${indexPath}`)
    handleError(null)
    if (cell && cell.childNodes[0]) {
        const piece = cell.childNodes[0] as HTMLElement
        const pieceColor = piece.classList[0] as PlayerColor
        if (turn === pieceColor) {
            handleError(ErrorMessage.MOVE_PIECE_FIRST)
            return true
        }
    }
    return false
}

export function isConflitBetweenDifferentColor(playerColors: PlayerColors, gameBoard: HTMLElement, indexPath: Index, turn: PlayerColor, handleError: (message: ErrorMessage | null) => void) {
    const cell = gameBoard.querySelector(`#cell-${indexPath}`)
    if (cell && cell.childNodes[0]) {
        if (!isConflictBetweenSameColor(turn, gameBoard, indexPath, handleError)) {
            const piece = cell.childNodes[0] as HTMLElement
            const pieceColor = piece.classList[0] as PlayerColor
            const indexPiece = parseInt(piece.id.match(/piece-\w+-(\d+)/)?.[1] as string)
            const piecePlayerColor = playerColors[pieceColor].pieces[indexPiece]
            const elementPrison = gameBoard.querySelector(`#cell-${piecePlayerColor.indexPrison}`)
            piecePlayerColor.out = false
            piecePlayerColor.indexPath = -1
            if (elementPrison)
                elementPrison.appendChild(piece)
            return false
        }
        return true
    }
    return false
}
