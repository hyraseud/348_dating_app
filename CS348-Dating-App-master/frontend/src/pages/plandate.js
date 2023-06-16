import React, {useContext, useEffect, useState} from 'react';
import Axios from "axios";
import "../styles/plandate.css"
import {userContext} from '../contexts/userContext';
import {ConversationCard} from "../components/conversationCard";
import { useLocation } from 'react-router-dom'


export default function PlanDate(props) {
    /*Date*/
    const [date, setDateDay] = useState(null);
    const [userData, setUserData] = useState({});
    const [dateTime, setDateTime] = useState(null);
    const [dateLoc, setDateLoc] = useState(null);
    const location = useLocation()
    const user = useContext(userContext);
    const { user2 } = location.state

    const submitDate = () => {
        Axios.post("http://localhost:3001/api/addDate", {
            dateLoc: dateLoc,
            dateTime: dateTime,
            date: date,
            first_name: user.first_Name,
            date_name: userData.first_name,
            user1:user.userId,
            user2:user2
        }).catch((error) => {
            console.log(error.response)
        })
        alert("Date submitted!")
    }


    useEffect(() => {
        Axios.post('http://localhost:3001/api/userData', {
            userId: user2
        }).then((response) => {
            console.log(response.data[0][0])
            setUserData(response.data[0][0])
        })
    }, [])

    return (
        <div className='form'>
            <h1 className='signup-header'>Enter Date Details!</h1>
            <div className='name-header'>
                <h1 className='subheader'>Your Name: {user.first_Name}</h1>
            </div>

            <div className='name-header'>
                <h1 className='subheader'>Date's Name: {userData.first_name}</h1>
            </div>
            <div className='col-1, center-block'>
                <div className='col-3'>
                    <div className='new-row'>
                        <div className='inputContainer'>
                            <input
                                className='nameInput'
                                type="text"
                                name="date_loc"
                                placeholder="Your Date's Location"
                                value={dateLoc}
                                onChange={(e) => {
                                    setDateLoc(e.target.value)
                                }}
                            >
                            </input>
                        </div>
                    </div>
                    <div className='col-4, center-block'>
                        <div className='inputContainer'>

                            <input
                                className='nameInput'
                                type="text"
                                name="date_day"
                                placeholder="Your Date's Day"
                                value={date}
                                onChange={(e) => {
                                    setDateDay(e.target.value)
                                }}
                            >
                            </input>
                        </div>
                    </div>
                    <div className='col-5'>
                        <div className='inputContainer'>

                            <input
                                className='nameInput'
                                type="text"
                                name="date_day"
                                placeholder="Your Date's Time"
                                value={dateTime}
                                onChange={(e) => {
                                    setDateTime(e.target.value)
                                }}
                            >

                            </input>
                        </div>
                    </div>
                </div>
            </div>
                <div className='center-block'>
                <button type="button" onClick={submitDate}>Add Date</button>
                </div>
            </div>



    )

};
