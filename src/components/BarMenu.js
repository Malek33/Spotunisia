import React, { useState } from 'react'
import '../styles/BarMenu.css'

// import EqualizerIcon from '@mui/icons-material/Equalizer';

import ExploreIcon from '@mui/icons-material/Explore';
import VolumeDownIcon from '@mui/icons-material/VolumeDown';
import AlbumIcon from '@mui/icons-material/Album';
import MicIcon from '@mui/icons-material/Mic';
import RadioIcon from '@mui/icons-material/Radio';

function BarMenu() {
    const [navPos, setNavPos] = useState('explore');
    return (
        <aside>
            <div className='bar-menu-container'>
                <div className='menu-container'>
                    <ul className='menu' >
                        <li onClick={() => setNavPos('explore')} className={navPos === 'explore' ? 'menu-active' : 'li'} >
                            <ExploreIcon style={{width: '2vw', height: '2vh'}} /><span><strong>Explore</strong></span>
                        </li>
                        <li onClick={() => setNavPos('genres')} className={navPos === 'genres' ? 'menu-active' : 'li'}>
                            <VolumeDownIcon style={{width: '2vw', height: '2vh'}}/><span><strong>Genres</strong></span>
                        </li>
                        <li onClick={() => setNavPos('albums')} className={navPos === 'albums' ? 'menu-active' : 'li'}>
                            <AlbumIcon style={{width: '2vw', height: '2vh'}}/><span><strong>Albums</strong></span>
                        </li>
                        <li onClick={() => setNavPos('artists')} className={navPos === 'artists' ? 'menu-active' : 'li'}>
                            <MicIcon style={{width: '2vw', height: '2vh'}}/><span><strong>Artists</strong></span>
                        </li>
                        <li onClick={() => setNavPos('radio')} className={navPos === 'radio' ? 'menu-active' : 'li'}>
                            <RadioIcon style={{width: '2vw', height: '2vh'}}/><span><strong>Radio</strong></span>
                        </li>
                    </ul>
                </div>
            </div>
        </aside>
    )
}

export default BarMenu
