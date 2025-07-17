"use client";

import { ReactNode, useEffect } from "react";
import { Provider } from "react-redux";
import store from "../store";
import { disconnectSocket, getSocket } from "../../utils/socket/socket";

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

    return <Provider store={store}>{children}</Provider>;
}
