const {response, request} = require('express');

const usuariosGet = (req = request, res = response) => {
    const query = req.query;

    res.json({
        ok: true,
        msg: 'get API - controller',
        query
    });
}

const usuariosPost = (req, res = response) => {
    const {nombre, edad} = req.body;

    res.json({
        ok: true,
        msg: 'post API - controller',
        nombre,
        edad
    });
}

const usuariosPut = (req, res = response) => {
    const {id} = req.params;

    res.json({
        ok: true,
        msg: 'put API - controller',
        id
    });
}

const usuariosPatch = (req, res = response) => {
    res.json({
        ok: true,
        msg: 'patch API - controller'
    });
}

const usuariosDelete = (req, res = response) => {
    res.json({
        ok: true,
        msg: 'delete API - controller'
    });
}

module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete
}