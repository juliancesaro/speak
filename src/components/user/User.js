import React, { useState, useEffect } from "react"
import "./User.css"
import userService from "../../services/users"
import postService from "../../services/posts"
import blank_user from "../../assets/blank_user.png"
import Button from "@material-ui/core/Button/Button"
import UserItems from "../userItems/UserItems"

const User = ({
  allUsers,
  setAllUsers,
  user,
  setUser,
  userLikes,
  setUserLikes,
  posts,
  setPosts,
  userPosts,
  setUserPosts,
  userAccount,
  toggleLoginForm,
}) => {
  const [userAccountPosts, setUserAccountPosts] = useState(
    posts.filter((post) =>
      userAccount.posts.some((userPost) => userPost.id === post.id)
    )
  )
  const [followingBtnHover, setFollowingBtnHover] = useState(false)

  useEffect(() => {
    postService.getAll().then((initialPosts) => {
      initialPosts.sort((a, b) => new Date(b.date) - new Date(a.date))
      setPosts(initialPosts)
    })
  }, [userAccountPosts])

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
        "loggedShareitUser",
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
        "loggedShareitUser",
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

  return (
    <div className="user-wrapper">
      <div className="user">
        {userAccount ? (
          <div className="user-info">
            <img
              src={userAccount.avatar ? userAccount.avatar : blank_user}
              alt={`${userAccount.username}-avatar`}
              width="100px"
            />
            <h2>{userAccount.username}</h2>
            <div className="user-follow-items">
              <div className="user-follow-left">
                <p className="user-following">
                  <strong>{userAccount.follows.length}</strong> Following
                </p>
                <p className="user-followers">
                  <strong>{userAccount.followers.length}</strong> Followers
                </p>
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
                        style={{ backgroundColor: "#f08080" }}
                      >
                        Unfollow?
                      </Button>
                    ) : (
                      <Button
                        onClick={unFollowUser}
                        onMouseEnter={() => setFollowingBtnHover(true)}
                        style={{ backgroundColor: "#87cefa" }}
                      >
                        Following
                      </Button>
                    )
                  ) : (
                    <Button
                      onClick={followUser}
                      style={{ backgroundColor: "#87cefa" }}
                    >
                      Follow
                    </Button>
                  )
                ) : (
                  <Button
                    onClick={toggleLoginForm}
                    style={{ backgroundColor: "#87cefa" }}
                  >
                    Follow
                  </Button>
                )}
              </div>
            </div>
          </div>
        ) : null}
        <UserItems
          user={user}
          setUser={setUser}
          userLikes={userLikes}
          setUserLikes={setUserLikes}
          setPosts={setUserAccountPosts}
          posts={userAccountPosts}
          userPosts={userPosts}
          setUserPosts={setUserPosts}
          toggleLoginForm={toggleLoginForm}
        />
      </div>
    </div>
  )
}

export default User
