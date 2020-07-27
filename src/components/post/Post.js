import React, { useState } from "react"
import "./Post.css"
import postService from "../../services/posts"
import userService from "../../services/users"
import IconButton from "@material-ui/core/IconButton"
import ThumbUpAltOutlinedIcon from "@material-ui/icons/ThumbUpAltOutlined"
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt"

const Post = ({
  user,
  setUser,
  userLikes,
  setUserLikes,
  posts,
  setPosts,
  post,
  username,
  avatar,
  content,
  likes,
}) => {
  const [likedByUser, setLikedByUser] = useState(
    userLikes.some((userLike) => userLike === post.id)
  )

  const likePost = async () => {
    try {
      const returnedPost = await postService.update(post.id, {
        likes: likes.concat(user.id),
        likedPosts: user.likedPosts.concat(post.id),
      })
      const returnedUser = await userService.update(user.id, {
        likedPosts: user.likedPosts.concat(post.id),
      })
      const updatedPosts = posts
        .filter((oldPost) => oldPost.id !== post.id)
        .concat(returnedPost)
      window.localStorage.setItem(
        "loggedShareitUser",
        JSON.stringify(returnedUser)
      )
      window.localStorage.setItem(
        "loggedShareitUserPosts",
        JSON.stringify(
          updatedPosts.sort((a, b) => new Date(b.date) - new Date(a.date))
        )
      )
      setPosts(updatedPosts.sort((a, b) => new Date(b.date) - new Date(a.date)))
      setUser(returnedUser)
      setUserLikes(returnedUser.likedPosts)
      setLikedByUser(true)
    } catch (error) {
      console.log(error)
    }
  }
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
        {likedByUser ? (
          <ThumbUpAltIcon fontSize="small" style={{ padding: 8 }} />
        ) : (
          <IconButton
            aria-label="like"
            style={{ padding: 8 }}
            onClick={likePost}
          >
            <ThumbUpAltOutlinedIcon fontSize="small" />
          </IconButton>
        )}
        <p className="likes-num">{likes.length}</p>
      </div>
    </div>
  )
}

export default Post
