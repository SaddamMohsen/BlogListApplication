const bcrypt = require('bcryptjs')
const usersRouter = require('express').Router()
const User = require('../models/User')
const logger = require('../utils/logger')

usersRouter.get('/', async(request, response) => {
  try{
    const users = await User
        .find({}).populate('blog', { title: 1, author: 1, url: 1, likes: 1 })
        response.json(users.map(b => b.toJSON()))
  }catch(err){next(err)}
})
usersRouter.post('/', async(request, response, next) => {
    try {
        const body = request.body
        const password=body.password
        
        //check password length
        if(password.length<3)
         {
             logger.error('password shorter than the minimum allowed length (3)')
         //console.log('password lenght must be at least 3 characters')
            return response.status(400).json({ password_Validation: 'password shorter than the minimum allowed length (3)' })
          }
     const saltRounds = 10
     const passwordHash = await bcrypt.hash(password,saltRounds)
      //logger.info('hashed Password'+passwordHash)
     const user = new User({
            username: body.username,
            name: body.name,
            passwordHash,
        })
        const savedUser = await user.save()
        response.json(savedUser)
    } catch (exception) {
        //console.log('exz',exception)
        next(exception)
    }
})

module.exports = usersRouter