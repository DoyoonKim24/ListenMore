import { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faPause, faHeart as solidHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as linedHeart } from "@fortawesome/free-regular-svg-icons";
import { addLike, removeLike } from "./spotifyCalls";

export default function TrackCard({ track, addTrack, removeTrack, allSelected, allDeselected }) {
  const [play, setPlay] = useState(false);
  const [liked, setLiked] = useState(false);
  const [trackAdded, setTrackAdded] = useState(false);
  const audioRef = useRef(null);

  
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
       console.log(track)
      addTrack(track.uri);
      setTrackAdded(true);
    } else {
      removeTrack(track.uri);
      setTrackAdded(false);
    }
  }
  const handleLike = () => {
    liked ? removeLike(track.id) : addLike(track.id);
    setLiked(!liked);
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
        <img className='album-cover' src={track.album.images[0].url} alt={track.name}/>
        <div className="song-and-artist">
          <h6>{track.name}</h6>
          <p>{track.artists[0].name}</p>
        </div>
        <p className="album">{track.album.name}</p>
      </div>
      <div className="song-actions">
        <FontAwesomeIcon onClick={handleLike} className={"heart-button " + (liked ? "liked-button" : "")} icon={( liked ? solidHeart : linedHeart)} />
        <div className="button-width">
          <button className={trackAdded ? 'remove-button' : 'add-button'} onClick={handleTrack}> {trackAdded ? 'Remove' : 'Add'} </button>
        </div>
      </div>
    </div>
  );
}
