import React, {useEffect, useState} from "react";
import {createEmptyBoard} from "./gameUtils";
import Button from "../../components/buttons/Button";
import {useTetrisStore} from "../../stores/tetrisStore";
import {GameState} from "./GameState";
import {BlockType} from "./Blocks";
import {Direction} from "../lib/gameUtils";

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

    const [update, setUpdate] = useState(false);

    useEffect(() => {
        if (update) {
            setFields(gameState.fields);
            setUpdate(false)
        }
    }, [gameState, update])

    //useInterval(moveSnake, isRunning ? speed : null)

    const handleGameStart = (speed: number) => {
        setRunning(true);
        setScore(0);
        setFields(createEmptyBoard(boardDimensions));
    }

    const handleKeyDown = (e: KeyboardEvent) => {
        switch (e.key) {
            case 'ArrowLeft':  gameState.moveLeft(); break;
            case 'ArrowRight': gameState.moveRight(); break;
            case 'ArrowUp':    gameState.rotate(); break;
            case 'ArrowDown':  gameState.moveDown(); break;
        }
        if (!update) setUpdate(true);
        console.log(update)
    }

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        if (!gameState.initialized) {
            gameState.addBlock()
            setNextBlock(gameState.nextBlockType)
        }
        setUpdate(true);
    }, [])

    return (
        <div id="field" className="bg-gray-200 outline-4 outline outline-gray-700 flex flex-wrap"
             style={{width: width, height: height}}>
            {fields.map((row, rowIdx) => (
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
        </div>
    );
};

export default PlayingField;

