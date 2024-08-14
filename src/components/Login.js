import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Login = (props) => {
  const [credentials, setCredentials] = useState({ email: "", password: "" })

  //useHistory hook is used to redirect used location
  let navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    // TODO:API call
    const response = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",

      },
      body: JSON.stringify({ email: credentials.email, password: credentials.password }),
    });
    const json = await response.json()
    console.log(json);

    //if auth token is retrive as sucess true
    if (json.success) {
      //save the auth token and redirect to home
      localStorage.setItem('token', json.authtoken);
      props.showAlert("Welcome to the iCloudNotebook", "success")
      navigate("/");

    } else {
      props.showAlert("wrong credentials. your email or password is invalid", "danger")
    }

  }
  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
  }
  return (
    <div className="mt-3">
      <h1><b>Login to continue with iCloudNoteBook</b></h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input type="email" className="form-control" value={credentials.email} id="email" name="email" aria-describedby="emailHelp" onChange={onChange} />
          <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" value={credentials.password} id="password" name="password" onChange={onChange} />
        </div>
        <button type="submit" className="btn btn-success" >Submit</button>
      </form>
    </div>
  )
}

export default Login
