import React, {useEffect, useState} from "react";
import {createEmptyBoard} from "./gameUtils";
import Button from "../../components/buttons/Button";
import {useTetrisStore} from "../../stores/tetrisStore";
import {GameState} from "./GameState";
import {useInterval} from "../lib/gameUtils";

interface Props {
    width: number;
    height: number;
}


const PlayingField = ({width, height}: Props) => {

    const {
        squareSize,
        isRunning,
        setRunning,
        score,
        setScore,
        highScore,
        setHighScore,
        nextBlock,
        setNextBlock
    } = useTetrisStore((state) => state);

    const boardDimensions = {
        rows: Math.floor(height / squareSize),
        cols: Math.floor(width / squareSize)
    }
    const [fields, setFields] = useState<string[][]>(createEmptyBoard(boardDimensions));
    const [gameState, setGameState] = useState(new GameState(boardDimensions));
    const [speed, setSpeed] = useState(500);

    // react to key movements
    useInterval(() => {
        setFields(gameState.fields);
        setScore(gameState.score);
        if (gameState.score > highScore) setHighScore(gameState.score);
    }, 50)

    // automatically move down
    useInterval(() => {
        gameState.moveDown();
        setSpeed(Math.max(600 - gameState.score * 0.5, 200));
    }, speed)

    const handleGameStart = () => {
        gameState.reset();
        setNextBlock(gameState.nextBlockType);
        setRunning(true);
    }

    const handleKeyDown = (e: KeyboardEvent) => {
        switch (e.key) {
            case 'ArrowLeft':  gameState.moveLeft(); break;
            case 'ArrowRight': gameState.moveRight(); break;
            case 'ArrowUp':    gameState.rotate(); break;
            case 'ArrowDown':  gameState.moveDown(); break;
        }
    }

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
    }, [])

    return (
        <div id="field" className="bg-gray-200 outline-4 outline outline-gray-700 flex flex-wrap"
             style={{width: width, height: height}}>
            {isRunning && fields.map((row, rowIdx) => (
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
            {!isRunning && <Button onClick={() => handleGameStart()}>Start</Button>}
        </div>
    );
};

export default PlayingField;

