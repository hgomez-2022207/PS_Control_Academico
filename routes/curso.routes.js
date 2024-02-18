const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos} = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const{ cursoPost, cursoGet, cursoPut, cursoDelete } = require('../controllers/curso.controller');
const router = require('./user.routes');

router = Router();

router.post(
    console.log("hi"),
    "/",
    [
        check('nombre','El nombre del curso es obligatorio').not().isEmpty()
        
    ],cursoPost
);

module.exports = router;