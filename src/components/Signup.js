import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';


const Signup = (props) => {
  const [credentials, setCredentials] = useState({ name: "", email: "", password: "", cpassword: "" })

  //useHistory hook is used to redirect used location
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // TODO:API call
    const { name, email, password } = credentials;
    const response = await fetch("http://localhost:5000/api/auth/createuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",

      },
      body: JSON.stringify({ name, email, password }),
    });
    const json = await response.json()
    console.log(json);

    //if auth token is retrive as sucess true
    if (json.success) {
      //save the auth token and redirect to home
      localStorage.setItem('token', json.authtoken);
      navigate("/");
      props.showAlert("Account Created Successfully", "success")

    } else {
      props.showAlert("wrong credentials. your email or password is invalid", "danger")
    }

  }
  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
  }

  return (
    <div className="mt-3">
      <h1><b>Sign Up to Store your Note in iCloudNoteBook</b></h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input type="text" className="form-control" id="name" name="name" onChange={onChange} aria-describedby="emailHelp" />

        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input type="email" className="form-control" id="email" required name="email" onChange={onChange} aria-describedby="emailHelp" />
          <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" id="password" name="password" minLength={5} required onChange={onChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="cpassword" className="form-label"> Confirm Password</label>
          <input type="password" className="form-control" id="cpassword" name="cpassword" minLength={5} required onChange={onChange} />
        </div>
        <button type="submit" className="btn btn-success">Submit</button>
      </form>
    </div>
  )
}

export default Signup
