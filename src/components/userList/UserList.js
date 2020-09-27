import React from 'react'
import './UserList.css'
import User from '../user/User'

const UserList = ({ users }) => {
  return (
    <div className="userList">
      <ul>
        {users.map((user) => (
          <User key={user.username} user={user} />
        ))}
      </ul>
    </div>
  )
}

export default UserList
