import axios from 'axios'
import React, { useEffect, useState } from 'react'
// import BarMenu from './components/BarMenu'
// import NavBar from './components/NavBar'
// import Slm from './components/Slm'
import MusicCard from './components/MusicCard'

import './styles/NavBar.css'
// import TestProfilePic from '../files/spider-malek-face.png'

import SettingsIcon from '@mui/icons-material/Settings';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SearchIcon from '@mui/icons-material/Search';

function App() {
  const CLIENT_ID = '0cea66c50fb04122aac2604bd4928969'
  const REDIRECT_URI = 'http://localhost:3000'
  const AUTH_ENDPOINT = 'http://accounts.spotify.com/authorize'
  const RESPONSE_TYPE = 'token'
  
  const [token, setToken] = useState("");
  const [user, setUser] = useState([])
  const [userImg, setUserImg] = useState('');
  const [userLoader, setUserLoader] = useState(false)

  const [searchKey, setSearchKey] = useState("")
  const [artists, setArtists] = useState([])
  const [artistsLoader, setArtistsLoader] = useState(false)
  const [artistsImg, setArtistsImg] = useState([])
  const [externalSpotifyProfile, setexternalSpotifyProfile] = useState('')
  
  const [userPlaylists, setUserPlaylists] = useState([])
  const [userPlaylistsLoader, setUserPlaylistsLoader] = useState(false)

  useEffect(() => {
    const hash = window.location.hash
    let token = window.localStorage.getItem("token")

    if (!token && hash) {
        token = hash.substring(1).split("&").find(elem => elem.startsWith("access_token")).split("=")[1]

        window.location.hash = ""
        window.localStorage.setItem("token", token)
    }
    setToken(token)
    axios.defaults.headers['Authorization'] = `Bearer ${token}`

  }, [])

  const logout = () => {
    setToken("")
    window.localStorage.removeItem("token")
    setUserLoader(false)
  }

  useEffect(() => {
    axios.get('https://api.spotify.com/v1/me')
    .then(res => {
      setUser( res.data )
      setUserImg( res.data.images[0].url )
      setexternalSpotifyProfile(res.data.external_urls.spotify)
      setUserLoader(true)
    })
  }, [])

  useEffect(() => {
    axios.get('https://api.spotify.com/v1/browse/categories', {
      params: {
    }
    })
    .then(res => {
      setUserPlaylists( res.data.categories )
      setUserPlaylistsLoader(true)
    })
  }, [])

  // spotify downloader api
  const downloadAPI = (q) => {
  q = q.replace( /\s+/g,"%20"  );
  console.log('q', q)
  const url = `https://spotify-scraper.p.rapidapi.com/v1/track/download/soundcloud?track=${q}`;
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '103a381560msh26aeb5740e841dbp12ff2ajsn7051723289d9',
      'X-RapidAPI-Host': 'spotify-scraper.p.rapidapi.com'
    },
  };
  fetch(url, options)
    .then(res => res.json())
    .then(json => console.log('download:', json))
    .catch(err => console.error('error:' + err));
  }

  const searchMusic = async (e) => {
    e.preventDefault()
    const {data} = await axios.get("https://api.spotify.com/v1/search?limit=50", {
        params: {
            q: searchKey,
            type: "track",
        }
    })

    console.log('Search Trucks:', data.tracks.items)
    setArtists(data.tracks.items)

    setArtistsImg(data.tracks.items[0].album.images)
    setArtistsLoader(true)
}

const renderMusic = () => {
  return artists.map(item => ( <MusicCard key={item.id} id={item.id} 
    img={item.album.images[0].url} title={item.name}
    trackAudioUrl={item.preview_url} ms={item.duration_ms}
    artists={item.artists} />
  ))
}

const [navParams, setnavParams] = useState(false);

  //
  return (
    <div>
      <div>

        {/* NavBar */}
        <div className='navbar-container'>
            <div className='nav-bar'>
                <ul>
                    <li>MUSIC</li>
                    <li>PODCAST</li>
                    <li>LIVE</li>
                </ul>
                <div>
                  <form onSubmit={searchMusic}>
                    <input onChange={e => setSearchKey(e.target.value)} placeholder='Type here to search' />
                    <button className='search-music-btn-navbar' type={"submit"}><SearchIcon/></button>
                  </form>
                </div>
                { userLoader ?
                <ul>
                    <li><SettingsIcon onClick={ () => setnavParams(!navParams) } /></li>
                    
                    { navParams 
                    ? <ul style={{position: 'absolute', marginTop: '130px', marginLeft: '-30px', display:'block', textAlign: 'center', backgroundColor: 'black', borderRadius: '15px'}}>
                        <li onClick={logout}>Log Out</li><hr/>
                        <li><a style={{ textDecoration: 'none', color: 'white' }} href={externalSpotifyProfile} target="_blank" rel="noreferrer" >Spotify Profile</a></li>
                    </ul> 
                    : null }

                    <li><NotificationsIcon/></li>
                    <li>
                        <div className='profile-name-image-container' >
                            <div style={{ backgroundColor: '#25252d', borderRadius: '5px 0 0 5px' }} >
                                <div className='profile-name-image-container-image-container'>
                                    <img style={{ borderRadius: '100%' }} src={userImg} alt='img'/>
                                </div>
                            </div>
                            <div className='profile-name-image-container-name-container'>
                                <label>{user.display_name}</label>
                            </div>
                        </div>
                    </li>
                </ul>
                :null
                }
            </div>
        </div>
        {/* /NavBar */}

        {/* <NavBar key={'nav'} userDataIsReady={userLoader}
         userName={user.display_name} userImg={userImg}
          spotifyExternalProfile={externalSpotifyProfile} /> */}
        <div style={{ display: 'flex', justifyContent: 'center', textAlign: 'center' }}>
          <div><h1>SPOTUNISIA</h1>
            {!token ?
                <a style={{ color: 'green' }} href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}>Login
                    to Spotify</a>
                : <div>Welcome {user.display_name}</div>}
            {token ?
                <div>
                  <br/><br/><br/>
                  <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center'}}>
                    { artistsLoader ? renderMusic() : null }
                  </div>
                </div>
                : null}
          </div>
          {/* {downloadAPI('11lFSEnkj3810ojPLj53RO')} */}
          <div>

          </div>
        </div>
      </div>
    </div>

  )
}

export default App
