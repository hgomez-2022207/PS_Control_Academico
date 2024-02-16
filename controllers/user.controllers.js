const bcryptjs = require('bcryptjs');
const Usuario = require('../models/usuario');
const { response } = require('express');

const usuarioPost = async (req, res) => {
    const {nombre, email, password, role, curso1, curso2, curso3} = req.body;
    const usuario = new Usuario({nombre, email, password, role , curso1, curso2, curso3});

    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password, salt);

    await usuario.save();
    res.status(202).json({
        usuario
    });
}

const usuarioDelete = async (req, res) =>{
    const { id } = req.params;
    const usuario = await Usuario.findByIdAndUpdate(id, { estado: false});
    const usuarioAutenticado = req.usuario;

    res.status(200).json({
        msg: "Usuario elimado",
        usuario,
        usuarioAutenticado
    })
}

const putUsuarios = async (req, res = response) =>{
    const{ id } = req.params;
    const { _id, password, google, email, curso1, curso2, curso3, ...resto} = req.body;

    if(password){
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password, salt);
    }

    /*await Usuario.findByIdAndUpdate(id, resto);
    const usuario = Usuario.findOne({id});*/

    const usuario = await Usuario.findByIdAndUpdate(id, resto);

    res.status(200).json({
        msg: "Perfil de alumno ha sido Actualizado",
        usuario
    });
}

module.exports = {
    usuarioPost,
    usuarioDelete,
    putUsuarios
}