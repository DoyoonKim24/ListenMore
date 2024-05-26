import { useState } from "react";
import axios from "axios";
import TrackCard from "./TrackCard";

export default function Tracks({ trackshref }) {
  const [tracks, setTracks] = useState([]);
  const [valence, setValence] = useState(50);
  const [danceability, setDanceability] = useState(50);
  const [energy, setEnergy] = useState(50);
  const [submitted, setSubmitted] = useState(false);
  const [chosenTracks, setChosenTracks] = useState([]);
  const [allSelected, setAllSelected] = useState(false);
  const [allDeselected, setAllDeselected] = useState(false);

  const accessToken = localStorage.getItem("accessToken");

  const handleMakePlaylist = () => {
    const targetDanceability = danceability / 100;
    const targetEnergy = energy / 100;
    const targetValence = valence / 100;
    axios
      .get(
        `https://api.spotify.com/v1/recommendations?limit=50&seed_artists=4V8LLVI7PbaPR0K2TGSxFF&seed_genres=rap&target_danceability=${targetDanceability}&target_energy=${targetEnergy}&target_valence=${targetValence}`,
        { headers: { Authorization: `Bearer ${accessToken}` } }
      )
      .then((response) => {
        setTracks(response.data.tracks);
        console.log(response.data.tracks[0]);
      })
      .catch((error) => {
        console.log("Tracks error ", error);
      });
    setSubmitted(!submitted);
  };

  const addTrack = async (track) => {
    await setChosenTracks([...chosenTracks, track]);
  }

  const removeTrack = async (track) => {
    let arr = await chosenTracks;
    const index = await arr.indexOf(track);
    arr.splice(index, 1);
    setChosenTracks(arr)
  }
  
  const selectAll = async () => {
    setAllDeselected(false);
    setAllSelected(true);
    let arr = [];
    for (let i = 0; i < tracks.length; i++) {
      arr.push(tracks[i].name);
    }
    setChosenTracks(arr);
  }

  const deselectAll = async () => {
    setAllDeselected(true);
    setAllSelected(false);
    setChosenTracks([]);
  }

  const showTracks = () => {
    console.log(chosenTracks);
  }

  if (!submitted) {
    return (
      <div>
        <div className="sliders">
          <h3>Valence</h3>
          <div>{valence}</div>
          <input type="range" min="1" max="100" value={valence} onChange={(e) => setValence(e.target.value)}></input>
        </div>
        <div className="sliders">
          <h3>Danceability</h3>
          <div>{danceability}</div>
          <input type="range" min="1" max="100" value={danceability} onChange={(e) => setDanceability(e.target.value)}></input>
        </div>
        <div className="sliders">
          <h3>Energy</h3>
          <div>{energy}</div>
          <input type="range" min="1" max="100" value={energy} onChange={(e) => setEnergy(e.target.value)}></input>
        </div>
        <button onClick={handleMakePlaylist}> Make Playlist </button>
      </div>
    );
  }
  return (
    <>
      {tracks.length > 0 ? (
        <div className="tracks-page">
          <button className='create-button' onClick={showTracks}> Create Playlist </button>
          <h1>Choose Songs to Add</h1>
          <div className='select-buttons'>
          <button onClick={selectAll}>Select All</button>
          <button onClick={deselectAll}>Deselect All</button>
          </div>
          {tracks.map((track) => (
            <TrackCard key = {track.id} track={track} addTrack={addTrack} removeTrack={removeTrack} allSelected={allSelected} allDeselected={allDeselected}/>
          ))}
        </div>
      ) : null}
    </>
  );
}
