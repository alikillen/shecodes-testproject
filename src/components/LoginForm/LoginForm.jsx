import React, { useState } from 'react'
import { useHistory } from "react-router-dom";

const LoginForm = () => {
  const history = useHistory();
  // set our credentials in state as empty strings
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  })

  // handleChange is called when we enter or change inputs in the form
  // when our form inputs change, set them in state
  const handleChange = (event) => {
    const { id, value } = event.target;
    setCredentials((prevCredentials) => { 
      return { 
        ...prevCredentials, 
        [id]: value,
      }
    })
  }

  // postData is called in handlesubmit if username and password exist in our state
  // its asynchronous - to set the variable 'response', it will wait for post req to our API to complete
  // returns the response in json format
  const postData = async () => {
    console.log("Im logging in")
    const response = await fetch(`${process.env.REACT_APP_API_URL}api-token-auth/`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    })

    return response.json()
  }

  // handleSubmit is called when we click the submit button
  // if credentials exist in our state, call postdata, and then set the token from the API response in our localstorage
  // console log the response and the token
  const handleSubmit = (e) => {
    e.preventDefault();
    if (credentials.username && credentials.password) {
      postData().then((response) => {
        window.localStorage.setItem("token", response.token);
        console.log(response, response.token)
        history.push('/')
      })
    }
  }

  // returning the visual parts of our loginform component
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          placeholder="Enter username"
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          placeholder="Password"
          onChange={handleChange}
        />
      </div>
      <button type="submit">
        Login
      </button>
    </form>
  )
} 

export default LoginForm
