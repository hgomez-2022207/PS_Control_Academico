const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos} = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const{ cursoPost, getCursoById, cursoGet, cursoPut, cursoDelete } = require('../controllers/curso.controller');
const {existeCursoById} = require('../helpers/db-validators');

const router = Router();

router.post(
    "/",
    [
        check('nombre','El nombre del curso es obligatorio').not().isEmpty()
        
    ],cursoPost
);

router.get(
    '/', cursoGet
);

router.get(
    "/:id",
    [
        check('id','No es un curso').isMongoId(),
        check('id').custom(existeCursoById),
        validarCampos
    ],getCursoById
);

module.exports = router;