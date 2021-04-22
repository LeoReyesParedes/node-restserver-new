// const { Router } = require('express');
// const { check } = require('express-validator');

// const { validarCampos, 
//     validarJWT,
//     esAdminRole,
//     tieneRole } = require('../middlewares');

// const router = Router();

// // Obtener todos - público
// router.get('/', (req, res) => {res.json('get')});

// // Obtener por id - público
// router.get('/:id', (req, res) => {res.json('get - id')});

// // Crear - privado - cualquier user con token válido
// router.post('/', (req, res) => {res.json('post')});

// // Actualizar - privado - cualquier user con token válido
// router.put('/:id', (req, res) => {res.json('put')});

// // Borrar - admin
// router.delete('/:id', (req, res) => {res.json('delete')});

// module.exports = router;