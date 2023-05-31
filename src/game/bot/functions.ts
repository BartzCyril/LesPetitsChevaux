import {PlayerColor} from "@/type/PlayerColor";
import {isPieceOut, playerColors, updateGameBoard} from "@/game/functions";
import {isConflitBetweenDifferentColor} from "@/game/rules/conflict";
import {PlayerColors} from "@/interface/GameBoard";
import {checkIfPlayerClickedOnIncorrectPiece, startingCellContainChild} from "@/game/rules/correctPiece";
import {win} from "@/game/rules/win";

 function getPieceNotOut(gameBoard: HTMLElement, turn: PlayerColor): HTMLElement[] {
    const pieces = playerColors[turn].pieces
    const array: HTMLElement[] = []
    for (let i = 0; i < pieces.length; i++) {
        if (!pieces[i].out) {
            const cell = gameBoard.querySelector(`#cell-${pieces[i].indexPrison}`)
            if (cell && cell.hasChildNodes())
                array.push(cell.childNodes[0] as HTMLElement)
        }
    }
    return array
}

function getPieceOut(gameBoard: HTMLElement, turn: PlayerColor): HTMLElement[] {
    const pieces = playerColors[turn].pieces
    const playerColor = playerColors[turn]
    const array: HTMLElement[] = []
    for (let i = 0; i < pieces.length; i++) {
        if (pieces[i].out) {
            const cell = gameBoard.querySelector(`#cell-${playerColor.pathPiece[pieces[i].indexPath]}`)
            if (cell && cell.hasChildNodes())
                array.push(cell.childNodes[0] as HTMLElement)
        }
    }
    return array
}

function forwardPiece(playerColor: PlayerColors[PlayerColor], pieceOut: HTMLElement[], diceResult: number, gameBoard: HTMLElement, handleSwitchTurn: () => void, turn: PlayerColor) {
    for (const piece of pieceOut) {
        const index = parseInt(piece.id.split("-")[2])
        const playerColorPiece = playerColor.pieces[index]
        const nextPosition = playerColor.pathPiece[playerColorPiece.indexPath + diceResult]
        if (!checkIfPlayerClickedOnIncorrectPiece(playerColors, index, diceResult,true, gameBoard, turn)) {
            if (playerColor.pathPiece[playerColorPiece.indexPath + diceResult] && !isConflitBetweenDifferentColor(playerColors, gameBoard, nextPosition, turn)) {
                playerColorPiece.indexPath = playerColorPiece.indexPath + diceResult
                updateGameBoard(gameBoard, index, nextPosition, turn)
                if (win(playerColors, gameBoard, turn))
                    alert("win !!!!")
                if (diceResult === 6)
                    return
                handleSwitchTurn()
                return
            }
        }
    }
}

function eatPiece(playerColor: PlayerColors[PlayerColor], pieceOut: HTMLElement[], diceResult: number, gameBoard: HTMLElement, handleSwitchTurn: () => void, turn: PlayerColor) {
    for (const piece of pieceOut) {
        const index = parseInt(piece.id.split("-")[2])
        const playerColorPiece = playerColor.pieces[index]
        const nextPosition = playerColor.pathPiece[playerColorPiece.indexPath + diceResult]
        if (playerColor.pathPiece[playerColorPiece.indexPath + diceResult]) {
            const cell = gameBoard.querySelector(`#cell-${nextPosition}`)
            if (cell && cell.hasChildNodes()) {
                const child = cell.childNodes[0] as HTMLElement
                const colorChild = child.id.split("-")[1]
                const indexChild = parseInt(child.id.split("-")[2])
                const childPlayer = playerColors[colorChild].pieces[indexChild]
                if (turn !== colorChild) {
                    const elementPrison = gameBoard.querySelector(`#cell-${childPlayer.indexPrison}`)
                    childPlayer.out = false
                    childPlayer.indexPath = -1
                    playerColorPiece.indexPath = playerColorPiece.indexPath + diceResult
                    if (elementPrison)
                        elementPrison.appendChild(child)
                    if (cell)
                        cell.appendChild(piece)
                    return true
                }
            }
        }
    }
    return false
}

function outPiece(playerColor: PlayerColors[PlayerColor], pieceNotOut: HTMLElement, gameBoard: HTMLElement, turn: PlayerColor) {
    const index = parseInt(pieceNotOut.id.split("-")[2])
    const playerColorPiece = playerColor.pieces[index]
    playerColorPiece.out = true
    playerColorPiece.indexPath = 0
    updateGameBoard(gameBoard, index, playerColor.pathPiece[0], turn)
    return
}

export function moveForwardPieceBot(gameBoard: HTMLElement, diceResult: number, turn: PlayerColor, handleSwitchTurn: () => void) {
    const playerColor = playerColors[turn]
    if (!isPieceOut(turn)) {
        if (diceResult === 6)
            if (!isConflitBetweenDifferentColor(playerColors, gameBoard, playerColor.pathPiece[0], turn)) {
                playerColor.pieces[0].out = true
                playerColor.pieces[0].indexPath = 0
                updateGameBoard(gameBoard, 0, playerColor.pathPiece[0], turn)
                return
            }
        else
            return
    } else {
        const pieceOut: HTMLElement[] = getPieceOut(gameBoard, turn)
        if (pieceOut.length < 4) {
            if (diceResult !== 6) {
                if (startingCellContainChild(playerColors, gameBoard, turn)) {
                    forwardPiece(playerColor, pieceOut, diceResult, gameBoard, handleSwitchTurn, turn)
                }
                else {
                    if (eatPiece(playerColor, pieceOut, diceResult, gameBoard, handleSwitchTurn, turn)) {
                        handleSwitchTurn()
                        return
                    }
                    forwardPiece(playerColor, pieceOut, diceResult, gameBoard, handleSwitchTurn, turn)
                }
                return
            } else {
                const piecesNotOut: HTMLElement[] = getPieceNotOut(gameBoard,turn)
                if (!startingCellContainChild(playerColors, gameBoard, turn) && !isConflitBetweenDifferentColor(playerColors, gameBoard, playerColor.pathPiece[0], turn)) {
                    outPiece(playerColor, piecesNotOut[0], gameBoard, turn)
                } else {
                    if (eatPiece(playerColor, pieceOut, diceResult, gameBoard, handleSwitchTurn, turn)) {
                        return
                    }
                    forwardPiece(playerColor, pieceOut, diceResult, gameBoard, handleSwitchTurn, turn)
                }
                return
            }
        } else {
            if (eatPiece(playerColor, pieceOut, diceResult, gameBoard, handleSwitchTurn, turn)) {
                if (diceResult === 6)
                    return
                handleSwitchTurn()
                return
            }
            forwardPiece(playerColor, pieceOut, diceResult, gameBoard, handleSwitchTurn, turn)
        }
    }
}
// à un moment le bot joue à l'infini jusqu'a obtenir un 6 ?? probleme entre le tableau et le dom (difference de pions qui sont sorti)