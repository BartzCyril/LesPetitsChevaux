import {Index} from "@/type/GameBoard";

export interface Piece {
    indexPrison: number,
    out: boolean,
    indexPath: number
}

export interface PlayerColors {
    yellow : {
        pathPiece: Index[],
        pieces: Piece[]
    },
    red : {
        pathPiece: Index[],
        pieces: Piece[]
    },
    green : {
        pathPiece: Index[],
        pieces: Piece[]
    },
    blue : {
        pathPiece: Index[],
        pieces: Piece[]
    }
}