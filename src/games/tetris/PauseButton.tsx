import React from 'react';
import {GameStatus} from "../lib/gameUtils";
import Title from "../../components/typography/Title";
import {useTetrisStore} from "../../stores/tetrisStore";

const PauseButton = () => {

    const {
        gameStatus, setGameStatus
    } = useTetrisStore((state) => state);

    const handlePause = () => {
        if (gameStatus === GameStatus.RUNNING) {
            setGameStatus(GameStatus.PAUSED)
        } else if (gameStatus === GameStatus.PAUSED) {
            setGameStatus(GameStatus.RUNNING)
        }
    }


    return (

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
    );
};

export default PauseButton;