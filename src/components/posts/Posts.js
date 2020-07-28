import React from "react"
import "./Posts.css"
import Post from "../post/Post"

/**
 * Component maps posts list to a separate Post component.
 */
const Posts = ({ user, setUser, userLikes, setUserLikes, posts, setPosts }) => {
  return (
    <div className="posts">
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <Post
              user={user}
              setUser={setUser}
              userLikes={userLikes}
              setUserLikes={setUserLikes}
              posts={posts}
              setPosts={setPosts}
              post={post}
              username={post.user.username}
              avatar={post.user.avatar}
              content={post.content}
              likes={post.likes}
            />
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Posts
