import React, { useState } from "react"
import "./PostForm.css"
import { NavLink } from "react-router-dom"
import postService from "../../services/posts"
//import UserList from "../userList/UserList"
import TextField from "@material-ui/core/TextField"
import Button from "@material-ui/core/Button"
import Message from "../message/Message"
import blank_user from "../../assets/blank_user.png"
import { makeStyles } from "@material-ui/core/styles"

const useStyles = makeStyles(() => ({
  message: {
    "& > *": {
      backgroundColor: "#3b4353",
      color: "white",
      "&:hover": {
        backgroundColor: "#3b4353",
      },
      "&.MuiFormHelperText-root": {
        "&.Mui-focused": {
          backgroundColor: "#222831",
        },
        "&.Mui-error": {
          color: "#f44336",
        },
        backgroundColor: "#222831",
        color: "#f44336",
      },
      "&.MuiFormLabel-root": {
        "&.Mui-error": {
          color: "#f44336",
        },
        color: "#8899a6",
      },
      "&.Mui-focused": {
        backgroundColor: "#3b4353",
      },
      "&.MuiFilledInput-underline:before": {
        borderBottom: "2px solid #6f7b9b",
      },
      "&.MuiFilledInput-underline:after": {
        borderBottom: "2px solid #12adb3",
      },
    },
  },
}))

/**
 * Form handling post posting including user avatar.
 */
const PostForm = ({
  allUsers,
  user,
  setPosts,
  setUserPosts,
  posts,
  userPosts,
}) => {
  const classes = useStyles()
  // State for input fields.
  const [newContent, setNewContent] = useState("")

  // States for error handling.
  const [addItemSuccess, setAddItemSuccess] = useState(null)
  const [contentInputError, setContentInputError] = useState("")
  const [messageText, setMessageText] = useState("")

  // If no input error, request is sent to the server to post form input
  const addItem = async (event) => {
    event.preventDefault()
    try {
      if (!contentInputError) {
        const returnedItem = await postService.create({
          content: newContent,
          date: new Date().toISOString(),
        })
        setPosts(
          posts
            .concat(returnedItem)
            .sort((a, b) => new Date(b.date) - new Date(a.date))
        )
        window.localStorage.setItem(
          "loggedShareitUserPosts",
          JSON.stringify(userPosts.concat(returnedItem))
        )
        setNewContent("")
        setUserPosts(userPosts.concat(returnedItem))
        setMessageText("Posted!")
        setAddItemSuccess(true)
        setTimeout(() => {
          setAddItemSuccess(null)
        }, 1000)
      } else {
        throw new Error("Content too long!")
      }
    } catch (error) {
      console.log(error)
      setAddItemSuccess(false)
      if (error.message === "Content too long!") {
        setMessageText(error.message)
      } else {
        setMessageText("Please try again!")
      }
    }
  }

  const handleContentChange = (event) => {
    const input = String(event.target.value)
    setNewContent(input)
    if (input.length > 200) {
      setContentInputError("Content must be less than 200 characters!")
    } else {
      setContentInputError("")
    }
  }

  return (
    <div className="postform">
      {addItemSuccess ? (
        <Message type={"success"} message={messageText} />
      ) : addItemSuccess === false ? (
        <Message type={"error"} message={messageText} />
      ) : null}
      <form onSubmit={addItem}>
        <div className="postform-items">
          <div className="user-image">
            <NavLink
              exact
              className="userimglink"
              to={`/user/${user.username}`}
            >
              <img
                src={user.avatar ? user.avatar : blank_user}
                alt={`${user.username}-avatar`}
                width="50px"
              />
              <div className="overlay"></div>
            </NavLink>
          </div>
          <div className="postform-right">
            <div className="postform-right-content">
              <TextField
                className={classes.message}
                id="content"
                type="text"
                name="message"
                label="What's Happening?"
                error={contentInputError !== ""}
                value={newContent}
                onChange={handleContentChange}
                helperText={contentInputError}
                multiline
                variant="filled"
                style={{
                  width: "100%",
                  minWidth: 170,
                }}
              />

              {/* <UserList allUsers={allUsers} /> */}
            </div>
            <div className="actions">
              <Button variant="contained" type="submit">
                Post
              </Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}

export default PostForm
