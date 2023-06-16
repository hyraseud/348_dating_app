import {Card, CardContent} from '@material-ui/core';
import Axios from 'axios';
import useAxios from 'axios-hooks'
import {React, useContext, useEffect, useState} from 'react';
import Typography from '@mui/material/Typography';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {userContext} from '../contexts/userContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router, Link} from 'react-router-dom';

export const ConversationCard = (props) => {
    // const [{data, loading, error}, refetch] = useAxios(
    //     {
    //         url: 'http://localhost:3001/api/getMessages',
    //         method: 'POST'
    //     }, 
    //     { 
    //         conversationId:props.conversationid 
    //     }
    //     )
    const [userData, setUserData] = useState({});
    const [avgAge, setAvgAge] = useState(0);
    const [ethnicity, setEthnicity] = useState("");

    const [show, setShow] = useState(false);
    const [showInfo, setShowInfo] = useState(false);
    const [messages, setMessages] = useState([]);
    const [sendValue, setSendValue] = useState("");
    const {userId} = useContext(userContext);
    const {user, setUser, setUserId, setFirst_Name, first_Name} = useContext(userContext);


    //stats
    const [conversations, setConversations] = useState([]);

    const handleClose = () => setShow(false);
    const handleCloseInfo = () => setShowInfo(false);
    const refresh = () => {
        Axios.post('http://localhost:3001/api/getMessages', {
            conversationId: props.conversationid
        }).catch((err) => {
            console.log(err)
        }).then((response) => {
            console.log(response.data[0])
            setMessages(response.data[0]);
        })
    }

    const handleSend = () => {
        Axios.post('http://localhost:3001/api/sendMessage', {
            conversationId: props.conversationid,
            userid: userId,
            message: sendValue,
        }).catch((err) => {
            console.log(err)
        }).then((response) => {
            alert("message sent! refresh to update messages.")
            setSendValue("")
        })
    }

    useEffect(() => {
        Axios.post('http://localhost:3001/api/userData', {
            userId: props.userid
        }).then((response) => {
            console.log(response.data[0][0])
            setUserData(response.data[0][0])
        })
    }, [])

    useEffect(() => {
        Axios.post('http://localhost:3001/api/getMessages', {
            conversationId: props.conversationid
        }).catch((err) => {
            console.log(err)
        }).then((response) => {
            console.log(response.data[0])
            setMessages(response.data[0]);
        })
    }, [])


      function generateInfo () {
            Axios.post("http://localhost:3001/api/getEthnicity", {
                userId: userData.user_id,
            }).catch((err) => console.log(err)
            ).then((response) =>{
                setEthnicity(response.data[0][0].ethnicity);
                
            
            })
            Axios.post("http://localhost:3001/api/getMatchData", {
                userId: userData.user_id,
            }).catch((err) => console.log(err)
            ).then((response) =>{
                console.log(response.data)
                setConversations(response.data[0])
                
                
            })
            Axios.post("http://localhost:3001/api/getAvgAge", {
                userId: userData.user_id,
            }).catch((err) => console.log(err)
            ).then((response) =>{
                console.log(response.data[0][0].avg)
                setAvgAge(response.data[0][0].avg)
                setShowInfo(true);
            })
      }
      

    return (
        <div>
            <link
                rel="stylesheet"
                href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css"
                integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65"
                crossorigin="anonymous"
            />
            
            <Card className='card' style={{maxWidth: "500px", justifyContent: "center"}} 
                  variant="outlined">
                <CardContent onClick={() => setShow(true)}> 
                    <Typography variant="h5" component="div">
                        {userData.first_name} {userData.last_name}
                    </Typography>
                </CardContent>
                <Button onClick={() => generateInfo()} style={{backgroundColor: "#F25757",width: "25%"}} size='small'>Info</Button>
            </Card>
            

            <Modal onHide={handleClose} show={show}>
                <Modal.Header closeButton>
                    {userData.first_name} {userData.last_name}
                </Modal.Header>
                <Modal.Body>
                    <div style={{minHeight: "500px", maxHeight: "500px", overflow: 'hidden', overflowY: 'scroll'}} className='imessage'>
                        {messages.map((message) => {
                            if (message.sent_by == userId) {
                                return <p className='from-me'>{message.message}</p>
                            } else {
                                return <p className='from-them'>{message.message}</p>
                            }
                        })}
                    </div>
                </Modal.Body>
                <Modal.Footer>

                    <input style={{width: "100%"}} placeholder='Send a Message'
                           value={sendValue}
                           onChange={(e) => setSendValue(e.target.value)}
                    >

                    </input>


                    <Link to="../plandate" state={{ user2: props.userid }}>
                        <Button renderAs="button">
                            <span>Request a Date</span>
                        </Button>
                    </Link>
                    <Button onClick={refresh} variant='primary'>Refresh</Button>
                    <Button onClick={handleSend} variant='primary'>Send</Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showInfo} onHide={handleCloseInfo}>
                <Modal.Header closeButton>
                    {userData.first_name} {userData.last_name}
                </Modal.Header>
                <Modal.Body>
                    <Typography variant="h5">{userData.first_name}'s Matches</Typography>
                    <div style={{minHeight: "300px", maxHeight: "300px", overflow: 'hidden', overflowY: 'scroll'}}>
                        {conversations.map((match) => {
                            return match.user1 == userData.user_id? <p>{match.first_name} {match.last_name}</p> : <p>{match.first_name} {match.last_name}</p>
                        })}
                    </div>
                    <div>
                        
                        <h1>{userData.first_name}'s Stats</h1>
                        <Typography variant="h5">Average age of matches:</Typography>
                        <p>{avgAge}</p>
                        <Typography variant="h5">Mostly matches with:</Typography>
                        <p>{ethnicity}</p>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    )
}
