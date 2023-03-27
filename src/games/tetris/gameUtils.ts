import {BoardDimensions} from "../lib/gameUtils";

export function createEmptyBoard(boardDimensions: BoardDimensions): string[][] {
    const board: string[][] = [];
    for (let row = 0; row < boardDimensions.rows; row++)
        board.push(new Array(boardDimensions.cols).fill(""));
    return board;
}