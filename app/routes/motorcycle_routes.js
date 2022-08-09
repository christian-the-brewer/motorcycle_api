//IMPORTS-----------------------
const express = require('express')
const passport = require('passport')

const Motorcycle = require('../models/motorcycle')

//methods for custom error
const customErrors = require('../../lib/custom_errors')

//MIDDLEWARE--------------------------

//function to send 404 when non-existent doc is requested
const handle404 = customErrors.handle404

//function to send 401 when user tries to modify resource owned by another
const requireOwnership = customErrors.requireOwnership

//remove blank fields from req.body
const removeBlanks = require('../../lib/remove_blank_fields')
const motorcycle = require('../models/motorcycle')


const requireToken = passport.authenticate('bearer', { session: false })

//instantiate router
const router = express.Router()

//INDEX--------------
//GET /motorcycles
router.get('/motorcycles', (req, res, next) => {
    Motorcycle.find()
        .populate('owner')
        .then((motorcycles) => {
            //convert array of motorcycles to POJO so we can iterate
            return motorcycles.map((motorcycle) => motorcycle.toObject())
        })
        //send res status 200 and JSON of motorcycles
        .then((motorcycles) => res.status(200).json({ motorcycles: motorcycles }))
        //pass error if it happens
        .catch(next)
})

//SHOW-----------------
//GET /pets/:id
router.get('/motorcycles/:id', (req, res, next) => {

    Motorcycle.findById(req.params.id)
        .populate('owner')
        .then(handle404)
        //res 200 and json if successful
        .then((motorcycle) => res.status(200).json({ motorcycle: motorcycle.toObject() }))
        //pass error
        .catch(next)
})

//CREATE------------------------
//POST /motorcycles
router.post('/motorcycles', requireToken, (req, res, next) => {
    //set owner
    req.body.motorcycle.owner = req.user.id

    Motorcycle.create(req.body.motorcycle)
        //res status 201 and JSON
        .then((motorcycle) => {
            res.status(201).json({ motorcycle: motorcycle.toObject() })
        })
        //pass error
        .catch(next)
})

//UPDATE-------------------
//PATCH /motorcycles/:id
router.patch('/motorcycles/:id', requireToken, removeBlanks, (req, res, next) => {
    // if the client attempts to change the `owner` property by including a new
    // owner, prevent that by deleting that key/value pair
    delete req.body.motorcycle.owner

    Motorcycle.findById(req.params.id)
        .then(handle404)
        .then((motorcycle) => {
            // pass req and onject to requireownership
            // it will throw an error if the current user isn't the owner
            requireOwnership(req, motorcycle)

            // pass the result of Mongoose's `.update` to the next `.then`
            return motorcycle.updateOne(req.body.motorcycle)
        })
        // res 204
        .then(() => res.sendStatus(204))
        // pass error
        .catch(next)
})

//DESTROY----------------------
//DELETE /motorcycles
router.delete('/motorcycles/:id', requireToken, (req, res, next) => {
    Motorcycle.findById(req.params.id)
        .then(handle404)
        .then((motorcycle) => {

            requireOwnership(req, motorcycle)
            // delete if the above didn't throw
            motorcycle.deleteOne()
        })
        // res 204 is successful
        .then(() => res.sendStatus(204))
        // if an error occurs, pass it to the handler
        .catch(next)
})

module.exports = router