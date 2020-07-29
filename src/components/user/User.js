import React from "react"
import "./User.css"

const User = ({ user }) => {
  return (
    <div className="user-wrapper">
      <div className="user">
        {user ? (
          <div className="user-info">
            <img
              src={user.avatar}
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
