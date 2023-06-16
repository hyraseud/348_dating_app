import Axios from "axios";
import {React, useContext, useEffect, useState} from "react";
import {useAxios} from "axios-hooks"
import { userContext } from "../contexts/userContext";
import {ConversationCard} from "../components/conversationCard";
import '../styles/conversations.css'

export default function Conversations() {
    const {user, userId, first_Name} = useContext(userContext);
    const [conversations, setConversations] = useState([]);
    const [name, setName] = useState("");
    const [ethnicity, setEthnicity] = useState("African");
    const [minAge, setMinAge] = useState(0);
    const [maxAge, setMaxAge] = useState(100);
    
    const search = () => {
        Axios.post("http://localhost:3001/api/filterName", {
            userid: userId,
            name: name
        }).catch((err) => console.log(err)
        ).then((response) =>{
            console.log(response)
            setConversations(response.data[0])
      })
    }

    const filterEthnicity = () => {
        Axios.post("http://localhost:3001/api/filterEthnicity", {
            userid: userId,
            ethnicity: ethnicity
        }).catch((err) => console.log(err)
        ).then((response) =>{
            console.log(response)
            setConversations(response.data[0])
      })
    }

    const filterAge = () => {
        Axios.post("http://localhost:3001/api/filterAge", {
            userid: userId,
            min_age:minAge,
            max_age:maxAge
        }).catch((err) => console.log(err)
        ).then((response) =>{
            console.log(response)
            setConversations(response.data[0])
      })

    }

    const clear = () => {
        Axios.post("http://localhost:3001/api/conversations", {
            userId: userId,
        }).catch((err) => console.log(err)
        ).then((response) =>{
          setConversations(response.data[0])
      })
    }

    useEffect(() => {
        Axios.post("http://localhost:3001/api/conversations", {
            userId: userId,
        }).catch((err) => console.log(err)
        ).then((response) =>{
          setConversations(response.data[0])
      })
      }, [userId])
      
    useEffect(() => {
        console.log(conversations);
    }, [conversations])

    return ( <div className='centered'>
        <h1>Generate match report:</h1>
        <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="first_name"
        >
        </input>
        <button onClick={search}>Search</button>
        <br/>
        <select name="ethnicity" value={ethnicity} onChange={(e)=>setEthnicity(e.target.value)}>
              <option value="African">African</option>
              <option value="White">White</option>
              <option value="East Asian">East Asian</option>
              <option value="South Asian">South Asian</option>
              <option value="Hispanic">Hispanic</option>
              <option value="Middle Eastern">Middle Eastern</option>
            </select>
        <button onClick={filterEthnicity}>Filter</button>
        <br/>
        <label style={{marginLeft:"0px",paddingLeft:"0px"}}>Min Age</label>
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
        <button onClick={filterAge}>Filter</button><br/>
        <button onClick={clear}>Clear</button>
        <h1>{first_Name}'s Matches</h1>
       
        
        {conversations? conversations.map((conversation) => {
            return (conversation.user1 == userId? 
                
            <ConversationCard key={conversation.user2} userid={conversation.user2} conversationid={conversation.id}/>:
            
            <ConversationCard key={conversation.user1} userid={conversation.user1} conversationid={conversation.id}/>)
        }) : <p>You have no matches with the given filters</p> }
    </div>)
}