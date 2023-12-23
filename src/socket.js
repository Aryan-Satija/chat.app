import {io} from "socket.io-client";

export let socket;

export const connectSocket = (user_id)=>{
    socket = io("ws://localhost:4000", {
        query: `user_id=${user_id}`
    });
}