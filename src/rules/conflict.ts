import {PlayerColor} from "@/type/PlayerColor";
import {Index} from "@/type/GameBoard";
import {PlayerColors} from "@/interface/GameBoard";
import {ErrorMessage} from "@/type/ErrorMessage";

function betweenSameColor(pieceColor: PlayerColor, turn: PlayerColor) {
    return pieceColor === turn
}

function betweenDifferentColor(playerColors: PlayerColors, gameBoard: HTMLElement, piece: HTMLElement, pieceColor: PlayerColor) {
    const indexPiece = parseInt(piece.id.match(/piece-\w+-(\d+)/)?.[1] as string)
    const piecePlayerColor = playerColors[pieceColor].pieces[indexPiece]
    const elementPrison = gameBoard.querySelector(`#cell-${piecePlayerColor.indexPrison}`)
    piecePlayerColor.out = false
    piecePlayerColor.indexPath = -1
    if (elementPrison)
        elementPrison.appendChild(piece)
}

export function isConflict(playerColors: PlayerColors, gameBoard: HTMLElement, indexPath: Index, turn: PlayerColor,  handleError: (message: ErrorMessage | null) => void): boolean {
    const cell = gameBoard.querySelector(`#cell-${indexPath}`)
    handleError(null)
    if (cell && cell.hasChildNodes()) {
        const piece = cell.childNodes[0] as HTMLElement
        const pieceColor = piece.classList[0] as PlayerColor
        if (betweenSameColor(pieceColor, turn)) {
            handleError(ErrorMessage.MOVE_PIECE_FIRST)
            return true
        }
        else {
            betweenDifferentColor(playerColors, gameBoard, piece, pieceColor)
            return false
        }
    }
    return false
}