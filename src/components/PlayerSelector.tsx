'use client'


import {CSSProperties, SetStateAction, useEffect, useRef, useState} from "react";
import {PlayerColor} from "@/type/PlayerColor";

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

function getPlayerWinner(value: number, colors: any, playerColor: PlayerColor) {
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

        const wheel = document.querySelector('.wheel') as HTMLElement
        document.querySelector('.spin')!.addEventListener('click', () => {
            let value = Math.ceil(Math.random() * 3600)
            wheel.style.transform = `rotate(${value}deg)`
            const playerWin = getPlayerWinner(value, colors, playerColor)
            setTimeout(() => {
                handleColorStart(playerWin)
                handleStartTheGame()
            }, 6000)

        })

        return () => {

        };
    }, [])


    return (
        <div className="playerSelector">
            <h2>Tournez la roue pour déterminer le joueur qui commencera la partie</h2>
            <div className="container">
                <div className="spin">Spin</div>
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

