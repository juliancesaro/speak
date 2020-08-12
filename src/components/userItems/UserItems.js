import React, { useState, useEffect } from "react"
import "./UserItems.css"
import postService from "../../services/posts"
import Posts from "../posts/Posts"

const UserItems = ({
  allUsers,
  user,
  setUser,
  userAccount,
  userLikes,
  setUserLikes,
  posts,
  setPosts,
  userPosts,
  setUserPosts,
  toggleLoginForm,
}) => {
  const [userAccountPosts, setUserAccountPosts] = useState(
    posts.filter((post) =>
      userAccount.posts.some((userPost) => userPost.id === post.id)
    )
  )
  const [userAccountLikedPosts, setUserAccountLikedPosts] = useState(
    posts.filter((post) =>
      userAccount.likedPosts.some((userLikedPost) => userLikedPost === post.id)
    )
  )

  const [activeUserItem, setActiveUserItem] = useState("Posts")

  // If a post is liked in user view, update the posts on the home page.
  // When a post is liked, it does not immediately appear in likedPosts,
  // Twitter also has this issue.
  useEffect(() => {
    postService.getAll().then((initialPosts) => {
      initialPosts.sort((a, b) => new Date(b.date) - new Date(a.date))
      setPosts(initialPosts)
    })
  }, [userAccountPosts, setPosts])

  useEffect(() => {
    postService.getAll().then((initialPosts) => {
      initialPosts.sort((a, b) => new Date(b.date) - new Date(a.date))
      setPosts(initialPosts)
    })
  }, [userAccountLikedPosts, setPosts])

  const setLikesActive = () => {
    setActiveUserItem("Likes")
  }
  const setPostsActive = () => {
    setActiveUserItem("Posts")
  }
  return (
    <div className="useritems">
      <div className="user-nav">
        <div
          className={`user-nav-posts${
            activeUserItem === "Posts" ? " active" : ""
          }`}
          onClick={setPostsActive}
        >
          <p>Posts</p>
        </div>
        <div
          className={`user-nav-likes${
            activeUserItem === "Likes" ? " active" : ""
          }`}
          onClick={setLikesActive}
        >
          <p>Likes</p>
        </div>
      </div>
      {activeUserItem === "Posts" ? (
        <Posts
          allUsers={allUsers}
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
      ) : (
        <Posts
          allUsers={allUsers}
          user={user}
          setUser={setUser}
          userLikes={userLikes}
          setUserLikes={setUserLikes}
          setPosts={setUserAccountLikedPosts}
          posts={userAccountLikedPosts}
          userPosts={userPosts}
          setUserPosts={setUserPosts}
          toggleLoginForm={toggleLoginForm}
        />
      )}
    </div>
  )
}

export default UserItems
