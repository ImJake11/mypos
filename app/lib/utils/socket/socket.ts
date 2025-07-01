import io from "socket.io-client";
import { Socket } from "socket.io-client";

let socket: typeof Socket | undefined;

export const initializeSocket = () => {

    // check socket if it is already runnning

    if (socket) {
        console.log("Socket already running");
        return;
    }

    socket = io(String(process.env.NEXT_PUBLIC_SOCKET_URL));

    console.log("Initiating socket connection..");

    socket.on("connect", () => {
        console.log("Connected to socket server");
    });

    socket.on("disconnect", () => {
        console.log("Disconnected to socket server");
    });

    socket.on("error", (err: any) => {
        console.log("Socket connection error:", err);
    });
}


export const getSocket = (): typeof Socket | undefined => {
    return socket;
}

export const disconnectSocket = () => {
    if (socket) {
        console.log("Disconnecting socket server...");
        socket?.disconnect();
        socket = undefined;
    }

}