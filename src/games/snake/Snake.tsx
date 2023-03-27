import React from 'react';
import Title from '../../components/typography/Title';
import PlayingField from './PlayingField';
import {useSnakeStore} from "../../stores/snakeStore";
import Button from '../../components/buttons/Button';


const Snake = () => {

    const {score, highScore} = useSnakeStore((state) => state);

    return (
        <div className="w-full h-full flex flex-col justify-center items-center">
            <Title className="text-5xl pb-10">Snake</Title>
            <div>
                <PlayingField width={700} height={500}/>
                <div className="pt-5 w-[700px] flex flex-row items-center justify-between">
                    <Title className="text-2xl pt-3">Score: {score}</Title>
                    <Title className="text-2xl pt-3">Highscore: {highScore}</Title>
                </div>
            </div>
        </div>
    );
};

export default Snake;