import React from 'react'
import '../styles/MusicCard.css'
import FileDownloadIcon from '@mui/icons-material/FileDownload';


function MusicCard(props) {
    const newMs = new Date(props.ms).toISOString().slice(14, 19);

    const clickHandler = () => {
        
        // spotify downloader api
        const downloadAPI = (q) => {
        q = q.replace( /\s+/g,"%20"  );
        console.log('q:', q)
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

        downloadAPI(props.id)

    }

    return (
        <div>
            <div title={ props.title } style={{margin: '10px', padding: '10px', border: '2px solid #004d00', borderRadius: '10px', backgroundColor: 'green', width: '150px'}} key={props.id}>
                <img style={{ border: '2px solid  #004d00', borderRadius: '5px' }} height={"150px"} width={"150px"} src={props.img} alt=""/>
                <h5 style={{ margin: '5px 0px 10px 0px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', userSelect: 'none' }} >{props.title}</h5>
                { props.trackAudioUrl != null 
                   ? <audio src={props.trackAudioUrl} type="audio/ogg" controls/>
                    : null 
                }
                <p className='music-total-time'>{newMs}</p>
                <div className='download-btn-in-music-cards' onClick={clickHandler} ><FileDownloadIcon key={'dwnld'} style={{ width: '20px', height: '20px', color: 'black' }} /></div>
                {props.artists.map( item => <p key={item.id} className='actor-name-in-music-cards'>{item.name}</p> )}
                
            </div>
            
        </div>
    )
}

export default MusicCard
