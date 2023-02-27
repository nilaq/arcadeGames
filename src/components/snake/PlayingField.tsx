import React, {useState} from 'react';
import {useSnakeStore} from "../../stores/snakeStore";
import Button from '../buttons/Button';
import {useInterval, Direction, getRandomPosition, isOutOfBounds, createEmptyBoard} from "./gameUtils";
import Snake from './snakeClass';
import Title from "../typography/Title";

interface Props {
    width: number;
    height: number;
}


const PlayingField = ({width, height}: Props) => {

    const squareSize = 25;
    const boardDimensions = {
        rows: Math.floor(height / squareSize),
        cols: Math.floor(width / squareSize)
    }
    const [fields, setFields] = useState<number[][]>(createEmptyBoard(boardDimensions));
    const [snake, setSnake] = useState(new Snake());
    const [food, setFood] = useState(getRandomPosition(boardDimensions));
    const [speed, setSpeed] = useState(500);

    const {
        isRunning,
        setRunning,
        score,
        setScore,
        highScore,
        setHighScore
    } = useSnakeStore((state) => state);

    const updateFields = () => {
        const newFields = createEmptyBoard(boardDimensions);
        // @ts-ignore
        newFields[food.row][food.col] = 2;
        snake.getBody().forEach((cell) => {
            if (isOutOfBounds(cell, boardDimensions)  || snake.isRunningIntoSelf()) {
                handleGameOver();
                return
            }
            // @ts-ignore
            newFields[cell.row][cell.col] = 1;
        });
        setFields(newFields);
    }

    const handleGameOver = () => {
        setRunning(false);
        if (score > highScore) setHighScore(score);
        setScore(0);
        setSnake(new Snake());
        setFields(createEmptyBoard(boardDimensions));
    }

    const handleGameStart = (speed = 300) => {
        window.addEventListener('keydown', handleKeyDown);
        setFields(createEmptyBoard(boardDimensions));
        setRunning(true);
        setSpeed(speed);
    }

    const moveSnake = () => {
        snake.move();
        if (snake.getHead().row === food.row && snake.getHead().col === food.col)
            handleFoodConsumption();
        updateFields()
    }

    const handleFoodConsumption = () => {
        setFood(getRandomPosition(boardDimensions));
        snake.grow();
        setScore(score + pointsAddition());
    }

    const pointsAddition = () => {
        switch(speed) {
            case 400: return 5;
            case 200: return 10;
            case 100: return 15;
            default: return 5;
        }
    }

    useInterval(moveSnake, isRunning ? speed : null)


    // add steering controls
    const handleKeyDown = (e: KeyboardEvent) => {
        switch (e.key) {
            case 'ArrowLeft':  snake.setDirection(Direction.LEFT); break;
            case 'ArrowRight': snake.setDirection(Direction.RIGHT); break;
            case 'ArrowUp':    snake.setDirection(Direction.UP); break;
            case 'ArrowDown':  snake.setDirection(Direction.DOWN); break;
        }
    }

    return (
        <div id="field" className="bg-lime outline-4 outline outline-gray-700 flex flex-wrap"
             style={{width: width, height: height}}>
            {isRunning && fields.map((row, rowIdx) => (
                <div key={rowIdx} className="row flex flex-row">
                    {row.map((cellValue, cellIdx) => {
                        return <div key={cellIdx} className="border-solid border-black rounded-md" style={
                            {
                                width: squareSize,
                                height: squareSize,
                                backgroundColor: (cellValue === 1 ? 'black' : (cellValue === 2 ? "#FF312E" : 'transparent'))
                            }
                        }></div>;
                    })}
                </div>
            ))}
            {!isRunning &&
                <div className="flex flex-col items-center justify-center w-full h-full gap-5">
                    <Title className="text-3xl font-normal">Choose Level:</Title>
                    <div className="flex flex-row items-center justify-center w-full gap-5">
                        <Button variant="subtle" className="w-28 h-12 text-xl text-black border-2 border-black bg-transparent" onClick={() => {handleGameStart(300)}}>Slow</Button>
                        <Button variant="subtle" className="w-28 h-12 text-xl text-black border-2 border-black bg-transparent" onClick={() => {handleGameStart(200)}}>Medium</Button>
                        <Button variant="subtle" className="w-28 h-12 text-xl text-black border-2 border-black bg-transparent" onClick={() => {handleGameStart(100)}}>Fast</Button>
                    </div>
                </div>
            }
        </div>
    );
};

export default PlayingField;