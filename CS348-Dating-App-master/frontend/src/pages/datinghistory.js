import React, {useState, useEffect, useContext} from 'react';
import Axios from "axios";
import useAxios from 'axios-hooks'
import {userContext} from '../contexts/userContext';
import "../styles/datinghistory.css"


export default function DatingHistory() {
    const [upDates, setUpDates] = useState([]);
    const [pastDates, setPastDates] = useState([]);
    const user = useContext(userContext)

    useEffect(() => {
        Axios.post("http://localhost:3001/api/findUpDates", {
            userId: user.userId,
        }).catch((err) => console.log(err)
        ).then((response) => {
            console.log(response.data[0])
            setUpDates(response.data[0])
        })
    }, [user.userId])


    useEffect(() => {
        Axios.post("http://localhost:3001/api/findPastDates", {
            userId: user.userId,
        }).catch((err) => console.log(err)
        ).then((response) => {
            console.log(response.data[0])
            setPastDates(response.data[0])
        })
    }, [user.userId])



    return (

        <div className='centered'>
            <h1>{user.first_Name}'s Dating History</h1>

            <h2>{user.first_Name}'s Upcoming Dates</h2>
            {upDates.map((date) => {
                return (
                    <div className="round2">
                        <h3>Participants: {date.first_name} and {date.date_name}</h3>
                        <p>Location: {date.date_location}</p>
                        <p>Date and Time: {date.date_day} at {date.date_time}</p>
                    </div>

                )

            })}

            <h2>{user.first_Name}'s Past Dates</h2>
            {pastDates.map((date) => {
                return (
                    <div className="round2">
                        <h3>Participants: {date.first_name} and {date.date_name}</h3>
                        <p>Location: {date.date_location}</p>
                        <p>Date and Time: {date.date_day} at {date.date_time}</p>
                    </div>

                )

            })}
        </div>
    );
};

