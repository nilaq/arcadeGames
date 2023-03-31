import React, {useEffect, useRef, useState} from 'react';
import Title from "../../components/typography/Title";
import {chakraPetch} from "../../pages/_app";
import {GameStatus} from "../lib/gameUtils";
import {useTetrisStore} from "../../stores/tetrisStore";
import Button from '../../components/buttons/Button';
import {api} from "../../utils/api";
import {User} from ".prisma/client";
import trpc from "../../pages/api/trpc/[trpc]";


// fetch IP address
async function fetchIpAddress(): Promise<string | undefined> {
    try {
        const response = await fetch('https://api.ipify.org?format=json');
        const data = await response.json();
        return data.ip;
    } catch (error) {
        console.error('Error fetching IP address:', error);
    }
}

const StartScreen = () => {

    const {
        setGameStatus
    } = useTetrisStore((state) => state);

    const { mutate, isLoading } = api.user.create.useMutation({
        onSuccess: () => {
            console.log("User created successfully")
        },
        onError: (error) => {
            console.log(error.message);
        },
    });


    /*
    const ipAddress = await fetchIpAddress();
    if (!ipAddress) return
    const user = api.user.getByIpAddress.useQuery(ipAddress).data;
    console.log(user);
     */



    return (
        <div className="w-full h-full flex flex-col justify-center items-center bg-slate-900">
            <div className="flex flex-col justify-center items-center">
                <Title className={`text-7xl pb-10 ${chakraPetch.className} text-slate-200 `}>Tetris</Title>
                <Button className="bg-slate-300 text-slate-800" onClick={() => setGameStatus(GameStatus.RUNNING)}>Start</Button>
            </div>
        </div>
    );
};

export default StartScreen;