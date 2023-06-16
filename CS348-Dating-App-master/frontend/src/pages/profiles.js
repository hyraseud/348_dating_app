import React, {useState, useEffect} from 'react';
import Axios from "axios";
import useAxios from 'axios-hooks'
  
export default function Profiles() {
  const [profileList, setProfileList] = useState([]);
  const [{data, loading, error}, refetch] = useAxios(
    'http://localhost:3001/api/get'
  )
  // useEffect(() => {
  //   Axios.get('http://localhost:3001/api/get').then((response) =>{
  //     console.log(response);
  //     setProfileList(response.data);
      
  // })
  // }, [])
  if (loading) {
    return <p>loading...</p>
  }
  if (error) {
    return <p>Error!</p>
  }
  return (
    <div>
    {data.map((profile) => {
        return <h1>{profile.first_name} {profile.last_name}</h1>
      })}
      <button onClick={refetch}>refetch</button>

    </div>  
  );
};
  
