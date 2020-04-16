const config = require('./utils/config')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const middleware = require('./utils/middleware')
const usersRouter = require('./controllers/users')
const blogsRouter = require('./controllers/blogs')
const logger = require('./utils/logger')
const loginRouter= require('./controllers/login')
const path = require('path')
logger.info('connected to', config.MONGODB_URI)

//for testing purpose
if (process.env.NODE_ENV === 'test') { 
   logger.info('in test mode')
 const testingRouter = require('./controllers/testingRouter') 
 app.use('/api/testing', testingRouter)
 }
mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true ,useFindAndModify: false})
    .then(result => {
		 console.log('connected to ',config.MONGODB_URI)
        logger.info('connected to MongoDB')
    })
    .catch((error) => {
        logger.error('error connecting to MongoDB:', error.message)
    })
app.use(express.static(path.join(__dirname, 'build')))

/*app.get('/ping', (req, res) => {
  return res.send('pong')
})

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'))
})*/

app.use(cors())
app.use(bodyParser.json())
app.use(middleware.requestLogger)
app.use('/api/login',loginRouter)
app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)
app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

app.get('/', (req, res)=> {
   res.sendFile(path.join(__dirname, 'build', 'index.html'));
 });
 
module.exports = app