import React, {useEffect, useState} from "react";
import {createEmptyBoard} from "./gameUtils";
import {useTetrisStore} from "../../stores/tetrisStore";
import {GameState} from "./GameState";
import {GameStatus, useInterval} from "../lib/gameUtils";
import GameOverScreen from "./GameOverScreen";
import {useSwipeable} from "react-swipeable";

interface Props {
    width: number;
    height: number;
}


const PlayingField = ({width, height}: Props) => {

    const {
        squareSize,
        gameStatus,
        setGameStatus,
        setScore,
        setLevel,
        highScore,
        setHighScore,
        setNextBlocks,
        setHoldBlock,
    } = useTetrisStore((state) => state);

    const boardDimensions = {
        rows: height,
        cols: width
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
    }, gameStatus === GameStatus.RUNNING ? 1000/60 : null)

    // automatically move down
    useInterval(() => {
        if (gameState.gameOver) {
            handleGameOver()
            setFields(gameState.fields);
            setSpeed(gameState.speed)
        } else {
            setNextBlocks(gameState.nextBlockTypes);
            setHoldBlock(gameState.holdBlockType);
            gameState.moveDown();
            setSpeed(gameState.speed);
        }
    }, gameStatus === GameStatus.RUNNING ? speed : null)

    const handleGameOver = () => {
        setGameState(new GameState(boardDimensions));
        setGameStatus(GameStatus.GAME_OVER);
        gameState.reset();
        setNextBlocks(gameState.nextBlockTypes);
        setHoldBlock(gameState.holdBlockType);
    }

    const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === ' ') e.preventDefault();
        if (gameStatus !== GameStatus.RUNNING) return;
        switch (e.key) {
            case 'ArrowLeft':  gameState.moveLeft(); break;
            case 'ArrowRight': gameState.moveRight(); break;
            case 'ArrowUp':    gameState.rotate(); break;
            case 'ArrowDown':  gameState.soft_drop(); break;
            case 'Enter':      gameState.rotate(); break;
            case ' ':          gameState.hard_drop(); break;
            case 'z':          gameState.rotateBack(); break;
            case 'h':          gameState.hold(); break;
            case 'c':          gameState.hold(); break;
        }
    }

    const config = {
        delta: 10, // min distance(px) before a swipe starts
        preventDefaultTouchmoveEvent: true, // prevent scrolling during swipes
        trackTouch: true, // track touch input
        trackMouse: false, // track mouse input
        rotationAngle: 0, // set a rotation angle
    }

    const mobileHandlers = useSwipeable({
        onSwipedLeft: () => gameState.moveLeft(),
        onSwipedRight: () => gameState.moveRight(),
        onTap: () => gameState.rotate(),
        onSwipedDown: () => gameState.soft_drop(),
        ...config
    })

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [gameStatus])

    return (
        <div {...mobileHandlers} id="field" className={`outline outline-1 outline-dwhite flex flex-col gap-[1px]
        w-[209px] md:w-[269px] h-[419px] md:h-[539px]`}>
            {(gameStatus === GameStatus.RUNNING || gameStatus === GameStatus.PAUSED) && fields.map((row, rowIdx) => (
                <div key={rowIdx} className="row flex flex-row gap-[1px]">
                    {row.map((cellValue, cellIdx) => {
                        return <div key={cellIdx} className={`${cellValue} rounded-[1px] w-[20px] md:w-[26px]
                         h-[20px] md:h-[26px]`}></div>;
                    })}
                </div>
            ))}
            {gameStatus !== GameStatus.RUNNING &&
                <div className="flex flex-col justify-center items-center w-full h-full">
                    {gameStatus === GameStatus.GAME_OVER &&
                        <GameOverScreen></GameOverScreen>
                    }
                </div>
            }
        </div>
    );
};

export default PlayingField;

