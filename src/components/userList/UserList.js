import React from "react"
import "./UserList.css"

const UserList = ({ allUsers }) => {
  return (
    <div className="userList">
      <ul>
        {allUsers.map((allUser) => (
          <li key={allUser.id}>{allUser.username}</li>
        ))}
      </ul>
    </div>
  )
}

export default UserList
