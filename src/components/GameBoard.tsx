'use client'

import {CellEmpty, GameBoard, Index, Prison, Stable, StartingPoint} from "@/type/GameBoard";
import {Cell} from "@/components/Cell";
import {Dice} from "@/components/Dice";
import {useCallback, useEffect, useRef, useState} from "react";
import {PlayerColor} from "@/type/PlayerColor";
import {ColorButton} from "@/components/ColorButton";
import {ErrorMessage} from "@/type/ErrorMessage";
import {addOpacity, removeOpacity} from "@/game/ui/opacity";
import {isPieceOut, moveForwardPiece, playerColors, pushListDomPieces, switchTurn} from "@/game/functions";

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
    const [canRollDice, setCanRollDice] = useState(true)
    const handleDiceRoll = (value: number) => {
        setDiceValue(value)
        if (turn === "") {
            setTurn(colorStart)
            setNextTurn(colorStart)
            playerColors["red"].isPlay = false
        }
        if (turn !== "") {
            if (!isPieceOut(turn as PlayerColor) && diceValue !== 6) {
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
        setTurn(switchTurn(turn as PlayerColor));
    }, [turn])

    const handleSwitchNextTurn = useCallback(() => {
        setNextTurn(switchTurn(turn as PlayerColor));
    }, [turn])

    const handleError = (message: ErrorMessage | null) => {
        setError(message)
    }

    useEffect(() => {

        if (turn !== "") {
            if (preGame && diceValue === 6) {
                setPreGame(false)
            }
            if (!isPieceOut(turn as PlayerColor) && diceValue !== 6) {
                if (preGame) {
                    if (count === 3)
                        setNextTurn(switchTurn(turn as PlayerColor));
                }
                else
                    setNextTurn(switchTurn(turn as PlayerColor));
            }
        }
    }, [turn, count, preGame, diceValue])

    useEffect(() => {
        const gameBoard = gameBoardRef.current as HTMLElement | null;

        if (color === colorStart)
            addOpacity(gameBoard as HTMLElement, colorStart as PlayerColor)
        if (nextTurn === color)
            addOpacity(gameBoard as HTMLElement, nextTurn as PlayerColor)
        else
            removeOpacity(gameBoard as HTMLElement)

        const handleClick: EventListenerObject = {
            handleEvent(event: MouseEvent) {
                const piece = event.target as HTMLElement;
                const indexPlayerColor = piece.id.match(/piece-\w+-(\d+)/)?.[1];
                if (piece.classList.contains(turn) && indexPlayerColor && diceValue !== -1) {
                    if (moveForwardPiece(gameBoard as HTMLElement, diceValue, indexPlayerColor, turn as PlayerColor, handleSwitchNextTurn, handleError, error, color) !== -1) {
                        setCanRollDice(true)
                        setDiceValue(-1)
                    }
                }
            }
        };

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
            <Dice onDiceRoll={handleDiceRoll} canRoll={canRollDice} handleError={handleError}/>
        </>
    )
}