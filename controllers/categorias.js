const { response } = require("express");
const { Categoria } = require("../models")

const categoriasGet = async (req, res = response) => {

    const {limite = 5, desde = 0, status = true} = req.query;

    const query = {status};

    const [total, categorias] = await Promise.all([
        Categoria.countDocuments(query),
        Categoria.find(query)
            .skip(Number(desde))
            .limit(Number(limite))
            .populate('user', 'name')
    ]);

    res.json({
        total,
        categorias
    });
}

const categoriaGet = async (req, res = response) => {

    const {id} = req.params;

    const categoria = await Categoria.findById(id)
        .populate('user', 'name');
    
    res.json({
        categoria
    });
}

const categoriaPost = async (req, res = response) => {
    const name = req.body.name.toUpperCase();

    const categoriaDB = await Categoria.findOne({name});

    if(categoriaDB){
        return res.status(400).json({
            msg: `La categoria ${categoriaDB.name}, ya existe.`
        });
    }
    // Generar la data a guardar
    const data = {
        name,
        user: req.usuario._id
    }
    // Grabamos
    const categoria = new Categoria(data);
    await categoria.save();
    
    res.status(201).json({categoria});
}

const categoriaPut = async (req, res = response) => {

    const {id} = req.params;
    
    const {status, user, ...data} = req.body;

    data.name = data.name.toUpperCase();
    data.user = req.usuario._id;
    const categoria = await Categoria.findByIdAndUpdate(id, data, {new: true})
        .populate('user', 'name');

    res.json({
        categoria
    });
}

const categoriaDelete = async (req, res = response) => {

    const {id} = req.params;
    const categoria = await Categoria.findByIdAndUpdate(id, {status: false}, {new: true});

    res.json({
        categoria
    });
}

module.exports = {
    categoriasGet,
    categoriaGet,
    categoriaPost,
    categoriaPut,
    categoriaDelete
}