const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos} = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const{ cursoPost } = require('../controllers/curso.controller');
const router = require('./user.routes');

router = Router();

router.post(
    "/",
    [
        check('nombre','El nombre del curso es obligatorio').not().isEmpty(),
        validarCampos
    ],cursoPost
);

module.exports = router;