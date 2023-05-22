import React from 'react';
import { PlayerColor } from '@/type/PlayerColor';
import {ColorButton} from "@/components/ColorButton";

type ColorSelectorProps = {
    handleColor: (color: PlayerColor) => void;
};

export function ColorSelector({ handleColor }: ColorSelectorProps) {
    const colors = [PlayerColor.BLUE, PlayerColor.RED, PlayerColor.GREEN, PlayerColor.YELLOW];

    return (
        <section className="colorSelector" id="colorSelector">
            <h2>Choisissez votre couleur :</h2>
            {colors.map((color) => (
                <ColorButton key={color} color={color} handleColor={handleColor}/>
            ))}
        </section>
    );
}
