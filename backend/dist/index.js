"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = require("ws");
const ws = new ws_1.WebSocketServer({ port: 5000 });
let allsockets = [];
ws.on("connection", (socket) => {
    socket.on("message", (message) => {
        const parsedmessage = JSON.parse(message);
        if (parsedmessage.type === "join") {
            allsockets.push({
                socket,
                room: parsedmessage.payload.roomId,
            });
        }
        if (parsedmessage.type === "chat") {
            // const currentUserRoom = allsockets.find((x) => x.socket == socket)?.room;
            let currentUserRoom = null;
            for (let i = 0; i < allsockets.length; i++) {
                if (allsockets[i].socket == socket) {
                    currentUserRoom = allsockets[i].room;
                }
            }
            for (let i = 0; i < allsockets.length; i++) {
                if (allsockets[i].room === currentUserRoom) {
                    allsockets[i].socket.send(parsedmessage.payload.message);
                }
            }
        }
    });
});
