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

        <button onClick={handlePause} className="flex flex-row gap-[8px] items-center justify-center">

            {gameStatus !== GameStatus.PAUSED &&
                <>
                    <div className="flex flex-row gap-[6px]">
                        <div className="h-[20px] w-[6px] rounded-[1px] bg-white"></div>
                        <div className="h-[20px] w-[6px] rounded-[1px] bg-white"></div>
                    </div>
                    <Title className="text-white">Pause</Title>
                </>
            }
            {gameStatus === GameStatus.PAUSED &&
                <>
                    <div className="w-0 h-0" style={{
                        borderTop: "12px solid transparent",
                        borderBottom: "12px solid transparent",
                        borderLeft: "20px solid white"
                    }}>
                    </div>
                    <Title className="text-white">Resume</Title>

                </>
            }
        </button>
    );
};

export default PauseButton;