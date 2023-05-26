import {PlayerColors} from "@/interface/GameBoard";
import {PlayerColor} from "@/type/PlayerColor";
import {ErrorMessage} from "@/type/ErrorMessage";

function getPieceIndexIfPlayerGoingToHome(playerColors: PlayerColors, turn: PlayerColor, pieceIndex: string, diceResult: number): number {
    const playerColor = playerColors[turn]
    const nextIndexPath = playerColor.pieces[parseInt(pieceIndex)].indexPath + diceResult
    if (playerColor.pathPiece[nextIndexPath]) {
        for (let i = playerColor.pathPiece.length - 4; i < playerColor.pathPiece.length; i++) {
            if (playerColor.pathPiece[nextIndexPath] === playerColor.pathPiece[i])
                return nextIndexPath
        }
    }
    return -1
}

function countPiecesInHouse(playerColors: PlayerColors, gameBoard: HTMLElement, turn: PlayerColor): HTMLElement[] {
    const playerColor = playerColors[turn];
    let childs: HTMLElement[] = [];
    for (let i = playerColor.pathPiece.length - 4; i < playerColor.pathPiece.length; i++) {
        const cell = gameBoard.querySelector<HTMLElement>(`#cell-${playerColor.pathPiece[i]}`);
        if (cell && cell.hasChildNodes()) {
            childs.push(cell.childNodes[0] as HTMLElement);
        }
    }
    return childs;
}

function getPositionPrison(playerColors: PlayerColors, turn: PlayerColor, indexPath: number): number {
    const playerColor = playerColors[turn]
    let k = 0
    for (let i = playerColor.pathPiece.length - 4; i < playerColor.pathPiece.length; i++) {
        if (playerColor.pathPiece[indexPath] === playerColor.pathPiece[i])
            return k
        k++
    }
    return k
}

function isPieceInHome(playerColors: PlayerColors, turn: PlayerColor, pieceIndex: string) {
    const playerColor = playerColors[turn]
    for (let i = playerColor.pathPiece.length - 4; i < playerColor.pathPiece.length; i++) {
        if (playerColor.pathPiece[playerColor.pieces[pieceIndex].indexPath] === playerColor.pathPiece[i])
            return true
    }
    return false
}

export function home(gameBoard: HTMLElement, playerColors: PlayerColors, turn: PlayerColor, pieceIndex: string, diceResult: number, handleError: (message: ErrorMessage | null) => void): boolean {
    const playerColor = playerColors[turn]
    if (isPieceInHome(playerColors, turn, pieceIndex)) {
        if (playerColor.pathPiece[playerColor.pieces[parseInt(pieceIndex)].indexPath + diceResult]) {
            const piecesInHouse = countPiecesInHouse(playerColors, gameBoard, turn)
            if (piecesInHouse.length >= 1) {
                if (piecesInHouse.length === 1)
                    return true
                else {
                    const positionPlayer = playerColors[turn].pieces[parseInt(pieceIndex)].indexPath
                    const playerPositionPrison = getPositionPrison(playerColors, turn, positionPlayer)
                    const nextPositionPlayer = playerColors[turn].pieces[parseInt(pieceIndex)].indexPath + diceResult
                    const playerNextPositionPrison = getPositionPrison(playerColors, turn, nextPositionPlayer)
                    for (const child of piecesInHouse) {
                        const childIndex = parseInt(child.id.match(/piece-\w+-(\d+)/)?.[1] as string)
                        const childIndexPath = playerColors[turn].pieces[childIndex].indexPath
                        const childPositionPrison = getPositionPrison(playerColors, turn, childIndexPath)
                        if (childPositionPrison === playerNextPositionPrison)
                            return false
                        if (childPositionPrison !== playerPositionPrison && playerPositionPrison < childPositionPrison) {
                            if (playerNextPositionPrison >= childPositionPrison) {
                                handleError(ErrorMessage.MOVE_PIECE_IN_HOUSE)
                                return false
                            }
                        }
                    }
                    return true
                }
            }
        }
        return false
    }
    const nextPieceIndex = getPieceIndexIfPlayerGoingToHome(playerColors, turn, pieceIndex, diceResult)
    if (nextPieceIndex !== -1) {
        const piecesInHouse = countPiecesInHouse(playerColors, gameBoard, turn)
        if (piecesInHouse.length >= 1) {
            const nextPiecePositionPrison = getPositionPrison(playerColors, turn, nextPieceIndex)
            for (const child of piecesInHouse) {
                const childIndex = parseInt(child.id.match(/piece-\w+-(\d+)/)?.[1] as string)
                const childIndexPath = playerColors[turn].pieces[childIndex].indexPath
                const childPositionPrison = getPositionPrison(playerColors, turn, childIndexPath)
                if ((playerColors[turn].pieces[parseInt(pieceIndex)].indexPath + diceResult) === childIndexPath) {
                    handleError(ErrorMessage.MOVE_PIECE_IN_HOUSE_OR_IMPOSSIBLE)
                    return false
                }
                if (nextPiecePositionPrison >= childPositionPrison) {
                    handleError(ErrorMessage.MOVE_PIECE_IN_HOUSE)
                    return false
                }
            }
        }
        return true
    }
    return true
}