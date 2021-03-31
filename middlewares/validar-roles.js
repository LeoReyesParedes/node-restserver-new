const { request, response } = require("express");


const esAdminRole = (req = request, res = response, next) => {
    
    if(!req.usuario){
        return res.status(500).json({
            msg: 'Se quiere validar el role sin validar el token.'
        });
    }
    const {role, name} = req.usuario;

    if(role !== 'ADMIN_ROLE'){
        return res.status(500).json({
            msg: `${name} no es administrador.`
        });
    }
    next();
}

const tieneRole = (... roles) => {
    return (req = request, res = response, next) => {
        if(!req.usuario){
            return res.status(500).json({
                msg: 'Se quiere validar el role sin validar el token.'
            });
        }

        if(!roles.includes(req.usuario.role)){
            return res.status(500).json({
                msg: `Se requiere de los siguientes roles ${roles}`
            });
        }

        next();
    }
}

module.exports = {
    esAdminRole,
    tieneRole
}