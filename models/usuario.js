const {Schema, model} = require('mongoodse');

const Usuario = Schema({
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
    estado:{
        type: Boolean,
        default: true
    },
    google:{
        type: Boolean,
        default: false
    }

});

Usuario.methods.toJSON = function(){
    const{ __v, password, _id, ...usuario} = this.toObject();
    usuario.uid = _id;
    return usuario;
};

module.exports = model('Usuario', UsuarioSchema);