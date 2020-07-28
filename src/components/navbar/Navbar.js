import React from "react"
import "./Navbar.css"
import postService from "../../services/posts"
import userService from "../../services/users"
import HomeIcon from "@material-ui/icons/Home"

/**
 * Navbar containing NavLinks and login/logout buttons
 */
const Navbar = ({
  toggleLoginForm,
  user,
  setUser,
  setUserLikes,
  setUserPosts,
}) => {
  // Logs out user by clearing tokens, states, and browser local storage
  const handleLogout = async () => {
    try {
      postService.clearToken()
      userService.clearToken()
    } catch (exception) {
      console.log(exception)
    }
    window.localStorage.removeItem("loggedShareitUser")
    window.localStorage.removeItem("loggedShareitUserPosts")
    setUserLikes([])
    setUser(null)
    setUserPosts([])
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
