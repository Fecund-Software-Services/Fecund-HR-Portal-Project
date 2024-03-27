const express = require('express')
const mongoose = require('mongoose')
const url = require('./src/connection/constants');
const userRoutes = require('./src/routes/userRoutes')
const candidateRoutes = require('./src/routes/candidateRoutes')


// express app
const app = express()

//middleware
app.use(express.json())

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

// routes
app.use('/api/user', userRoutes)
app.use('/api/candidate', candidateRoutes)

// connect to db
// mongoose.connect(process.env.MONGO_URI)
//     .then(() => {
//         // listen for requests
//         app.listen(process.env.PORT, () => {
//             console.log('connected to db and listening on port', process.env.PORT)
//           })
//     })
//     .catch((error) => {
//         console.log(error)
//     })

mongoose.connect('mongodb:' + url.databaseURL)
    .then((res) => {
      console.log('Connected to MongoDB and Schemas is successfully created!');
      return false;
    })
    .catch((err) => {
      console.log('Error in connecting to MongoDB' + err);
    });
    


