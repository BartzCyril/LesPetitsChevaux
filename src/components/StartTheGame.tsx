import {useState} from "react";
import {GameBoard} from "@/components/GameBoard";

type StartTheGameProps = {
    handleStartGame: () => void
}

export function StartTheGame({handleStartGame}: StartTheGameProps) {

    return (
        <div>
            <button className="text-center bg-slate-800 p-3 text-white font-bold mt-6 rounded-md" onClick={handleStartGame}>
                Commencer la partie
            </button>
        </div>
    );
}