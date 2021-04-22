const { Router } = require('express');
const { check } = require('express-validator');
const { categoriaExiste, 
        productoExiste, 
        productoDuplicado } = require('../helpers/db-validators');

const { validarCampos, 
        validarJWT,
        esAdminRole,
        tieneRole } = require('../middlewares');
const { productoPost, 
        productosGet, 
        productoGet,
        productoPut,
        productoDelete} = require('../controllers/productos');
const router = Router();

router.get('/', productosGet);

router.get('/:id', [
        validarJWT,
        check('id', 'No es un ID válido').isMongoId(),
        check('id').custom(productoExiste),
        validarCampos,
        ], productoGet);

router.post('/', [
        validarJWT,
        check('name', 'El nombre es obligatorio.').not().isEmpty(),
        check('category', 'La categoria es obligatoria.').not().isEmpty(),
        check('category', 'El id de categoría es inválido.').isMongoId(),
        check('category').custom(categoriaExiste),
        validarCampos
], productoPost);

router.put('/:id', [
        validarJWT,
        check('id', 'No es un ID válido').isMongoId(),
        check('id').custom(productoExiste),
        check('name').custom(productoDuplicado),
        // check('category', 'No es un ID válido').isMongoId(),
        // check('category').custom(categoriaExiste),
        validarCampos,
], productoPut);

router.delete('/:id', [
        validarJWT,
        check('id', 'No es un ID válido').isMongoId(),
        check('id').custom(productoExiste),
        validarCampos,
], productoDelete);

module.exports = router;