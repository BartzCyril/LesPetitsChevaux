import React, {useRef, useMemo, useEffect} from 'react';
import {CellState} from '@/type/GameBoard';
import PieceGame from '@/components/PieceGame';

type CellProps = {
    color: CellState;
    id: string;
    pushListDomPieces: (color: string, piece: any) => void;
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
            pushListDomPieces(color, pieceGameRef.current);
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
            <div className={`${color} pieceGame`} id={`cell-${id}`} style={{opacity: 0.7}}>
                <PieceGame color={color} id={id} ref={pieceGameRef}/>
            </div>
        );
    } else {
        renderedComponent = (
            <div className={`${color} pieceGame`} id={`cell-${id}`} style={{opacity: 0.4}}></div>
        );
    }

    return useMemo(() => renderedComponent, [renderedComponent]);
}
