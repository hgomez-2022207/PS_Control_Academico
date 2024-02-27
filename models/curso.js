const {Schema, model} = require('mongoose');

const CursoSchema = Schema({
    nombre:{
        type:String,
        required: [true, 'El curso es necesaro.']
    },
    estado:{
        type: Boolean,
        default: true
    },
    usuario:{
        type: [String],
    }
});

module.exports = model('Curso',CursoSchema);