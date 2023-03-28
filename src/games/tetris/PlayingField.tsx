import React, {useEffect, useState} from "react";
import {createEmptyBoard} from "./gameUtils";
import Button from "../../components/buttons/Button";
import {useTetrisStore} from "../../stores/tetrisStore";
import {GameState} from "./GameState";
import {GameStatus, useInterval} from "../lib/gameUtils";

interface Props {
    width: number;
    height: number;
}


const PlayingField = ({width, height}: Props) => {

    const {
        squareSize,
        gameStatus,
        setGameStatus,
        score,
        setScore,
        setLevel,
        highScore,
        setHighScore,
        setNextBlocks
    } = useTetrisStore((state) => state);

    const boardDimensions = {
        rows: Math.floor(height / squareSize),
        cols: Math.floor(width / squareSize)
    }
    const [fields, setFields] = useState<string[][]>(createEmptyBoard(boardDimensions));
    const [gameState, setGameState] = useState(new GameState(boardDimensions));
    const [speed, setSpeed] = useState<number | null>(600);

    // react to key movements
    useInterval(() => {
        setFields(gameState.fields);
        setScore(gameState.score);
        setLevel(gameState.level);
        if (gameState.score > highScore) setHighScore(gameState.score);
    }, 1000/60)

    // automatically move down
    useInterval(() => {
        if (gameState.gameOver) {
            handleGameOver()
        } else {
            setNextBlocks(gameState.nextBlockTypes);
            gameState.moveDown();
            setSpeed(gameState.speed);
        }
    }, gameStatus === GameStatus.RUNNING ? speed : null)

    const handleGameStart = () => {
        gameState.reset();
        setNextBlocks(gameState.nextBlockTypes);
        setSpeed(600);
        setGameStatus(GameStatus.RUNNING);
    }

    const handleGameOver = () => {
        setGameState(new GameState(boardDimensions));
        setGameStatus(GameStatus.GAME_OVER);
        setSpeed(null)
    }

    const handleKeyDown = (e: KeyboardEvent) => {
        switch (e.key) {
            case 'ArrowLeft':  gameState.moveLeft(); break;
            case 'ArrowRight': gameState.moveRight(); break;
            case 'ArrowUp':    gameState.rotate(); break;
            case 'ArrowDown':  gameState.soft_drop(); break;
            case 'Enter':      gameState.rotate(); break;
            case ' ':          gameState.hard_drop(); break;
            case 'Escape':     setGameStatus(GameStatus.PAUSED); break;
            case 'z':         gameState.rotateBack(); break;
        }
    }

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [gameStatus])

    return (
        <div id="field" className="outline outline-1 outline-dwhite"
             style={{width: width, height: height}}>
            {(gameStatus === GameStatus.RUNNING || gameStatus === GameStatus.PAUSED) && fields.map((row, rowIdx) => (
                <div key={rowIdx} className="row flex flex-row">
                    {row.map((cellValue, cellIdx) => {
                        return <div key={cellIdx} className={`${cellValue}`} style={
                            {
                                width: squareSize,
                                height: squareSize
                            }
                        }></div>;
                    })}
                </div>
            ))}
            {gameStatus !== GameStatus.RUNNING &&
                <div className="flex flex-col justify-center items-center w-full h-full">
                    {gameStatus === GameStatus.GAME_OVER &&
                        <>
                            <div className="text-4xl font-bold text-gray-700">Game Over!</div>
                            <div className="text-2xl font-bold text-gray-700">Score: {score}</div>
                            <Button onClick={handleGameStart} className="mt-4">Play again</Button>
                        </>
                    }
                </div>
            }
        </div>
    );
};

export default PlayingField;

