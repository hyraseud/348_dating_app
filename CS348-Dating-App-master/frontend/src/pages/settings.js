import React, {useState, useEffect, useContext} from 'react';
import Axios from "axios";
import {userContext} from '../contexts/userContext';
import "../styles/settings.css"
  
export default function Settings() {
    const {user, setUser} = useContext(userContext);
    const [genderPreference, setGenderPreference] = useState("");
    const [minAge, setMinAge] = useState(0);
    const [maxAge, setMaxAge] = useState(0);
    const [maxDistance, setMaxDistance] = useState(0);
    useEffect(() => {
        Axios.post("http://localhost:3001/api/getPreferences", {
            email:user, 
          })
          .then(response => {
            console.log(response);
            console.log('successful');
            if (response.data.length == 0) {
                alert("no data")
            }
            else {
                setGenderPreference(response.data[0][0].gender)
                setMinAge(response.data[0][0].min_age)
                setMaxAge(response.data[0][0].max_age)
                setMaxDistance(response.data[0][0].max_distance)
            }
           
          })
         }, [])
    const submitProfile = () => {
        Axios.post("http://localhost:3001/api/updatePreferences", {
        gender:genderPreference, 
        min_age:minAge, 
        max_age:maxAge, 
        max_distance:maxDistance,
        user_id:user,
        })
        .then((response) => {
            console.log(response);
            console.log('preferences updated');
            alert("Preferences updated successfully")
        })
        .catch((error) => {
            //console.log(error.response)
        })
    }
  return (
    <div class="settings-container">
    <h1 className='settings-header'>Preferences</h1>
    <label className='settings-item' style={{float:"left", paddingRight:"10px"}}>Gender preference: </label>
        <div className="radio" >
            <input
                type="radio"
                value="Male"
                checked={genderPreference === "Male"}
                onClick={() => {setGenderPreference('Male')}}
            />
        Male
        <input
                type="radio"
                value="Female"
                checked={genderPreference === "Female"}
                onClick={() => {setGenderPreference('Female')}}
            />
        Female
        <input
                type="radio"
                value="Both"
                checked={genderPreference === "Both"}
                onClick={() => {setGenderPreference('Both')}}
            />
        Both
        </div>
        <br></br>
        <label className='settings-item' style={{float:"left", paddingRight:"10px"}}>Min age: </label>
              <input 
                className='textInput'
                style={{float: "left"}}
                type="number"
                name="min_age"
                value = {minAge}
                onChange = {(e) => {
                  setMinAge(e.target.value)
                }}
                >
              </input>
        <label className='settings-item' style={{float:"left", paddingRight:"10px"}}>Max age: </label>
              <input 
                className='textInput'
                style={{float: "left"}}
                type="number"
                name="max_age"
                value = {maxAge}
                onChange = {(e) => {
                  setMaxAge(e.target.value)
                }}
                >
              </input>
        <br></br>
        <br></br>

        <label className='settings-item' style={{float:"left", paddingRight:"10px"}}>Max distance: </label>
            
              <input 
                className='textInput'
                style={{float: "left"}}
                type="number"
                name="max_distance"
                value = {maxDistance}
                onChange = {(e) => {
                  setMaxDistance(e.target.value)
                }}
                >
              </input>
              <br></br>
              <br></br>
              <br></br>
              <button className="submit-button" type="button" onClick={() => {submitProfile()}}>Submit</button>
      </div>
  );
};
  