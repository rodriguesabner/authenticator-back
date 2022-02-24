import Server from "./server";
import {createServer} from "http";
import {Server as SockIo} from "socket.io";
import MongoConnector from "./connector/mongo.connector";

const http = createServer(Server);
const io = new SockIo(http, {cors: {origin: "*"}});

const mongoConnector = new MongoConnector();
mongoConnector.connect();

const server = http.listen(3040, () => {
    // @ts-ignore
    const host = server.address()?.address;
    // @ts-ignore
    const port = server.address()?.port;

    console.log(
        "App %s %s listening at http://%s:%s",
        host,
        port
    );
});

export {
    io,
    server,
    mongoConnector
}