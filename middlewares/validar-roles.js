const { response } = require('express');

const esMaestroRole = (req, res, next) => {
    if(!requestAnimationFrame.usuario){
        return res.status(500).json({
            msg: "Se desea validar un usuario sin validar el token previamente"
        });
    }

    const { role, nombre } = req.usuario;

    if(role !== "TEACHER_ROLE"){
        return res.status(401).json({
            msg: `${nombre} no es un maestro, por lo que no ppuede realizar esta accion`
        });
    };
    next();
}


module.exports = {
    esMaestroRole
}