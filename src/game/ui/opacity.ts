import {PlayerColor} from "@/type/PlayerColor";
import {Index} from "@/type/GameBoard";
import {PlayerColors} from "@/interface/GameBoard";

export function addOpacity(gameBoard: HTMLElement, turn: PlayerColor) {
    const piecesGame: HTMLElement[] = Array.from(gameBoard.querySelectorAll('.pieceGame')) as HTMLElement[];
    for (const pieceGame of piecesGame) {
        if (pieceGame.hasChildNodes()) {
            const child = pieceGame.childNodes[0] as HTMLElement
            const childColor = child.id.split("-")[1]
            if (childColor !== turn) {
                pieceGame.style.transform = "scale(1)"
            } else {
                pieceGame.style.transform = "scale(1.2)"
            }
        }
    }
}

export function addOpacityIfMoveForwardPiece(playerColors: PlayerColors, gameBoard: HTMLElement, currentPosition: Index, nextPosition: Index, colorPlayer: PlayerColor) {
    const cellCurrentPosition = gameBoard.querySelector(`#cell-${currentPosition}`) as HTMLElement
    if (cellCurrentPosition) {
        cellCurrentPosition.style.opacity = "0.3"
    }
    const cellNextPosition = gameBoard.querySelector(`#cell-${nextPosition}`) as HTMLElement
    if (cellNextPosition) {
        if (cellNextPosition.hasChildNodes()) {
            const child = cellNextPosition.childNodes[0] as HTMLElement
            const childColor = child.id.split("-")[1]
            if (childColor !== colorPlayer) {
                const childIndex = child.id.split("-")[2]
                const playerColor = playerColors[childColor]
                const indexPathPrison = playerColor.pieces[parseInt(childIndex)].indexPrison
                const cell = gameBoard.querySelector(`#cell-${indexPathPrison}`) as HTMLElement
                if (cell) {
                    cell.style.opacity = "0.6"
                }
                cellNextPosition.style.removeProperty("opacity")
            }
        }
        cellNextPosition.style.removeProperty("opacity")
    }
}

export function removeOpacity(gameBoard: HTMLElement) {
    const piecesGame: HTMLElement[] = Array.from(gameBoard.querySelectorAll('.pieceGame')) as HTMLElement[];
    for (const pieceGame of piecesGame) {
        if (pieceGame.hasChildNodes()) {
            if (pieceGame.style.opacity === "0.6")
                pieceGame.style.removeProperty("opacity")
            else if (pieceGame.style.opacity === "0.3")
                pieceGame.style.removeProperty("opacity")
        } else {
            if (pieceGame.style.opacity === "0.3")
                pieceGame.style.removeProperty("opacity")
        }
    }
}