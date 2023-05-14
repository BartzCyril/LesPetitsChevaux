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
    },
    red: {
        pathPiece: [76, 75, 74, 73, 72, 83, 94, 105, 116, 115, 114, 103, 92, 81, 70, 69, 68, 67, 66, 55, 44, 45, 46, 47, 48, 37, 26, 15, 4, 5, 6, 17, 28, 39, 50, 51, 52, 53, 54, 65, 64, 63, 62, 61],
        pieces: initialPiece([108, 109, 119, 120])
    },
    green: {
        pathPiece: [6, 17, 28, 39, 50, 51, 52, 53, 54, 65, 76, 75, 74, 73, 72, 83, 94, 105, 116, 115, 114, 103, 92, 81, 70, 69, 68, 67, 66, 55, 44, 45, 46, 47, 48, 37, 26, 15, 4, 5, 16, 27, 38, 49],
        pieces: initialPiece([9, 10, 20, 21])
    },
    blue: {
        pathPiece: [114, 103, 92, 81, 70, 69, 68, 67, 66, 55, 44, 45, 46, 47, 48, 37, 26, 15, 4, 5, 6, 17, 28, 39, 50, 51, 52, 53, 54, 65, 76, 75, 74, 73, 72, 83, 94, 105, 116, 115, 104, 93, 82, 71],
        pieces: initialPiece([99, 100, 110, 111])
    }
}

function switchTurn(turn: string) {
    switch (turn) {
        case "yellow" :
            return "green"
        case "red" :
            return "blue"
        case "blue" :
            return "yellow"
        case "green" :
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
    if (cell.hasChildNodes()) {
        const piece = cell.childNodes[0] as HTMLElement
        const pieceColor = piece.classList[0]
        if (pieceColor === turn) {
            console.log("Vous devez d'abord avancer votre pion")
            return true
        } else {
            const indexPiece = piece.id
            const piecePlayerColor = playerColors[pieceColor].pieces[indexPiece]
            const elementPrison = gameBoard.querySelector(`#cell-${piecePlayerColor.indexPrison}`)
            piecePlayerColor.out = false
            piecePlayerColor.indexPath = -1
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
    nextPosition.appendChild(piece);
}

function moveForwardPiece(gameBoard: HTMLElement, diceResult: number, pieceIndex: string, turn: string, handleSwitchTurn: () => void) {
    const playerColor = playerColors[turn]
    if (!playerColor.pieces[pieceIndex].out) {
        if (diceResult === 6) {
            if (!isConflict(gameBoard, playerColor.pathPiece[0], turn)) {
                playerColor.pieces[pieceIndex].out = true
                playerColor.pieces[pieceIndex].indexPath = 0
                updateGameBoard(gameBoard, pieceIndex, playerColor.pathPiece[0], turn)
            }
        } else {
            console.log("Vous ne pouvez pas sortir de pion sans 6")
            return
        }
    } else {
        const nextIndexPath = playerColor.pieces[pieceIndex].indexPath + diceResult;
        if (playerColor.pathPiece[nextIndexPath] && !isConflict(gameBoard, playerColor.pathPiece[nextIndexPath], turn)) {
            playerColor.pieces[pieceIndex].indexPath = nextIndexPath;
            updateGameBoard(gameBoard, pieceIndex, playerColor.pathPiece[nextIndexPath], turn);
        }
    }
    if (diceResult !== 6) {
        handleSwitchTurn()
    }
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
    const [turn, setTurn] = useState("red")
    const gameBoardRef = useRef(null)

    const handleDiceRoll = (value: number) => {
        setDiceValue(value)
        if (!isPieceOut(turn) && diceValue !== 6)
            handleSwitchTurn()
    }
    const handleSwitchTurn = useCallback(() => {
        setTurn(switchTurn(turn));
    }, [turn]);

    useEffect(() => {
        console.log(turn)
        const gameBoard = gameBoardRef.current as HTMLElement
        const pieces = gameBoard.querySelectorAll(`.${turn} .piece`);
        const handleClick = (event) => {
            const piece = event.target;
            const indexPlayerColor = piece.id.match(/piece-\w+-(\d+)/)[1];
            if (piece.classList.contains(turn) && diceValue !== -1) {
                moveForwardPiece(gameBoard, diceValue, indexPlayerColor, turn, handleSwitchTurn);
                setDiceValue(-1);
            }
        };

        pieces.forEach((piece) => {
            piece.addEventListener('click', handleClick);
        });
        console.log(pieces)

        return () => {
            pieces.forEach((piece) => {
                piece.removeEventListener('click', handleClick);
            });
        };
    }, [diceValue, turn, handleSwitchTurn]);

    return (
        <>
            <div className="gameBoard" ref={gameBoardRef}>
                <div className="gameBoard-grid">
                    {GameBoard.map((color, index) => <Cell color={color} id={`${index}`} key={`${index}`}/>)}
                </div>
            </div>
            <Dice onDiceRoll={handleDiceRoll}/>
        </>
    )
}