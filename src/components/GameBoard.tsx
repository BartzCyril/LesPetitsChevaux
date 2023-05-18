'use client'

import {
    CellEmpty,
    GameBoard,
    Index,
    Prison,
    Stable,
    StartingPoint
} from "@/type/GameBoard";
import {Cell} from "@/components/Cell";
import {Dice} from "@/components/Dice";
import {useCallback, useEffect, useRef, useState} from "react";
import {Piece, PlayerColors} from "@/interface/GameBoard";

let playerColors: PlayerColors = {
    yellow: {
        pathPiece: [44, 45, 46, 47, 48, 37, 26, 15, 4, 5, 6, 17, 28, 39, 50, 51, 52, 53, 54, 65, 76, 75, 74, 73, 72, 83, 94, 105, 116, 115, 114, 103, 92, 81, 70, 69, 68, 67, 66, 55, 56, 57, 58, 59],
        pieces: initialPiece([0, 1, 11, 12]),
        listDomPieces: [],
        isPlay: true
    },
    red: {
        pathPiece: [76, 75, 74, 73, 72, 83, 94, 105, 116, 115, 114, 103, 92, 81, 70, 69, 68, 67, 66, 55, 44, 45, 46, 47, 48, 37, 26, 15, 4, 5, 6, 17, 28, 39, 50, 51, 52, 53, 54, 65, 64, 63, 62, 61],
        pieces: initialPiece([108, 109, 119, 120]),
        listDomPieces: [],
        isPlay: true
    },
    green: {
        pathPiece: [6, 17, 28, 39, 50, 51, 52, 53, 54, 65, 76, 75, 74, 73, 72, 83, 94, 105, 116, 115, 114, 103, 92, 81, 70, 69, 68, 67, 66, 55, 44, 45, 46, 47, 48, 37, 26, 15, 4, 5, 16, 27, 38, 49],
        pieces: initialPiece([9, 10, 20, 21]),
        listDomPieces: [],
        isPlay: true
    },
    blue: {
        pathPiece: [114, 103, 92, 81, 70, 69, 68, 67, 66, 55, 44, 45, 46, 47, 48, 37, 26, 15, 4, 5, 6, 17, 28, 39, 50, 51, 52, 53, 54, 65, 76, 75, 74, 73, 72, 83, 94, 105, 116, 115, 104, 93, 82, 71],
        pieces: initialPiece([99, 100, 110, 111]),
        listDomPieces: [],
        isPlay: true

    }
}

function pushListDomPieces(color: string, piece: any) {
    if (piece === null)
        return
    playerColors[color].listDomPieces.push(piece)
}

function switchTurn(turn: string) {
    switch (turn) {
        case "yellow":
            return "green"
        case "red":
            return "blue"
        case "blue":
            return "yellow"
        default:
            return "red"
    }
}

function initialPiece(pathPiece: Index[]): Piece[] {
    let pieces: Piece[] = []
    for (let i = 0; i < 4; i++) {
        pieces.push({
            indexPrison: pathPiece[i],
            out: false,
            indexPath: -1
        })
    }
    return pieces
}

function isConflict(gameBoard: HTMLElement, indexPath: Index, turn: string): boolean {
    const cell = gameBoard.querySelector(`#cell-${indexPath}`)
    if (cell && cell.hasChildNodes()) {
        const piece = cell.childNodes[0] as HTMLElement
        const pieceColor = piece.classList[0]
        if (pieceColor === turn) {
            console.log("Vous devez d'abord avancer votre pion")
            return true
        } else {
            const indexPiece = parseInt(piece.id.match(/piece-\w+-(\d+)/)?.[1] as string)
            const piecePlayerColor = playerColors[pieceColor].pieces[indexPiece]
            const elementPrison = gameBoard.querySelector(`#cell-${piecePlayerColor.indexPrison}`)
            piecePlayerColor.out = false
            piecePlayerColor.indexPath = -1
            if (elementPrison)
                elementPrison.appendChild(piece)
            return false
        }
    }
    return false
}

function isPieceOut(turn: string): boolean {
    const pieces = playerColors[turn].pieces
    let count: number = 0
    for (let i = 0; i < pieces.length; i++) {
        if (pieces[i].out)
            count++
    }
    return count >= 1
}

function updateGameBoard(gameBoard: HTMLElement, pieceIndex: string, nextIndex: Index, turn: string) {
    const piece = gameBoard.querySelector(`#piece-${turn}-${pieceIndex}`)
    const nextPosition = gameBoard.querySelector(`#cell-${nextIndex}`)
    if (piece && nextPosition)
        nextPosition.appendChild(piece);
}

function moveForwardPiece(gameBoard: HTMLElement, diceResult: number, pieceIndex: string, turn: string, handleSwitchTurn: () => void) {
    const playerColor = playerColors[turn]
    if (!playerColor.pieces[parseInt(pieceIndex)].out) {
        if (diceResult === 6) {
            if (!isConflict(gameBoard, playerColor.pathPiece[0], turn)) {
                playerColor.pieces[parseInt(pieceIndex)].out = true
                playerColor.pieces[parseInt(pieceIndex)].indexPath = 0
                updateGameBoard(gameBoard, pieceIndex, playerColor.pathPiece[0], turn)
            }
        } else {
            console.log("Vous ne pouvez pas sortir de pion sans 6")
        }
    } else {
        const nextIndexPath = playerColor.pieces[parseInt(pieceIndex)].indexPath + diceResult;
        if (playerColor.pathPiece[nextIndexPath] && !isConflict(gameBoard, playerColor.pathPiece[nextIndexPath], turn)) {
            playerColor.pieces[parseInt(pieceIndex)].indexPath = nextIndexPath;
            updateGameBoard(gameBoard, pieceIndex, playerColor.pathPiece[nextIndexPath], turn);
        }
    }
    playerColors[turn].isPlay = diceResult !== 6;
}

export function GameBoard() {
    const GameBoard: GameBoard = [
        Prison.YELLOW, Prison.YELLOW, CellEmpty.TRANSPARENT, CellEmpty.TRANSPARENT, CellEmpty.BLACK, CellEmpty.BLACK, StartingPoint.GREEN, CellEmpty.TRANSPARENT, CellEmpty.TRANSPARENT, Prison.GREEN, Prison.GREEN,
        Prison.YELLOW, Prison.YELLOW, CellEmpty.TRANSPARENT, CellEmpty.TRANSPARENT, CellEmpty.BLACK, Stable.GREEN, CellEmpty.BLACK, CellEmpty.TRANSPARENT, CellEmpty.TRANSPARENT, Prison.GREEN, Prison.GREEN,
        CellEmpty.TRANSPARENT, CellEmpty.TRANSPARENT, CellEmpty.TRANSPARENT, CellEmpty.TRANSPARENT, CellEmpty.BLACK, Stable.GREEN, CellEmpty.BLACK, CellEmpty.TRANSPARENT, CellEmpty.TRANSPARENT, CellEmpty.TRANSPARENT, CellEmpty.TRANSPARENT,
        CellEmpty.TRANSPARENT, CellEmpty.TRANSPARENT, CellEmpty.TRANSPARENT, CellEmpty.TRANSPARENT, CellEmpty.BLACK, Stable.GREEN, CellEmpty.BLACK, CellEmpty.TRANSPARENT, CellEmpty.TRANSPARENT, CellEmpty.TRANSPARENT, CellEmpty.TRANSPARENT,
        StartingPoint.YELLOW, CellEmpty.BLACK, CellEmpty.BLACK, CellEmpty.BLACK, CellEmpty.BLACK, Stable.GREEN, CellEmpty.BLACK, CellEmpty.BLACK, CellEmpty.BLACK, CellEmpty.BLACK, CellEmpty.BLACK,
        CellEmpty.BLACK, Stable.YELLOW, Stable.YELLOW, Stable.YELLOW, Stable.YELLOW, CellEmpty.TRANSPARENT, Stable.RED, Stable.RED, Stable.RED, Stable.RED, CellEmpty.BLACK,
        CellEmpty.BLACK, CellEmpty.BLACK, CellEmpty.BLACK, CellEmpty.BLACK, CellEmpty.BLACK, Stable.BLUE, CellEmpty.BLACK, CellEmpty.BLACK, CellEmpty.BLACK, CellEmpty.BLACK, StartingPoint.RED,
        CellEmpty.TRANSPARENT, CellEmpty.TRANSPARENT, CellEmpty.TRANSPARENT, CellEmpty.TRANSPARENT, CellEmpty.BLACK, Stable.BLUE, CellEmpty.BLACK, CellEmpty.TRANSPARENT, CellEmpty.TRANSPARENT, CellEmpty.TRANSPARENT, CellEmpty.TRANSPARENT,
        CellEmpty.TRANSPARENT, CellEmpty.TRANSPARENT, CellEmpty.TRANSPARENT, CellEmpty.TRANSPARENT, CellEmpty.BLACK, Stable.BLUE, CellEmpty.BLACK, CellEmpty.TRANSPARENT, CellEmpty.TRANSPARENT, CellEmpty.TRANSPARENT, CellEmpty.TRANSPARENT,
        Prison.BLUE, Prison.BLUE, CellEmpty.TRANSPARENT, CellEmpty.TRANSPARENT, CellEmpty.BLACK, Stable.BLUE, CellEmpty.BLACK, CellEmpty.TRANSPARENT, CellEmpty.TRANSPARENT, Prison.RED, Prison.RED,
        Prison.BLUE, Prison.BLUE, CellEmpty.TRANSPARENT, CellEmpty.TRANSPARENT, StartingPoint.BLUE, CellEmpty.BLACK, CellEmpty.BLACK, CellEmpty.TRANSPARENT, CellEmpty.TRANSPARENT, Prison.RED, Prison.RED
    ]
    const [diceValue, setDiceValue] = useState(-1);
    const [turn, setTurn] = useState("")
    const gameBoardRef = useRef(null)

    const handleDiceRoll = (value: number) => {
        setDiceValue(value)
        if (turn === "") {
            setTurn("red")
            playerColors["red"].isPlay = false
        }
        if (turn !== "") {
            if (!isPieceOut(turn) && diceValue !== 6) {
                playerColors[turn].isPlay = true
            }
            if (playerColors[turn].isPlay) {
                handleSwitchTurn()
            }
        }
    }

    const handleSwitchTurn = useCallback(() => {
        setTurn(switchTurn(turn));
    }, [turn]);

    useEffect(() => {
        console.log(turn);
        const gameBoard = gameBoardRef.current as HTMLElement | null;

        const handleClick: EventListenerObject = {
            handleEvent(event: MouseEvent) {
                const piece = event.target as HTMLElement;
                const indexPlayerColor = piece.id.match(/piece-\w+-(\d+)/)?.[1];
                if (piece.classList.contains(turn) && diceValue !== -1 && indexPlayerColor) {
                    moveForwardPiece(gameBoard as HTMLElement, diceValue, indexPlayerColor, turn, handleSwitchTurn);
                }
            }
        };

        if (turn !== "") {
            playerColors[turn].listDomPieces.forEach((piece) => {
                if (piece)
                    piece.addEventListener('click', handleClick);
            })
        }

        return () => {
            if (turn !== "") {
                playerColors[turn].listDomPieces.forEach((piece) => {
                    if (piece)
                        piece.removeEventListener('click', handleClick);
                })
            }
        };
    }, [diceValue, turn, handleSwitchTurn]);

    return (
        <>
            <div className="gameBoard" ref={gameBoardRef}>
                <div className="gameBoard-grid">
                    {GameBoard.map((color, index) => <Cell color={color} id={`${index}`} key={`${index}`}
                                                           pushListDomPieces={pushListDomPieces}/>)}
                </div>
            </div>
            <Dice onDiceRoll={handleDiceRoll}/>
        </>
    )
}