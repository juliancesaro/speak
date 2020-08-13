import React from "react"
import "./Navbar.css"
import { NavLink } from "react-router-dom"
import postService from "../../services/posts"
import userService from "../../services/users"
import HomeIcon from "@material-ui/icons/Home"
import AccountBoxIcon from "@material-ui/icons/AccountBox"
import ExitToAppIcon from "@material-ui/icons/ExitToApp"
import logo from "../../assets/logo.png"
import { makeStyles } from "@material-ui/core/styles"
import { isMobile } from "react-device-detect"

const useStyles = makeStyles(() => ({
  icon: {
    "& > *": {
      color: "white",
      cursor: "pointer",
    },
  },
}))

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
  const classes = useStyles()
  // Logs out user by clearing tokens, states, and browser local storage
  const handleLogout = () => {
    try {
      postService.clearToken()
      userService.clearToken()
      window.localStorage.removeItem("loggedShareitUser")
      window.localStorage.removeItem("loggedShareitUserPosts")
      setUserLikes([])
      setUser(null)
      setUserPosts([])
    } catch (exception) {
      console.log(exception)
    }
  }

  return (
    <div className={`navbar-wrapper${isMobile ? "-mobile" : ""}`}>
      <div className={`navbar${isMobile ? "-mobile" : ""}`}>
        <div className={`nav-${isMobile ? "left" : "top"}`}>
          {isMobile ? null : (
            <img src={logo} alt="speak-logo" width="35px"></img>
          )}
          <NavLink
            exact
            className="navlink"
            activeClassName="activeNavlink"
            to="/"
          >
            <HomeIcon fontSize="large" />
          </NavLink>
        </div>
        {user ? (
          <div className={`nav-${isMobile ? "right" : "bottom"}`}>
            <div className="button" onClick={handleLogout}>
              <ExitToAppIcon className={classes.icon} fontSize="large" />
            </div>
          </div>
        ) : (
          <div className={`nav-${isMobile ? "right" : "bottom"}`}>
            <div className="button" onClick={toggleLoginForm}>
              <AccountBoxIcon className={classes.icon} fontSize="large" />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Navbar
