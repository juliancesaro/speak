import React from "react"
import "./Message.css"

/**
 * Small error/success message
 */
const Message = ({ type, message }) => {
  return (
    <div className="message">
      {type === "error" ? (
        <div className="errorMessage">
          <p className="messageText">{message}</p>
        </div>
      ) : (
        <div className="successMessage">
          <p className="messageText">{message}</p>
        </div>
      )}
    </div>
  )
}

export default Message
