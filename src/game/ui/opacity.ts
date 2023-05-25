import {PlayerColor} from "@/type/PlayerColor";
import {Index} from "@/type/GameBoard";
import {PlayerColors} from "@/interface/GameBoard";
import Loadable from "next/dist/shared/lib/loadable";
import preloadAll = Loadable.preloadAll;

export function addOpacity(gameBoard: HTMLElement, turn: PlayerColor) {
    const piecesGame = gameBoard.querySelectorAll('.pieceGame')
    for (const pieceGame of piecesGame) {
        if (pieceGame.hasChildNodes()) {
            const child = pieceGame.childNodes[0] as HTMLElement
            const childColor = child.id.split("-")[1]
            if (childColor !== turn) {
                pieceGame.classList.add("opacity-60")
            }
        } else {
            pieceGame.classList.add("opacity-30")
        }
    }
}

export function addOpacityIfMoveForwardPiece(playerColors: PlayerColors, gameBoard: HTMLElement, currentPosition: Index, nextPosition: Index, colorPlayer: PlayerColor) {
    const cellCurrentPosition = gameBoard.querySelector(`#cell-${currentPosition}`)
    if (cellCurrentPosition) {
        cellCurrentPosition.classList.add("opacity-30")
    }
    const cellNextPosition = gameBoard.querySelector(`#cell-${nextPosition}`)
    if (cellNextPosition) {
        if (cellNextPosition.hasChildNodes()) {
            const child = cellNextPosition.childNodes[0] as HTMLElement
            const childColor = child.id.split("-")[1]
            if (childColor !== colorPlayer) {
                const childIndex = child.id.split("-")[2]
                const playerColor = playerColors[childColor]
                const indexPathPrison = playerColor.pieces[parseInt(childIndex)].indexPrison
                const cell = gameBoard.querySelector(`#cell-${indexPathPrison}`)
                if (cell) {
                    cell.classList.remove("opacity-30")
                    cell.classList.add("opacity-60")
                }
                cellNextPosition.classList.remove("opacity-30")
            }
        }
        cellNextPosition.classList.remove("opacity-30")
    }
}

export function removeOpacity(gameBoard: HTMLElement) {
    const piecesGame = gameBoard.querySelectorAll('.pieceGame')
    for (const pieceGame of piecesGame) {
        if (pieceGame.hasChildNodes()) {
            if (pieceGame.classList.contains("opacity-60"))
                pieceGame.classList.remove("opacity-60")
            else if (pieceGame.classList.contains("opacity-30"))
                pieceGame.classList.remove("opacity-30")
        } else {
            if (pieceGame.classList.contains("opacity-30"))
                pieceGame.classList.remove("opacity-30")
        }
    }
}