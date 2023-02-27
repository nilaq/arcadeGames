import {create} from 'zustand';

export interface SnakeState {
    isRunning: boolean;
    setRunning: (isRunning: boolean) => void;

    isPaused: boolean;
    setPaused: (isPaused: boolean) => void;

    // The snake's current score
    score: number;
    setScore: (score: number) => void;

    highScore: number;
    setHighScore: (highScore: number) => void;
}

export const useSnakeStore = create<SnakeState>()((set) => ({
    isRunning: false,
    setRunning: (isRunning: boolean) => set({isRunning: isRunning}),
    isPaused: false,
    setPaused: (isPaused: boolean) => set({isPaused: isPaused}),
    score: 0,
    setScore: (score: number) => set({score: score}),
    highScore: 0,
    setHighScore: (highScore: number) => set({highScore: highScore}),
}));
