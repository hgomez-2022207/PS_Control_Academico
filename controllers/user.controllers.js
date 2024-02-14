const bcryptjs = require('bcryptjs');
const Usuario = require('../models/usuario');
const { response } = require('express');

const usuarioPost = async (req, res) => {
    const {nombre, correo, password, role, curso1, curso2, curso3} = req.body;
    const usuario = new Usuario({nombre, correo, password, role , curso1, curso2, curso3});

    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password, salt);

    await usuario.save();
    res.status(202).json({
        usuario
    });
}

module.exports = {
    usuarioPost
}