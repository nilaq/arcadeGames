import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { Jost } from "next/font/google";
import { Analytics } from "@vercel/analytics/react"

import { api } from "../utils/api";

import "../styles/globals.css";

const jost = Jost({
  subsets: ["latin"],
  variable: '--font-jost',
});


const MyApp: AppType<{ session: Session | null }> = ({Component,pageProps: { session, ...pageProps },
                                                     }) => {
    return (
        <>
            <SessionProvider session={session}>
                <main className={`${jost.variable} font-sans`}>
                    <Component {...pageProps} />
                </main>
            </SessionProvider>
            <Analytics/>
        </>
    );
};

export default api.withTRPC(MyApp);
