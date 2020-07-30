import React from "react"
import "./Posts.css"
import Post from "../post/Post"

/**
 * Component maps posts list to a separate Post component.
 */
const Posts = ({
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
    <div className="posts">
      {posts ? (
        <ul>
          {posts.map((post) => (
            <li key={post.id}>
              <Post
                allUsers={allUsers}
                user={user}
                setUser={setUser}
                userLikes={userLikes}
                setUserLikes={setUserLikes}
                posts={posts}
                setPosts={setPosts}
                post={post}
                userPosts={userPosts}
                setUserPosts={setUserPosts}
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
