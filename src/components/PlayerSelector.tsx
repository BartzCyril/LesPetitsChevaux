'use client'

import {PlayerColor} from "@/type/PlayerColor";
import {ReactElement, useCallback, useEffect, useState} from "react";
import {Dice} from "@/components/Dice";
import {Button} from "@/components/Button";
import {PlayerScores} from "@/interface/PlayerScores";
import {ColorButton} from "@/components/ColorButton";
import {renderToString} from "react-dom/server";

type PlayerSelectorProps = {
    handleStartGame: () => void,
    color: PlayerColor,
    handleColorStart: (color: PlayerColor) => void
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

export function PlayerSelector({handleStartGame, color, handleColorStart}: PlayerSelectorProps) {
    const colors: PlayerColor[] = [PlayerColor.RED, PlayerColor.BLUE, PlayerColor.YELLOW, PlayerColor.GREEN]
    const [diceValue, setDiceValue] = useState(-1);
    const [diceResults, setDiceResults] = useState<PlayerScores>({
        blue: 0,
        red: 0,
        yellow: 0,
        green: 0,
    });
    const [turn, setTurn] = useState<PlayerColor | string>("")
    const [count, setCount] = useState(0)
    const [message, setMessage] = useState<JSX.Element | null>(null)
    const [messageCurrentPlayer, setMessageCurrentPlayer] = useState<string>("")
    const [botRollDice, setBotRollDice] = useState(false)
    const onDiceRoll = (value: number) => {
        setDiceValue(value)
        setCount(c => c + 1)
        if (turn === "") {
            setTurn("red")
        } else {
            setTurn(switchTurn(turn))
        }
        if (renderToString(message as ReactElement) === "<p>Égalité ! Il faut recommencer</p>")
            setMessage(null)
    }

    const checkWinner = useCallback((diceResults: PlayerScores): JSX.Element | null => {
        const values: number[] = Object.values(diceResults);
        const allNonZero = values.every((value) => value !== 0);
        if (allNonZero) {
          const maxResult = Math.max(...values);
          const winningColors = Object.keys(diceResults).filter(
            (color) => diceResults[color] === maxResult
          );
      
          if (winningColors.length === 1) {
            handleColorStart(winningColors[0] as PlayerColor);
              return <div className="flex">
                  <p>Le joueur</p>
                  <ColorButton color={winningColors[0] as PlayerColor}/>
                  <p>commence la partie</p>
              </div>
          } else {
            // Réinitialisation des résultats du dé
            const resetResults: PlayerScores = {
              blue: 0,
              red: 0,
              yellow: 0,
              green: 0,
            };
            setDiceResults(resetResults);
            setCount(0);
            setTurn("");
            return <p>Égalité ! Il faut recommencer</p>;
          }
        }
        return null;
      }, [handleColorStart, setDiceResults, setCount, setTurn]);
      

    useEffect(() => {
        if (turn !== "") {
            setDiceResults((prevResults) => ({
                ...prevResults,
                [turn]: diceValue,
            }));
            if (switchTurn(turn) === color && count !== 4) {
                setBotRollDice(false)
                setMessageCurrentPlayer("C'est à vous de lancer le dé !")
            }
            else {
                setBotRollDice(true)
                setMessageCurrentPlayer("")
            }
        } else {
            if (colors[0] === color)
                setMessageCurrentPlayer("C'est à vous de lancer le dé !")
            else
                setBotRollDice(true)
        }
    }, [diceValue, turn])

    useEffect(() => {
        if (count === 4) {
            setMessage(checkWinner(diceResults))
            setBotRollDice(false)
        }
    }, [count, diceResults, checkWinner]);

    return (
        <section id="playerSelector">
            <h2>Chaque joueur lance une fois le dé pour savoir qui commence la partie : </h2>
            {message}
            <p>{messageCurrentPlayer}</p>
            <table className="border-separate border border-slate-400 mt-2 mb-6">
                <thead>
                <tr>
                    <th className="border border-slate-300">Couleur</th>
                    <th className="border border-slate-300">Résultat</th>
                </tr>
                </thead>
                <tbody>
                {colors.map((color) => (
                    <tr key={color}>
                        <td className="border border-slate-300">
                            <div className={`m-auto h-6 w-6 rounded-full ${color}`}></div>
                        </td>
                        <td className="border border-slate-300">
                            <div className="text-center">{diceResults[color] === 0 ? "" : diceResults[color]}</div>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            {renderToString(message as ReactElement).startsWith("<div") ? <Button handleStart={handleStartGame} buttonText={"Commencer la partie"}/> :
                <Dice onDiceRoll={onDiceRoll} canRoll={true} botRollDice={botRollDice} disabled={color !== switchTurn(turn) || (turn === "" && color !== "red")}/>}
        </section>
    )
}