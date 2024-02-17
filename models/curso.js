const {Schema, model} = require('mongoose');

const CursoSchema = Schema({
    curso:{
        type:String,
        required: [true, 'El curso es necesaro.']
    }
});

module.exports = model('Curso',CursoSchema);