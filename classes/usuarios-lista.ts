import { Usuario } from "./usuario";

export class UsuarioLista{
    private lista: Usuario[] = [];

    constructor(){

    }

    public add(usuario: Usuario){
        this.lista.push(usuario);
    }

    public update(id:string, nombre:string){
        for (let user of this.lista) {
            if(user.id === id){
                user.nombre = nombre;
                break;
            }
        }

        console.log('===UPDATE USER===');
    }

    public getLista(){
        return this.lista;
    }

    public getUsuario(id:string){
        return this.lista.find( usuario => usuario.id === id );
    }

    public getUsuarioEnSala(sala:string){
        return this.lista.filter(usuario => usuario.sala === sala);
    }

    public deleteUsuario(id:string){
        const tempUser = this.getUsuario(id);

        this.lista = this.lista.filter( usuario => usuario.id !== id);

        return tempUser;
    }
}