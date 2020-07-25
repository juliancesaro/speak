import React from "react"
import "./Navbar.css"

const Navbar = ({ toggleLoginForm }) => {
  return (
    <div className="navbar-wrapper">
      <div className="navbar">
        <div className="nav-left">
          <p>HOME</p>
        </div>
        <div className="nav-right" onClick={toggleLoginForm}>
          LOGIN
        </div>
      </div>
    </div>
  )
}

export default Navbar
