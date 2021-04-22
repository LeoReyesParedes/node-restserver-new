// const { response } = require("express");
// const { Test } = require("../models")

// // Obtener - paginado - total - populate
// const testGet = async (req, res = response) => {

//     const {limite = 5, desde = 0, status = true} = req.query;

//     const query = {status};

//     const [total, test] = await Promise.all([
//         Test.countDocuments(query),
//         Test.find(query)
//             .skip(Number(desde))
//             .limit(Number(limite))
//             .populate('user', 'name mail')
//     ]);

//     res.json({
//         total,
//         test
//     });
// }
// // Obtener por id - populate
// const testGet = async (req, res = response) => {

//     const {id} = req.params;

//     const test = await Test.findById(id)
//         .populate('user', 'name mail');
    
//     res.json({
//         test
//     });
// }
// // Crear 
// const testPost = async (req, res = response) => {
//     const name = req.body.name.toUpperCase();

//     const testDB = await Test.findOne({name});

//     if(testDB){
//         return res.status(400).json({
//             msg: `El ${testDB.name}, ya existe.`
//         });
//     }
//     // Generar la data a guardar
//     const data = {
//         name,
//         user: req.usuario._id
//     }
//     // Grabamos
//     const test = new Test(data);
//     await test.save();
    
//     res.status(201).json({test});
// }
// // Actualizar
// const testPut = async (req, res = response) => {

//     const {id} = req.params;
//     const name = req.body.name.toUpperCase();

//     const test = await Test.findByIdAndUpdate(id, {name}, {new: true});

//     res.json({
//         test
//     });
// }
// // Borra categoria - status: false
// const testDelete = async (req, res = response) => {

//     const {id} = req.params;
//     const test = await Test.findByIdAndUpdate(id, {status: false}, {new: true});

//     res.json({
//         test
//     });
// }

// module.exports = {
//     testGet,
//     testGet,
//     testPost,
//     testPut,
//     testDelete
// }