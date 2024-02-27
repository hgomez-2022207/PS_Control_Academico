const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos} = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares');

const{ cursoPost, getCursoById, cursoGet, cursoPut, cursoDelete, getCursoByName } = require('../controllers/curso.controller');
const {existeCursoById, esRoleValido} = require('../helpers/db-validators');
const { esMaestroRole, tieneRolAutorizado} = require('../middlewares/validar-roles')

const router = Router();

router.post(
    "/",
    [
        check('nombre','El nombre del curso es obligatorio').not().isEmpty(),
        validarJWT,
        tieneRolAutorizado('TEACHER_ROLE')
    ],cursoPost
);

router.get('/',[validarJWT,
    tieneRolAutorizado('TEACHER_ROLE')], cursoGet);

router.get(
    "/:id",
    [
        check('id','No es un curso').isMongoId(),
        check('id').custom(existeCursoById),
        validarJWT,
        tieneRolAutorizado('TEACHER_ROLE')
    ],getCursoById
);

router.get(
    "/:id",
    [
        check('name','No es un curso').isMongoId(),
        check('name').custom(existeCursoByName),
        validarJWT
    ],getCursoByName
);

router.put(
    '/:id',
    [
        check('id','No es un curso').isMongoId(),
        check('id').custom(existeCursoById),
        check('nombre','Escriba la nueva informacion del curso.').not().isEmpty(),
        validarJWT,
        tieneRolAutorizado('TEACHER_ROLE')
    ],cursoPut
);

router.delete(
    "/:id",
    [
        validarJWT,
        tieneRolAutorizado('TEACHER_ROLE'),
        check('id','Curso no existente').isMongoId(),
        check('role').custom(esRoleValido),
        validarJWT,
        tieneRolAutorizado('TEACHER_ROLE')
    ],cursoDelete
);

module.exports = router;