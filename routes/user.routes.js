const {Router} = require('express');
const check = require('express-validator');

const {validarCampos} = require('../middlewares/validar-roles');

const {usuarioPost} = require('../helpers/db-validators');

const {existeEmail, esRoleValido, existeusuarioById} = require('../helpers/db-validators');

const router = Router();

router.post(
    "/",
    [
        check('nombre','El nombre no debe estar vacio').not().isEmpty(),
        check('password','Importante si deseas acceder a la cuenta').isLength({min:6}),
        check('email','La cuenta del usuario').isEmail(),
        check('correo').custom(existeEmail),
        check('role').custom(esRoleValido),
        validarCampos,
    ], usuarioPost
);