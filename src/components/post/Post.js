import React from "react"
import "./Post.css"

const Post = ({ user, content }) => {
  return (
    <div className="post">
      <p className="post-user">{user}</p>
      <p>{content}</p>
    </div>
  )
}

export default Post
