import React from "react"
import "./User.css"
import blank_user from "../../assets/blank_user.png"

const User = ({ user }) => {
  return (
    <div className="user-wrapper">
      <div className="user">
        {user ? (
          <div className="user-info">
            <img
              src={user.avatar ? user.avatar : blank_user}
              alt={`${user.username}-avatar`}
              width="100px"
            />
            <h2>{user.username}</h2>
            <div className="user-follow-items">
              <p className="user-following">
                <strong>{user.follows.length}</strong> Following
              </p>
              <p className="user-followers">
                <strong>{user.followers.length}</strong> Followers
              </p>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  )
}

export default User
