'use client'


import {CSSProperties, LegacyRef, useEffect, useRef} from "react";
import {playerColors} from "@/game/functions";

export function PlayerSelector() {

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

        let value = Math.ceil(Math.random() * 3600)
        const wheel = document.querySelector('.wheel') as HTMLElement
        document.querySelector('.spin').addEventListener('click', () => {
            wheel.style.transform = `rotate(${value}deg)`
            value += Math.ceil(Math.random() * 3600)
        })

        return () => {
            document.querySelector('.spin').removeEventListener('click', () => {})
        };
    }, [])


    return (
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
    )
}

