const {Router} = require('express');
const {check} = require('express-validator');

// const {validarCampos} = require('../middlewares/validar-campos');

const { validarCampos} = require('../middlewares/validar-campos');
const { esMaestroRole, tieneRolAutorizado} = require('../middlewares/validar-roles')
const { validarJWT } = require('../middlewares/validar-jwt');


// const {usuarioPost} = require('../helpers/db-validators');

const {usuarioPost, usuarioDelete, putUsuarios} = require('../controllers/user.controllers');

const {existeEmail, esRoleValido, existeUsuarioById} = require('../helpers/db-validators');

const router = Router();

router.post(
    "/",
    [
        check("nombre","El nombre no debe estar vacio").not().isEmpty(),
        check('email','La cuenta del usuario').isEmail(),
        check('password','Importante si deseas acceder a la cuenta').isLength({min:6}),
        check('email').custom(existeEmail),
        check('role').custom(esRoleValido),
        check('curso1','El nombre del curso'),
        check('curso2','El nombre del curso'),
        check('curso3','El nombre del curso'),
        validarCampos,
    ], usuarioPost
);  

router.put(
    "/:id",
    [
        check('id','El id no es valido').isMongoId(),
        check('id').custom(existeUsuarioById),
        check("nombre","El nombre no debe estar vacio").not().isEmpty(),
        //check('role').custom(esRoleValido),
        validarCampos,
        validarJWT
    ], putUsuarios
);

router.delete(
    "/:id",
    [
        check('id', 'No es un id válido').isMongoId(),
        check('id').custom(existeUsuarioById),
        validarCampos,
        validarJWT
    ], usuarioDelete
);

module.exports = router;