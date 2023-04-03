import { type NextPage } from "next";
import Head from "next/head";

import { Container } from "../components/cards/Card";
import React from "react";
import Tetris from "../games/tetris/Tetris";

const Home: NextPage = () => {

  return (
    <>
      <Head>
        <title>Play Tetris - Free Online Tetris Game</title>
          <meta charSet="UTF-8"></meta>
          <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
          <meta name="description"
                content="Play the classic Tetris game online for free. No downloads, just simple HTML5 Tetris."></meta>
          <meta name="keywords"
                content="tetris, free tetris, online tetris, play tetris, tetris game, html5 tetris, react tetris"></meta>
          <meta name="author" content="Pixel Stackers"></meta>
          <meta name="robots" content="index, follow"></meta>
          <meta property="og:title" content="Play Tetris - Free Online Tetris Game"></meta>
          <meta property="og:description"
                content="Play the classic Tetris game online for free. No downloads, just simple JavaScript Tetris."></meta>
          <meta property="og:url" content="https://tetris.so/"></meta>
          <meta property="og:site_name" content="Tetris.so"></meta>
          <meta property="og:type" content="website"></meta>
          <meta property="og:image" content="https://tetris.so/tetris-logo.png"></meta>
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
