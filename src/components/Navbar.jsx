import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { ReactDOM } from 'react';
import 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';

import { FaSearch } from "react-icons/fa";
import Card from 'react-bootstrap/Card';
const CLIENT_ID = "8c544741f29c463b9b613092d5f7fc49";
const CLIENT_SECRET = "26ee121de9fc47f19bd140083f6c5685";
export default function Navbar() {
    const [searchInput , setSearchInput] = useState("");
    const [accessToken , setAccessToken] = useState("");
    const [albums , setAlbum] = useState( [] );
    
    function changeee(event){
         const val = event.target.value;
         setSearchInput(val);
    }
    useEffect(() =>{
        var authParameters ={
            method : 'POST',
            headers:{
                'Content-Type' :  'application/x-www-form-urlencoded'

            },
            body: 'grant_type=client_credentials&client_id=' + CLIENT_ID + '&client_secret='+ CLIENT_SECRET 
        }
        
      //API
      fetch('https://accounts.spotify.com/api/token', authParameters)
      .then(result => result.json())
      .then(data => setAccessToken(data.access_token))
    },[])
    //Searching
    async function search(){
        console.log("Search for " + searchInput);
    
    //for artist
    var searchParameters ={ 
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + accessToken
        }
    }
    try{
    var artistID = await fetch('https://api.spotify.com/v1/search?q=' + searchInput+ '&type=artist' ,searchParameters )
   
    if (!artistID.ok) {
        throw new Error('Request failed with status ' + artistID.status);
    } 
    var artistIDData = await artistID.json();
        var artistID2 = artistIDData.artists.items[0].id;

        console.log("ARTIST ID is" + artistID2);

//get requests
var returnedAlbums = await fetch('https://api.spotify.com/v1/search?q=remaster%2520track%3ADoxy%2520artist%3AMiles%2520Davis&type=album%2Cartist&market=IN&limit=50' ,searchParameters)
if (!returnedAlbums.ok) {
    throw new Error('Request failed with status ' + returnedAlbums.status);
}

var albumsData = await returnedAlbums.json();
console.log(albumsData);
setAlbum(albumsData.items);
} catch (error) {
    console.error(error);
}
}

  return (
    <div>
    <Container >
    <div className="search__bar">
      <FaSearch />
      <input type="text" placeholder="Artists, songs, or podcasts" 
      onKeyDown={event =>{
        if(event.key === "Enter"){
           search();
        }
      }}
      onChange={changeee}
      />
    </div>
    </Container>
    <Container>
    

      { albums.map((albums,i) =>{
                console.log(albums);
              return(
                <Card style={{backgroundColor: 'black', width: '12rem' , color :'white'  }}>
                <Card.Img variant="top" src={'#'} />
                <Card.Body>
                  <Card.Title>{albums.name}</Card.Title>
                  <Card.Text>
                    Some quick e
                  </Card.Text>
                  
                </Card.Body>
              </Card>
              )
      }
            )
        }
        
        </Container>
    </div>
  )
}
const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2rem;
  height: 15vh;
  position: sticky;
  top: 0;
  transition: 0.3s ease-in-out;
  background-color:  rgba(0,0,0,0.7);
  .search__bar {
    background-color: white;
    width: 30%;
    padding: 0.4rem 1rem;
    border-radius: 2rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    input {
      border: none;
      height: 2rem;
      width: 100%;
      &:focus {
        outline: none;
      }
    }
  }
  .avatar {
    background-color: black;
    padding: 0.3rem 0.4rem;
    padding-right: 1rem;
    border-radius: 2rem;
    display: flex;
    justify-content: center;
    align-items: center;
    a {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 0.5rem;
      text-decoration: none;
      color: white;
      font-weight: bold;
      svg {
        font-size: 1.3rem;
        background-color: #282828;
        padding: 0.2rem;
        border-radius: 1rem;
        color: #c7c5c5;
      }
    }
  }
`;