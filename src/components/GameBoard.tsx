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
import {useState} from "react";
import {getCustomDocumentImageError} from "next/dist/build/webpack/config/blocks/images/messages";
import {Simulate} from "react-dom/test-utils";
import doubleClick = Simulate.doubleClick;
import {Piece, PlayerColors} from "@/interface/GameBoard";

let turn = "green"

let playerColors: PlayerColors = {
    yellow: {
        pathPiece: [0,1,11,12,44,45,46,47,48,37,26,15,4,5,6,17,28,39,50,51,52,53,54,65,76,75,74,73,72,83,94,105,116,115,114,103,92,81,70,69,68,67,66,55,56,57,58,59],
        pieces: initialPiece([0,1,11,12])
    },
    red: {
        pathPiece: [108,109,119,120,76,75,74,73,72,83,94,105,116,115,114,103,92,81,70,69,68,67,66,55,44,45,46,47,48,37,26,15,4,5,6,17,28,39,50,51,52,53,54,65,64,63,62,61],
        pieces: initialPiece([108,109,119,120])
    },
    green: {
        pathPiece: [9,10,20,21,6,17,28,39,50,51,52,53,54,65,76,75,74,73,72,83,94,105,116,115,114,103,92,81,70,69,68,67,66,55,44,45,46,47,48,37,26,15,4,5,16,27,38,49],
        pieces: initialPiece([9,10,20,21])
    },
    blue: {
        pathPiece: [99,100,110,111,114,103,92,81,70,69,68,67,66,55,44,45,46,47,48,37,26,15,4,5,6,17,28,39,50,51,52,53,54,65,76,75,74,73,72,83,94,105,116,115,104,93,82,71],
        pieces: initialPiece([99,100,110,111])
    }
}

function switchTurn() {
    switch (turn) {
        case "yellow" :
            turn = "green"
            break
        case "red" :
            turn = "blue"
            break
        case "blue" :
            turn = "yellow"
            break
        case "green" :
            turn = "red"
            break
    }
}

function initialPiece(pathPiece: Index[]): Piece[] {
    let pieces: Piece[] = []
    for (let i=0; i < 4; i++) {
        pieces.push({
            indexPrison: pathPiece[i],
            out: false,
            indexPath: -1
        })
    }
    return pieces
}

function isConflict(indexPath: Index): boolean {
    const pieceGame = document.getElementById(`${indexPath}`)
    if (pieceGame.hasChildNodes()) {
        const piece = pieceGame.childNodes[0] as HTMLElement
        const pieceColor = piece.classList[0]
        if (pieceColor === turn) {
            console.log("Vous devez d'abord avancer votre pion")
            return true
        } else {
            const indexPiece = piece.id
            pieceGame.removeChild(piece)
            const piecePlayerColor = playerColors[pieceColor].pieces[indexPiece]
            const elementPrison = document.getElementById(`${piecePlayerColor.indexPrison}`)
            piecePlayerColor.out = false
            piecePlayerColor.indexPath = -1
            elementPrison.appendChild(piece)
            return false
        }
    }
    return false
}

function updateGameBoard(pieceIndex: string, actualIndex: Index, nextIndex: Index) {
    const pieces = document.querySelectorAll(`.${turn} .piece`)
    let piece = null
    for (let i=0; i < pieces.length; i++) {
        console.log(pieces[i])
        if (pieces[i].id === pieceIndex) {
            piece = pieces[i]
            break
        }
    }
    const actualPosition = document.getElementById(`${actualIndex}`)
    const nextPosition = document.getElementById(`${nextIndex}`)
    actualPosition.removeChild(piece)
    nextPosition.appendChild(piece)
}

function moveForwardPiece(diceResult: number, pieceIndex: string) {
    const playerColor = playerColors[turn]
    if (!playerColor.pieces[pieceIndex].out) {
        if (diceResult === 6) {
            if (!isConflict(playerColor.pathPiece[4])) {
                playerColor.pieces[pieceIndex].out = true
                playerColor.pieces[pieceIndex].indexPath = playerColor.pathPiece[4]
                updateGameBoard(pieceIndex, playerColor.pieces[pieceIndex].indexPrison, playerColor.pathPiece[4])
            }
        } else {
            console.log("Vous ne pouvez pas sortir de pion sans 6")
            return
        }
    } else {
        if (playerColor.pathPiece[playerColor.pieces[pieceIndex].indexPath + diceResult])
            if (!isConflict(playerColor.pieces[pieceIndex].indexPath + diceResult)) {
                // problème à résoudre
                updateGameBoard(pieceIndex, playerColor.pieces[pieceIndex].indexPath, playerColor.pieces[pieceIndex].indexPath + diceResult)
                playerColor.pieces[pieceIndex].indexPath += diceResult
            }
    }
    if (diceResult !== 6)
        switchTurn()
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
    const handleDiceRoll = (value: number) => {
        console.log(turn)
        setDiceValue(value)
    }
    const pieces = document.querySelectorAll('.piece')
    pieces.forEach((piece) => {
        piece.addEventListener('click', function () {
            if (piece.classList.contains(turn) && diceValue !== -1) {
                moveForwardPiece(diceValue, piece.id)
                setDiceValue(-1)
            }
        })
    })

    return (
        <>
            <div className="gameBoard">
                <div className="gameBoard-grid">
                    {GameBoard.map((color, index)  => <Cell color={color} id={`${index}`} key={`${index}`}/>)}
                </div>
            </div>
            <Dice onDiceRoll={handleDiceRoll}/>
        </>
    )
}