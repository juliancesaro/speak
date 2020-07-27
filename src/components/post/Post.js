import React from "react"
import "./Post.css"
import IconButton from "@material-ui/core/IconButton"
import ThumbUpAltOutlinedIcon from "@material-ui/icons/ThumbUpAltOutlined"
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt"

const Post = ({ username, avatar, content }) => {
  return (
    <div className="post">
      <div className="post-left">
        <div className="post-user-image">
          <img src={avatar} alt={`${username}-avatar`} width="50px" />
        </div>
        <div className="post-text">
          <p className="post-user">{username}</p>
          <p className="post-content">{content}</p>
        </div>
      </div>
      <div className="post-right">
        <IconButton aria-label="delete" style={{ padding: 8 }}>
          <ThumbUpAltOutlinedIcon />
        </IconButton>
      </div>
    </div>
  )
}

export default Post
