import {useEffect, useRef} from "react";

export interface BoardDimensions {
    rows: number;
    cols: number;
}

export interface Cell {
    row: number;
    col: number;
}

export enum Direction {
    UP = 'up',
    DOWN = 'down',
    LEFT = 'left',
    RIGHT = 'right',
}

export enum GameStatus {
    LOADED = 'loaded',
    RUNNING = 'running',
    PAUSED = 'paused',
    GAME_OVER = 'game_over',
    READY = 'ready',
}

export function createEmptyBoard(boardDimensions: BoardDimensions): number[][] {
    const board: number[][] = [];
    for (let row = 0; row < boardDimensions.rows; row++)
        board.push(new Array(boardDimensions.cols).fill(0));
    return board;
}

export function randomInt(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function useInterval(callback: () => void, delay: number | null): void {
    const savedCallback = useRef<() => void>();

    // Remember the latest callback.
    useEffect(() => {
        savedCallback.current = callback;
    }, [callback]);

    // Set up the interval.
    useEffect(() => {
        function tick() {
            savedCallback.current!();
        }
        if (delay !== null) {
            const id = setInterval(tick, delay);
            return () => clearInterval(id);
        }
    }, [delay]);
}

export function getRandomPosition(boardDimensions: BoardDimensions): Cell {
    const row = randomInt(0, boardDimensions.rows-1);
    const col = randomInt(0, boardDimensions.cols-1);
    return {row: row, col: col};
}

export function isOutOfBounds(coords: Cell, boardDimensions: BoardDimensions): boolean {
    const {row, col} = coords;
    if (row < 0 || col < 0) return true;
    return row >= boardDimensions.rows || col >= boardDimensions.cols;
}

export function getOppositeDirection(direction: Direction): Direction {
    if (direction === Direction.UP) return Direction.DOWN;
    if (direction === Direction.RIGHT) return Direction.LEFT;
    if (direction === Direction.DOWN) return Direction.UP;
    if (direction === Direction.LEFT) return Direction.RIGHT;
    else throw new Error('Invalid direction');
}

export function getCoordsInDirection(coords: Cell, direction: Direction) {
    coords = {...coords};
    if (direction === Direction.UP) coords.row--;
    if (direction === Direction.DOWN) coords.row++;
    if (direction === Direction.LEFT) coords.col--;
    if (direction === Direction.RIGHT) coords.col++;
    return coords;
}