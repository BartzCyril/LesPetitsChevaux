import React from 'react';
import { PlayerColor } from '@/type/PlayerColor';
import {ColorButton} from "@/components/ColorButton";

type ColorSelectorProps = {
    handleColor: (color: PlayerColor) => void;
};

const style = {
    section : {
        display : 'flex',
        flexWrap : 'wrap',
        gap : '10px',
        padding : '25px 0'
    }
}

export function ColorSelector({ handleColor }: ColorSelectorProps) {
    const colors = [PlayerColor.BLUE, PlayerColor.RED, PlayerColor.GREEN, PlayerColor.YELLOW];

    return (
        <section style={style.section}>
            <h2>Choisissez votre couleur :</h2>
            {colors.map((color) => (
                <ColorButton key={color} color={color} handleColor={handleColor}/>
            ))}
        </section>
    );
}
