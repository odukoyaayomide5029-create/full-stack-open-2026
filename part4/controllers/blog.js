const jwt = require('jsonwebtoken')


const blogRouter = require('express').Router()
const Blog = require('../models/bloglist')
const User = require('../models/users')
const { SECRET } = require('../utils/config')
const { userExtractor } = require('../utils/middleware')



blogRouter.get('/', async (request, response,next) => {
  const blogs = await Blog.find({}).populate('user')
  response.json(blogs)
})

blogRouter.post('/', async (request, response,next) => {
  const body = request.body
    const decodedToken = jwt.verify(request.token, SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' })
  }
  const user = await User.findById(decodedToken.id)

  if (!user) {
    return response.status(400).json({ error: 'UserId missing or not valid' })
  }
 

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
    user: user.id
  })

  const result = await blog.save()
  user.blogs=user.blogs.concat(result.id)
  await user.save()
  response.status(201).json(result)
  
})

blogRouter.delete('/:id',userExtractor,async (request,response)=>{
 
  const user = request.user
  const blog = await Blog.findById(request.params.id)
  if (!blog) {
    return response.status(404).end()
  }
   if (blog.user.toString() !== user.id.toString()) {
    return response.status(401).json({ error: 'only the creator can delete this blog' })
  }
   await Blog.findByIdAndDelete(request.params.id)
  response.status(204).end()
})

module.exports = blogRouter