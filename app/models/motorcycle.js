const mongoose = require('mongoose')
const { Schema, model } = mongoose

const motorcycleSchema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        type: {
            type: String,
            required: true
        },
        year: {
            type: Number,
            required: true
        },
        engineSize: {
            type: Number,
            required: true
        },
        engineCylinders: {
            type: Number,
            required: true
        },
        owned: {
            type: Boolean,
            required: true
        },
    }, {
    timestamps: true,
    toObject: { virtuals: true },
    toJSON: { virtuals: true }
}
)

module.exports = model('Motorcycle', motorcycleSchema)