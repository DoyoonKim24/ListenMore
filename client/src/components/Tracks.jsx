import { useState, useEffect } from "react";
import axios from "axios";
import TrackCard from "./TrackCard";
import Dashboard from "./Dashboard";

export default function Tracks({ seeds }) {
  const [tracks, setTracks] = useState([]);
  const [valence, setValence] = useState(50);
  const [danceability, setDanceability] = useState(50);
  const [energy, setEnergy] = useState(50);
  const [submitted, setSubmitted] = useState(false);
  const [chosenTracks, setChosenTracks] = useState([]);
  const [allSelected, setAllSelected] = useState(false);
  const [allDeselected, setAllDeselected] = useState(false);
  const [dashRedirect, setDashRedirect] = useState(false);

  useEffect(() => {
    setDashRedirect(false);
  }, [])

  const accessToken = localStorage.getItem("accessToken");
  const userID = localStorage.getItem("userID");

  const handleMakePlaylist = () => {
    const targetDanceability = danceability / 100;
    const targetEnergy = energy / 100;
    const targetValence = valence / 100;
    axios
      .get(
        `https://api.spotify.com/v1/recommendations?limit=50&seed_artists=${seeds}&target_danceability=${targetDanceability}&target_energy=${targetEnergy}&target_valence=${targetValence}`,
        { headers: { Authorization: `Bearer ${accessToken}` } }
      )
      .then((response) => {
        setTracks(response.data.tracks);
      })
      .catch((error) => {
        console.log("Tracks error ", error);
      });
    setSubmitted(!submitted);
  };

  const addTrack = (track) => {
    setChosenTracks([...chosenTracks, track]);
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
      arr.push(tracks[i].uri);
    }
    setChosenTracks(arr);
    setTimeout(() =>{
      setAllSelected(false)
    }, 1000);
  }

  const deselectAll = async () => {
    setAllDeselected(true);
    setAllSelected(false);
    setChosenTracks([]);
    setTimeout(() =>{
      setAllDeselected(false)
    }, 1000);
  }

  const createPlaylist = () => {
    const playlistName = prompt("What would you like to name your playlist?");
    axios
     .post(
        `https://api.spotify.com/v1/users/${userID}/playlists`,
        { name: playlistName },
        { headers: { Authorization: `Bearer ${accessToken}` } }
      )
     .then((response) => {
        axios
         .post(
            `https://api.spotify.com/v1/playlists/${response.data.id}/tracks`,
            { uris: chosenTracks },
            { headers: { Authorization: `Bearer ${accessToken}` } }
          )
         .then(() => {
            alert(playlistName + " created!");
            setTimeout(() => { setDashRedirect(true) }, 1000);
          })
         .catch((error) => {
            console.log(error);
          });
      })
     .catch((error) => {
        console.log(error);
      });
  }
  if (dashRedirect) {
    return <Dashboard />
  }
  else if (!submitted) {
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
  else return (
    <>
      {tracks.length > 0 ? (
        <div className="tracks-page">
          <button className='create-button' onClick={createPlaylist}> Create Playlist </button>
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
