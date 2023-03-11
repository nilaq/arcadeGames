import React from 'react';
import Title from '../../components/typography/Title';
import PlayingField from './PlayingField';
import {useTetrisStore} from "../../stores/tetrisStore";
import Preview from "./Preview";
import {GameStatus} from "../lib/gameUtils";


const Tetris = () => {

    const {
        score, highScore, gameStatus, setGameStatus
    } = useTetrisStore((state) => state);

    /*
    {gameStatus === GameStatus.RUNNING &&
                            <Button onClick={() => setGameStatus(GameStatus.PAUSED)} className="mt-4">Pause</Button>
                        }
                        {gameStatus === GameStatus.PAUSED &&
                            <Button onClick={() => setGameStatus(GameStatus.RUNNING)} className="mt-4">Resume</Button>
                        }
     */

    const handlePause = () => {
        if (gameStatus === GameStatus.RUNNING) {
            setGameStatus(GameStatus.PAUSED)
        } else if (gameStatus === GameStatus.PAUSED) {
            setGameStatus(GameStatus.RUNNING)
        }
    }

    return (
        <div className="w-full h-full flex flex-col justify-center items-center">
            <div className="flex flex-col justify-center items-center">
                <Title className="text-5xl pb-10">Tetris</Title>
                <div className="flex flex-row justify-center gap-0 items-start">


                    <button onClick={handlePause} className="mt-10 flex flex-col items-center justify-center h-[90px] w-[75px] gap-2 rounded-l-xl
                        bg-gradient-to-bl from-tetris-red to-[#D80259]">
                        {gameStatus === GameStatus.RUNNING &&
                            <>
                                <Title className="text-white">Pause</Title>
                                <div className="flex flex-row gap-[6px]">
                                    <div className="h-[20px] w-[6px] rounded-[1px] bg-white"></div>
                                    <div className="h-[20px] w-[6px] rounded-[1px] bg-white"></div>
                                </div>
                            </>
                        }
                        {gameStatus === GameStatus.PAUSED &&
                            <>
                                <Title className="text-white">Resume</Title>
                                <div className="w-0 h-0" style={{
                                    borderTop: "12px solid transparent",
                                    borderBottom: "12px solid transparent",
                                    borderLeft: "20px solid white"
                                }}>
                                </div>

                            </>
                        }
                    </button>

                    <div className="flex flex-col">
                        <div className="h-full flex flex-row">
                            <div className="w-[30px] h-[100] bg-gradient-to-b from-tetris-purple to-tetris-blue"></div>
                            <PlayingField width={325} height={650}/>
                            <div className="w-[30px] h-[100] bg-gradient-to-b from-tetris-purple to-tetris-blue"></div>
                        </div>
                        <div className="w-full h-[30px] bg-tetris-blue rounded-b-3xl"></div>
                    </div>

                    <div className="mt-10 flex flex-col items-start">
                        <Preview width={75} height={180}></Preview>
                        <div className="mt-10 flex flex-col items-center justify-center h-[90px] w-[75px] rounded-r-xl
                        bg-gradient-to-br from-tetris-purple to-w-purple">
                            <Title className="text-white">Level</Title>
                            <Title className="text-white text-3xl">7</Title>
                        </div>
                    </div>

                </div>
                <div className="pt-5 w-full flex flex-row items-center justify-center">
                    <div className="flex flex-col items-center justify-center">
                        <Title className="text-ll pt-3 p-0 font-bold">Score</Title>
                        <Title className="text-4xl pt-3 p-0 font-light">{score}</Title>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Tetris;