const {Schema, model} = require('mongoose');

const ProductoSchema = Schema({
    name: {
        type: String,
        required: [true, 'El nombre es obligatorio.'],
        unique: true
    },
    status: {
        type: Boolean,
        default: true
    },
    price: {
        type: Number,
        default: 0
    },
    description: {
        type: String
    },
    available: {
        type: Boolean,
        default: true
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Categoria',
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    }
});

ProductoSchema.methods.toJSON = function() {
    const {__v, _id, ...data} = this.toObject();
    data.uid = _id;
    return data;
}

module.exports = model('Producto', ProductoSchema);