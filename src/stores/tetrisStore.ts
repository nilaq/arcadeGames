import {create} from 'zustand';
import {BlockFactory, BlockType} from "../games/tetris/Blocks";

export interface TetrisState {
    squareSize: number;
    isRunning: boolean;
    setRunning: (isRunning: boolean) => void;

    isPaused: boolean;
    setPaused: (isPaused: boolean) => void;

    // The snake's current score
    score: number;
    setScore: (score: number) => void;

    highScore: number;
    setHighScore: (highScore: number) => void;

    nextBlock: BlockType | undefined;

    setNextBlock: (nextBlock: BlockType) => void;
}

export const useTetrisStore = create<TetrisState>()((set) => ({
    squareSize: 30,
    isRunning: false,
    setRunning: (isRunning: boolean) => set({isRunning: isRunning}),
    isPaused: false,
    setPaused: (isPaused: boolean) => set({isPaused: isPaused}),
    score: 0,
    setScore: (score: number) => set({score: score}),
    highScore: 0,
    setHighScore: (highScore: number) => set({highScore: highScore}),
    nextBlock: undefined,
    setNextBlock: (nextBlock: BlockType) => set({nextBlock: nextBlock})
}));
