const { response, request } = require("express");
const bcryptjs = require('bcryptjs');

const Usuario = require('../models/usuario');
const { generarJWT } = require("../helpers/generar-jwt");
const { googleVerify } = require("../helpers/google-verify");

const login = async (req, res = response) => {

    const {mail, password} = req.body;

    try {
        // verificar si el mail existe
        const usuario = await Usuario.findOne({mail});
        if(!usuario){
            return res.status(400).json({
                msg: 'Usuario | contraseña no son correctos. (m)'
            });
        }
        // Verificar si el usuario está activo
        if(!usuario.status){
            return res.status(400).json({
                msg: 'Usuario | contraseña no son correctos. (s)'
            });
        }
        // Verificar la contraseña
        const validPassword = bcryptjs.compareSync(password, usuario.password);
        if(!validPassword){
            return res.status(400).json({
                msg: 'Usuario | contraseña no son correctos. (p)'
            });
        }
        // Generar JWT
        const token = await generarJWT(usuario.id);
        res.json({
            usuario,
            token
        });
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }
}

const googleSignIn = async (req = request, res = response) => {
    
    const {id_token} = req.body;

    try {
        const {name, mail, img} = await googleVerify(id_token);

        let usuario = await Usuario.findOne({mail});

        if(!usuario){
            // Crear user
            const data = {
                name,
                mail,
                password: ':D',
                img,
                google: true
            }
            usuario = new Usuario(data);
            await usuario.save();
        }
        // Usuario status false
        if(!usuario.status){
            return res.status(401).json({
                msg: 'Hable con el administrador, usuario bloqueado.'
            });
        }
        // Generar JWT
        const token = await generarJWT(usuario.id);

        res.json({
            usuario,
            token
        });
        
    } catch (error) {
        res.status(400).json({
            msg: 'Token de google no es válido.'
        });
    }
}

module.exports = {
    login,
    googleSignIn
}