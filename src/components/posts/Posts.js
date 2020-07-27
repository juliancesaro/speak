import React from "react"
import "./Posts.css"
import Post from "../post/Post"

const Posts = ({ posts }) => {
  return (
    <div className="posts">
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <Post
              username={post.user.username}
              avatar={post.user.avatar}
              content={post.content}
            />
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Posts
