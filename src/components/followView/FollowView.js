import React, { useState } from 'react'
import './FollowView.css'
import { useParams } from 'react-router-dom'
import { isMobile } from 'react-device-detect'
import UserList from '../userList/UserList'

const FollowView = ({ allUsers, user }) => {
  const [activeNavItem, setActiveNavItem] = useState('Followers')

  const userAccountUsername = useParams().username

  const userAccount = allUsers.find(
    (user) => user.username === userAccountUsername
  )

  const userAccountFollowers = allUsers.filter((user) =>
    userAccount.followers.some((userFollower) => userFollower === user.id)
  )

  const userAccountFollowing = allUsers.filter((user) =>
    userAccount.follows.some((userFollower) => userFollower === user.id)
  )

  const setFollowersActive = () => {
    setActiveNavItem('Followers')
  }
  const setFollowingActive = () => {
    setActiveNavItem('Following')
  }

  return (
    <div className={`followview-wrapper${isMobile ? '-mobile' : ''}`}>
      <div className={`followview${isMobile ? '-mobile' : ''}`}>
        <div className="followview-nav">
          <div
            className={`followview-nav-followers${
              activeNavItem === 'Followers' ? ' active' : ''
            }`}
            onClick={setFollowersActive}
          >
            <p>Followers</p>
          </div>
          <div
            className={`followview-nav-following${
              activeNavItem === 'Following' ? ' active' : ''
            }`}
            onClick={setFollowingActive}
          >
            <p>Following</p>
          </div>
        </div>
        {activeNavItem === 'Followers' ? (
          <UserList users={userAccountFollowers} />
        ) : (
          <UserList users={userAccountFollowing} />
        )}
      </div>
    </div>
  )
}

export default FollowView
