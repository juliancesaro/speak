import React, { useState, useEffect } from "react"
import postService from "../../services/posts"
import Posts from "../posts/Posts"

const HomePosts = ({
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
  activePostsItem,
}) => {
  const [userFollowingPosts, setUserFollowingPosts] = useState(
    posts.filter(
      (post) => user.follows.includes(post.user.id) || post.user.id === user.id
    )
  )

  useEffect(() => {
    postService.getAll().then((initialPosts) => {
      initialPosts.sort((a, b) => new Date(b.date) - new Date(a.date))
      setPosts(initialPosts)
    })
  }, [userFollowingPosts, setPosts])

  return (
    <div className="home-posts">
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
    </div>
  )
}

export default HomePosts
