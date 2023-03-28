import React from 'react';
import Title from '../../components/typography/Title';
import PlayingField from './PlayingField';
import {useTetrisStore} from "../../stores/tetrisStore";
import Preview from "./Preview";
import {GameStatus} from "../lib/gameUtils";
import IndicatorText from "../lib/IndicatorText";
import {chakraPetch} from "../../pages/_app";
import Button from "../../components/buttons/Button";
import StartScreen from "./StartScreen";


const Tetris = () => {

    const {
        score, level, highScore, gameStatus, setGameStatus
    } = useTetrisStore((state) => state);

    const handlePause = () => {
        if (gameStatus === GameStatus.RUNNING) {
            setGameStatus(GameStatus.PAUSED)
        } else if (gameStatus === GameStatus.PAUSED) {
            setGameStatus(GameStatus.RUNNING)
        }
    }

    return (
        <>
            {gameStatus === GameStatus.LOADED &&
                <StartScreen></StartScreen>
            }
            {gameStatus !== GameStatus.LOADED &&
                <div className="w-full h-full flex flex-col justify-center items-center bg-black">
                    <div className="flex flex-col justify-center items-center">
                        <Title className={`text-6xl pb-10 ${chakraPetch.className} text-transparent bg-gradient-to-r 
                                        from-[#9C9E9F] via-[#FDFFFF] to-[#A7A9AB] bg-clip-text `}>Tetris</Title>
                        <div className="flex flex-row justify-center gap-0 items-start">

                            <div className="mr-7 h-full w-32 flex flex-col items-end justify-between">
                                <IndicatorText title="Level" element={level.toString()} elementSize="4xl" top={true}/>
                                <IndicatorText title="Score" element={score.toString()} elementSize="4xl" top={false}/>
                            </div>
                            <PlayingField width={300} height={600}/>
                            <div className="ml-7 h-full w-32 flex flex-col justify-between items-start">
                                <Preview></Preview>
                                <IndicatorText title="Highscore" element={highScore.toString()} elementSize="4xl" top={false}/>
                            </div>

                        </div>
                        <div className="pt-5 w-full flex flex-row items-center justify-center">
                            <Button onClick={handlePause}>{gameStatus === GameStatus.PAUSED ? 'Resume' : 'Pause'}</Button>
                        </div>
                    </div>
                </div>
            }
        </>
    );
};

export default Tetris;