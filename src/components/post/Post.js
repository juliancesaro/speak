import React, { useState, useEffect } from "react"
import "./Post.css"
import { NavLink } from "react-router-dom"
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

  // State for like animation
  const [likeClicked, setLikeClicked] = useState(false)

  // Ensures likedByUser state updates immediately after userLikes state
  // changes (login, logout).
  useEffect(() => {
    setLikedByUser(userLikes.some((userLike) => userLike === post.id))
  }, [userLikes, likedByUser, post.id])

  // Calculate post time
  var unit = "s"
  const currDate = new Date()
  const postDate = new Date(post.date)
  var timeDiff = currDate - postDate
  timeDiff = Math.round(timeDiff / 1000)
  if (timeDiff >= 2592000) {
    timeDiff = `${postDate.toLocaleString("default", {
      month: "short",
    })} ${postDate.getDate().toString()}`
    unit = ""
  } else if (timeDiff >= 604800) {
    timeDiff = Math.round(timeDiff / 604800)
    unit = "w"
  } else if (timeDiff >= 86400) {
    timeDiff = Math.round(timeDiff / 86400)
    unit = "d"
  } else if (timeDiff >= 3600) {
    timeDiff = Math.round(timeDiff / 3600)
    unit = "h"
  } else if (timeDiff >= 60) {
    timeDiff = Math.round(timeDiff / 60)
    unit = "m"
  }

  // Request is sent to add user to post 'likes' field and post to
  // user 'likedPosts' field.
  const likePost = async () => {
    try {
      setLikeClicked(true)
      // Setting states before requests to hide the server response delay
      setUserLikes(user.likedPosts.concat(post.id))
      const newPost = { ...post, likes: likes.concat(user.id) }
      const updatedPosts = posts
        .filter((oldPost) => oldPost.id !== post.id)
        .concat(newPost)
      setPosts(updatedPosts.sort((a, b) => new Date(b.date) - new Date(a.date)))
      // Server requests.
      await postService.update(post.id, {
        likes: likes.concat(user.id),
      })
      const returnedUser = await userService.update(user.id, {
        likedPosts: user.likedPosts.concat(post.id),
      })
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
      setUser(returnedUser)
      setLikedByUser(true)
    } catch (error) {
      console.log(error)
    }
  }

  const unlikePost = async () => {
    try {
      setLikeClicked(false)
      // Setting states before requests to hide the server response delay.
      setUserLikes(user.likedPosts.filter((likedPost) => likedPost !== post.id))
      const newPost = {
        ...post,
        likes: likes.filter((like) => like !== user.id),
      }
      const updatedPosts = posts
        .filter((oldPost) => oldPost.id !== post.id)
        .concat(newPost)
      setPosts(updatedPosts.sort((a, b) => new Date(b.date) - new Date(a.date)))
      // Server requests.
      await postService.update(post.id, {
        likes: likes.filter((like) => like !== user.id),
      })
      const returnedUser = await userService.update(user.id, {
        likedPosts: user.likedPosts.filter(
          (likedPost) => likedPost !== post.id
        ),
      })
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
      setUser(returnedUser)
      setLikedByUser(true)
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className="post">
      <div className="post-left">
        <div className="post-user-image">
          <NavLink exact className="userimglink" to={`/user/${username}`}>
            <img src={avatar} alt={`${username}-avatar`} width="50px" />
            <div className="overlay"></div>
          </NavLink>
        </div>
        <div className="post-text">
          <NavLink
            exact
            className="userlink"
            to={`/user/${post.user.username}`}
          >
            <p className="post-user">{username}</p>
          </NavLink>
          <p className="post-content">{content}</p>
        </div>
      </div>
      <div className="post-right">
        <div className="post-likes">
          <IconButton
            className={likeClicked ? "like-button" : ""}
            aria-label="like"
            style={{ padding: 8 }}
            onClick={
              user ? (likedByUser ? unlikePost : likePost) : toggleLoginForm
            }
          >
            {likedByUser ? (
              <ThumbUpAltIcon fontSize="small" />
            ) : (
              <ThumbUpAltOutlinedIcon fontSize="small" />
            )}
          </IconButton>
          <p className="likes-num">{likes.length}</p>
        </div>
        <p className="post-date">
          {timeDiff}
          {unit}
        </p>
      </div>
    </div>
  )
}

export default Post
