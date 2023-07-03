'use client'


import {CSSProperties, useEffect, useState} from "react";
import {PlayerColor} from "@/type/PlayerColor";
import {useToasts} from "@/components/ToastContext";

type PlayerSelectorProps = {
    playerColor: PlayerColor,
    handleStartTheGame : () => void,
    handleColorStart : (color: PlayerColor) => void
}

function getColor(color: string): PlayerColor {
    switch (color) {
        case "#BCF4F5" :
            return PlayerColor.BLUE
        case "#FFB7C3" :
            return PlayerColor.RED
        case "#B4EBCA" :
            return PlayerColor.GREEN
        default :
            return PlayerColor.YELLOW
    }
}

function getPlayerWinner(value: number, colors: any) {
    const ratio = (1 / colors.length) / 2
    const elementsWheel = document.querySelectorAll('.wheel div')
    const arrayColor: PlayerColor[] = []
    for (let i = 0; i < elementsWheel.length; i++) {
        const halfIntervalValue = parseFloat(elementsWheel[i].id)
        const decimal = (value / 360) - Math.floor(value / 360)
        if (decimal >= (halfIntervalValue - ratio) && decimal <= (halfIntervalValue + (ratio * 2))) {
            const colorElement = getComputedStyle(elementsWheel[i]).getPropertyValue("--clr")
            arrayColor.push(getColor(colorElement))
        }
    }
    return arrayColor[arrayColor.length - 1]
}

export function PlayerSelector({playerColor, handleColorStart, handleStartTheGame}: PlayerSelectorProps) {

    const [isWheelClick, setIsWheelClick] = useState(false)
    const {pushToast} = useToasts();
    const colors = [
        {'--i': 1, '--clr': '#BCF4F5'},
        {'--i': 2, '--clr': '#FFB7C3'},
        {'--i': 3, '--clr': '#B4EBCA'},
        {'--i': 4, '--clr': '#F7F08B'},
        {'--i': 5, '--clr': '#BCF4F5'},
        {'--i': 6, '--clr': '#FFB7C3'},
        {'--i': 7, '--clr': '#B4EBCA'},
        {'--i': 8, '--clr': '#F7F08B'}
    ];

    useEffect(() => {
        if (!isWheelClick)
            pushToast({ title: "Joueur qui commence la partie", content: "Pour déterminer le joueur qui commence la partie, cliquez sur la roue !", duration: 5,});

        const idInterval = setInterval(() => {
            if (!isWheelClick)
                pushToast({ title: "Joueur qui commence la partie", content: "Pour déterminer le joueur qui commence la partie, cliquez sur la roue !", duration: 5,});
        }, 8000)

        const wheel = document.querySelector('.wheel') as HTMLElement
        document.querySelector('.spin')!.addEventListener('click', () => {
            setIsWheelClick(true)
            let value = Math.ceil(Math.random() * 3600)
            wheel.style.transform = `rotate(${value}deg)`
            const playerWin = getPlayerWinner(value, colors)
            setTimeout(() => {
                handleColorStart(playerWin)
                handleStartTheGame()
            }, 8000)

        })

        return () => {
            if (!isWheelClick) {
                clearInterval(idInterval)
            }
        };
    }, [colors, handleColorStart, handleStartTheGame, isWheelClick, playerColor, pushToast])


    return (
        <div className="playerSelector">
            <div className="container">
                <div className="spin">Roue</div>
                <div className="wheel">
                    {colors.map((color, index) => (
                        <div
                            key={index}
                            className="color"
                            style={color as CSSProperties}
                            id={(((1 / colors.length) * ((colors.length - 1) - index)) + ((1 / colors.length)) / 2).toString()}
                        ></div>
                    ))}
                </div>
            </div>
        </div>
    )
}

