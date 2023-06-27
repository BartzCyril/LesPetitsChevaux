'use client'

import {GameBoard} from "@/type/GameBoard";
import {Cell} from "@/components/Cell";
import {useCallback, useEffect, useRef, useState} from "react";
import {PlayerColor} from "@/type/PlayerColor";
import {ColorButton} from "@/components/ColorButton";
import {ErrorMessage} from "@/type/ErrorMessage";
import {
    isPieceOut,
    moveForwardPiece,
    playerColors,
    pushListDomPieces,
    switchPlayer,
    switchTurn
} from "@/game/functions";
import {moveForwardPieceBot} from "@/game/bot/functions";
import {getGameBoard} from "@/game/gameboard/gameboard";
import {Turn} from "@/components/Turn";

type GameBoardProps = {
    colorPlayer: PlayerColor,
    colorStart: PlayerColor
}

export function GameBoard({colorPlayer, colorStart}: GameBoardProps) {
    const GameBoard: GameBoard = getGameBoard()
    const [diceValue, setDiceValue] = useState(-1);
    const [turn, setTurn] = useState<PlayerColor>(colorStart)
    const [error, setError] = useState<ErrorMessage | null>(null)
    const gameBoardRef = useRef(null)
    const [preGame, setPreGame] = useState(true)
    const [count, setCount] = useState(1)
    const [canRollDice, setCanRollDice] = useState(true)
    const [botRollDice, setBotRollDice] = useState(false)
    const [forwardBot, setForwardBot] = useState(0)
    const handleDiceRoll = (value: number) => {
        setForwardBot(c => c + 1)
        setDiceValue(value)
        if (preGame) {
            if (value === 6) {
                setPreGame(false)
                if (turn === colorPlayer)
                    setCanRollDice(false)
                if (turn !== colorPlayer) {
                    if (gameBoardRef.current) {
                        moveForwardPieceBot(gameBoardRef.current as HTMLElement, value, turn, handleSwitchTurn)
                        setDiceValue(-1)
                    }
                    return
                }
            }
            else {
                setDiceValue(-1)
                setCount(c => c + 1)
                if (count === 3) {
                    setCount(1)
                    handleSwitchTurn()
                    setDiceValue(-1)
                    return
                }
            }
        } else {
            if (turn !== colorPlayer) {
                if (gameBoardRef.current) {
                    moveForwardPieceBot(gameBoardRef.current as HTMLElement, value, turn, handleSwitchTurn)
                    setDiceValue(-1)
                }
            }
            if (!isPieceOut(turn) && value === 6 && turn === colorPlayer)
                setCanRollDice(false)
            if (gameBoardRef.current && switchPlayer(gameBoardRef.current as HTMLElement, turn, value)) {
                handleSwitchTurn()
                setDiceValue(-1)
            } else {
                if (turn === colorPlayer)
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
        /**if (color === colorStart)
            //addOpacity(gameBoard as HTMLElement, colorStart as PlayerColor)
        if (turn === color)
            //addOpacity(gameBoard as HTMLElement, turn as PlayerColor)
        else {
            //removeOpacity(gameBoard as HTMLElement)
        }**/

        const handleClick: EventListenerObject = {
            handleEvent(event: MouseEvent) {
                const piece = event.target as HTMLElement;
                const indexPlayerColor = parseInt(piece.id.split("-")[2])
                const colorPlayerColor = piece.id.split("-")[1]
                if (colorPlayerColor === turn && diceValue !== -1) {
                    if (moveForwardPiece(gameBoard as HTMLElement, diceValue, indexPlayerColor, turn as PlayerColor, handleSwitchTurn, handleError, error, colorPlayer) !== -1) {
                        setCanRollDice(true)
                        setDiceValue(-1)
                    }
                }
            }
        };

        if (turn === colorPlayer) {
            setBotRollDice(false)
            playerColors[turn].listDomPieces.forEach((piece) => {
                if (piece)
                    piece.addEventListener('click', handleClick);
            })
        } else {
            setBotRollDice(true)
        }

        return () => {
            if (turn === colorPlayer) {
                playerColors[turn].listDomPieces.forEach((piece) => {
                    if (piece)
                        piece.removeEventListener('click', handleClick);
                })
            }
        };
    }, [diceValue, turn, forwardBot]);

    return (
        <>
            <p className="flex mb-2">
                {colorPlayer === turn ? (
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
            <div className="game">
                <div className="gameBoard" ref={gameBoardRef}>
                    <div className="gameBoard-grid">
                        {GameBoard.map((color, index) => <Cell color={color} id={`${index}`} key={`${index}`}
                                                               pushListDomPieces={pushListDomPieces} colorPlayer={colorPlayer}/>)}
                    </div>
                </div>
                <Turn colorStart={colorStart} colorPlayer={colorPlayer} onDiceRoll={handleDiceRoll} canRoll={canRollDice} handleError={handleError} botRollDice={botRollDice} playerColor={turn} mainColor={colorPlayer} disabled={colorPlayer !== turn}/>
            </div>
        </>
    )
}