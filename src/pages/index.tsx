import { type NextPage } from "next";
import Head from "next/head";

import { Container } from "../components/cards/Card";
import Snake from "../components/snake/Snake";
import Button from "../components/buttons/Button";
import React from "react";

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
            <Snake></Snake>
        </Container>
      </main>
    </>
  );
};

export default Home;
