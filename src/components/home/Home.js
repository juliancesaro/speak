import React from "react"
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
  return (
    <div className="home-wrapper">
      <div className="home">
        <h1>Home</h1>
        {user ? (
          <PostForm
            user={user}
            setPosts={setPosts}
            setUserPosts={setUserPosts}
            posts={posts}
            userPosts={userPosts}
          />
        ) : null}
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
      </div>
    </div>
  )
}

export default Home
