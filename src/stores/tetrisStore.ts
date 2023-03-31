import {create} from 'zustand';
import {BlockType} from "../games/tetris/Blocks";
import {GameStatus} from "../games/lib/gameUtils";

export interface TetrisState {
    squareSize: number;
    gameStatus: GameStatus
    setGameStatus: (gameStatus: GameStatus) => void;

    // The snake's current score
    score: number;
    setScore: (score: number) => void;
    level: number;
    setLevel: (level: number) => void;

    highScore: number;
    setHighScore: (highScore: number) => void;

    nextBlocks: BlockType[];

    setNextBlocks: (nextBlock: BlockType[]) => void;
    holdBlock: BlockType | null;
    setHoldBlock: (holdBlock: BlockType | null) => void;
}

export const useTetrisStore = create<TetrisState>()((set) => ({
    squareSize: 26,
    gameStatus: GameStatus.LOADED,
    setGameStatus: (gameStatus: GameStatus) => set({gameStatus: gameStatus}),
    score: 0,
    setScore: (score: number) => set({score: score}),
    level: 1,
    setLevel: (level: number) => set({level: level}),
    highScore: 0,
    setHighScore: (highScore: number) => set({highScore: highScore}),
    nextBlocks: [],
    setNextBlocks: (nextBlocks: BlockType[]) => set({nextBlocks: nextBlocks}),
    holdBlock: null,
    setHoldBlock: (holdBlock: BlockType | null) => set({holdBlock: holdBlock})
}));
