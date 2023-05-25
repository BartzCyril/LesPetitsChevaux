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

export function home(gameBoard: HTMLElement, playerColors: PlayerColors, turn: PlayerColor, pieceIndex: string, diceResult: number, handleError: (message: ErrorMessage | null) => void): boolean {
    const nextPieceIndex = getPieceIndexIfPlayerGoingToHome(playerColors, turn, pieceIndex, diceResult)
    if (nextPieceIndex !== -1) {
        const piecesInHouse = countPiecesInHouse(playerColors, gameBoard, turn)
        if (piecesInHouse.length >= 1) {
            const nextPiecePositionPrison = getPositionPrison(playerColors, turn, nextPieceIndex)
            for (const child of piecesInHouse) {
                const childIndex = parseInt(child.id.match(/piece-\w+-(\d+)/)?.[1] as string)
                const childIndexPath = playerColors[turn].pieces[childIndex].indexPath
                if ((playerColors[turn].pieces[pieceIndex].indexPath + diceResult) === childIndexPath) {
                    handleError(ErrorMessage.MOVE_PIECE_IN_HOUSE_OR_IMPOSSIBLE)
                    return false
                }
            }
            if (playerColors[turn].pathPiece[nextPieceIndex] === playerColors[turn].pathPiece[playerColors[turn].pieces[pieceIndex].indexPath + 1])
                return true
            for (const child of piecesInHouse) {
                const childIndex = parseInt(child.id.match(/piece-\w+-(\d+)/)?.[1] as string)
                const childIndexPath = playerColors[turn].pieces[childIndex].indexPath
                const childPositionPrison = getPositionPrison(playerColors, turn, childIndexPath)
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