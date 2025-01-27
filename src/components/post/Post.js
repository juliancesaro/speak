import React, { useState, useEffect } from 'react'
import './Post.css'
import { NavLink } from 'react-router-dom'
import postService from '../../services/posts'
import userService from '../../services/users'
import ThumbUpAltOutlinedIcon from '@material-ui/icons/ThumbUpAltOutlined'
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt'
import DeleteIcon from '@material-ui/icons/Delete'
import blank_user from '../../assets/blank_user.png'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(() => ({
  icon: {
    '& > *': {
      color: '#8899a6',
    },
  },
}))

/**
 * Post component consisting of user information, post content,
 * and a 'like' button.
 */
const Post = ({
  allPosts,
  allUsers,
  user,
  setUser,
  userLikes,
  setUserLikes,
  setPosts,
  post,
  toggleLoginForm,
}) => {
  const classes = useStyles()

  const { content, likes } = post
  const { username, avatar } = post.user

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
  var unit = 's'
  const currDate = new Date()
  const postDate = new Date(post.date)
  var timeDiff = currDate - postDate
  timeDiff = Math.round(timeDiff / 1000)
  if (timeDiff >= 2592000) {
    timeDiff = `${postDate.toLocaleString('default', {
      month: 'short',
    })} ${postDate.getDate().toString()}`
    unit = ''
  } else if (timeDiff >= 604800) {
    timeDiff = Math.round(timeDiff / 604800)
    unit = 'w'
  } else if (timeDiff >= 86400) {
    timeDiff = Math.round(timeDiff / 86400)
    unit = 'd'
  } else if (timeDiff >= 3600) {
    timeDiff = Math.round(timeDiff / 3600)
    unit = 'h'
  } else if (timeDiff >= 60) {
    timeDiff = Math.round(timeDiff / 60)
    unit = 'm'
  }

  // Request is sent to server to add curr user to post 'likes' field and
  // curr post to user 'likedPosts' field.
  const likePost = async () => {
    try {
      setLikeClicked(true)
      // Setting states before requests to hide the server response delay
      setUserLikes(userLikes.concat(post.id))
      const newPost = { ...post, likes: likes.concat(user.id) }
      const updatedPosts = allPosts
        .filter((oldPost) => oldPost.id !== post.id)
        .concat(newPost)
      setPosts(updatedPosts.sort((a, b) => new Date(b.date) - new Date(a.date)))
      // Server requests.
      await postService.update(post.id, {
        likes: likes.concat(user.id),
      })
      const returnedUser = await userService.updateLikedPosts(user.id, {
        likedPosts: user.likedPosts.concat(post.id),
      })
      window.localStorage.setItem(
        'loggedSpeakUser',
        JSON.stringify(returnedUser)
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
      setUserLikes(userLikes.filter((likedPost) => likedPost !== post.id))
      const newPost = {
        ...post,
        likes: likes.filter((like) => like !== user.id),
      }
      const updatedPosts = allPosts
        .filter((oldPost) => oldPost.id !== post.id)
        .concat(newPost)
      setPosts(updatedPosts.sort((a, b) => new Date(b.date) - new Date(a.date)))
      // Server requests.
      await postService.update(post.id, {
        likes: likes.filter((like) => like !== user.id),
      })
      const returnedUser = await userService.updateLikedPosts(user.id, {
        likedPosts: user.likedPosts.filter(
          (likedPost) => likedPost !== post.id
        ),
      })
      window.localStorage.setItem(
        'loggedSpeakUser',
        JSON.stringify(returnedUser)
      )
      setUser(returnedUser)
      setLikedByUser(false)
    } catch (error) {
      console.log(error)
    }
  }

  const deletePost = async () => {
    try {
      if (window.confirm(`Delete post?`)) {
        setPosts(allPosts.filter((allPost) => allPost.id !== post.id))
        await postService.deletePost(post.id)
      }
    } catch (error) {
      console.log(error)
    }
  }

  // Split the content where there is a mentioned user.
  var newContent = content.split(/([@#][\w]+)/)

  return (
    <div className="post">
      <div className="post-left">
        <div className="post-user-image">
          <NavLink exact className="userimglink" to={`/user/${username}`}>
            <img
              src={avatar ? avatar : blank_user}
              alt={`${username}-avatar`}
              width="50px"
            />
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
          {
            // Map each item in newContent to its own span, if the mentioned
            // user exists, create a link to their page
            newContent.map((span) => {
              if (span[0] === '@') {
                const taggedUser = span.split('@')[1]
                if (
                  allUsers.some((allUser) => allUser.username === taggedUser)
                ) {
                  return (
                    <NavLink
                      key={span}
                      exact
                      className="content-link"
                      to={`/user/${taggedUser}`}
                    >
                      <span>{span}</span>
                    </NavLink>
                  )
                } else {
                  return <span key={span}>{span}</span>
                }
              } else if (span[0] === '#') {
                const hashtag = span.split('#')[1]
                return (
                  <NavLink
                    key={span}
                    exact
                    className="content-link"
                    to={`/hashtag/${hashtag}`}
                  >
                    <span>{span}</span>
                  </NavLink>
                )
              } else if (span === '') {
                return null
              } else {
                return <span key={span}>{span}</span>
              }
            })
          }
        </div>
      </div>
      <div className="post-right">
        {user && post.user.id === user.id ? (
          <div className="post-delete button">
            <DeleteIcon
              className={classes.icon}
              fontSize="small"
              onClick={() => {
                deletePost()
              }}
            />
          </div>
        ) : (
          <div className="post-likes">
            <div
              className={likeClicked ? 'like-button button' : 'button'}
              style={{ paddingTop: 8, paddingRight: 6 }}
              onClick={
                user ? (likedByUser ? unlikePost : likePost) : toggleLoginForm
              }
            >
              {likedByUser ? (
                <ThumbUpAltIcon
                  className={classes.icon}
                  fontSize="small"
                  fill="white"
                />
              ) : (
                <ThumbUpAltOutlinedIcon
                  className={classes.icon}
                  fontSize="small"
                />
              )}
            </div>
            <p className="likes-num">{likes.length}</p>
          </div>
        )}
        <p className="post-date">
          {timeDiff}
          {unit}
        </p>
      </div>
    </div>
  )
}

export default Post
