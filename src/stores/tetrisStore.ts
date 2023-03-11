import {create} from 'zustand';
import {BlockFactory, BlockType} from "../games/tetris/Blocks";
import {GameStatus} from "../games/lib/gameUtils";

export interface TetrisState {
    squareSize: number;
    gameStatus: GameStatus
    setGameStatus: (gameStatus: GameStatus) => void;

    // The snake's current score
    score: number;
    setScore: (score: number) => void;

    highScore: number;
    setHighScore: (highScore: number) => void;

    nextBlock: BlockType | undefined;

    setNextBlock: (nextBlock: BlockType | undefined) => void;
}

export const useTetrisStore = create<TetrisState>()((set) => ({
    squareSize: 25,
    gameStatus: GameStatus.READY,
    setGameStatus: (gameStatus: GameStatus) => set({gameStatus: gameStatus}),
    score: 0,
    setScore: (score: number) => set({score: score}),
    highScore: 0,
    setHighScore: (highScore: number) => set({highScore: highScore}),
    nextBlock: undefined,
    setNextBlock: (nextBlock: BlockType | undefined) => set({nextBlock: nextBlock})
}));
