const { response, request } = require('express');
const jwt = require('jsonwebtoken');

const Usuario = require('../models/usuario')

const validarJWT = async (req = request, res = response, next) => {
    const token = req.header('x-token');

    if(!token){
        return res.status(401).json({
            msg: 'No hay token en la petición.'
        });
    }
    try {
        const {uid} = jwt.verify(token, process.env.PRIVATE_KEY);

        // leer el usuario que corresponde al uid
        // req.usuario = await Usuario.findById(uid);
        const usuario = await Usuario.findById(uid);
        
        // Verificar si el uid existe
        if(!usuario){
            return res.status(401).json({
                msg: 'Token no válido. (u)'
            });
        }

        // Verificar si el uid tiene status true
        if(!usuario.status){
            return res.status(401).json({
                msg: 'Token no válido. (s)'
            });
        }
        req.usuario = usuario;

        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg: 'Token no válido.'
        });
    }
}

module.exports = {
    validarJWT
}