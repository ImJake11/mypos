"use client";

import { ReactNode, useEffect } from "react";
import { Provider } from "react-redux";
import store from "../store";
import { disconnectSocket, getSocket } from "../../utils/socket/socket";
import NextTopLoader from "nextjs-toploader";

interface ReduxProviderProps {
    children: ReactNode;
}

export default function ReduxProvider({ children }: ReduxProviderProps) {

    useEffect(() => {
        return () => {
            if (getSocket()) {
                disconnectSocket();
            }
        }
    }, []);

    return <Provider store={store}>
        <NextTopLoader color="var(--color-brand-primary)"
            easing="linear"
            speed={300}
            shadow={false}
            showAtBottom={false}
            showSpinner={false}
            crawlSpeed={300}
        />
        {children}
    </Provider>;
}
