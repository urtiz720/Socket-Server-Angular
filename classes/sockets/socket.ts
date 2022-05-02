import { Socket } from "socket.io";
import socketIO from 'socket.io';
import { UsuarioLista } from "../usuarios-lista";
import { Usuario } from "../usuario";

export const usuariosConectados = new UsuarioLista();

export const conectarCliente = (cliente: Socket) => {
    const usuario = new Usuario( cliente.id);
    usuariosConectados.add(usuario);
}

export const desconnect = (cliente: Socket) => {
    cliente.on('desconnect', () => {
        console.log('Cliente desconectado');
        usuariosConectados.deleteUsuario(cliente.id);
    });
}


export const mensaje = (cliente: Socket, io:socketIO.Server) => {
    cliente.on('mensaje',( data:{ de:string , cuerpo:string}) =>{
        io.emit('mensaje-nuevo', data);
        console.log('Mensaje recibido', data);    
    });
}

//Configurar Usuario
export const configurarUsuario = (cliente: Socket, io:socketIO.Server) => {
    cliente.on('configurar-usuario',( data:{ nombre:string },callback: Function ) =>{
        //io.emit('mensaje-nuevo', data);
        console.log('ConfigurarUsuario', data.nombre);
        usuariosConectados.update(cliente.id , data.nombre);
        callback({
            ok:true,
            mensaje: `Usuario ${data.nombre} configurado`
        })    
    });
}