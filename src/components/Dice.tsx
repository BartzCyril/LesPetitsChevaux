'use client'

/**import {useRef} from "react";

type DiceProps = {
    onDiceRoll: (value: number) => void
}

export function Dice({onDiceRoll}: DiceProps) {
    const buttonRef = useRef(null);
    const handleDiceClick = () => {
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
                //const randomNumber = Math.floor(Math.random() * 6) + 1;
                let randomNumber = Math.random();
                if (randomNumber < 0.5) {
                    randomNumber = 6;
                } else {
                    randomNumber = 2;
                }
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
}**/

import { useRef, useState } from "react";

type DiceProps = {
    onDiceRoll: (value: number) => void;
};

export function Dice({ onDiceRoll }: DiceProps) {
    const buttonRef = useRef(null);
    const [desiredResult, setDesiredResult] = useState("");

    const handleDiceClick = () => {
        let randomNumber: number;
        if (desiredResult === "") {
            // Generate a random number between 1 and 6
            randomNumber = Math.floor(Math.random() * 6) + 1;
        } else {
            // Use the client's desired result
            randomNumber = parseInt(desiredResult);
        }

        const dice = buttonRef.current as HTMLElement | null;
        if (dice) {
            const dots = dice.querySelectorAll<HTMLElement>(".dot");
            // Add dice roll animation
            dice.classList.add("roll-animation");
            // Reset dots display
            dots.forEach((dot) => {
                dot.style.display = "none";
            });
            setTimeout(() => {
                // Display dots corresponding to the dice result
                for (let i = 0; i < randomNumber; i++) {
                    dots[i].style.display = "block";
                }
                // Remove animation and enable the button
                dice.classList.remove("roll-animation");
                // Trigger the dice roll callback with the result
                onDiceRoll(randomNumber);
            }, 1000);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDesiredResult(e.target.value);
    };

    return (
        <div>
            <button className="dice" ref={buttonRef} onClick={handleDiceClick}>
                <div className="dot" id="dot-1"></div>
                <div className="dot" id="dot-2"></div>
                <div className="dot" id="dot-3"></div>
                <div className="dot" id="dot-4"></div>
                <div className="dot" id="dot-5"></div>
                <div className="dot" id="dot-6"></div>
            </button>
            <input type="number" value={desiredResult} onChange={handleInputChange} />
        </div>
    );
}
