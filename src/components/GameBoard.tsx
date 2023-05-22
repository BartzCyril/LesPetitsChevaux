'use client'

import {CellEmpty, GameBoard, Index, Prison, Stable, StartingPoint} from "@/type/GameBoard";
import {Cell} from "@/components/Cell";
import {Dice} from "@/components/Dice";
import {useCallback, useEffect, useRef, useState} from "react";
import {Piece, PlayerColors} from "@/interface/GameBoard";
import {PlayerColor} from "@/type/PlayerColor";
import {isConflict} from "@/rules/conflict";
import {ColorButton} from "@/components/ColorButton";
import {ErrorMessage} from "@/type/ErrorMessage";

let playerColors: PlayerColors = {
    yellow: {
        pathPiece: [44, 45, 46, 47, 48, 37, 26, 15, 4, 5, 6, 17, 28, 39, 50, 51, 52, 53, 54, 65, 76, 75, 74, 73, 72, 83, 94, 105, 116, 115, 114, 103, 92, 81, 70, 69, 68, 67, 66, 55, 56, 57, 58, 59],
        pieces: initialPiece([0, 1, 11, 12]),
        listDomPieces: [],
        isPlay: false
    },
    red: {
        pathPiece: [76, 75, 74, 73, 72, 83, 94, 105, 116, 115, 114, 103, 92, 81, 70, 69, 68, 67, 66, 55, 44, 45, 46, 47, 48, 37, 26, 15, 4, 5, 6, 17, 28, 39, 50, 51, 52, 53, 54, 65, 64, 63, 62, 61],
        pieces: initialPiece([108, 109, 119, 120]),
        listDomPieces: [],
        isPlay: false
    },
    green: {
        pathPiece: [6, 17, 28, 39, 50, 51, 52, 53, 54, 65, 76, 75, 74, 73, 72, 83, 94, 105, 116, 115, 114, 103, 92, 81, 70, 69, 68, 67, 66, 55, 44, 45, 46, 47, 48, 37, 26, 15, 4, 5, 16, 27, 38, 49],
        pieces: initialPiece([9, 10, 20, 21]),
        listDomPieces: [],
        isPlay: false
    },
    blue: {
        pathPiece: [114, 103, 92, 81, 70, 69, 68, 67, 66, 55, 44, 45, 46, 47, 48, 37, 26, 15, 4, 5, 6, 17, 28, 39, 50, 51, 52, 53, 54, 65, 76, 75, 74, 73, 72, 83, 94, 105, 116, 115, 104, 93, 82, 71],
        pieces: initialPiece([99, 100, 110, 111]),
        listDomPieces: [],
        isPlay: false

    }
}

function pushListDomPieces(color: string, piece: any) {
    if (piece === null)
        return
    playerColors[color].listDomPieces.push(piece)
}

function switchTurn(turn: string): PlayerColor {
    switch (turn) {
        case "yellow":
            return PlayerColor.GREEN
        case "red":
            return PlayerColor.BLUE
        case "blue":
            return PlayerColor.YELLOW
        default:
            return PlayerColor.RED
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

function moveForwardPiece(gameBoard: HTMLElement, diceResult: number, pieceIndex: string, turn: PlayerColor, handleSwitchNextTurn: () => void, handleError: (message: ErrorMessage | null) => void) {
    const playerColor = playerColors[turn]
    if (!playerColor.pieces[parseInt(pieceIndex)].out) {
        if (diceResult === 6) {
            if (!isConflict(playerColors, gameBoard, playerColor.pathPiece[0], turn, handleError)) {
                playerColor.pieces[parseInt(pieceIndex)].out = true
                playerColor.pieces[parseInt(pieceIndex)].indexPath = 0
                updateGameBoard(gameBoard, pieceIndex, playerColor.pathPiece[0], turn)
                handleError(null)
            } else {
                return -1
            }
        } else {
            handleError(ErrorMessage.ROLL_SIX_TO_RELEASE)
            return -1
        }
    } else {
        const nextIndexPath = playerColor.pieces[parseInt(pieceIndex)].indexPath + diceResult;
        if (playerColor.pathPiece[nextIndexPath] && !isConflict(playerColors, gameBoard, playerColor.pathPiece[nextIndexPath], turn, handleError)) {
            playerColor.pieces[parseInt(pieceIndex)].indexPath = nextIndexPath
            updateGameBoard(gameBoard, pieceIndex, playerColor.pathPiece[nextIndexPath], turn)
            handleError(null)
        } else {
            return -1
        }
    }
    playerColors[turn].isPlay = diceResult !== 6;
    if (diceResult !== 6) {
        handleSwitchNextTurn()
    }
}

type GameBoardProps = {
    color: PlayerColor,
    colorStart: PlayerColor
}

export function GameBoard({color, colorStart}: GameBoardProps) {
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
    const [turn, setTurn] = useState<PlayerColor | string>("")
    const [nextTurn, setNextTurn] = useState("")
    const [error, setError] = useState<ErrorMessage | null>(null)
    const gameBoardRef = useRef(null)
    const [preGame, setPreGame] = useState(true)
    const [count, setCount] = useState(1)
    
    const handleDiceRoll = (value: number) => {
        setDiceValue(value)
        if (turn === "") {
            setTurn(colorStart)
            setNextTurn(colorStart)
            playerColors["red"].isPlay = false
        }
        if (turn !== "") {
            if (!isPieceOut(turn) && diceValue !== 6) {
                if (preGame) {
                    if (count === 3) {
                        setCount(1)
                        playerColors[turn].isPlay = true
                    } else
                        setCount(c => c+1)
                } else {
                    playerColors[turn].isPlay = true
                }
            }
            if (playerColors[turn].isPlay) {
                handleSwitchTurn()
            }
        }
    }

    const handleSwitchTurn = useCallback(() => {
        setTurn(switchTurn(turn));
    }, [turn])

    const handleSwitchNextTurn = useCallback(() => {
        setNextTurn(switchTurn(turn));
    }, [turn])

    const handleError = (message: ErrorMessage | null) => {
        setError(message)
    }

    useEffect(() => {
        if (turn !== "") {
            if (preGame && diceValue === 6)
                setPreGame(false)
            if (!isPieceOut(turn) && diceValue !== 6) {
                if (preGame) {
                    if (count === 3)
                        setNextTurn(switchTurn(turn));
                }
                else
                    setNextTurn(switchTurn(turn));
            }
        }
    }, [turn, count, preGame, diceValue])

    useEffect(() => {
        const gameBoard = gameBoardRef.current as HTMLElement | null;

        const handleClick: EventListenerObject = {
            handleEvent(event: MouseEvent) {
                const piece = event.target as HTMLElement;
                const indexPlayerColor = piece.id.match(/piece-\w+-(\d+)/)?.[1];
                if (piece.classList.contains(turn) && diceValue !== -1 && indexPlayerColor) {
                    if (moveForwardPiece(gameBoard as HTMLElement, diceValue, indexPlayerColor, turn as PlayerColor, handleSwitchNextTurn, handleError) !== -1)
                        setDiceValue(-1)
                }
            }
        };

        const gameMode: EventListenerObject = {
            handleEvent(event: Event) {
                const position = prompt("À quelle position voulez-vous envoyer le pion ?");
                const piece = event.target as HTMLElement;
                const indexPlayerColor = piece.id.match(/piece-\w+-(\d+)/)?.[1];
                isConflict(playerColors, gameBoard as HTMLElement, parseInt(position as string), turn as PlayerColor, handleError)
                updateGameBoard(gameBoard as HTMLElement, indexPlayerColor as string, parseInt(position as string), turn)
            }
        }

        if (nextTurn !== "") {
            playerColors[nextTurn].listDomPieces.forEach((piece) => {
                if (piece)
                    piece.addEventListener('click', handleClick);
            })
        }

        return () => {
            if (nextTurn !== "") {
                playerColors[nextTurn].listDomPieces.forEach((piece) => {
                    if (piece)
                        piece.removeEventListener('click', handleClick);
                })
            }
        };
    }, [diceValue, turn, handleSwitchTurn, nextTurn, handleSwitchNextTurn]);

    return (
        <>
            <p className="flex mb-2">
                C&lsquo;est au tour du joueur {nextTurn === "" ? <ColorButton color={colorStart}/> : <ColorButton color={nextTurn as PlayerColor}/>} de jouer
            </p>
            {error ? <p className="mb-2">{error}</p> : ""}
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