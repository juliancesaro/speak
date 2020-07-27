const postsRouter = require("express").Router()
const jwt = require("jsonwebtoken")
const Post = require("../models/post")
const User = require("../models/user")

postsRouter.get("/", async (request, response) => {
  const posts = await Post.find({}).populate("user", { username: 1, avatar: 1 })
  response.json(posts.map((post) => post.toJSON()))
})

postsRouter.get("/:id", async (request, response) => {
  const post = await Post.findById(request.params.id)
  if (post) {
    response.json(post.toJSON())
  } else {
    response.status(404).end()
  }
})

postsRouter.post("/", async (request, response) => {
  const body = request.body

  const decodedToken = jwt.verify(request.token, process.env.SECRET)

  const user = await User.findById(decodedToken.id)

  const post = new Post({
    content: body.content,
    likes: [],
    date: new Date(),
    user: user,
  })

  const savedPost = await post.save()
  user.posts = user.posts.concat(savedPost._id)
  await user.save()

  response.json(savedPost.toJSON())
})

postsRouter.delete("/:id", async (request, response) => {
  await Post.findByIdAndRemove(request.params.id)

  response.status(204).end()
})

postsRouter.put("/:id", async (request, response, next) => {
  const body = request.body

  const post = {
    likes: body.likes,
  }

  try {
    const updatedPost = await Post.findByIdAndUpdate(request.params.id, post, {
      new: true,
    }).populate("user", { username: 1, avatar: 1 })
    response.json(updatedPost.toJSON())
  } catch (exception) {
    next(exception)
  }
})

module.exports = postsRouter
