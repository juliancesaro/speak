import React, { useState } from "react"
import "./PostForm.css"
import { NavLink } from "react-router-dom"
import postService from "../../services/posts"
//import UserList from "../userList/UserList"
import TextField from "@material-ui/core/TextField"
import Button from "@material-ui/core/Button"
import Message from "../message/Message"
import blank_user from "../../assets/blank_user.png"

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
            <div className="postform-content">
              <TextField
                required
                error={contentInputError !== ""}
                helperText={contentInputError}
                id="content"
                placeholder="What's on your mind?"
                multiline
                value={newContent}
                onChange={handleContentChange}
                style={{
                  width: "95%",
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
