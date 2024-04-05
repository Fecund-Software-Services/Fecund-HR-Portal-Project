const express = require('express')
const mongoose = require('mongoose')
const url = require('./src/connection/constants');
const server_PORT = require('./src/connection/constants')
const client_PORT = require('./src/connection/constants')
const userRoutes = require('./src/routes/userRoutes')
const candidateRoutes = require('./src/routes/candidateRoutes')
const PORT = 8080;
const cors = require('cors')

// express app
const app = express()

// app.use((req, res, next) => {
//   res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
//   res.header('Expires', '-1');
//   res.header('Pragma', 'no-cache');
//   res.sendFile(path.join(__dirname, 'build', 'index.html'));
// });

//middleware
app.use(cors({ origin: client_PORT, credentials: true}))
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

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log('Press Ctrl+C to quit.');
});

// mongoose.connect('mongodb:' + url.databaseURL)
//     .then((res) => {
//       console.log('Connected to MongoDB and Schemas is successfully created!');
//       return false;
//     })
//     .catch((err) => {
//       console.log('Error in connecting to MongoDB' + err);
//     });
    


