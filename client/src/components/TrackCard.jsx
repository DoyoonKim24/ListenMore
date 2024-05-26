import { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faPause } from "@fortawesome/free-solid-svg-icons";

export default function TrackCard({ track }) {
  const [play, setPlay] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    audioRef.current = new Audio(track.preview_url);
  }, [track.preview_url]);

  const handlePlay = () => {
    play ? audioRef.current.pause() : audioRef.current.play();
    setPlay(!play);
  };

  return (
    <div className="song-card">
      <div className="song-info">
        {track.preview_url ? (
          <div onClick={handlePlay} className="play-button">
            {" "}
            {play ? (
              <FontAwesomeIcon icon={faPause} />
            ) : (
              <FontAwesomeIcon icon={faPlay} />
            )}
          </div>
        ) : null}
        <img src={track.album.images[0].url}></img>
        <div className="song-and-artist">
          <h6>{track.name}</h6>
          <p>{track.artists[0].name}</p>
        </div>
        <p>{track.album.name}</p>
      </div>
      <div className="song-actions">
        <button className="add-button">+</button>
        <button>Add to Playlist</button>
      </div>
    </div>
  );
}
