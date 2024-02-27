const Cursos = require('../models/curso');
 
const joinPost = async(req, res) =>{
    const { nombre, usuario } = req.body;
    try {
        console.log('hi');
        const curso = await Cursos.findOne({nombre});
 
        if (!curso) {
            console.log('hi2');
            return res.status(400).json({
                msg: "El curso no existe en la base de datos"
            });
        }
 
        if (curso.usuario.includes(usuario)) {
            console.log('hi3');
            return res.status(400).json({
                msg: "Este estudiante ya se encuentra en la base de datos"
            });
        }
        // await Curso.findByIdAndUpdate(id, nombre)
        await curso.save();
 
        res.status(200).json({
            msg: "Este usuario se unio a un curso",
            curso,
        });
 
    } catch (e) {
        console.log('hi4');
        res.status(500).json({
            msg:  `error al unirse a un grupo`
        });
    }
}
 
const joinDelete = async (req, res) => {
    const {id} = req.params;
    const curso = await Cursos.findByIdAndUpdate(id, {estado: false});
 
    res.status(200).json({
        msg: 'Alumno eliminado de un curso',
        curso
    });
}
 
 
 
module.exports = {
    joinPost,
    joinDelete
}