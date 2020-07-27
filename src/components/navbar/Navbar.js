import React from "react"
import "./Navbar.css"
import postService from "../../services/posts"
import userService from "../../services/users"
import HomeIcon from "@material-ui/icons/Home"

const Navbar = ({
  toggleLoginForm,
  user,
  setUser,
  setUserLikes,
  setUserPosts,
}) => {
  const handleLogout = async () => {
    try {
      postService.clearToken()
      userService.clearToken()
    } catch (exception) {
      console.log(exception)
    }
    window.localStorage.removeItem("loggedShareitUser")
    window.localStorage.removeItem("loggedShareitUserPosts")
    setUser(null)
    setUserPosts([])
    setUserLikes([])
  }

  return (
    <div className="navbar-wrapper">
      <div className="navbar">
        <div className="nav-left">
          <HomeIcon fontSize="large" />
        </div>
        {user ? (
          <div className="nav-right" onClick={handleLogout}>
            LOGOUT
          </div>
        ) : (
          <div className="nav-right" onClick={toggleLoginForm}>
            LOGIN
          </div>
        )}
      </div>
    </div>
  )
}

export default Navbar
