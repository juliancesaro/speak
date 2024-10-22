import React, { useState } from "react"
import { withStyles } from "@material-ui/core/styles"
import "./RegisterForm.css"
import userService from "../../services/users"
import IconButton from "@material-ui/core/IconButton"
import Button from "@material-ui/core/Button"
import TextField from "@material-ui/core/TextField"
import OutlinedInput from "@material-ui/core/OutlinedInput"
import FormControl from "@material-ui/core/FormControl"
import InputLabel from "@material-ui/core/InputLabel"
import InputAdornment from "@material-ui/core/InputAdornment"
import Visibility from "@material-ui/icons/Visibility"
import VisibilityOff from "@material-ui/icons/VisibilityOff"
import Message from "../message/Message"

/**
 * Custom styling for MaterialUI TextField on success.
 */
const SuccessTextField = withStyles({
  root: {
    "& label": {
      color: "green",
    },
    "& label.Mui-focused": {
      color: "green",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "green",
      },
      "&.Mui-focused fieldset": {
        borderColor: "green",
      },
      "&:hover fieldset": {
        borderColor: "green",
      },
    },
  },
})(TextField)

/**
 * Custom styling for MaterialUI FormControl on success (password fields).
 */
const SuccessFormControl = withStyles({
  root: {
    "& label": {
      color: "green",
    },
    "& label.Mui-focused": {
      color: "green",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "green",
      },
      "&.Mui-focused fieldset": {
        borderColor: "green",
      },
      "&:hover fieldset": {
        borderColor: "green",
      },
    },
  },
})(FormControl)

/**
 * Form for registering new users with password validation.
 */
const RegisterForm = ({ toggleRegisterForm, toggleRegisterLogin }) => {
  //States for input fields.
  const [registerUsername, setRegisterUsername] = useState("")
  const [registerPassword, setRegisterPassword] = useState("")
  const [registerAvatar, setRegisterAvatar] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  const [showRegisterPassword, setShowRegisterPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  // States for error handling.
  const [userInputError, setUserInputError] = useState("")
  const [passwordInputError, setPasswordInputError] = useState(false)
  const [registerSuccess, setRegisterSuccess] = useState(null)
  const [messageText, setMessageText] = useState("")

  // States for password validation.
  const [passwordLenCorrect, setPasswordLenCorrect] = useState(null)
  const [passwordCorrect, setPasswordCorrect] = useState(null)

  // Makes request to the server to register user.
  const registerUser = async (event) => {
    event.preventDefault()
    try {
      if (registerPassword === confirmPassword && passwordCorrect) {
        await userService.create({
          username: registerUsername,
          password: registerPassword,
          avatar: registerAvatar,
        })
        setRegisterSuccess(true)
        setMessageText("Account created!")
        setTimeout(() => {
          toggleRegisterLogin()
        }, 1000)
      } else if (!passwordCorrect) {
        throw new Error("Bad password!")
      } else {
        throw new Error("Passwords don't match!")
      }
    } catch (error) {
      setRegisterSuccess(false)
      if (error.message === "Passwords don't match!") {
        setMessageText(error.message)
      } else if (error.message === "Bad password!") {
        setMessageText(error.message)
      } else if (
        error.response.data.error.includes("is longer than the maximum")
      ) {
        setMessageText("Username too long!")
      } else if (error.response.data.error.includes("to be unique")) {
        setMessageText("Username taken!")
      }
    }
  }

  const handleClickShowRegisterPassword = () => {
    setShowRegisterPassword(!showRegisterPassword)
  }

  const handleClickShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword)
  }

  const handleMouseDownPassword = (event) => {
    event.preventDefault()
  }

  const handleRegisterUsernameChange = (event) => {
    const input = String(event.target.value)
    setRegisterUsername(input)
    if (input.length > 10) {
      setUserInputError("Must be less than 10 characters!")
    } else if (!input.match(/^[a-zA-Z0-9]+$/)) {
      setUserInputError("Only letters and numbers!")
    } else {
      setUserInputError("")
    }
  }

  // Function for checking the input of password and setting states accordingly.
  const handleRegisterPasswordChange = (event) => {
    const input = String(event.target.value)
    setRegisterPassword(input)
    if (input === confirmPassword) {
      setPasswordInputError(false)
    } else {
      setPasswordInputError(true)
    }
    if (input.length >= 8) {
      setPasswordCorrect(true)
      setPasswordLenCorrect(true)
    } else if (input.length < 8) {
      setPasswordCorrect(false)
      setPasswordLenCorrect(false)
    }
  }

  const handleConfirmPasswordChange = (event) => {
    const input = String(event.target.value)
    setConfirmPassword(input)
    if (registerPassword === input) {
      setPasswordInputError(false)
    } else {
      setPasswordInputError(true)
    }
  }

  const handleRegisterAvatarChange = (event) => {
    const input = String(event.target.value)
    setRegisterAvatar(input)
  }

  const clickCancel = () => {
    toggleRegisterForm()
  }

  return (
    <div>
      <h2>Sign Up</h2>
      {registerSuccess ? (
        <Message type={"success"} message={messageText} />
      ) : registerSuccess === false ? (
        <Message type={"error"} message={messageText} />
      ) : null}
      <form onSubmit={registerUser}>
        {registerSuccess ? (
          <div>
            <SuccessTextField
              required
              id="username-register"
              label="Username"
              value={registerUsername}
              onChange={handleRegisterUsernameChange}
              variant="outlined"
              style={{
                marginBottom: 20,
                width: 278,
              }}
            />
            <SuccessFormControl
              required
              variant="outlined"
              style={{ width: 278 }}
            >
              <InputLabel htmlFor="outlined-adornment-password">
                Password
              </InputLabel>
              <OutlinedInput
                id="standard-adornment-password-register"
                type={showRegisterPassword ? "text" : "password"}
                value={registerPassword}
                onChange={handleRegisterPasswordChange}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowRegisterPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {showRegisterPassword ? (
                        <Visibility />
                      ) : (
                        <VisibilityOff />
                      )}
                    </IconButton>
                  </InputAdornment>
                }
                labelWidth={90}
                style={{
                  marginBottom: 20,
                }}
              />
            </SuccessFormControl>
            <SuccessFormControl variant="outlined" style={{ width: 278 }}>
              <InputLabel
                required
                htmlFor="outlined-adornment-confirm-password"
              >
                Confirm Password
              </InputLabel>
              <OutlinedInput
                id="standard-adornment-password-confirm"
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowConfirmPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
                labelWidth={150}
                style={{
                  marginBottom: 20,
                }}
              />
            </SuccessFormControl>
            <SuccessTextField
              id="avatar-register"
              label="Avatar link"
              value={registerAvatar}
              onChange={handleRegisterAvatarChange}
              variant="outlined"
              style={{
                marginBottom: 20,
                width: 278,
              }}
            />
          </div>
        ) : (
          <div>
            <TextField
              required
              error={userInputError !== ""}
              helperText={userInputError}
              id="username-register"
              label="Username"
              value={registerUsername}
              onChange={handleRegisterUsernameChange}
              variant="outlined"
              style={{
                marginBottom: 20,
                width: 278,
              }}
            />
            <FormControl required variant="outlined" style={{ width: 278 }}>
              <InputLabel htmlFor="outlined-adornment-password">
                Password
              </InputLabel>
              <OutlinedInput
                id="standard-adornment-password-register"
                type={showRegisterPassword ? "text" : "password"}
                value={registerPassword}
                onChange={handleRegisterPasswordChange}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowRegisterPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {showRegisterPassword ? (
                        <Visibility />
                      ) : (
                        <VisibilityOff />
                      )}
                    </IconButton>
                  </InputAdornment>
                }
                labelWidth={90}
              />
            </FormControl>
            <span className="validation">
              <p>Should be</p>
              {passwordLenCorrect ? (
                <p className="true">at least 8 characters</p>
              ) : passwordLenCorrect === false ? (
                <p className="false">at least 8 characters</p>
              ) : (
                <p>at least 8 characters</p>
              )}
              <p>.</p>
            </span>
            <FormControl
              error={passwordInputError}
              variant="outlined"
              style={{
                marginTop: 10,
                marginBottom: 20,
                width: 278,
              }}
            >
              <InputLabel
                required
                htmlFor="outlined-adornment-confirm-password"
              >
                Confirm Password
              </InputLabel>
              <OutlinedInput
                id="standard-adornment-password-confirm"
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowConfirmPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
                labelWidth={150}
              />
            </FormControl>
            <TextField
              id="avatar-register"
              label="Avatar link"
              value={registerAvatar}
              onChange={handleRegisterAvatarChange}
              variant="outlined"
              style={{
                marginBottom: 20,
                width: 278,
              }}
            />
          </div>
        )}
        <div className="actions">
          <Button
            variant="contained"
            type="submit"
            style={{
              marginBottom: 15,
            }}
          >
            Register
          </Button>
          <Button variant="contained" type="button" onClick={clickCancel}>
            Cancel
          </Button>
          <div className="registerText">
            <p>Have an account?</p>
            <p className="registerLink" onClick={toggleRegisterLogin}>
              Sign in
            </p>
          </div>
        </div>
      </form>
    </div>
  )
}

export default RegisterForm
