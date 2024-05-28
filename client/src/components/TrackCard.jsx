import { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faPause, faHeart as solidHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as linedHeart } from "@fortawesome/free-regular-svg-icons";
import axios from "axios";

export default function TrackCard({ track, addTrack, removeTrack, allSelected, allDeselected }) {
  const [play, setPlay] = useState(false);
  const [liked, setLiked] = useState(false);
  const [trackAdded, setTrackAdded] = useState(false);
  const audioRef = useRef(null);

  const accessToken = localStorage.getItem("accessToken");
  
  useEffect(() => {
    if (allSelected) {
      setTrackAdded(true);
    } else if (allDeselected) {
      setTrackAdded(false);
    }
  }, [allSelected, allDeselected]);

  useEffect(() => {
    audioRef.current = new Audio(track.preview_url);
  }, [track.preview_url]);

  const handlePlay = () => {
    if (audioRef.current == null) return;
    play ? audioRef.current.pause() : audioRef.current.play();
    setPlay(!play);
  };

  const handleTrack = () => {
    if (!trackAdded) {
      addTrack(track.uri);
      setTrackAdded(true);
    } else {
      removeTrack(track.uri);
      setTrackAdded(false);
    }
  }
  const handleLike = () => {
    axios.get(`https://api.spotify.com/v1/me/tracks?ids=${track.uri}`,
    { headers: { Authorization: `Bearer ${accessToken}` }})
    .then(() => {
      setLiked(true);
    }).catch((err) => {
      console.log("Liking song error: ", err)
    })
  }

  return (
    <div className="song-card">
      <div className="song-info">
        <div onClick={handlePlay} className="play-button">
          {track.preview_url ? (
            play ? (
              <FontAwesomeIcon icon={faPause} />
            ) : (
              <FontAwesomeIcon icon={faPlay} />
            )
          ) : null}
        </div>
        <img src={track.album.images[0].url}></img>
        <div className="song-and-artist">
          <h6>{track.name}</h6>
          <p>{track.artists[0].name}</p>
        </div>
        <p className="album">{track.album.name}</p>
      </div>
      <div className="song-actions">
        <FontAwesomeIcon onClick={handleLike} className={"heart-button " + ( liked ? "liked-button" : null)} icon={( liked ? solidHeart : linedHeart)} />
        <button className={trackAdded ? 'grey-button' : 'add-button'} onClick={handleTrack}> {trackAdded ? 'Remove' : 'Add'} </button>
      </div>
    </div>
  );
}
