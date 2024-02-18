const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos} = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares');

const{ cursoPost, getCursoById, cursoGet, cursoPut, cursoDelete } = require('../controllers/curso.controller');
const {existeCursoById, esRoleValido} = require('../helpers/db-validators');

const router = Router();

router.post(
    "/",
    [
        check('nombre','El nombre del curso es obligatorio').not().isEmpty()
        
    ],cursoPost
);

router.get('/', cursoGet);

router.get(
    "/:id",
    [
        check('id','No es un curso').isMongoId(),
        check('id').custom(existeCursoById),
        validarCampos
    ],getCursoById
);

router.put(
    '/:id',
    [
        check('id','No es un curso').isMongoId(),
        check('id').custom(existeCursoById),
        check('nombre','Escriba la nueva informacion del curso.').not().isEmpty(),
        
    ],cursoPut
);

router.delete(
    "/:id",
    [
        // validarJWT,
        //tieneRolAutorizado('TEACHER_ROLE'),
        check('id','Curso no existente').isMongoId(),
        check('role').custom(esRoleValido),
       // validarCampos
    ],cursoDelete
);

module.exports = router;