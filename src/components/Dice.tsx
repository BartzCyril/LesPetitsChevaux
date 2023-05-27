'use client'

import {useRef} from "react";
import {ErrorMessage} from "@/type/ErrorMessage";

type DiceProps = {
    onDiceRoll: (value: number) => void
    canRoll?: boolean,
    handleError?: (message: ErrorMessage | null) => void
}

export function Dice({onDiceRoll, canRoll, handleError}: DiceProps) {
    const buttonRef = useRef(null);
    const handleDiceClick = () => {
        if (!canRoll) {
            if (handleError) {
                handleError(ErrorMessage.CANNOT_REROLL)
            }
            return
        }
        const dice = buttonRef.current as HTMLElement | null
        if (dice) {
            const dots = dice.querySelectorAll<HTMLElement>('.dot')
            // Ajout de l'animation de lancer de dé
            dice.classList.add('roll-animation')
            // Réinitialisation des points
            dots.forEach(dot => {
                dot.style.display = 'none';
            });
            setTimeout(() => {
                // Génération d'un nombre aléatoire entre 1 et 6
                const randomNumber = Math.floor(Math.random() * 6) + 1;
                onDiceRoll(randomNumber)
                // Affichage du nombre de points correspondant
                for (let i = 0; i < randomNumber; i++) {
                    dots[i].style.display = 'block';
                }
                // Suppression de l'animation et réactivation du bouton
                dice.classList.remove('roll-animation');
            }, 1000);
        }
    }
    return (
        <button className="dice" ref={buttonRef} onClick={handleDiceClick}>
            <div className="dot" id="dot-1"></div>
            <div className="dot" id="dot-2"></div>
            <div className="dot" id="dot-3"></div>
            <div className="dot" id="dot-4"></div>
            <div className="dot" id="dot-5"></div>
            <div className="dot" id="dot-6"></div>
        </button>
    )
}
