const { Router } = require('express');
const { check } = require ('express-validator');
 
 
const { joinPost, joinDelete} = require('../controllers/join.controller');
const { validarCampos} = require ('../middlewares/validar-campos');
 
const router = Router();
 
router.post(
    "/",
    [
        check("nombre", "El curso no debe uir vacio").not().isEmpty(),
         check("usuario","el id de los estudiantes es importante").not().isEmpty(),
         validarCampos,
 
    ], joinPost);
 
 
 
router.delete(
    "/:id",
    [
    check(`id`,`No es un id valido`).isMongoId(),
    validarCampos
    ], joinDelete);
 
module.exports = router;