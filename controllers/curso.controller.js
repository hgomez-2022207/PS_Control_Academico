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

const cursoPut = async (req, res = response) =>{
    const{ id } = req.params;
    const { _id, ...nombre} = req.body;

    await Curso.findByIdAndUpdate(id, nombre)
    const curso = await Curso.findByIdAndUpdate(id, nombre);

    res.status(200).json({
        msg: "El curso ha sido Actualizado",
        curso
    });
}

/*const putUsuarios = async (req, res = response) =>{
    const { id } = req.params;
    const {_id, password, google, correo, ...resto } = req.body;

    if(password){
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password, salt);
    }

    await Usuario.findByIdAndUpdate(id, resto);

    const usuario = Usuario.findOne({id});

    res.status(200).json({
        msg: 'Usuario Actualizado Exitosamente!!!',
        usuario
    });
}
*/ 

module.exports = {
    cursoPost,
    cursoGet,
    getCursoById,
    cursoPut
}

