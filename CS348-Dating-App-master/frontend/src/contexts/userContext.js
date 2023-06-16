import React from 'react';


const userContext = React.createContext({
    user: "",
    setUser: () => {}, 
    userId: -1,
    setUserId: () => {},
    firstName: "",
    setFirstName: () => {},
});

export { userContext };