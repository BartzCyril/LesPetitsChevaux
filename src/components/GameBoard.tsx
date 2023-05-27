'use client'

import {CellEmpty, GameBoard, Index, Prison, Stable, StartingPoint} from "@/type/GameBoard";
import {Cell} from "@/components/Cell";
import {Dice} from "@/components/Dice";
import {useCallback, useEffect, useRef, useState} from "react";
import {PlayerColor} from "@/type/PlayerColor";
import {ColorButton} from "@/components/ColorButton";
import {ErrorMessage} from "@/type/ErrorMessage";
import {addOpacity, removeOpacity} from "@/game/ui/opacity";
import {
    isPieceOut,
    moveForwardPiece,
    playerColors,
    pushListDomPieces,
    switchPlayer,
    switchTurn
} from "@/game/functions";

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
    const [turn, setTurn] = useState<PlayerColor>(colorStart)
    const [error, setError] = useState<ErrorMessage | null>(null)
    const gameBoardRef = useRef(null)
    const [preGame, setPreGame] = useState(true)
    const [count, setCount] = useState(1)
    const [canRollDice, setCanRollDice] = useState(true)
    const handleDiceRoll = (value: number) => {
        setDiceValue(value)
        if (preGame) {
            if (value === 6) {
                setPreGame(false)
                setCanRollDice(false)
            }
            else {
                setDiceValue(-1)
                setCount(c => c + 1)
                if (count === 3) {
                    setCount(1)
                    handleSwitchTurn()
                }
            }
        } else {
            if (!isPieceOut(turn) && value === 6)
                setCanRollDice(false)
            if (gameBoardRef.current && switchPlayer(gameBoardRef.current as HTMLElement, turn, value)) {
                handleSwitchTurn()
                setDiceValue(-1)
            } else {
                setCanRollDice(false)
            }
        }
    }

    const handleSwitchTurn = useCallback(() => {
        setTurn(switchTurn(turn as PlayerColor));
    }, [turn])

    const handleError = (message: ErrorMessage | null) => {
        setError(message)
    }

    useEffect(() => {
        const gameBoard = gameBoardRef.current as HTMLElement | null;
        if (color === colorStart)
            addOpacity(gameBoard as HTMLElement, colorStart as PlayerColor)
        if (turn === color)
            addOpacity(gameBoard as HTMLElement, turn as PlayerColor)
        else
            removeOpacity(gameBoard as HTMLElement)

        const handleClick: EventListenerObject = {
            handleEvent(event: MouseEvent) {
                const piece = event.target as HTMLElement;
                const indexPlayerColor = parseInt(piece.id.split("-")[2])
                if (piece.classList.contains(turn) && diceValue !== -1) {
                    if (moveForwardPiece(gameBoard as HTMLElement, diceValue, indexPlayerColor, turn as PlayerColor, handleSwitchTurn, handleError, error, color) !== -1) {
                        setCanRollDice(true)
                        setDiceValue(-1)
                    }
                }
            }
        };

            playerColors[turn].listDomPieces.forEach((piece) => {
                if (piece)
                    piece.addEventListener('click', handleClick);
            })

        return () => {
                playerColors[turn].listDomPieces.forEach((piece) => {
                    if (piece)
                        piece.removeEventListener('click', handleClick);
                })
        };
    }, [diceValue, turn]);

    return (
        <>
            <p className="flex mb-2">
                {color === turn ? (
                    <span>C&lsquo;est à votre tour de jouer</span>
                ) : (
                    <span className="flex">
    C&lsquo;est au tour du joueur {turn === colorStart ? (
                        <ColorButton color={colorStart} />
                    ) : (
                        <ColorButton color={turn as PlayerColor} />
                    )} de jouer
  </span>
                )}

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