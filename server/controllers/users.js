const bcrypt = require("bcrypt")
const usersRouter = require("express").Router()
const User = require("../models/user")
const Post = require("../models/post")

usersRouter.post("/", async (request, response) => {
  const body = request.body

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(body.password, saltRounds)

  const user = new User({
    username: body.username,
    passwordHash,
    avatar: body.avatar,
  })

  const savedUser = await user.save()

  response.json(savedUser)
})

usersRouter.get("/:id", async (request, response) => {
  const user = await User.findById(request.params.id)
  if (user) {
    response.json(user.toJSON())
  } else {
    response.status(404).end()
  }
})

usersRouter.get("/", async (request, response) => {
  const users = await User.find({}).populate("posts", { content: 1, date: 1 })
  response.json(users.map((u) => u.toJSON()))
})

usersRouter.delete("/:id", async (request, response) => {
  const user = await User.findById(request.params.id)

  //delete users posts
  for (let i = 0; i < user.posts.length; i++) {
    await Post.findByIdAndRemove(user.posts[i])
  }

  await User.findByIdAndRemove(request.params.id)
  response.status(204).end()
})

usersRouter.put("/likedPosts/:id", async (request, response, next) => {
  const body = request.body

  const user = {
    likedPosts: body.likedPosts,
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(request.params.id, user, {
      new: true,
    }).populate("posts", { content: 1, date: 1 })
    response.json(updatedUser.toJSON())
  } catch (exception) {
    next(exception)
  }
})

usersRouter.put("/follows/:id", async (request, response, next) => {
  const body = request.body

  const user = {
    follows: body.follows,
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(request.params.id, user, {
      new: true,
    }).populate("posts", { content: 1, date: 1 })
    response.json(updatedUser.toJSON())
  } catch (exception) {
    next(exception)
  }
})

usersRouter.put("/followers/:id", async (request, response, next) => {
  const body = request.body

  const user = {
    followers: body.followers,
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(request.params.id, user, {
      new: true,
    }).populate("posts", { content: 1, date: 1 })
    response.json(updatedUser.toJSON())
  } catch (exception) {
    next(exception)
  }
})

module.exports = usersRouter
