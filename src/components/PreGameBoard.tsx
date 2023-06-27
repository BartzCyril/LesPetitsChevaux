import {GameBoard, CellState} from "@/type/GameBoard";
import {getGameBoard} from "@/game/gameboard/gameboard";
import {PlayerColor} from "@/type/PlayerColor";

type CellProps = {
    color: CellState;
    id: string;
    isPlay?: boolean;
    colorPlayer?: PlayerColor
};

type PreGameBoard = {
    isPlay?: boolean;
    colorPlayer?: PlayerColor,
    handleStart?: () => void,
}

function Cell({color, id, isPlay, colorPlayer}: CellProps) {
    if (
        id === '0' || id === '1' || id === '11' || id === '12' ||
        id === '108' || id === '109' || id === '119' || id === '120' ||
        id === '9' || id === '10' || id === '20' || id === '21' ||
        id === '99' || id === '100' || id === '110' || id === '111'
    ) {
        if (colorPlayer !== undefined) {
            return <div className={`${color} pieceGame`} id={`cell-${id}`}>
                {color === colorPlayer ? <img src={`./img/person-${color}.svg`} alt="your player"/> :
                    <img src={`./img/robot-${color}.svg`} alt="robot player"/>}
            </div>;
        } else {
            return <div className={`${color} pieceGame`} id={`cell-${id}`}></div>
        }
    } else if (
        id === '16' || id === '27' || id === '38' || id === '49' ||
        id === '64' || id === '63' || id === '62' || id === '61' ||
        id === '104' || id === '93' || id === '82' || id === '71' ||
        id === '56' || id === '57' || id === '58' || id === '59'
    )
        return <div className={`${color} pieceGame`} id={`cell-${id}`}></div>;
    else if (
        id === "6" || id === "44" || id === "76" || id === "114"
    )
        return <div className={`border-${color} cell-start`} id={`cell-${id}`}></div>;
    else if (
        !isPlay && id === '60'
    )
        return <div
            className="btn-play">
            <img src="./img/play.svg" alt="play"/>
        </div>
    else if (color === "transparent")
        return <div className={`${color}`} id={`cell-${id}`}></div>;
    else
        return <div className={`pieceGame`} id={`cell-${id}`}></div>;
}

export function PreGameBoard({isPlay, colorPlayer, handleStart}: PreGameBoard) {
    const GameBoard: GameBoard = getGameBoard()
    if (!isPlay) {
        return (
            <button className="gameBoard preGameBoard" onClick={handleStart}>
                <div className="gameBoard-grid">
                    {GameBoard.map((color, index) => <Cell color={color} id={`${index}`} key={`${index}`} isPlay={isPlay}
                                                           colorPlayer={colorPlayer}/>)}
                </div>
            </button>
        )
    }
    return (
        <div className="gameBoard preGameBoard">
            <div className="gameBoard-grid">
                {GameBoard.map((color, index) => <Cell color={color} id={`${index}`} key={`${index}`} isPlay={isPlay}
                                                       colorPlayer={colorPlayer}/>)}
            </div>
        </div>
    )
}
