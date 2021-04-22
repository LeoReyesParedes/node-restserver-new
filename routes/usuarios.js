const { Router } = require('express');
const { check } = require('express-validator');

const { usuariosGet,
        usuariosPost, 
        usuariosPut, 
        usuariosPatch, 
        usuariosDelete } = require('../controllers/usuarios');
const { roleValido, mailExiste, usuarioExiste } = require('../helpers/db-validators');

// const { validarCampos } = require('../middlewares/validar-campos');
// const { validarJWT } = require('../middlewares/validar-jwt');
// const { esAdminRole, tieneRole } = require('../middlewares/validar-roles');
const { validarCampos, 
        validarJWT,
        esAdminRole,
        tieneRole } = require('../middlewares');

const router = Router();

router.get('/', usuariosGet);
router.post('/', [
        check('name', 'El nombre es obligatorio.').not().isEmpty(),
        // check('mail', 'El correo no es válido.').isEmail(),
        check('mail').custom(mailExiste),
        check('password', 'La contraseña debe tener al menos 6 caracteres.').isLength({min: 6}),
        // check('role', 'No es un rol válido.').isIn(['ADMIN_ROLE', 'USER_ROLE']),
        check('role').custom(roleValido),
        validarCampos
        ], usuariosPost);
router.put('/:id', [
        check('id', 'No es un ID válido').isMongoId(),
        check('id').custom(usuarioExiste),
        check('role').custom(roleValido),
        validarCampos
        ], usuariosPut);
router.patch('/', usuariosPatch);
router.delete('/:id', [
        validarJWT,
        // esAdminRole,
        tieneRole('ADMIN_ROLE', 'SALES_ROLE'),
        check('id', 'No es un ID válido').isMongoId(),
        check('id').custom(usuarioExiste),
        validarCampos
        ], usuariosDelete);

module.exports = router;