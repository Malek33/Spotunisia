import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../App.css'

function App() {
  const CLIENT_ID = '0cea66c50fb04122aac2604bd4928969'
  const REDIRECT_URI = 'http://localhost:3000'
  const AUTH_ENDPOINT = 'http://accounts.spotify.com/authorize'
  const RESPONSE_TYPE = 'token'
  
  const [token, setToken] = useState("");
  const [searchKey, setSearchKey] = useState("")
  const [artists, setArtists] = useState([])
  const [artistsImg, setArtistsImg] = useState([])

  useEffect(() => {
      const hash = window.location.hash
      let token = window.localStorage.getItem("token")

      if (!token && hash) {
          token = hash.substring(1).split("&").find(elem => elem.startsWith("access_token")).split("=")[1]

          window.location.hash = ""
          window.localStorage.setItem("token", token)
      }

      setToken(token)

  }, [])

  const logout = () => {
      setToken("")
      window.localStorage.removeItem("token")
  }

  const searchArtists = async (e) => {
      e.preventDefault()
      const {data} = await axios.get("https://api.spotify.com/v1/search", {
          headers: {
              Authorization: `Bearer ${token}`
          },
          params: {
              q: searchKey,
              type: "artist"
          }
      })

      setArtists(data.artists.items)
  }

  const searchMusic = async (e) => {
    e.preventDefault()
    const {data} = await axios.get("https://api.spotify.com/v1/search", {
        headers: {
            Authorization: `Bearer ${token}`
        },
        params: {
            q: searchKey,
            type: "track"
        }
    })

    console.log(data.tracks.items)
    setArtists(data.tracks.items)

    console.log(data.tracks.items[0].album.images)
    setArtistsImg(data.tracks.items[0].album.images)
}

  const renderArtists = () => {
      return artists.map(item => (
          <div key={item.id}>
              {<img width={"100%"} src={item.album.images[0].url} alt=""/>}
              {item.name}
          </div>
      ))
  }

  return (
    <div className="App">
      <h1>Spotify React</h1>
        {!token ?
            <a href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}>Login
                to Spotify</a>
            : <button onClick={logout}>Logout</button>}

        {token ?
            <form onSubmit={searchMusic}>
                <input type="text" onChange={e => setSearchKey(e.target.value)}/>
                <button type={"submit"}>Search</button>
            </form>   

            : null
        }

        {token ? renderArtists() : null}

    </div>
  );
}

export default App;
