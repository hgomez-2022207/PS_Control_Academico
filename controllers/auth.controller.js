const { request } = require("express");
const Usuario = require("../models/usuario");
const bycrypt = require('bcryptjs');
const { generarJWT } = require("../helpers/generar-jwt");

const login = async (req = request, res = request) => {
    const {email, password} = req.body;

    try{
        const usuario = await Usuario.findOne({email});

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

        const tokken = await generarJWT(usuario.id);

        res.status(200).json({
            msg: "Welcome",
            usuario,
            tokken
        })

    }catch(e){
        console.log(e);
        res.status(500).json()({
            msg: "Comuniquese con el admin"
        }   );

        
    }
}

module.exports = {
    login
}