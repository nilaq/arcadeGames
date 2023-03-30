import React, {useState} from 'react';
import Button from "../../components/buttons/Button";
import Title from '../../components/typography/Title';
import {useTetrisStore} from "../../stores/tetrisStore";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "../../components/tabs/Tabs";
import {chakraPetchLight} from "../../pages/_app";
import Text from "../../components/typography/Text";
import Input from "../../components/inputs/Input";
import {GameStatus} from "../lib/gameUtils";


const GameOverScreen = () => {

    const {
        score, setScore, setGameStatus
    } = useTetrisStore((state) => state);

    const [name, setName] = useState<string>('name');

    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
    }

    const scoreLine = (place: string, name: string, score: string, highlight = false) => {

        const text = <>
                <div className="flex flex-row gap-2">
                    <div className="w-3 text-slate-100 font-bold">{place}.</div>
                    <div className={`text-slate-100 ${chakraPetchLight.className}`}>{name}</div>
                 </div>
                 <div className="text-slate-100 font-bold">{score}</div>
            </>

        if (highlight) {
            return (
                <div className="w-full flex flex-row justify-between bg-slate-600 rounded-[6px] px-2">{text}</div>
            )
        }
        else {
            return (
                <div className="w-full flex flex-row justify-between px-2">{text}</div>
            )
        }
    }

    return (
        <div className="w-full h-full bg-slate-200 px-6 flex flex-col justify-around items-center py-6">
            <div className="text-4xl font-bold text-slate-800">Game Over!</div>
            <div className="w-full flex flex-col gap-2">
                <Tabs defaultValue="local">
                    <div className="flex flex-row justify-between mb-1">
                        <Title className="pl-2 text-slate-800 text-xl tracking-wider">Highscores</Title>
                            <div>
                                <TabsList>
                                    <TabsTrigger value="local" >Local</TabsTrigger>
                                    <TabsTrigger value="global">Global</TabsTrigger>
                                </TabsList>
                            </div>
                    </div>
                    <div className="w-full px-2 pt-1 pb-2 bg-slate-800 flex flex-col rounded-[6px]">
                        <TabsContent value="local">
                            {scoreLine("1", "juliushi", "120,057")}
                            {scoreLine("2", "djraban", "103,123")}
                            {scoreLine("3", name, "98,085", true)}
                            {scoreLine("4", "blitzard", "73,110")}
                            {scoreLine("5", "juliushi", "2,304")}
                        </TabsContent>
                        <TabsContent value="global">
                            {scoreLine("2", "juliushihi", "120,057")}
                            {scoreLine("3", "djraban", "103,123")}
                            {scoreLine("4", name, "98,085", true)}
                            {scoreLine("4", "blitzard", "73,110")}
                            {scoreLine("5", "juliushi", "2,304")}
                        </TabsContent>
                    </div>
                </Tabs>
                <Input id="name-input" type="text" placeholder="name" onChange={handleNameChange}/>
            </div>
            <div className="w-1/2 flex flex-col items-center gap-2">
                <Button className="relative h-8 w-40 bg-slate-800">
                    <div className="w-16 h-5 bg-slate-600 rounded-[3px] absolute top-[-8px] right-[-22px] flex flex-col justify-center items-center">
                        <Text className={`${chakraPetchLight.className} text-xs text-slate-100`}>Watch ad</Text>
                    </div>
                    Continue
                </Button>
                <Button onClick={() => setGameStatus(GameStatus.RUNNING)} className="h-8 w-40 bg-slate-700">Play again</Button>
            </div>
        </div>
    );
};

export default GameOverScreen;