import React, {useEffect, useState, useContext} from 'react';
import Axios from "axios";  
import "../styles/signup.css"
import {userContext} from '../contexts/userContext';

export default function Signup() {
    /*User States*/
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    /*Profile States */
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [gender, setGender] = useState("");
    const [age, setAge] = useState(0);
    const [about, setAbout] = useState("");
    const [ethnicity, setEthnicity] = useState("African");

    /*preference states */
    const [genderPreference, setGenderPreference] = useState("");
    const [minAge, setMinAge] = useState(0);
    const [maxAge, setMaxAge] = useState(0);
    const [maxDistance, setMaxDistance] = useState(0);

    const [profileList, setProfileList] = useState([]);
    const [open, setOpen] = useState("");
    const [pageNumber, setPageNumber] = useState(1);

    /*context handler*/
    const {setUser, setUserId, setFirst_Name} = useContext(userContext);

    const handleOpen = (e) => {
      setOpen(!open);
    };

    useEffect(() => {
      Axios.get('http://localhost:3001/api/get').then((response) =>{
        console.log(response);
        setProfileList(response.data);
        
    })
    }, [])

    const submitProfile = () => {
      Axios.post("http://localhost:3001/api/signUp", {
        email:email,
        password:password,
      }).catch((error) => {
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
      }).then((response) => {

        Axios.post("http://localhost:3001/api/addUser", {
          first_name:firstName,
          last_name:lastName,
          gender:gender,
          age:age,
          ethnicity:ethnicity,
          about:about,
          user_id:response.data.insertId
        }).catch((error) => {
          console.log(error.response)
        })
        Axios.post("http://localhost:3001/api/createPreferences", {
          gender:genderPreference, 
          min_age:minAge, 
          max_age:maxAge, 
          max_distance:maxDistance,
          user_id:response.data.insertId,
        }).catch((error) => {
            console.log(error.response)
        }).then((response) => {
            setUser(email);
            setUserId(response.data.insertId);
            setFirst_Name(firstName);
            localStorage.setItem('userid', response.data.insertId);
            localStorage.setItem('user', email);
            localStorage.setItem('firstName', firstName);
        })
        alert("Profile submitted")
        console.log(response)
      })
    }
    function loadPage() {
      if (pageNumber === 1) {
        return UserRegistration();
      } else if (pageNumber === 2) {
        return profileDetails();
      } else if (pageNumber === 3) {
        return setPreferences();
      }
    }
    const UserRegistration = () => {

      return (<><head>
        <link rel="stylesheet" href="signup.css"></link>
      </head>
      <div className='form'>
        
        <h1 className='signup-header'>Sign up</h1>
        <input
          className='longTextInput'
          placeholder='example@gmail.com'
          type="text"
          name="email"
          value={email}
          onChange = {(e) => {
            setEmail(e.target.value)
          }}
        >
        </input>
        <input
          className='longTextInput'
          placeholder='password'
          value={password}
          type="text"
          name="password"
          onChange = {(e) => {
            setPassword(e.target.value)
          }}
        >
        </input>
        <button className="submit-button" type="button" onClick={() => {setPageNumber(pageNumber+1)}}>Next</button>
    </div></>)
    }
   const profileDetails = () => {
      return (
        <div className='form'>

          <h1 className='signup-header'>Tell us about yourself</h1>
          <div className='row'>
            <div className='column'>
              <input 
                className='longTextInput'
                style={{float: "left"}}
                type="text"
                name="first_name"
                placeholder='First Name'
                value = {firstName}
                onChange = {(e) => {
                  setFirstName(e.target.value)
                }}
                >
              </input>
            </div>

          <div className='column'>
            
              
              <input
                className='longTextInput'
                type="text"
                name="last_name"
                placeholder='Last Name'
                value = {lastName}
                onChange = {(e) => {
                  setLastName(e.target.value)
                }}
              >
              </input>
            
          </div>
          </div>
          
          <div class="container">
          <label style={{float:"left", paddingTop:"10px", marginLeft: "20px"}}>What gender do you identify as?</label>
          <div>
          <ul>
          <li>
            <input 
            style={{paddingLeft: "300px"}}
            type="radio" 
            id="f-option" 
            name="selector"
            value={"Male"}
            checked={gender === "Male"}
            onClick={() => {setGender('Male')}}
            />
            <label for="f-option">Male</label>
            
            <div class="check"></div>
          </li>
          
          <li>
            <input type="radio"
            id="s-option" 
            name="selector"
            value={"Female"}
            checked={gender === "Female"}
            onClick={() => {setGender('Female')}}
            />
            <label for="s-option">Female</label>
            
            <div class="check"><div class="inside"></div></div>
          </li>

          <li>
            <input type="radio"
            id="n-option" 
            name="selector"
            value={"Nonbinary"}
            checked={gender === "Nonbinary"}
            onClick={() => {setGender("Nonbinary")}}
            />
            <label for="n-option">Nonbinary</label>
            
            <div class="check"><div class="inside"></div></div>
          </li>
          </ul>
          </div>
        </div>
            <label>Ethnicity</label>
            <select name="ethnicity" value={ethnicity} onChange={(e)=>setEthnicity(e.target.value)}>
              <option value="African">African</option>
              <option value="White">White</option>
              <option value="East Asian">East Asian</option>
              <option value="South Asian">South Asian</option>
              <option value="Hispanic">Hispanic</option>
              <option value="Middle Eastern">Middle Eastern</option>
            </select>
            <label>Age</label>
              <input 
                className='textInput'
                style={{float: "left"}}
                type="number"
                name="age"
                placeholder={0}
                value = {age}
                onChange = {(e) => {
                  setAge(e.target.value)
                }}
                >
            </input>
          <div className='inputContainer'>
            <label>About: <br/></label>
            <textarea value={about} rows="4" cols="50" onChange={(e) => setAbout(e.target.value)}/>
          </div>
          <div className='button-bar'>
          <button className="submit-button" type="button" onClick={() => {setPageNumber(pageNumber-1)}}>Go Back</button>
          <button className="submit-button" type="button" onClick={() => {setPageNumber(pageNumber+1)}}>Next</button>
          </div>
         </div>
        

      )
   }

   const setPreferences = () => {
    return <div className='form'>
      <h1 className='signup-header'>What are you looking for?</h1>
      <div class="container">
      <label style={{float:"left", paddingLeft:"0px", paddingTop:"10px"}}>What gender are you interested in?</label>
      <ul>
      <li>
        <input 
        type="radio" 
        id="f-option" 
        name="selector"
        value={"Male"}
        checked={genderPreference === "Male"}
        onClick={() => {setGenderPreference('Male')}}
        />
        <label for="f-option">Male</label>
        
        <div class="check"></div>
      </li>
      
      <li>
        <input type="radio"
        id="s-option" 
        name="selector"
        value={"Female"}
        checked={genderPreference === "Female"}
        onClick={() => {setGenderPreference('Female')}}
        />
        <label for="s-option">Female</label>
        
        <div class="check"><div class="inside"></div></div>
      </li>

      <li>
        <input type="radio"
        id="n-option" 
        name="selector"
        value={"Nonbinary"}
        checked={genderPreference === "Both"}
        onClick={() => {setGenderPreference("Both")}}
        />
        <label for="n-option">Both</label>
        
        <div class="check"><div class="inside"></div></div>
      </li>
      </ul>
      <div className='row'>
            <div className='column'>
              <div className='inputContainer'>
              <label>Min Age</label>
              <input 
                className='textInput'
                type="number"
                name="min_age"
                placeholder={0}
                value = {minAge}
                onChange = {(e) => {
                  setMinAge(e.target.value)
                }}
                >
              </input>
              </div>
            </div>

          <div className='column'>
            <div className='inputContainer'>
              <label>Max Age</label>
              <input
                className='textInput'
                type="number"
                name="max_age"
                placeholder= {0}
                value = {maxAge}
                onChange = {(e) => {
                  setMaxAge(e.target.value)
                }}
              >
              </input>
            </div>
          </div>
          </div>
          <div className='inputContainer'>
            <label>Max Distance</label>
            <input
                  className='textInput'
                  type="number"
                  name="max_distance"
                  placeholder= {0}
                  value = {maxDistance}
                  onChange = {(e) => {
                    setMaxDistance(e.target.value)
                  }}
                >
            </input>
          </div>
    </div>
      <div className='button-bar'>
      <button className="submit-button" type="button" onClick={() => {setPageNumber(pageNumber-1)}}>Go Back</button>
      <button className="submit-button" type="button" onClick={() => {submitProfile()}}>Submit</button>
      </div>
    </div>
    
   }
    return (
      <div className="formBox">
          {loadPage()}  
      </div>
    );
};
