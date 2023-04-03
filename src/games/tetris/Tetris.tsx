import React, {useEffect} from 'react';
import Title from '../../components/typography/Title';
import PlayingField from './PlayingField';
import {useTetrisStore} from "../../stores/tetrisStore";
import Preview from "./Preview";
import {GameStatus} from "../lib/gameUtils";
import IndicatorText from "../lib/IndicatorText";
import {chakraPetch, chakraPetchLight} from "../../pages/_app";
import Button from "../../components/buttons/Button";
import StartScreen from "./StartScreen";
import { useMediaQuery } from 'react-responsive';
import Hold from "./Hold";
import Heading from "../../components/typography/Heading";
import {Pause, Play} from "lucide-react";


const Tetris = () => {

    const isMobile = useMediaQuery({ query: '(max-width: 768px)' });

    const {
        score, level, highScore, setHighScore, gameStatus, setGameStatus
    } = useTetrisStore((state) => state);

    // use effect to persist high score
    useEffect(() => {
        const persistedHighScore = localStorage.getItem("highScore");
        if (persistedHighScore) {
            setHighScore(JSON.parse(persistedHighScore));
        }
    }, [])

    useEffect(() => {
        if (highScore > 0) {
            localStorage.setItem("highScore", JSON.stringify(highScore));
        }
    }, [highScore])

    const handlePause = () => {
        if (gameStatus === GameStatus.RUNNING) {
            setGameStatus(GameStatus.PAUSED)
        } else if (gameStatus === GameStatus.PAUSED) {
            setGameStatus(GameStatus.RUNNING)
        }
    }

    const levelDisplay = <IndicatorText title="Level" element={level.toString()} top={false}/>
    const scoreDisplay = <IndicatorText title="Score" element={score.toString()} top={false}/>

    return (
        <>
            {gameStatus === GameStatus.LOADED &&
                <StartScreen></StartScreen>
            }
            {gameStatus !== GameStatus.LOADED &&
                <div className="w-full h-full flex flex-col justify-center items-center bg-slate-900">
                    <div className="flex flex-col justify-center items-center gap-8">
                        <Title className={`text-5xl md:text-6xl ${chakraPetch.className} text-slate-300 `}>Tetris</Title>
                        <div className="flex flex-row justify-center gap-0 items-start">
                            <div className="mr-4 md:mr-9 h-full w-16 md:w-32 flex flex-col items-end justify-between">
                                <Hold></Hold>
                                {!isMobile && levelDisplay}
                            </div>
                            <PlayingField width={10} height={20}/>
                            <div className="ml-4 md:ml-9 h-full w-16 md:w-32 flex flex-col justify-between items-start">
                                <Preview></Preview>
                                {!isMobile && scoreDisplay}
                                {isMobile &&
                                    <Button className="bg-slate-600 text-slate-200 py-2 px-3" onClick={handlePause}>
                                        {gameStatus === GameStatus.PAUSED ?
                                            <Play color="white" size={20}/> :
                                            <Pause color="white" size={20} />
                                        }
                                    </Button>
                                }
                            </div>
                            {!isMobile &&
                                <div className="h-full flex flex-col items-center justify-end">
                                    <div className="absolute">
                                        {(gameStatus === GameStatus.RUNNING || gameStatus === GameStatus.PAUSED) &&
                                        <Button className="relative left-32 bg-slate-600 text-slate-200" onClick={handlePause}>{gameStatus === GameStatus.PAUSED ? 'Resume' : 'Pause'}</Button>}
                                    </div>
                                </div>
                            }
                        </div>
                        <div className="w-full flex flex-col items-center">
                            {!isMobile &&
                                <>
                                    <Heading className="text-sm text-slate-200">View Leaderboard</Heading>
                                    <Heading className={`${chakraPetchLight.className} italic text-sm text-slate-200`}>Highscore: {highScore}</Heading>
                                </>
                            }
                            {isMobile &&
                                <div className="w-3/5 flex flex-row justify-around items-center">
                                    {levelDisplay}
                                    {scoreDisplay}
                                </div>
                            }
                        </div>
                    </div>
                </div>
            }
        </>
    );
};

export default Tetris;