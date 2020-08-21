import React, { useState, useEffect } from "react"
import "./App.css"
import { HashRouter, Route, Switch } from "react-router-dom"
import postService from "./services/posts"
import userService from "./services/users"
import Navbar from "./components/navbar/Navbar"
import Form from "./components/form/Form"
import LoginForm from "./components/loginForm/LoginForm"
import RegisterForm from "./components/registerForm/RegisterForm"
import Home from "./components/home/Home"
import UserView from "./components/userView/UserView"
import Following from "./components/following/Following"

/**
 * Main component containing the structure of the app.
 */
const App = () => {
  const [posts, setPosts] = useState(null)
  const [allUsers, setAllUsers] = useState([])
  const [user, setUser] = useState(null)
  const [userLikes, setUserLikes] = useState([])
  const [showLoginForm, setShowLoginForm] = useState(false)
  const [showRegisterForm, setShowRegisterForm] = useState(false)

  // On app load, set posts state to returned posts from the server,
  // and check browser local storage for data and set states accordingly.
  useEffect(() => {
    postService.getAll().then((initialPosts) => {
      initialPosts.sort((a, b) => new Date(b.date) - new Date(a.date))
      setPosts(initialPosts)
    })
    userService.getAll().then((allUsers) => {
      setAllUsers(allUsers)
    })
    const loggedUserJSON = window.localStorage.getItem("loggedSpeakUser")
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      postService.setToken(user.token)
      userService.setToken(user.token)
      setUserLikes(user.likedPosts)
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
            setUserLikes={setUserLikes}
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
      <HashRouter basename="/">
        <Navbar
          toggleLoginForm={toggleLoginForm}
          user={user}
          setUser={setUser}
          setUserLikes={setUserLikes}
        />
        <Switch>
          {allUsers.map((allUser) => (
            <Route
              key={allUser.username}
              path={`/user/${allUser.username}/followers`}
            ></Route>
          ))}
          {allUsers.map((allUser) => (
            <Route
              key={allUser.username}
              path={`/user/${allUser.username}/following`}
            >
              <Following />
            </Route>
          ))}
          {allUsers.map((allUser) => (
            <Route key={allUser.username} path={`/user/${allUser.username}`}>
              <UserView
                allUsers={allUsers}
                setAllUsers={setAllUsers}
                user={user}
                setUser={setUser}
                userLikes={userLikes}
                setUserLikes={setUserLikes}
                posts={posts}
                setPosts={setPosts}
                userAccount={allUser}
                toggleLoginForm={toggleLoginForm}
              />
            </Route>
          ))}
          <Route path="/">
            <Home
              allUsers={allUsers}
              user={user}
              setUser={setUser}
              userLikes={userLikes}
              setUserLikes={setUserLikes}
              posts={posts}
              setPosts={setPosts}
              toggleLoginForm={toggleLoginForm}
            />
          </Route>
        </Switch>
      </HashRouter>
    </div>
  )
}

export default App
