import  express  from "express";
import { SERVER_PORT } from "../global/enviroment";
import socketIO from "socket.io";
import http from "http";

import * as eventSocket from './sockets/socket';

export default class Server {
private static _instance : Server;

public app: express.Application ;
public port: number;
public io: socketIO.Server;
private httpServer: http.Server;

//nodemon dist/
private constructor(){
    this.app = express();
    this.port = SERVER_PORT;
    this.httpServer = new http.Server(this.app);
    
        this.io = require("socket.io")(this.httpServer, {
            cors: {
              origin: "http://localhost:5000",
              methods: ["GET", "POST"],
              credentials: true
            }
          });
          
    this.escucharSocket();
}

public static get instance(){
    return this._instance != null ? this._instance : this._instance = new this() ;
}

private escucharSocket(){
    console.log("escuchando...");

    this.io.on('connection', cliente => {
        console.log("cliente conectado");
        eventSocket.mensaje(cliente,this.io);
        eventSocket.desconnect(cliente);
    });
}



start(callback:Function ) {
    try{
        this.httpServer.listen(this.port, callback());
    }catch(e){
        console.log(`Error en start ${e}`)
    }
}

}