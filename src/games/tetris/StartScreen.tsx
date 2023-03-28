import React from 'react';
import Title from "../../components/typography/Title";
import {chakraPetch} from "../../pages/_app";
import {GameStatus} from "../lib/gameUtils";
import {useTetrisStore} from "../../stores/tetrisStore";
import MetalButton from "../../components/buttons/MetalButton";

const StartScreen = () => {

    const {
        setGameStatus
    } = useTetrisStore((state) => state);

    return (
        <div className="w-full h-full flex flex-col justify-center items-center bg-black">
            <div className="flex flex-col justify-center items-center">
                <Title className={`text-7xl pb-10 ${chakraPetch.className} text-transparent bg-gradient-to-r 
                                    from-[#9C9E9F] via-[#FDFFFF] to-[#A7A9AB] bg-clip-text `}>Tetris</Title>
                <MetalButton onClick={() => setGameStatus(GameStatus.RUNNING)}>Start</MetalButton>
            </div>
        </div>
    );
};

export default StartScreen;