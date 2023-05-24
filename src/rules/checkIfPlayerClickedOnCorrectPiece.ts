import {PlayerColor} from "@/type/PlayerColor";
import {Index} from "@/type/GameBoard";
import {ErrorMessage} from "@/type/ErrorMessage";
import {isConflictBetweenSameColor} from "@/rules/conflict";
import {PlayerColors} from "@/interface/GameBoard";
import {checkIfPlayerCanGoingToHome} from "@/rules/checkIfPlayerCanGoingToHome";

function numberPieceOut(playerColors: PlayerColors, turn: string): number {
    const pieces = playerColors[turn].pieces
    let count: number = 0
    for (let i = 0; i < pieces.length; i++) {
        if (pieces[i].out)
            count++
    }
    return count
}

function startingCellContainChild(playerColors: PlayerColors, gameBoard: HTMLElement, turn: PlayerColor) {
    const startingCell = gameBoard.querySelector(`#cell-${playerColors[turn].pathPiece[0]}`)
    if (startingCell && startingCell.hasChildNodes()) {
        const child = startingCell.childNodes[0] as HTMLElement
        const color = child.id.split("-")[1]
        return color === turn
    }
    return false
}

function checkIfClickedChildMatchesStartingCell(playerColors: PlayerColors, gameBoard: HTMLElement, turn: PlayerColor, pieceIndex: string): boolean {
    const startingCell = gameBoard.querySelector(`#cell-${playerColors[turn].pathPiece[0]}`)
    if (startingCell && startingCell.hasChildNodes()) {
        const child = startingCell.childNodes[0] as HTMLElement
        const index = child.id.match(/piece-\w+-(\d+)/)?.[1]
        return index === pieceIndex
    }
    return false
}

function checkIfPlayerClickedOnPieceBlockingStartingCell(playerColors: PlayerColors, gameBoard: HTMLElement, indexPath: Index, pieceIndex: string, turn: PlayerColor, diceResult: number) {
    const cell = gameBoard.querySelector(`#cell-${indexPath}`)
    if (cell && cell.hasChildNodes()) {
        const piece = cell.childNodes[0] as HTMLElement
        const pieceIndexColor = piece.id.match(/piece-\w+-(\d+)/)?.[1]
        if (pieceIndexColor !== pieceIndex) {
            const playerColor = playerColors[turn]
            const nextCell = gameBoard.querySelector(`#cell-${playerColor.pathPiece[diceResult*2]}`)
            if (nextCell && nextCell.hasChildNodes()) {
                const child = nextCell.childNodes[0] as HTMLElement
                const color = child.id.split("-")[1]
                if (color === turn) {
                    const nextPieceIndexColor = child.id.match(/piece-\w+-(\d+)/)?.[1]
                    return nextPieceIndexColor === pieceIndex
                }
            }
            return false
        }
        return true
    }
    return false
}

export function checkIfPlayerClickedOnCorrectPiece(playerColors: PlayerColors, pieceIndex: string, diceResult: number, isPieceOut: boolean, gameBoard: HTMLElement, turn: PlayerColor, errorMessage: ErrorMessage | null, handleError: (message: ErrorMessage | null) => void): boolean {
    const numberPieceOutColor = numberPieceOut(playerColors,turn)
    if (numberPieceOutColor >= 1 && numberPieceOutColor <= 4) {
        if (!checkIfPlayerCanGoingToHome(gameBoard, playerColors, turn, pieceIndex, diceResult)) {
            handleError(ErrorMessage.MOVE_PIECE_IN_HOUSE)
            return true
        }
    }
    if (numberPieceOutColor >= 1 && numberPieceOutColor < 4) {
        const playerColor = playerColors[turn]
        const nextIndexPath = playerColor.pathPiece[diceResult];
        if (checkIfClickedChildMatchesStartingCell(playerColors,gameBoard, turn, pieceIndex))
            return false
        if (startingCellContainChild(playerColors,gameBoard, turn) && isPieceOut && numberPieceOutColor > 1) {
            if (isConflictBetweenSameColor(turn, gameBoard, nextIndexPath, handleError)) {
                return !checkIfPlayerClickedOnPieceBlockingStartingCell(playerColors,gameBoard, nextIndexPath, pieceIndex, turn, diceResult)
            }
            handleError(ErrorMessage.CLEAR_START_CELL_FIRST)
            return true
        }
        if (!isPieceOut)
            return false
        else {
            if (numberPieceOutColor >= 1 && diceResult === 6) {
                handleError(ErrorMessage.RELEASE_PIECE_FIRST)
                return true
            }
        }
    }
    return false
}