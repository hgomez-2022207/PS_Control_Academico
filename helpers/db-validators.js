const { Cursor } = require('mongoose');
const Role = require('../models/role');
const Usuario = require('../models/usuario');
const Curso = require('../models/curso');

const esRoleValido = async (role = '') => {
    const existeRol = await Role.findOne({role});
    if(!existeRol){
        throw new Error(`El role ${ role } no existe en la base de datos`);
    }
}

const esCursoValido = async (curso = '') => {
    const existeCurso = await Curso.findOne({curso});
    if(!existeCurso){
        throw new Error(`El curso ${ curso } no existe en la base de datos`);
    }
}

const existeEmail = async (correo = '') => {
    const existeEmail = await Usuario.findOne({correo});
    if(existeEmail){
        throw new Error(`El usuario con el ${ id } no existe`);
    }
}

const existeCursoByName = async (nombre = '') => {
    const existeEmail = await Curso.findOne({nombre});
    if(existeEmail){
        throw new Error(`El curso con el ${ id } no existe`);
    }
}

const existeUsuarioById = async (id = '') => {
    const existeUsuario = await Usuario.findOne({id});
    if(existeUsuario){
        throw new Error(`El usuario con el ${id} no existe`);
    }
}

const existeCursoById = async (id = '') => {
    const existeCurso = await Curso.findOne({id});
    if(existeCurso){
        throw new Error(`No ofrecemos este curso ${id}`);
    }
}

module.exports = {
    esRoleValido,
    existeEmail,
    existeUsuarioById,
    existeCursoById,
    existeCursoByName,
    esCursoValido
}