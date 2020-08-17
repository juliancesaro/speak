import React from "react"
import Posts from "../posts/Posts"

const HomePosts = ({
  allUsers,
  user,
  setUser,
  userLikes,
  setUserLikes,
  posts,
  setPosts,
  toggleLoginForm,
  activePostsItem,
}) => {
  const postsToShow = posts.filter(
    (post) => user.follows.includes(post.user.id) || post.user.id === user.id
  )

  return (
    <div className="home-posts">
      {activePostsItem === "Following" ? (
        <Posts
          allPosts={posts}
          allUsers={allUsers}
          user={user}
          setUser={setUser}
          userLikes={userLikes}
          setUserLikes={setUserLikes}
          setPosts={setPosts}
          postsToShow={postsToShow}
          toggleLoginForm={toggleLoginForm}
        />
      ) : (
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
      )}
    </div>
  )
}

export default HomePosts
