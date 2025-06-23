import { Socket } from "socket.io-client";
import { disconnectSocket, getSocket, initializeSocket } from "../socket/socket"
import { useEffect } from "react";

type SocketEventHandle = ([...args]: any) => void;

export const useSocketConnection = (): typeof Socket | undefined => {

    useEffect(() => {
        const currentSocket = getSocket();

        if (!currentSocket) {
            initializeSocket();
        }

        return () => {
            disconnectSocket();
        }

    }, []);

    return getSocket();
}


export const useSocketEvent = (eventName: string, handler: SocketEventHandle) => {

    const socket = useSocketConnection();

    useEffect(() => {

        if (socket) {
            console.log(`Attaching connection for ${eventName}`);
            socket.on(eventName, handler);
        }
    }, [eventName, socket, handler]);

}