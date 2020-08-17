import React from "react"
import "./Posts.css"
import Post from "../post/Post"

/**
 * Component maps posts list to a separate Post component.
 */
const Posts = ({
  allPosts,
  allUsers,
  user,
  setUser,
  userLikes,
  setUserLikes,
  postsToShow,
  setPosts,
  toggleLoginForm,
}) => {
  return (
    <div className="posts">
      {postsToShow ? (
        <ul>
          {postsToShow.map((post) => (
            <li key={post.id}>
              <Post
                allPosts={allPosts}
                allUsers={allUsers}
                user={user}
                setUser={setUser}
                userLikes={userLikes}
                setUserLikes={setUserLikes}
                setPosts={setPosts}
                post={post}
                toggleLoginForm={toggleLoginForm}
              />
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  )
}

export default Posts
