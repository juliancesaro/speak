import React from "react"

const User = ({ user }) => {
  return (
    <div className="user">
      {user ? (
        <div>
          <img src={user.avatar} alt={`${user.username}-avatar`} />
          <h2>{user.username}</h2>
        </div>
      ) : null}
    </div>
  )
}

export default User
