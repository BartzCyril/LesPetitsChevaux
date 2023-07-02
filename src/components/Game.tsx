'use client'

import {useState} from "react";
import {GameBoard} from "@/components/GameBoard";
import {PlayerSelector} from "@/components/PlayerSelector";
import {PlayerColor} from "@/type/PlayerColor";
import {Button} from "@/components/Button";
import {PreGameBoard} from "@/components/PreGameBoard";

const style = {
    div : {
        display: 'flex',
        justifyContent : 'center',
        width: '30%',
        margin: '25px 0'
    },
    button: {
        backgroundColor: '#5151e6',
        padding: '10px',
        color: 'white',
        fontWeight : 'bold',
        borderRadius: '10px',
        width : '142px'
    }
}

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

    const handleStartThePreGame = () => {
        setStartThePreGame(true)
    }
    
   if (!startThePreGame) {
        return (
            <div className="startThePreGame">
                <PreGameBoard isPlay={false} handleStart={handleStartThePreGame}/>
                <Button handleStart={handleStartThePreGame} buttonText={"Jouer"} style={style}/>
            </div>
        )
    } else if (startThePreGame && !color) {
        return (
            <div className="startThePreGame">
                <PreGameBoard isPlay={true} handleColor={handleColor}/>
            </div>
        )
    } else if (color && !startTheGame) {
        return (
            <div className="startTheGame">
                <PreGameBoard isPlay={true} colorPlayer={color} isPlayerSelector={true}/>
                <PlayerSelector playerColor={color} handleColorStart={handleColorStart} handleStartTheGame={handleStartTheGame}/>
            </div>
        )
    } else {
        return (
            <GameBoard colorStart={colorStart as PlayerColor} colorPlayer={color as PlayerColor}/>
        )
    }
}