import React, {useEffect} from 'react';
import Title from '../../components/typography/Title';
import PlayingField from './PlayingField';
import {useTetrisStore} from "../../stores/tetrisStore";
import Preview from "./Preview";
import {GameStatus} from "../lib/gameUtils";
import IndicatorText from "../lib/IndicatorText";
import {chakraPetch} from "../../pages/_app";
import Button from "../../components/buttons/Button";
import StartScreen from "./StartScreen";
import Cookie from "js-cookie";


const Tetris = () => {

    const {
        score, level, highScore, setHighScore, gameStatus, setGameStatus
    } = useTetrisStore((state) => state);

    // use effect to persist high score
    useEffect(() => {
        const persistedHighScore = Cookie.get("highScore");
        if (persistedHighScore) {
            setHighScore(JSON.parse(persistedHighScore));
        }
    }, [])

    useEffect(() => {
        if (highScore > 0) {
            Cookie.set("highScore", JSON.stringify(highScore));
        }
    }, [highScore])

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
                <div className="w-full h-full flex flex-col justify-center items-center bg-slate-900">
                    <div className="flex flex-col justify-center items-center">
                        <Title className={`text-6xl pb-10 ${chakraPetch.className} text-slate-300 `}>Tetris</Title>
                        <div className="flex flex-row justify-center gap-0 items-start">

                            <div className="mr-9 h-full w-32 flex flex-col items-end justify-between">
                                <IndicatorText title="Level" element={level.toString()} elementSize="4xl" top={true}/>
                                <IndicatorText title="Score" element={score.toString()} elementSize="4xl" top={false}/>
                            </div>
                            <PlayingField width={10} height={20}/>
                            <div className="ml-9 h-full w-32 flex flex-col justify-between items-start">
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