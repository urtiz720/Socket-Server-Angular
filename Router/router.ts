import { Router, Request, Response } from "express";
import Server from "../classes/server";


 const router = Router();

router.get('/mensajes',(req:Request, res:Response)=>{

    res.json(
        {
            ok: true,
            msj: 'Hola'
        }
    );
});

router.post('/mensajes',(req: Request, res: Response) =>{
    const cuerpo = req.body.cuerpo;
    const de = req.body.de;

    const data = {
        de,
        cuerpo
    }

    const server = Server.instance;
    server.io.emit('mensaje-nuevo', data);

    res.json({
        ok: true,
        cuerpo,
        de
    })
})

router.post('/mensajes/:id',(req:Request, res:Response)=>{
    const cuerpo = req.body.cuerpo;
    const de     = req.body.de;
    const id     = req.params.id;

    const data = {
        de,
        cuerpo
    }

    const server = Server.instance;
    //in mensajes privados
    server.io.in(id).emit('mensaje-privado', data);

    res.json(
        {
            ok: true,
            cuerpo: cuerpo,
            de: de,
            id: id
        }
    );
});

export default router;