import React, {useEffect, useState} from 'react';
import Button from "../../components/buttons/Button";
import Title from '../../components/typography/Title';
import {useTetrisStore} from "../../stores/tetrisStore";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "../../components/tabs/Tabs";
import {chakraPetchLight} from "../../pages/_app";
import Text from "../../components/typography/Text";
import Input from "../../components/inputs/Input";
import {GameStatus} from "../lib/gameUtils";
import {api} from "../../utils/api";

interface ScoreEntry {
    name: string;
    score: number;
    highlight: boolean;
}


const GameOverScreen = () => {

    const {
        score, setScore, setGameStatus, uid, updatedScore, setUpdatedScore
    } = useTetrisStore((state) => state);

    const localName = localStorage.getItem("name");
    const [name, setName] = useState<string>(localName ? localName : "");
    const [scoreId, setScoreId] = useState<string | null>(null);
    let localScores: ScoreEntry[] = [];
    let globalScores: ScoreEntry[] = [];

    // get local scores
    if (uid !== null) {
        const { data: locals} = api.score.getTop5Local.useQuery(uid);
        if (locals !== undefined) {
            const localMap: ScoreEntry[] = locals.filter((local) => local.score !== score).map((local) => {
                    return {name: local.name ? local.name : "", score: local.score, highlight: false}
            })
            localScores = [...(localMap as ScoreEntry[]), {name: name, score: score, highlight: true}].sort((a, b) => b.score - a.score).slice(0, 5);
        }
    }

    // get global scores
    const { data: globals} = api.score.getTop5Global.useQuery();
    if (globals !== undefined) {
        const globalMap = globals.filter((global) => global.score !== score).map((global) => {
            return {name: global.name ? global.name : "", score: global.score, highlight: false}
        })
        globalScores = [...(globalMap as ScoreEntry[]), {name: name, score: score, highlight: true}].sort((a, b) => b.score - a.score).slice(0, 5);
    }

    // define create score mutation
    const { mutate: createScore} = api.score.create.useMutation({
        onSuccess: (score) => {
            console.log("Score created successfully")
            setScoreId(score.id);
        },
        onError: (error) => {
            console.log(error.message);
            setUpdatedScore(false);
        }
    });

    // define update score mutation
    const { mutate: updateScore } = api.score.update.useMutation({
        onSuccess: (score) => {
            console.log("Score updated successfully")
        },
        onError: (error) => {
            console.log(error.message);
        }
    })

    // send score to db if game over
    useEffect(() => {
        if(uid !== null) {
            if (!updatedScore) {
                const name = localStorage.getItem("name");
                setUpdatedScore(true);
                if (name !== null) {
                    createScore({score: score, user: uid, name: name});
                } else {
                    createScore({score: score, user: uid});
                }
            }
        }
    }, [])

    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
        localStorage.setItem("name", event.target.value);
        if (scoreId !== null) {
            updateScore({id: scoreId, name: event.target.value});
        }
    }

    const scoreLine = (place: string, name: string, score: string, highlight = false, key: number) => {
        const text = <>
                <div className="flex flex-row gap-2" >
                    <div className="w-3 text-slate-100 font-bold">{place}.</div>
                    <div className={`text-slate-100 ${chakraPetchLight.className}`}>{name}</div>
                 </div>
                 <div className="text-slate-100 font-bold">{score}</div>
            </>

        if (highlight) {
            return (
                <div className="w-full flex flex-row justify-between bg-slate-600 rounded-[6px] px-2" key={key}>{text}</div>
            )
        }
        else {
            return (
                <div className="w-full flex flex-row justify-between px-2" key={key}>{text}</div>
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
                            {localScores.map((local, index) => {
                                return scoreLine((index + 1).toString(), local.name, local.score.toString(), local.highlight, index)
                            })}
                        </TabsContent>
                        <TabsContent value="global">
                            {globalScores.map((global, index) => {
                                return scoreLine((index + 1).toString(), global.name, global.score.toString(), global.highlight, index)
                            })}
                        </TabsContent>
                    </div>
                </Tabs>
                <Input id="name-input" type="text" defaultValue={name} placeholder="name" onChange={handleNameChange}/>
            </div>
            <div className="w-1/2 flex flex-col items-center gap-2">
                <Button className="relative h-8 w-40 bg-slate-800">
                    <div className="w-16 h-5 bg-slate-600 rounded-[3px] absolute top-[-8px] right-[-22px] flex flex-col justify-center items-center">
                        <Text className={`${chakraPetchLight.className} text-xs text-slate-100`}>Watch ad</Text>
                    </div>
                    Continue
                </Button>
                <Button onClick={() => {setScore(0); setGameStatus(GameStatus.RUNNING); setUpdatedScore(false)}} className="h-8 w-40 bg-slate-700">Play again</Button>
            </div>
        </div>
    );
};

export default GameOverScreen;