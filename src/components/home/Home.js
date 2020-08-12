import React, { useState, useEffect } from "react"
import "./Home.css"
import PostForm from "../postForm/PostForm"
import Posts from "../posts/Posts"

/**
 * Contains PostForm and a list of Posts.
 */
const Home = ({
  allUsers,
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
  const [activePostsItem, setActivePostsItem] = useState("Following")
  const [userFollowingPosts, setUserFollowingPosts] = useState(posts)

  // When posts have been received from the DB or user logs in
  useEffect(() => {
    if (user) {
      setUserFollowingPosts(
        posts.filter(
          (post) =>
            user.follows.includes(post.user.id) || post.user.id === user.id
        )
      )
    }
  }, [posts, user])

  const setFollowingActive = () => {
    setActivePostsItem("Following")
  }
  const setAllActive = () => {
    setActivePostsItem("All")
  }
  return (
    <div className="home-wrapper">
      <div className="home">
        <h1>Home</h1>
        {user ? (
          <>
            <PostForm
              allUsers={allUsers}
              user={user}
              setPosts={setPosts}
              setUserPosts={setUserPosts}
              posts={posts}
              userPosts={userPosts}
            />
            <div className="posts-nav">
              <div
                className={`posts-nav-following${
                  activePostsItem === "Following" ? " active" : ""
                }`}
                onClick={setFollowingActive}
              >
                <p>Following</p>
              </div>
              <div
                className={`posts-nav-all${
                  activePostsItem === "All" ? " active" : ""
                }`}
                onClick={setAllActive}
              >
                <p>All</p>
              </div>
            </div>
            {activePostsItem === "Following" ? (
              <Posts
                allUsers={allUsers}
                user={user}
                setUser={setUser}
                userLikes={userLikes}
                setUserLikes={setUserLikes}
                setPosts={setUserFollowingPosts}
                posts={userFollowingPosts}
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
                setPosts={setPosts}
                posts={posts}
                userPosts={userPosts}
                setUserPosts={setUserPosts}
                toggleLoginForm={toggleLoginForm}
              />
            )}
          </>
        ) : (
          <Posts
            allUsers={allUsers}
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
        )}
      </div>
    </div>
  )
}

export default Home
