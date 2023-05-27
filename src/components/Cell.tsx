import React, {useRef, useMemo, useEffect} from 'react';
import {CellEmpty, CellState} from '@/type/GameBoard';
import PieceGame from '@/components/PieceGame';
import { PlayerColor } from '@/type/PlayerColor';

type CellProps = {
    color: CellState;
    id: string;
    pushListDomPieces: (color: PlayerColor, piece: HTMLElement) => void;
};

export function Cell({color, id, pushListDomPieces}: CellProps) {
    const pieceGameRef = useRef(null);

    useEffect(() => {
        if (
            id === '0' || id === '1' || id === '11' || id === '12' ||
            id === '108' || id === '109' || id === '119' || id === '120' ||
            id === '9' || id === '10' || id === '20' || id === '21' ||
            id === '99' || id === '100' || id === '110' || id === '111'
        ) {
            if (pieceGameRef.current)
                pushListDomPieces(color as PlayerColor, pieceGameRef.current as HTMLElement);
        }
    }, [id, color, pushListDomPieces]);

    let renderedComponent: JSX.Element | null = null;

    if (color === 'transparent') {
        renderedComponent = <div className={`${color}`} id={`cell-${id}`}></div>;
    } else if (
        id === '0' || id === '1' || id === '11' || id === '12' ||
        id === '108' || id === '109' || id === '119' || id === '120' ||
        id === '9' || id === '10' || id === '20' || id === '21' ||
        id === '99' || id === '100' || id === '110' || id === '111'
    ) {
        renderedComponent = (
            <div className={`${color} pieceGame`} id={`cell-${id}`}>
                <PieceGame color={color} id={id} ref={pieceGameRef}/>
            </div>
        );
    } else {
        renderedComponent = (
            <div className={`${color} pieceGame`} id={`cell-${id}`}></div>
        );
    }

    return useMemo(() => renderedComponent, [renderedComponent]);
}
