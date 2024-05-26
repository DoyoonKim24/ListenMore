import { useState, useEffect } from "react";
import axios from "axios";
import TrackCard from "./TrackCard";

export default function Tracks({ trackshref }) {
  const [tracks, setTracks] = useState([]);
  const [valence, setValence] = useState(50);
  const [danceability, setDanceability] = useState(50);
  const [energy, setEnergy] = useState(50);
  const [submitted, setSubmitted] = useState(false);
  const [hover, setHover] = useState(false);

  const accessToken = localStorage.getItem("accessToken");


  const handleClick = () => {
    const targetDanceability = danceability / 100;
    const targetEnergy = energy / 100;
    const targetValence = valence / 100;
    axios
      .get(`https://api.spotify.com/v1/recommendations?limit=50&seed_artists=4V8LLVI7PbaPR0K2TGSxFF&seed_genres=rap&target_danceability=${targetDanceability}&target_energy=${targetEnergy}&target_valence=${targetValence}`,
       { headers: { Authorization: `Bearer ${accessToken}` } })
      .then((response) => {
        setTracks(response.data.tracks);
        console.log(response);
      })
      .catch((error) => {
        console.log("Tracks error ", error);
      });
    setSubmitted(!submitted);
  };

  if (!submitted) {
    return (
      <div>
        <div className="sliders">
          <h3>Valence</h3>
          <div>{valence}</div>
          <input
            type="range"
            min="1"
            max="100"
            value={valence}
            onChange={(e) => setValence(e.target.value)}
          ></input>
        </div>
        <div className="sliders">
          <h3>Danceability</h3>
          <div>{danceability}</div>
          <input
            type="range"
            min="1"
            max="100"
            value={danceability}
            onChange={(e) => setDanceability(e.target.value)}
          ></input>
        </div>
        <div className="sliders">
          <h3>Energy</h3>
          <div>{energy}</div>
          <input
            type="range"
            min="1"
            max="100"
            value={energy}
            onChange={(e) => setEnergy(e.target.value)}
          ></input>
        </div>
        <button onClick={handleClick}> Make Playlist </button>
      </div>
    );
  }
  return (
    <div>
        {tracks.length > 0 ? (
          <div className="tracks-container">
            {tracks.map((track) => (
              <TrackCard track={track} />
            ))}
          </div>
        ) : null}
      </div>
  );
}
