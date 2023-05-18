'use client'

import {useState} from "react";
import {GameBoard} from "@/components/GameBoard";
import {ColorSelector} from "@/components/ColorSelector";
import {PlayerSelector} from "@/components/PlayerSelector";

export function Game() {
    const [startTheGame, setStartTheGame] = useState(false)
    const handleStartTheGame = () => {
        setStartTheGame(true)
    }

    if (!startTheGame) {
        return (
            <>
                <ColorSelector/>
                <PlayerSelector handleStartGame={handleStartTheGame}/>
            </>
        )
    }
    return (
        <GameBoard/>
    )
}