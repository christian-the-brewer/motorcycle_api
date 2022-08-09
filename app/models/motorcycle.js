const mongoose = require('mongoose')
const { Schema, model } = mongoose

const motorcycleSchema = new Schema(
    {
        brand: {
            type: String,
            required: true
        },
        modelName: {
            type: String,
            required: true
        },
        modelCode: {
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
        img: {
            type: String,
            required: true
        },
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    }, {
    timestamps: true,
    toObject: { virtuals: true },
    toJSON: { virtuals: true }
}
)

module.exports = model('Motorcycle', motorcycleSchema)