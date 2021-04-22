const { Router } = require('express');
const { check } = require('express-validator');

const { categoriasGet, 
        categoriaPost,
        categoriaGet, 
        categoriaPut,
        categoriaDelete} = require('../controllers/categorias');
const { categoriaExiste } = require('../helpers/db-validators');
const { validarCampos, 
        validarJWT,
        esAdminRole } = require('../middlewares');

const router = Router();

router.get('/', categoriasGet);

router.get('/:id', [
        validarJWT,
        check('id', 'No es un ID válido').isMongoId(),
        check('id').custom(categoriaExiste),
        validarCampos
        ], categoriaGet);

router.post('/', [
        validarJWT,
        check('name', 'El nombre es obligatorio.').not().isEmpty(),
        validarCampos
        ], categoriaPost);

router.put('/:id', [
        validarJWT,
        check('id', 'No es un ID válido').isMongoId(),
        check('id').custom(categoriaExiste),
        check('name', 'El nombre es obligatorio.').not().isEmpty(),
        validarCampos
        ], categoriaPut);

router.delete('/:id', [
        validarJWT,
        esAdminRole,
        check('id', 'No es un ID válido').isMongoId(),
        check('id').custom(categoriaExiste),
        validarCampos
        ], categoriaDelete);

module.exports = router;