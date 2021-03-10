import React, { useState, useEffect } from "react";
import { API } from "../api-service";
import { useCookies } from "react-cookie";

function Auth() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [result, setResult] = useState("");
  const [isLoginView, setIsLoginView] = useState(true);

  const [token, setToken] = useCookies(["mr-token"]);

  useEffect(() => {
    if (token["mr-token"]) {
      window.location.href = "/movies";
    }
  }, [token]);

  const loginClicked = () => {
    if(username===""){
      setResult("Username cannot be blank")
    }
    else if(password===""){
      setResult("Passwords cannot be blank")
    }
    else{
      API.loginUser({ username, password })
      .then((res) => { res.token ? setToken("mr-token", res.token) : setResult('Invalid Username or Password') })
    }
    
  };

  const registerClicked = () => {
    if(username===""){
      setResult("username cannot be blank")
    }
    else if(password2===""){
      setResult("Passwords cannot be blank")
    }
    else if(password===""){
      setResult("Passwords cannot be blank")
    }
    else if ( password === password2){
      console.log(password)
      console.log(username)

      API.registerUser({ username, password})
      .then(() => loginClicked())
      .catch((err) => console.log(err));
      
      
    }
    else{
      setResult("Passwords did't match")
    }
    
  };

  return (
    <div>
      {isLoginView ? (
        <div>
          <h1>Login</h1>
          <label htmlFor="username">Username*</label>
          <input
            type="text"
            name="username"
            placeholder="Username"
            required
            value={username}
            onChange={(evt) => setUsername(evt.target.value)}
          />
          <label htmlFor="password">Password*</label>
          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            value={password}
            onChange={(evt) => setPassword(evt.target.value)}
          />

          <button onClick={loginClicked}>Login</button>
          <p onClick={() => setIsLoginView(false)}>
            Don't have an account? Register
          </p>
          <p> {result} </p>
        </div>
      ) : (
        <div>
          <h1>Register</h1>

          <label htmlFor="username">Username*</label>
          <input
            type="text"
            name="username"
            placeholder="Username"
            required
            value={username}
            onChange={(evt) => setUsername(evt.target.value)}
          />
          <label htmlFor="password">Password*</label>
          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            value={password}
            onChange={(evt) => setPassword(evt.target.value)}
          />

          <label htmlFor="password2">Confirm Password*</label>
          <input
            type="password"
            name="password2"
            placeholder="Password Again"
            required
            value={password2}
            onChange={(evt) => setPassword2(evt.target.value)}
          />
          <button onClick={registerClicked}>Register</button>
          <p onClick={() => setIsLoginView(true)}>
            Do you have an account? Login
          </p>

          <p> {result} </p>
        </div>
      )}
    </div>
  );
}

export default Auth;
