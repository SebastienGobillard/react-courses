const mongoose = require('mongoose');

const listsSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        require: true,
    },
    title: {
        type: String,
        required: true,
    },
    racks: {
        type: Array,
        default: [],
    },
    products: {
        type: Array,
        default: [],
    },
})

module.exports = mongoose.model('Lists', listsSchema);