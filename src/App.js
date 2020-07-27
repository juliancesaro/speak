import React, { useState, useEffect } from "react"
import "./App.css"
import postService from "./services/posts"
import userService from "./services/users"
import Navbar from "./components/navbar/Navbar"
import Form from "./components/form/Form"
import LoginForm from "./components/loginForm/LoginForm"
import RegisterForm from "./components/registerForm/RegisterForm"
import Home from "./components/home/Home"

function App() {
  const [posts, setPosts] = useState([])
  const [user, setUser] = useState(null)
  const [userPosts, setUserPosts] = useState(null)
  const [showLoginForm, setShowLoginForm] = useState(false)
  const [showRegisterForm, setShowRegisterForm] = useState(false)

  useEffect(() => {
    postService.getAll().then((initialPosts) => {
      initialPosts.sort((a, b) => new Date(b.date) - new Date(a.date))
      setPosts(initialPosts)
    })
    const loggedUserJSON = window.localStorage.getItem("loggedShareitUser")
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      postService.setToken(user.token)
      userService.setToken(user.token)
    }
    const loggedUserPostsJSON = window.localStorage.getItem(
      "loggedShareitUserPosts"
    )
    if (loggedUserPostsJSON) {
      const userPosts = JSON.parse(loggedUserPostsJSON)
      setUserPosts(userPosts)
    }
  }, [])

  const toggleLoginForm = () => {
    setShowLoginForm(!showLoginForm)
  }

  const toggleRegisterForm = () => {
    setShowRegisterForm(!showRegisterForm)
  }

  const toggleRegisterLogin = () => {
    toggleLoginForm()
    toggleRegisterForm()
  }

  return (
    <div className="App">
      {showLoginForm ? (
        <Form>
          <LoginForm
            toggleLoginForm={toggleLoginForm}
            toggleRegisterLogin={toggleRegisterLogin}
            setUser={setUser}
            setUserPosts={setUserPosts}
          />
        </Form>
      ) : null}
      {showRegisterForm ? (
        <Form>
          <RegisterForm
            toggleRegisterForm={toggleRegisterForm}
            toggleRegisterLogin={toggleRegisterLogin}
          />
        </Form>
      ) : null}
      <Navbar
        toggleLoginForm={toggleLoginForm}
        user={user}
        setUser={setUser}
        setUserPosts={setUserPosts}
      />
      <Home
        user={user}
        setPosts={setPosts}
        setUserPosts={setUserPosts}
        posts={posts}
        userPosts={userPosts}
      />
    </div>
  )
}

export default App
