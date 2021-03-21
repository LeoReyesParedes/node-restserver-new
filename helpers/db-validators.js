const Role = require('../models/role');
const Usuario = require('../models/usuario');

const roleValido = async (role = '') => {
    const existeRole = await Role.findOne({role});
    if(!existeRole){
        throw new Error(`El rol: ${role}, no está registrado en la db.`);
    }
}

const mailExiste = async (mail = '') => {
    const existeMail = await Usuario.findOne({mail});
    if(existeMail){
        throw new Error(`El correo: ${mail}, ya está registrado.`);
    }
}

const usuarioExiste = async (id = '') => {
    const existeUsuario = await Usuario.findById(id);
    if(!existeUsuario){
        throw new Error(`El id: ${id}, no existe.`);
    }
}

module.exports = {
    roleValido,
    mailExiste,
    usuarioExiste
}