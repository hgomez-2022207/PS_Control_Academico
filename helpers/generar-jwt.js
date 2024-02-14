const jwt = require('jsonwebtoken');

const generarJWT = (uid = '') => {
    return new Promise((resolve, reject) => {
        const playload = {uid,};
        jwt.sign(
            playload,
            process.env.SECRETORPRIVATEKEY,
            {
                expiresIn: '2h',
            },
            (err,token)=>{
                err ? (console.log(err),reject('No se puede generar un token')): resolve(token);
            }
        );
    });
}

module.exports = {
    generarJWT
}