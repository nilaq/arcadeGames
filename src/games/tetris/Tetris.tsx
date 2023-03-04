import React from 'react';
import Title from '../../components/typography/Title';
import PlayingField from './PlayingField';
import Button from '../../components/buttons/Button';
import {useTetrisStore} from "../../stores/tetrisStore";
import Preview from "./Preview";


const Tetris = () => {

    const {score, highScore} = useTetrisStore((state) => state);

    return (
        <div className="w-full h-full flex flex-col justify-center items-center">
            <div className="flex flex-col justify-center items-center">
                <Title className="text-5xl pb-10">Tetris</Title>
                <div className="flex flex-row justify-center gap-12 items-start">
                    <PlayingField width={450} height={810}/>
                    <Preview width={200} height={200}></Preview>
                </div>
                <div className="pt-5 w-full flex flex-row items-end justify-between">
                    <div className="flex flex-col items-start justify-start">
                        <Title className="text-2xl pt-3 p-0">Level: 1</Title>
                        <Title className="text-2xl pt-3 p-0">Score: {score}</Title>
                    </div>
                    <Title className="text-2xl pt-3">Highscore: {highScore}</Title>
                </div>
            </div>
        </div>
    );
};

export default Tetris;