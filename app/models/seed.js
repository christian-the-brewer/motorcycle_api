//seed files runs with `npm run seed`
//deletes current databse and and replaces with only what is in seed database
//TODO make it so it only deletes bikes without owner

const mongoose = require('mongoose')
const Motorcycle = require('./motorcycle')
const db = require('../../config/db')

const startMotorcycles = [
    {
        brand: 'Honda',
        modelName: 'Shadow',
        modelCode: 'VT500C',
        type: "Cruiser",
        year: 1985,
        engineSize: 500,
        engineCylinders: 2,
    },
    {
        brand: 'Honda',
        modelName: 'CBR',
        modelCode: 'CBR600RR',
        type: "Sport Bike",
        year: 1997,
        engineSize: 600,
        engineCylinders: 4,
    },
    {
        brand: 'Yamaha',
        modelName: 'V-max',
        modelCode: 'VMX1200',
        type: "Muscle Cruiser",
        year: 1994,
        engineSize: 1200,
        engineCylinders: 4,

    },
    {
        brand: 'Suzuki',
        modelName: 'Bandit',
        modelCode: 'GSF1200S',
        type: "Sport Bike",
        year: 2002,
        engineSize: 1200,
        engineCylinders: 4,

    },
    {
        brand: 'Kawasaki',
        modelName: 'Ninja',
        modelCode: 'EX250R',
        type: "Sport Bike",
        year: 1994,
        engineSize: 250,
        engineCylinders: 2,
    },
]

//connect to database
mongoose.connect(db, {
    useNewUrlParser: true
})
    .then(() => {
        // first we remove all of the motorcycles
        Motorcycle.deleteMany({ owner: null })
            .then(deletedMotorcycles => {
                console.log('deletedMotorcycles', deletedMotorcycles)
                // the next step is to use our startMotorcycles array to create our seeded motorcycles
                Motorcycle.create(startMotorcycles)
                    .then(newMotorcycles => {
                        console.log('the new motorcycles', newMotorcycles)
                        mongoose.connection.close()
                    })
                    .catch(error => {
                        console.log(error)
                        mongoose.connection.close()
                    })
            })
            .catch(error => {
                console.log(error)
                mongoose.connection.close()
            })
    })
    .catch(error => {
        console.log(error)
        mongoose.connection.close()
    })