import React, {useState} from 'react'
import '../styles/NavBar.css'
// import TestProfilePic from '../files/spider-malek-face.png'

import SettingsIcon from '@mui/icons-material/Settings';
import NotificationsIcon from '@mui/icons-material/Notifications';

function NavBar (props) {
    const [navParams, setnavParams] = useState(false);

    const logout = () => {
        window.localStorage.removeItem("token")
        window.location.reload()
      }
    
    return (
        <div className='navbar-container'>
            <div className='nav-bar'>
                <ul>
                    <li>MUSIC</li>
                    <li>PODCAST</li>
                    <li>LIVE</li>
                </ul>
                <div>
                <input placeholder='Type here to search' />
                </div>
                { props.userDataIsReady ?
                <ul>
                    <li><SettingsIcon onClick={ () => setnavParams(!navParams) } /></li>
                    
                    { navParams 
                    ? <ul style={{position: 'absolute', marginTop: '130px', marginLeft: '-30px', display:'block', textAlign: 'center', backgroundColor: 'black', borderRadius: '15px'}}>
                        <li onClick={logout}>Log Out</li><hr/>
                        <li><a style={{ textDecoration: 'none', color: 'white' }} href={props.spotifyExternalProfile} target="_blank" rel="noreferrer" >Spotify Profile</a></li>
                    </ul> 
                    : null }

                    <li><NotificationsIcon/></li>
                    {console.log(props.spotifyExternalProfile)}
                    <li>
                        <div className='profile-name-image-container' >
                            <div style={{ backgroundColor: '#25252d', borderRadius: '5px 0 0 5px' }} >
                                <div className='profile-name-image-container-image-container'>
                                    <img style={{ borderRadius: '100%' }} src={props.userImg} alt='img'/>
                                </div>
                            </div>
                            <div className='profile-name-image-container-name-container'>
                                <label>{props.userName}</label>
                            </div>
                        </div>
                    </li>
                </ul>
                :null
                }
            </div>
        </div>
    )
}

export default NavBar
