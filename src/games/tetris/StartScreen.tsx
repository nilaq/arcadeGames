import React, {useEffect, useRef, useState} from 'react';
import Title from "../../components/typography/Title";
import {chakraPetch} from "../../pages/_app";
import {GameStatus} from "../lib/gameUtils";
import {useTetrisStore} from "../../stores/tetrisStore";
import Button from '../../components/buttons/Button';
import {api} from "../../utils/api";


const StartScreen = () => {

    const {
        setGameStatus, setUid
    } = useTetrisStore((state) => state);

    const { mutate, isLoading, data } = api.user.create.useMutation({
        onSuccess: (user) => {
            console.log("User created successfully")
            localStorage.setItem("uid", user.id);
            setUid(user.id);
        },
        onError: (error) => {
            console.log(error.message);
        },
    });


    useEffect(() => {
        const uid = localStorage.getItem("uid");
        // if not existens create user
        if (uid === null) {
            mutate({name: "Anonymous"});
        } else {
            setUid(uid)
        }
    }, [])


    return (
        <div className="w-full h-full flex flex-col justify-center items-center bg-slate-900">
            <div className="flex flex-col justify-center items-center">
                <Title className={`text-6xl md:text-7xl pb-10 ${chakraPetch.className} text-slate-200 `}>Tetris</Title>
                <Button className="bg-slate-300 text-slate-800" onClick={() => setGameStatus(GameStatus.RUNNING)}>Start</Button>
            </div>
        </div>
    );
};

export default StartScreen;