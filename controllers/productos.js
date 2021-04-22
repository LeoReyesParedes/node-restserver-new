const { response } = require("express");
const { body } = require("express-validator");
const { Producto } = require("../models")

const productosGet = async (req, res = response) => {

    const {limite = 5, desde = 0, status = true} = req.query;

    const query = {status};

    const [total, producto] = await Promise.all([
        Producto.countDocuments(query),
        Producto.find(query)
            .skip(Number(desde))
            .limit(Number(limite))
            .populate('category', 'name')
            .populate('user', 'name')
    ]);

    res.json({
        total,
        producto
    });
}

const productoGet = async (req, res = response) => {

    const {id} = req.params;

    const producto = await Producto.findById(id)
        .populate('category', 'name')
        .populate('user', 'name');
    
    res.json({
        producto
    });
}

const productoPost = async (req, res = response) => {
    // const {name, price, description, category} = req.body;
    const {status, user, ...resto} = req.body;

    resto.name = resto.name.toUpperCase();

    const productoDB = await Producto.findOne({name: resto.name});

    if(productoDB){
        return res.status(400).json({
            msg: `El producto ${productoDB.name}, ya existe.`
        });
    }

    const data = {
        ...resto,
        user: req.usuario._id
    }

    const producto = new Producto(data);
    await producto.save();
    
    res.status(201).json({producto});
}

const productoPut = async (req, res = response) => {

    const {id} = req.params;
    const {status, user, ...data} = req.body;

    if(data.name){
        data.name = data.name.toUpperCase();
    }

    data.user = req.usuario._id;

    const producto = await Producto.findByIdAndUpdate(id, data, {new: true})
        .populate('category', 'name')
        .populate('user', 'name');

    res.json({
        producto
    });
}

const productoDelete = async (req, res = response) => {

    const {id} = req.params;
    const producto = await Producto.findByIdAndUpdate(id, {status: false}, {new: true});

    res.json({
        producto
    });
}

module.exports = {
    productosGet,
    productoGet,
    productoPost,
    productoPut,
    productoDelete,
}