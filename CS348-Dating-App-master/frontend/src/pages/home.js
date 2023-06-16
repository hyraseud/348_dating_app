import React, { useContext } from 'react';
import '../styles/home.css'
import { userContext } from '../contexts/userContext';

export default function Home() {
    const {user} = useContext(userContext);
    return (
        <html>
            <header class="main-header">
                <h1 class="big-header"><b>Welcome to</b></h1>
                <h1 class="big-header"><b>BINDER</b></h1>
                <h6 class="subheader">Like tinder, but WAY more chill!</h6>
                {user? null : <a href='/sign-up'>
                    <button class="signup-button"><b>Sign Up</b></button>
                </a>}
            </header>
        </html>
    )
};