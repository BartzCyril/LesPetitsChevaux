export enum Prison {
    RED = "red",
    YELLOW = "yellow",
    BLUE = "blue",
    GREEN = "green"
}

export enum StartingPoint {
    RED = "red",
    YELLOW = "yellow",
    BLUE = "blue",
    GREEN = "green"
}

export enum Stable {
    RED = "red",
    YELLOW = "yellow",
    BLUE = "blue",
    GREEN = "green"
}

export enum CellEmpty {
    BLACK = "black",
    TRANSPARENT = "transparent"
}

export enum PieceGameColor {
    RED = "red",
    YELLOW = "yellow",
    BLUE = "blue",
    GREEN = "green"
}

export type CellState = Prison | StartingPoint | Stable | CellEmpty | PieceGameColor
export type GameBoard = CellState[]
export type Index = number
