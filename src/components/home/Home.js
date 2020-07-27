import React from "react"
import "./Home.css"
import PostForm from "../postForm/PostForm"
import Posts from "../posts/Posts"

const Home = ({
  user,
  setUser,
  userLikes,
  setUserLikes,
  posts,
  setPosts,
  userPosts,
  setUserPosts,
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
          user={user}
          setUser={setUser}
          userLikes={userLikes}
          setUserLikes={setUserLikes}
          setPosts={setPosts}
          posts={posts}
        />
      </div>
    </div>
  )
}

export default Home
