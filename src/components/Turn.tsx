import { PlayerColor } from "@/type/PlayerColor";
import { ErrorMessage } from "@/type/ErrorMessage";
import { Dice } from "@/components/Dice";
import Image from "next/image";

type TurnProps = {
    colorStart: PlayerColor,
    colorPlayer: PlayerColor,
    onDiceRoll: (value: number) => void
    canRoll?: boolean,
    handleError?: (message: ErrorMessage | null) => void,
    botRollDice: boolean,
    playerColor?: PlayerColor,
    mainColor?: PlayerColor,
}

function getIndexColor(array: PlayerColor[], colorStart: PlayerColor): number {
    for (let i = 0; i < array.length; i++) {
        if (array[i] === colorStart)
            return i
    }
    return -1
}

export function Turn({ colorStart, colorPlayer, onDiceRoll, canRoll, handleError, botRollDice, mainColor, playerColor }: TurnProps) {

    const colors = [PlayerColor.YELLOW, PlayerColor.GREEN, PlayerColor.RED, PlayerColor.BLUE];

    return (
        <div className="turn">
            {colors.map((color, index) => {
                const adjustedIndex = (getIndexColor(colors, colorStart) + index) % colors.length;
                return (
                    <div key={index} id={`turn-${index}`}>
                        {colors[adjustedIndex] === colorPlayer ? <Image width={0}
                            height={0} src={`./img/person-${colors[adjustedIndex]}.svg`} alt="your player" className="turn-img" /> : <Image width={0}
                                height={0} src={`./img/robot-${colors[adjustedIndex]}.svg`} alt="robot player" className="turn-img" />}
                        {colors[adjustedIndex] === playerColor ? <Dice onDiceRoll={onDiceRoll} canRoll={canRoll} handleError={handleError} botRollDice={botRollDice} playerColor={playerColor} mainColor={mainColor} disabled={colorPlayer !== playerColor} /> : ""}
                    </div>
                );
            })}
        </div>
    )
}