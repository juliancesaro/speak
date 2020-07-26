import React from "react"
import "./Posts.css"
import data from "../../data/sampledata.json"
import Post from "../post/Post"

const Posts = () => {
  return (
    <div className="posts">
      <h1>Posts</h1>
      <ul>
        {data.posts.map((post) => (
          <li key={post.id}>
            <Post user={post.user} content={post.content} />
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Posts
