/**
 * Component: Game tic-tac-toe, human VS human 
 */

import { useState } from "react";
import css from "./TicTacToeJoel.module.css";
import classNames from "classnames";

/**
 * Types definition
 */

enum CELL {
    _ = ' ',
    X = 'X',
    O = 'O',
}

/**
 * Constants
 */

const SIZE: number = 3;
const START_POS : CELL[][] = new Array(SIZE).fill(null).map(_ => new Array(SIZE).fill(CELL._));
function initAllLinesCoords(): Array<Array<[number, number]>> {
    const allLines : Array<{fromCol: number, fromRow: number, deltaCol: number, deltaRow: number}> = [
        {fromCol: 0, fromRow: 0, deltaCol: 1, deltaRow: 0},
        {fromCol: 0, fromRow: 1, deltaCol: 1, deltaRow: 0},
        {fromCol: 0, fromRow: 2, deltaCol: 1, deltaRow: 0},
        {fromCol: 0, fromRow: 0, deltaCol: 0, deltaRow: 1},
        {fromCol: 1, fromRow: 0, deltaCol: 0, deltaRow: 1},
        {fromCol: 2, fromRow: 0, deltaCol: 0, deltaRow: 1},
        {fromCol: 0, fromRow: 0, deltaCol: 1, deltaRow: 1},
        {fromCol: 2, fromRow: 0, deltaCol: -1, deltaRow: 1},
    ];
    const allLinesCoords = new Array<Array<[number, number]>>();
    for (const line of allLines) {
        const lineCoords = new Array<[number, number]>();
        for (let colIdx: number = line.fromCol, rowIdx: number = line.fromRow;
                colIdx >= 0 && colIdx < SIZE && rowIdx >=0 && rowIdx < SIZE;
                colIdx += line.deltaCol, rowIdx+= line.deltaRow) {
            lineCoords.push([colIdx, rowIdx]);
        }
        allLinesCoords.push(lineCoords);
    }
    return allLinesCoords;
}
const ALL_LINES_COORDS: Array<Array<[number, number]>> = initAllLinesCoords();

/**
 * Component
 */

export default function TicTacToeJoel() {
    // states
    const [grid, setGrid] = useState<CELL[][]>(START_POS);
    const [currentPlayer, setCurrentPlayer] = useState(CELL.X);
    const [winner, setWinner] = useState<CELL | null>(null); // null | _ for tie | X | O

    // handlers
    function handleCellClick(rowIdx: number, colIdx: number) {
        // play move
        const gridClone : CELL[][] = JSON.parse(JSON.stringify(grid));
        gridClone[rowIdx][colIdx] = currentPlayer;
        setGrid(gridClone);
        // check winner
        let newWinner: CELL | null = null;
        for (const lineCoords of ALL_LINES_COORDS) {
            const currentPlayerHasWon: boolean = lineCoords.every(([colIdx, rowIdx]) => gridClone[colIdx][rowIdx] == currentPlayer);
            if (currentPlayerHasWon) {
                newWinner = currentPlayer;
                break;
            }
        }
        // check tie
        if (!newWinner) {
            const isTie: boolean = gridClone.every(row => row.every(cell => cell != CELL._));
            if (isTie) {
                newWinner = CELL._;
            }
        }
        // record winner
        if (newWinner) {
            setWinner(newWinner)
        }
        // switch player
        setCurrentPlayer(currentPlayer == CELL.X ? CELL.O : CELL.X);
    }

    function handleRestartClick() {
        setGrid(START_POS);
        setWinner(null);
    }

    // init variables
    let status : string;
    if (!winner) {
        status = `Next player is ${currentPlayer}`;
    } else if (winner == CELL._) {
        status = `It's a tie!`;
    } else {
        status = `Player ${winner} has won.`;
    }

    // render component
    return (
        <div className={css.container}>
            <div className={css.grid}>
                {grid.map((row, rowIdx) => (
                    <div key={rowIdx}>
                        {row.map((col, colIdx) => (
                            <div
                                key={colIdx}
                                className={classNames(
                                    css.cell,
                                    {
                                        [css.clickable]: !winner && grid[rowIdx][colIdx] == CELL._
                                    }
                                )}
                                onClick={() => handleCellClick(rowIdx, colIdx)}
                            >
                                {col}
                            </div>
                        ))}
                    </div>
                ))}
            </div>
            <h1>{status}</h1>
            <div>
                <button onClick={handleRestartClick}>Restart</button>
            </div>
        </div>
    );
}