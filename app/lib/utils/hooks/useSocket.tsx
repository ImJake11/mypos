import { Socket } from "socket.io-client";
import { disconnectSocket, getSocket, initializeSocket } from "../socket/socket"
import { useEffect } from "react";

type SocketEventHandler = ([...args]: any) => void;

export const useSocketConnection = (): typeof Socket | undefined => {

    useEffect(() => {
        const currentSocket = getSocket();

        if (!currentSocket) {
            initializeSocket();
        }

    }, []);

    return getSocket();
}


export const useSocketEvent = (eventName: string, handler: SocketEventHandler) => {

    const socket = useSocketConnection();

    useEffect(() => {

        if (socket) {
            console.log(`Attaching connection for ${eventName}`);
            socket.on(eventName, handler);
        }

        return () => {
            if (socket) {
                console.log("Disconnecting to event", eventName);
                socket.off(eventName);
            }
        }
    }, [eventName, socket, handler]);

}