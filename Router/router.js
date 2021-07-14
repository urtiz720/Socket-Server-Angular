"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var router = express_1.Router();
router.get('/mensajes', function (req, res) {
    res.json({
        ok: true,
        msj: 'Hola'
    });
});
router.post('/mensajes/:id', function (req, res) {
    var cuerpo = req.body.cuerpo;
    var de = req.body.de;
    var id = req.params.id;
    res.json({
        ok: true,
        cuerpo: cuerpo,
        de: de,
        id: id
    });
});
exports.default = router;
