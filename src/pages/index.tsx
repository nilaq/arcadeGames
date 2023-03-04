import { type NextPage } from "next";
import Head from "next/head";

import { Container } from "../components/cards/Card";
import Snake from "../games/snake/Snake";
import React from "react";
import Tetris from "../games/tetris/Tetris";

const Home: NextPage = () => {

  return (
    <>
      <Head>
        <title>RetroGames.io</title>
        <meta name="description" content="Feel the nostalgia" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex h-screen flex-col items-center justify-center bg-zinc-50">
        <Container className="w-full h-full text-center">
            <Tetris></Tetris>
        </Container>
      </main>
    </>
  );
};

export default Home;
