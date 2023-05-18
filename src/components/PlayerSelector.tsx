'use client'

import {PlayerColor} from "@/type/PlayerColor";
import {SetStateAction, useEffect, useState} from "react";
import {Dice} from "@/components/Dice";
import {StartTheGame} from "@/components/StartTheGame";
import { PlayerScores } from "@/interface/PlayerScores";

type PlayerSelectorProps = {
    handleStartGame: () => void
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

export function PlayerSelector({handleStartGame}: PlayerSelectorProps) {
    const colors = [PlayerColor.RED, PlayerColor.BLUE, PlayerColor.YELLOW, PlayerColor.GREEN]
    const [diceValue, setDiceValue] = useState(-1);
    const [diceResults, setDiceResults] = useState<PlayerScores>({
        blue: 0,
        red: 0,
        yellow: 0,
        green: 0,
    });
    const [turn, setTurn] = useState("")
    const [count, setCount] = useState(0)
    const [message, setMessage] = useState("")

    const onDiceRoll = (value: number) => {
        setDiceValue(value)
        setCount(c => c + 1)
        if (turn === "") {
            setTurn("red")
        } else {
            setTurn(switchTurn(turn))
        }
        if (message === "Égalité ! Il faut recommencer")
            setMessage("")
    }

    const checkWinner = (diceResults: PlayerScores) => {
        const values: number[] = Object.values(diceResults);
        const allNonZero = values.every((value) => value !== 0);
        if (allNonZero) {
            const maxResult = Math.max(...values);
            const winningColors = Object.keys(diceResults).filter(
                (color) => diceResults[color] === maxResult
            );

            if (winningColors.length === 1) {
                return `Bravo ! C'est le joueur ${winningColors[0]} qui commence la partie !`
            } else {
                // Réinitialisation des résultats du dé
                const resetResults: PlayerScores = {
                    blue: 0,
                    red: 0,
                    yellow: 0,
                    green: 0,
                  };
                setDiceResults(resetResults);
                setCount(0)
                setTurn("")
                return "Égalité ! Il faut recommencer"
            }
        }
        return ""
    }

    useEffect(() => {
        if (turn !== "") {
            setDiceResults((prevResults) => ({
                ...prevResults,
                [turn]: diceValue,
            }));
        }
    }, [diceValue, turn])

    useEffect(() => {
        if (count === 4) {
            setMessage(checkWinner(diceResults))
        }
    }, [count, diceResults]);

    return (
        <section id="playerSelector">
            <h2>Chaque joueur lance une fois le dé pour savoir qui commence la partie : </h2>
            <p>{message !== "" ? message : ""}</p>
            <table className="border-separate border border-slate-400 mt-2">
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
            {message.startsWith("Bravo") ? <StartTheGame handleStartGame={handleStartGame}/> :
                <Dice onDiceRoll={onDiceRoll}/>}
        </section>
    )
}