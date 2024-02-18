const bcryptjs =require('bcryptjs');
const Curso = require('../models/curso');
const { response } = require('express');

const cursoPost = async (req,res) => {
    console.log("hi");
    const{nombre,estado} = req.body;
    const curso = new Curso({nombre,estado});

    const salt = bcryptjs.genSaltSync();
    await curso.save();
    res.status(202).json({
        curso
    });
}

const getCursoById = async (req, res = response) =>{
    const { id } = req.params;
    const curso = await Curso.findOne({_id:id});

    res.status(200).json({
        curso
    });
}

const cursoGet = async (req, res = response) => {
    const {limite, desde} = req.query;
    const query = {estado: true};

    const [total, cursos] = await Promise.all([
        Curso.countDocuments(query),
        Curso.find(query)
        .skip(Number(desde))
        .limit(Number(limite))
    ]);

    res.status(200).json({
        total,
        cursos
    });
}

module.exports = {
    cursoPost,
    cursoGet,
    getCursoById
}

