import React from "react"
import "./UserItems.css"
import Posts from "../posts/Posts"

const UserItems = ({
  user,
  setUser,
  userLikes,
  setUserLikes,
  posts,
  setPosts,
  userPosts,
  setUserPosts,
  toggleLoginForm,
}) => {
  return (
    <Posts
      user={user}
      setUser={setUser}
      userLikes={userLikes}
      setUserLikes={setUserLikes}
      setPosts={setPosts}
      posts={posts}
      userPosts={userPosts}
      setUserPosts={setUserPosts}
      toggleLoginForm={toggleLoginForm}
    />
  )
}

export default UserItems
