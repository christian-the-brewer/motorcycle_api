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
        img: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.Hcfn7qpbm4ARNsfJWU1PwwHaFE%26pid%3DApi&f=1'
    },
    {
        brand: 'Honda',
        modelName: 'CBR',
        modelCode: 'CBR600RR',
        type: "Sport Bike",
        year: 1997,
        engineSize: 600,
        engineCylinders: 4,
        img: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi2.wp.com%2Fwww.bike-urious.com%2Fwp-content%2Fuploads%2FHonda-CBR-600F3-Smokin-Joes-Replica-Front-Right.jpg%3Ffit%3D881%252C589&f=1&nofb=1'
    },
    {
        brand: 'Yamaha',
        modelName: 'V-max',
        modelCode: 'VMX1200',
        type: "Muscle Cruiser",
        year: 1994,
        engineSize: 1200,
        engineCylinders: 4,
        img: 'https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fmedia-cache-ec0.pinimg.com%2F736x%2F8d%2Ff8%2Feb%2F8df8eb8fa94ae32b60c9a17e01b86362.jpg&f=1&nofb=1'

    },
    {
        brand: 'Suzuki',
        modelName: 'Bandit',
        modelCode: 'GSF1200S',
        type: "Sport Bike",
        year: 2002,
        engineSize: 1200,
        engineCylinders: 4,
        img: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse2.mm.bing.net%2Fth%3Fid%3DOIP.RmCWMQ4jt93vtI3HL8OWXwHaFj%26pid%3DApi&f=1'

    },
    {
        brand: 'Kawasaki',
        modelName: 'Ninja',
        modelCode: 'EX250R',
        type: "Sport Bike",
        year: 1994,
        engineSize: 250,
        engineCylinders: 2,
        img: 'https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fi1.ytimg.com%2Fvi%2FjOEZ9cbxQOg%2Fmaxresdefault.jpg&f=1&nofb=1'
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