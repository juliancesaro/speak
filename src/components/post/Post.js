import React, { useState, useEffect } from "react"
import "./Post.css"
import postService from "../../services/posts"
import userService from "../../services/users"
import IconButton from "@material-ui/core/IconButton"
import ThumbUpAltOutlinedIcon from "@material-ui/icons/ThumbUpAltOutlined"
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt"

/**
 * Post component consisting of user information, post content,
 * and a 'like' button.
 */
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
  toggleLoginForm,
}) => {
  // State to determine whether current post has been liked by logged in user.
  const [likedByUser, setLikedByUser] = useState(
    userLikes.some((userLike) => userLike === post.id)
  )

  // Ensures likedByUser state updates immediately after userLikes state
  // changes (login, logout).
  useEffect(() => {
    setLikedByUser(userLikes.some((userLike) => userLike === post.id))
  }, [userLikes, likedByUser, post.id])

  // Request is sent to add user to post 'likes' field and post to
  // user 'likedPosts' field.
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

  const unlikePost = async () => {
    try {
      const returnedPost = await postService.update(post.id, {
        likes: likes.filter((like) => like !== user.id),
      })
      const returnedUser = await userService.update(user.id, {
        likedPosts: user.likedPosts.filter(
          (likedPost) => likedPost !== post.id
        ),
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
          <IconButton
            aria-label="like"
            style={{ padding: 8 }}
            onClick={unlikePost}
          >
            <ThumbUpAltIcon fontSize="small" />
          </IconButton>
        ) : (
          <IconButton
            aria-label="like"
            style={{ padding: 8 }}
            onClick={user ? likePost : toggleLoginForm}
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
