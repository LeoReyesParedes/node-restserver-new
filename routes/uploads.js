const { Router } = require('express');
const { check } = require('express-validator');

const { cargarArchivo, 
        actualizarImagenCloudinary, 
        mostrarImagen} = require('../controllers/uploads');
const { coleccionesPermitidas } = require('../helpers');
const { validarArchivo } = require('../middlewares');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();

router.post('/', validarArchivo, cargarArchivo);

router.put('/:coleccion/:id', [
        validarArchivo,
        check('id', 'Id no válido.').isMongoId(),
        check('coleccion').custom(c => coleccionesPermitidas(c, ['usuarios', 'productos'])),
        validarCampos
], actualizarImagenCloudinary);

router.get('/:coleccion/:id', [
        check('id', 'Id no válido.').isMongoId(),
        check('coleccion').custom(c => coleccionesPermitidas(c, ['usuarios', 'productos'])),
        validarCampos
], mostrarImagen)

module.exports = router;