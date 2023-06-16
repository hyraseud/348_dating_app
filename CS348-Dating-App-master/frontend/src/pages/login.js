
import React, {useContext, useEffect, useState} from 'react';
import Axios from "axios";  
import { userContext } from '../contexts/userContext';
export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const {setUser, setUserId, setFirst_Name} = useContext(userContext);
    

    const checkLogin = () => {
      Axios.post("http://localhost:3001/api/login", {
        email:email, 
        password:password,
      })
      .then((response) => {
        console.log(response);
        
        console.log('successful');
        if (response.data.length == 0) {
            alert("Wrong email/password")
        }
        else {
            localStorage.setItem('user', email);
            localStorage.setItem('userid', response.data[0].id);
            localStorage.setItem('firstName', response.data[0].first_name);
            setUser(email);
            setFirst_Name(response.data[0].first_name);
            setUserId(response.data[0].id);
            alert("Successful login")
        }
       
      })
      .catch((error) => {
        if (error.response) {
          console.log('Error data : ', error.response.data);
          console.log('Error status : ', error.response.status);
          console.log('Error headers : ', error.response.headers);
      } else if (error.request) {
          console.log('Error request : ', error.request);
      } else {
          console.log('Error message : ', error.message);
      }
      console.log(error.config);
      })
    }
  
    return (
  
      <div className="App">
        <h1>Login</h1>
        <div className='form'>
          <label>Email: </label>
          <input
            type="text"
            name="email"
            onChange = {(e) => {
              setEmail(e.target.value)
            }}
          >
          </input>
  
          <label>Password: </label>
          <input
            type="text"
            name="password"
            onChange = {(e) => {
              setPassword(e.target.value)
            }}
          >
          </input>
  
          <button type="button" onClick={checkLogin}>Login</button>
           
        </div>
      </div>
    );
};
