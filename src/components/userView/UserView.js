import React, { useState } from 'react'
import './UserView.css'
import { useParams } from 'react-router-dom'
import userService from '../../services/users'
import blank_user from '../../assets/blank_user.png'
import Button from '@material-ui/core/Button/Button'
import UserViewPosts from '../userViewPosts/UserViewPosts'
import Loading from '../loading/Loading'
import { NavLink } from 'react-router-dom'
import { isMobile } from 'react-device-detect'

const UserView = ({
  allUsers,
  setAllUsers,
  user,
  setUser,
  userLikes,
  setUserLikes,
  posts,
  setPosts,
  toggleLoginForm,
}) => {
  const [followingBtnHover, setFollowingBtnHover] = useState(false)
  const [activeUserItem, setActiveUserItem] = useState('Posts')

  const userAccountUsername = useParams().username

  const userAccount = allUsers.find(
    (user) => user.username === userAccountUsername
  )

  const followUser = async () => {
    try {
      // Server requests.
      const returnedUser = await userService.updateFollows(user.id, {
        follows: user.follows.concat(userAccount.id),
      })
      const returnedAccountUser = await userService.updateFollowers(
        userAccount.id,
        {
          followers: userAccount.followers.concat(user.id),
        }
      )
      window.localStorage.setItem(
        'loggedSpeakUser',
        JSON.stringify(returnedUser)
      )
      setUser(returnedUser)
      const updatedAllUsers = allUsers
        .filter((oldUser) => oldUser.id !== userAccount.id)
        .concat(returnedAccountUser)
      setAllUsers(updatedAllUsers)
    } catch (error) {
      console.log(error)
    }
  }

  const unFollowUser = async () => {
    try {
      // Server requests.
      const returnedUser = await userService.updateFollows(user.id, {
        follows: user.follows.filter((follow) => follow !== userAccount.id),
      })
      const returnedAccountUser = await userService.updateFollowers(
        userAccount.id,
        {
          followers: userAccount.followers.filter(
            (follower) => follower !== user.id
          ),
        }
      )
      window.localStorage.setItem(
        'loggedSpeakUser',
        JSON.stringify(returnedUser)
      )
      const updatedAllUsers = allUsers
        .filter((oldUser) => oldUser.id !== userAccount.id)
        .concat(returnedAccountUser)
      setAllUsers(updatedAllUsers)
      setUser(returnedUser)
    } catch (error) {
      console.log(error)
    }
  }

  const setLikesActive = () => {
    setActiveUserItem('Likes')
  }
  const setPostsActive = () => {
    setActiveUserItem('Posts')
  }

  return (
    <div className={`userview-wrapper${isMobile ? '-mobile' : ''}`}>
      <div className={`userview${isMobile ? '-mobile' : ''}`}>
        {userAccount ? (
          <>
            <div className={`user-info${isMobile ? '-mobile' : ''}`}>
              <img
                src={userAccount.avatar ? userAccount.avatar : blank_user}
                alt={`${userAccount.username}-avatar`}
                width="100px"
              />
              <h2>{userAccount.username}</h2>
              <div className="user-follow-items">
                <div className="user-follow-left">
                  <NavLink
                    exact
                    className="user-follow"
                    to={`/user/${userAccount.username}/following`}
                  >
                    <strong>{userAccount.follows.length}</strong> Following
                  </NavLink>
                  <NavLink
                    exact
                    className="user-follow"
                    to={`/user/${userAccount.username}/following`}
                  >
                    <strong>{userAccount.followers.length}</strong> Followers
                  </NavLink>
                </div>
                <div className="user-follow-right">
                  {user ? (
                    user.id === userAccount.id ? null : user.follows.some(
                        (follow) => follow === userAccount.id
                      ) ? (
                      followingBtnHover ? (
                        <Button
                          onClick={unFollowUser}
                          onMouseLeave={() => setFollowingBtnHover(false)}
                          style={{ backgroundColor: '#f08080' }}
                        >
                          Unfollow?
                        </Button>
                      ) : (
                        <Button
                          onClick={unFollowUser}
                          onMouseEnter={() => setFollowingBtnHover(true)}
                          style={{ backgroundColor: '#87cefa' }}
                        >
                          Following
                        </Button>
                      )
                    ) : (
                      <Button
                        onClick={followUser}
                        style={{ backgroundColor: '#87cefa' }}
                      >
                        Follow
                      </Button>
                    )
                  ) : (
                    <Button
                      onClick={toggleLoginForm}
                      style={{ backgroundColor: '#87cefa' }}
                    >
                      Follow
                    </Button>
                  )}
                </div>
              </div>
            </div>
            <div className="user-nav">
              <div
                className={`user-nav-posts${
                  activeUserItem === 'Posts' ? ' active' : ''
                }`}
                onClick={setPostsActive}
              >
                <p>Posts</p>
              </div>
              <div
                className={`user-nav-likes${
                  activeUserItem === 'Likes' ? ' active' : ''
                }`}
                onClick={setLikesActive}
              >
                <p>Likes</p>
              </div>
            </div>
            {posts ? (
              <UserViewPosts
                allUsers={allUsers}
                user={user}
                setUser={setUser}
                userAccount={userAccount}
                userLikes={userLikes}
                setUserLikes={setUserLikes}
                setPosts={setPosts}
                posts={posts}
                toggleLoginForm={toggleLoginForm}
                activeUserItem={activeUserItem}
              />
            ) : (
              <Loading />
            )}
          </>
        ) : (
          <Loading />
        )}
      </div>
    </div>
  )
}

export default UserView
