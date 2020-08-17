import React, { useState } from "react"
import "./Home.css"
import PostForm from "../postForm/PostForm"
import HomePosts from "../homePosts/HomePosts"
import Posts from "../posts/Posts"
import Loading from "../loading/Loading"
import { isMobile } from "react-device-detect"

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
  toggleLoginForm,
}) => {
  const [activePostsItem, setActivePostsItem] = useState("Following")

  const setFollowingActive = () => {
    setActivePostsItem("Following")
  }
  const setAllActive = () => {
    setActivePostsItem("All")
  }

  return (
    <div className={`home-wrapper${isMobile ? "-mobile" : ""}`}>
      <div className={`home${isMobile ? "-mobile" : ""}`}>
        <h1>Home</h1>
        {user ? (
          <>
            <PostForm
              allUsers={allUsers}
              user={user}
              setPosts={setPosts}
              posts={posts}
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
            {posts ? (
              <HomePosts
                allUsers={allUsers}
                user={user}
                setUser={setUser}
                userLikes={userLikes}
                setUserLikes={setUserLikes}
                setPosts={setPosts}
                posts={posts}
                toggleLoginForm={toggleLoginForm}
                activePostsItem={activePostsItem}
              />
            ) : (
              <Loading />
            )}
          </>
        ) : posts ? (
          <Posts
            allPosts={posts}
            allUsers={allUsers}
            user={user}
            setUser={setUser}
            userLikes={userLikes}
            setUserLikes={setUserLikes}
            setPosts={setPosts}
            postsToShow={posts}
            toggleLoginForm={toggleLoginForm}
          />
        ) : (
          <Loading />
        )}
      </div>
    </div>
  )
}

export default Home
