const {Schema, model} = require('mongoose');

const CursoSchema = Schema({
    nombre:{
        type:String,
        required: [true, 'El curso es necesaro.']
    },
    estado:{
        type: Boolean,
        default: true
    }
});

module.exports = model('Curso',CursoSchema);