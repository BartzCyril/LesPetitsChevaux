import {CellEmpty, Prison, Stable, StartingPoint, GameBoard} from "@/type/GameBoard";

export function getGameBoard() : GameBoard {
    return [
        Prison.YELLOW, Prison.YELLOW, CellEmpty.TRANSPARENT, CellEmpty.TRANSPARENT, CellEmpty.BLACK, CellEmpty.BLACK, StartingPoint.GREEN, CellEmpty.TRANSPARENT, CellEmpty.TRANSPARENT, Prison.GREEN, Prison.GREEN,
        Prison.YELLOW, Prison.YELLOW, CellEmpty.TRANSPARENT, CellEmpty.TRANSPARENT, CellEmpty.BLACK, Stable.GREEN, CellEmpty.BLACK, CellEmpty.TRANSPARENT, CellEmpty.TRANSPARENT, Prison.GREEN, Prison.GREEN,
        CellEmpty.TRANSPARENT, CellEmpty.TRANSPARENT, CellEmpty.TRANSPARENT, CellEmpty.TRANSPARENT, CellEmpty.BLACK, Stable.GREEN, CellEmpty.BLACK, CellEmpty.TRANSPARENT, CellEmpty.TRANSPARENT, CellEmpty.TRANSPARENT, CellEmpty.TRANSPARENT,
        CellEmpty.TRANSPARENT, CellEmpty.TRANSPARENT, CellEmpty.TRANSPARENT, CellEmpty.TRANSPARENT, CellEmpty.BLACK, Stable.GREEN, CellEmpty.BLACK, CellEmpty.TRANSPARENT, CellEmpty.TRANSPARENT, CellEmpty.TRANSPARENT, CellEmpty.TRANSPARENT,
        StartingPoint.YELLOW, CellEmpty.BLACK, CellEmpty.BLACK, CellEmpty.BLACK, CellEmpty.BLACK, Stable.GREEN, CellEmpty.BLACK, CellEmpty.BLACK, CellEmpty.BLACK, CellEmpty.BLACK, CellEmpty.BLACK,
        CellEmpty.BLACK, Stable.YELLOW, Stable.YELLOW, Stable.YELLOW, Stable.YELLOW, CellEmpty.TRANSPARENT, Stable.RED, Stable.RED, Stable.RED, Stable.RED, CellEmpty.BLACK,
        CellEmpty.BLACK, CellEmpty.BLACK, CellEmpty.BLACK, CellEmpty.BLACK, CellEmpty.BLACK, Stable.BLUE, CellEmpty.BLACK, CellEmpty.BLACK, CellEmpty.BLACK, CellEmpty.BLACK, StartingPoint.RED,
        CellEmpty.TRANSPARENT, CellEmpty.TRANSPARENT, CellEmpty.TRANSPARENT, CellEmpty.TRANSPARENT, CellEmpty.BLACK, Stable.BLUE, CellEmpty.BLACK, CellEmpty.TRANSPARENT, CellEmpty.TRANSPARENT, CellEmpty.TRANSPARENT, CellEmpty.TRANSPARENT,
        CellEmpty.TRANSPARENT, CellEmpty.TRANSPARENT, CellEmpty.TRANSPARENT, CellEmpty.TRANSPARENT, CellEmpty.BLACK, Stable.BLUE, CellEmpty.BLACK, CellEmpty.TRANSPARENT, CellEmpty.TRANSPARENT, CellEmpty.TRANSPARENT, CellEmpty.TRANSPARENT,
        Prison.BLUE, Prison.BLUE, CellEmpty.TRANSPARENT, CellEmpty.TRANSPARENT, CellEmpty.BLACK, Stable.BLUE, CellEmpty.BLACK, CellEmpty.TRANSPARENT, CellEmpty.TRANSPARENT, Prison.RED, Prison.RED,
        Prison.BLUE, Prison.BLUE, CellEmpty.TRANSPARENT, CellEmpty.TRANSPARENT, StartingPoint.BLUE, CellEmpty.BLACK, CellEmpty.BLACK, CellEmpty.TRANSPARENT, CellEmpty.TRANSPARENT, Prison.RED, Prison.RED
    ]
}

