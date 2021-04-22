const { Categoria, Usuario, Producto, Role } = require('../models');

let id_c;

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

const categoriaExiste = async (id = '') => {
    const existeCategoria = await Categoria.findById(id);
    if(!existeCategoria){
        throw new Error(`El id: ${id}, no existe.`);
    }
}

const productoExiste = async (id = '') => {
    id_c = id;
    const existeProducto = await Producto.findById(id);
    if(!existeProducto){
        throw new Error(`El id: ${id}, no existe.`);
    }
}

const productoDuplicado = async (namedb = '') => {

    if(namedb !== ''){
        const name = namedb.toUpperCase();
        
        const productoDB = await Producto.findOne({name});
        
        if(productoDB && (id_c !== productoDB._id.toString())){
            throw new Error(`El producto ${productoDB.name}, ya existe.`);
        }
    }
}

const coleccionesPermitidas = (coleccion = '', colecciones = []) => {
    const incluida = colecciones.includes(coleccion);
    if(!incluida){
        throw new Error(`La colección ${coleccion} no es permitida, solo se permiten ${colecciones}.`);
    }
    return true;
}

module.exports = {
    roleValido,
    mailExiste,
    usuarioExiste,
    categoriaExiste,
    productoExiste,
    productoDuplicado,
    coleccionesPermitidas,
}