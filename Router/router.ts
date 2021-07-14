import { Router, Request, Response } from "express";

 const router = Router();

router.get('/mensajes',(req:Request, res:Response)=>{

    res.json(
        {
            ok: true,
            msj: 'Hola'
        }
    );
});

router.post('/mensajes/:id',(req:Request, res:Response)=>{
    const cuerpo = req.body.cuerpo;
    const de     = req.body.de;
    const id     = req.params.id;

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