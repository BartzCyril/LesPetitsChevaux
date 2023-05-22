'use client'

import {useState} from "react";
import {GameBoard} from "@/components/GameBoard";
import {ColorSelector} from "@/components/ColorSelector";
import {PlayerSelector} from "@/components/PlayerSelector";
import {PlayerColor} from "@/type/PlayerColor";

export function Game() {
    const [startThePreGame, setStartThePreGame] = useState<boolean>(false)
    const [color, setColor] = useState<PlayerColor | null>(null)
    const [startTheGame, setStartTheGame] = useState<boolean>(false)
    const [colorStart, setColorStart] = useState<PlayerColor | null>(null)
    const handleColor = (color: PlayerColor) => {
        setColor(color)
    }
    const handleStartTheGame = () => {
        setStartTheGame(true)
    }

    const handleColorStart = (color: PlayerColor) => {
        setColorStart(color)
    }
    
    if (!startThePreGame) {
        return (
            <button onClick={() => setStartThePreGame(true)}>Play</button>
        )
    } else if (startThePreGame && !color) {
        return (
            <ColorSelector handleColor={handleColor}/>
        )
    } else if (color && !startTheGame) {
        return (
            <PlayerSelector handleStartGame={handleStartTheGame} color={color} handleColorStart={handleColorStart}/>
        )
    } else {
        return (
            <GameBoard color={color as PlayerColor} colorStart={colorStart as PlayerColor}/>
        )
    }
}