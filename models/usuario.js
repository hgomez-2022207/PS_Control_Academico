const {Schema, model} = require('mongoose');

const UsuarioSchema = Schema({
    nombre:{
    type: String,
    required:['Nombre real del usuario']
    },
    email:{
        type: String,
        required:['Cuenta del usuario']
    },
    password:{
        type:String,
        required:["Funciona como llave para acceder a la cuenta"]
    },
    img:{
        type:String,
    },
    role:{
        type:String,
        required:['indica si el usuario es profesor o alumno'],
        enum: ["TEACHER_ROLE", "STUDENT_ROLE"]
    },
    curso1:{
        type: String,
        required:["El curso del alumno"]
    },
    curso2:{
        type: String,
        required:["El curso del alumno"]
    },
    curso3:{
        type: String,
        required:["El curso del alumno"]
    },
    estado:{
        type: Boolean,
        default: true
    },
    google:{
        type: Boolean,
        default: false
    }

});

UsuarioSchema.methods.toJSON = function(){
    const{ __v, password, _id, ...usuario} = this.toObject();
    usuario.uid = _id;
    return usuario;
};

module.exports = model('Usuario', UsuarioSchema);