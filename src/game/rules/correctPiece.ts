import {PlayerColor} from "@/type/PlayerColor";
import {Index} from "@/type/GameBoard";
import {ErrorMessage} from "@/type/ErrorMessage";
import {isConflictBetweenSameColor} from "@/game/rules/conflict";
import {PlayerColors} from "@/interface/GameBoard";
import {home} from "@/game/rules/home";

function numberPieceOut(playerColors: PlayerColors, turn: string): number {
    const pieces = playerColors[turn].pieces
    let count: number = 0
    for (let i = 0; i < pieces.length; i++) {
        if (pieces[i].out)
            count++
    }
    return count
}

export function startingCellContainChild(playerColors: PlayerColors, gameBoard: HTMLElement, turn: PlayerColor) {
    const startingCell = gameBoard.querySelector(`#cell-${playerColors[turn].pathPiece[0]}`)
    if (startingCell && startingCell.hasChildNodes()) {
        const child = startingCell.childNodes[0] as HTMLElement
        const color = child.id.split("-")[1]
        return color === turn
    }
    return false
}

function checkIfClickedChildMatchesStartingCell(playerColors: PlayerColors, gameBoard: HTMLElement, turn: PlayerColor, pieceIndex: Index): boolean {
    const startingCell = gameBoard.querySelector(`#cell-${playerColors[turn].pathPiece[0]}`)
    if (startingCell && startingCell.hasChildNodes()) {
        const child = startingCell.childNodes[0] as HTMLElement
        const index = child.id.split("-")[2]
        return parseInt(index) === pieceIndex
    }
    return false
}

function checkIfPlayerClickedOnPieceBlockingStartingCell(playerColors: PlayerColors, gameBoard: HTMLElement, indexPath: Index, pieceIndex: Index, turn: PlayerColor, diceResult: number) {
    const cell = gameBoard.querySelector(`#cell-${indexPath}`)
    const playerColor = playerColors[turn]
    if (cell && cell.hasChildNodes()) {
        const child = cell.childNodes[0] as HTMLElement
        const childIndex = child.id.split("-")[2]
        const nextCell = gameBoard.querySelector(`#cell-${playerColor.pathPiece[diceResult*2]}`)
        let isBlockNextCell = false
        if (nextCell && nextCell.hasChildNodes()) {
            const child = nextCell.childNodes[0] as HTMLElement
            const color = child.id.split("-")[1]
            if (color === turn)
                isBlockNextCell = true
        }
        if (!isBlockNextCell) {
            return pieceIndex === parseInt(childIndex)
        }
    }
    return true
}

export function checkIfPlayerClickedOnIncorrectPiece(playerColors: PlayerColors, pieceIndex: Index, diceResult: number, isPieceOut: boolean, gameBoard: HTMLElement, turn: PlayerColor, errorMessage?: ErrorMessage | null, handleError?: (message: ErrorMessage | null) => void): boolean {
    const numberPieceOutColor = numberPieceOut(playerColors,turn)
    if (numberPieceOutColor >= 1 && numberPieceOutColor <= 4) {
        if (!home(gameBoard, playerColors, turn, pieceIndex, diceResult, handleError) && playerColors[turn].pathPiece[playerColors[turn].pieces[pieceIndex].indexPath + diceResult]) {
            return true
        }
    }
    if (numberPieceOutColor >= 1 && numberPieceOutColor < 4) {
        if (!isPieceOut)
            return false
        else {
            if (numberPieceOutColor >= 1 && diceResult === 6 && !startingCellContainChild(playerColors,gameBoard, turn)) {
                if (handleError) {
                    handleError(ErrorMessage.RELEASE_PIECE_FIRST)
                }
                return true
            }
        }
        const playerColor = playerColors[turn]
        const nextIndexPath = playerColor.pathPiece[diceResult];
        if (checkIfClickedChildMatchesStartingCell(playerColors,gameBoard, turn, pieceIndex))
            return false
        if (startingCellContainChild(playerColors,gameBoard, turn) && isPieceOut && numberPieceOutColor > 1) {
            if (isConflictBetweenSameColor(turn, gameBoard, nextIndexPath, handleError)) {
                if (!checkIfPlayerClickedOnPieceBlockingStartingCell(playerColors,gameBoard, nextIndexPath, pieceIndex, turn, diceResult)) {
                    if (handleError) {
                        handleError(ErrorMessage.CLICK_PIECE_BLOCK_START_CELL)
                    }
                    return true
                }
                return false
            }
            if (handleError) {
                handleError(ErrorMessage.CLEAR_START_CELL_FIRST)
            }
            return true
        }
    }
    return false
}
