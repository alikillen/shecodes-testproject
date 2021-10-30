import React, { useState } from 'react'
import { useHistory } from "react-router-dom";

const LoginForm = () => {
  const history = useHistory();
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  })

  const handleChange = (event) => {
    const { id, value } = event.target;
    setCredentials((prevCredentials) => { 
      return { 
        ...prevCredentials, 
        [id]: value,
      }
    })
  }

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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (credentials.username && credentials.password) {
      postData().then((response) => {
        window.localStorage.setItem("token", response.token);
        history.push('/')
      })
    }
  }

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
