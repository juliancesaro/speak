import React from 'react'
import './User.css'
import { NavLink } from 'react-router-dom'
import blank_user from '../../assets/blank_user.png'

const User = ({ user }) => {
  const { username, avatar } = user
  return (
    <div className="user">
      <div className="user-left">
        <div className="user-image">
          <NavLink exact className="userimglink" to={`/user/${username}`}>
            <img
              src={avatar ? avatar : blank_user}
              alt={`${username}-avatar`}
              width="50px"
            />
            <div className="overlay"></div>
          </NavLink>
        </div>
        <NavLink exact className="userlink" to={`/user/${username}`}>
          <p className="user-username">{username}</p>
        </NavLink>
      </div>
    </div>
  )
}

export default User
