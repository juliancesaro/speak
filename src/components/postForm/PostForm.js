import React, { useState } from "react"
import "./PostForm.css"
import postService from "../../services/posts"
import TextField from "@material-ui/core/TextField"
import Button from "@material-ui/core/Button"
import Message from "../message/Message"

const PostForm = ({ user, setPosts, setUserPosts, posts, userPosts }) => {
  const [newContent, setNewContent] = useState("")
  const [addItemSuccess, setAddItemSuccess] = useState(null)
  const [contentInputError, setContentInputError] = useState("")
  const [messageText, setMessageText] = useState("")

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
          "loggedShareitUserItems",
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
          <div className="post-user-image">
            <img
              src={user.avatar}
              alt={`${user.username}-avatar`}
              width="50px"
            />
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
