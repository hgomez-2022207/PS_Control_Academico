const { request } = require("express");

const login = async (req = request, res = request) => {
    const {correo, password} = req.body;

    try{
        const usuario = await Usuario.findOne({correo});

        if(!usuario){
            return res.status(400).json({
                msg:"Credenciales incorrectas, este correo no existe en la base de datos"
            });
        }

        if(!usuario.estado){
            return res.status(400).json({
                msg: "El usuario no existe en la base de datos"
            });
        }

        const validarPassword = bycrypt.compareSync(password, usuario.password);

        if(!validarPassword){
            return res.status(400).json({
                msg: "Contrase;a incorrecta"
            });
        }

        res.status(200).json({

        })

    }catch(e){
        console.log(e);
        res.status(500).json()({
            msg: "Comuniquese con el admin"
        }   );

        
    }
}

module.exports = {

}