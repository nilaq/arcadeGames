import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { Inter, Chakra_Petch } from "next/font/google";
import { Analytics } from "@vercel/analytics/react"

import { api } from "../utils/api";

import "../styles/globals.css";

const inter = Inter({subsets: ["latin"]});
export const chakraPetch = Chakra_Petch({weight: "700", subsets:["latin"] });
export const chakraPetchLight = Chakra_Petch({weight: "300", subsets:["latin"] });


const MyApp: AppType<{ session: Session | null }> = ({Component,pageProps: { session, ...pageProps },
                                                     }) => {
    return (
        <>
            <SessionProvider session={session}>
                <main className={`${chakraPetch.className}`}>
                    <Component {...pageProps} />
                </main>
            </SessionProvider>
            <Analytics/>
        </>
    );
};

export default api.withTRPC(MyApp);
