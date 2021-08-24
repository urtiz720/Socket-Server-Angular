import { Socket } from "socket.io";
import socketIO from 'socket.io';


export const desconnect = (cliente: Socket) => {
    cliente.on('desconnect', () => {
        console.log('Cliente desconectado');
    });
}


export const mensaje = (cliente: Socket, io:socketIO.Server) => {
    cliente.on('mensaje',( data:{ de:string , cuerpo:string}) =>{
        io.emit('mensaje-nuevo', data);
        console.log('Mensaje recibido', data);    
    });
}