const bcryptjs =require('bcryptjs');
const Curso = require('../models/curso');
const { response } = require('express');

const cursoPost = async (req,res) => {
    const{nombre,estado} = req.body;
    const curso = new Curso({nombre,estado});

    const salt = bcryptjs.genSaltSync();
    await curso.save();
    res.status(202).json({
        curso
    });
}

module.exports = {
    cursoPost
}

