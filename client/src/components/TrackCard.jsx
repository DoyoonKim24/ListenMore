import {useState} from 'react';

export default function TrackCard( { song }) {
    const [hover, setHover] = useState(false);

    return (
        <div className="song-card" onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
        <div className="song-info">
          {song.preview_url && hover ? <audio controls src={song.preview_url}></audio> : <h5> 1 </h5>}
          <img src={song.album.images[0].url}></img>
          <div className="song-and-artist">
            <h6>{song.name}</h6>
            <p>{song.artists[0].name}</p>
          </div>
          <p>{song.album.name}</p>
        </div>
        <div className="song-actions">
          <button className="add-button">+</button>
          <button>Add to Playlist</button>
        </div>
      </div>
      );
}