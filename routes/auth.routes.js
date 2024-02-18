const{ Router } = require('express');
const{ check } = require('express-validator');

const{ login } = require('../controllers/auth.controller');
const{ validarCampos } = require('../middlewares/validar-campos');

const router = Router();

router.post(
    '/login',
    [
        
        check('email','Este correo no es valido').isEmail(),
        check('password','El password es obligatorio').not().isEmpty(),
        validarCampos
    ], login
);

module.exports = router;