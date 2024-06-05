import { useState, useEffect } from "react";
import VibePage from "./VibePage";
import TrackCard from "./TrackCard";
import PlaylistPage from "./PlaylistPage";
import { getRecommendations, makeAndAddPlaylist, addToCurrentPlaylist } from "./spotifyCalls";

export default function Tracks({ playlist, artistSeeds, genreSeeds }) {
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
  }, []);


  const handleGetRecs = () => {
    const targetDanceability = danceability / 100;
    const targetEnergy = energy / 100;
    const targetValence = valence / 100;
    getRecommendations(
      artistSeeds,
      genreSeeds,
      targetDanceability,
      targetEnergy,
      targetValence
    ).then((response) => {
      setTracks(response);
    });

    setSubmitted(!submitted);
  };

  const createPlaylist = () => {
    const playlistName = prompt("What would you like to name your playlist?");
    makeAndAddPlaylist(playlistName, chosenTracks).then(() => {
      alert(playlistName + " created!");
      setTimeout(() => {
        setDashRedirect(true);
      }, 1000);
    });
  };
  const addToPlaylist = () => {
    addToCurrentPlaylist(playlist[0], chosenTracks).then(() => {
      alert(`added to ${playlist[1]}!`);
      setTimeout(() => {
        setDashRedirect(true);
      }, 1000);
    });
  };

  const addTrack = (track) => {
    setChosenTracks([...chosenTracks, track]);
  };

  const removeTrack = (track) => {
    let arr = [...chosenTracks];
    const index = arr.indexOf(track);
    arr.splice(index, 1);
    setChosenTracks(arr);
  };

  const selectAll = async () => {
    setAllDeselected(false);
    setAllSelected(true);
    let arr = [];
    for (let i = 0; i < tracks.length; i++) {
      arr.push(tracks[i].uri);
    }
    setChosenTracks(arr);
    setTimeout(() => {
      setAllSelected(false);
    }, 1000);
  };

  const deselectAll = async () => {
    setAllDeselected(true);
    setAllSelected(false);
    setChosenTracks([]);
    setTimeout(() => {
      setAllDeselected(false);
    }, 1000);
  };

  if (dashRedirect) {
    return <PlaylistPage />;
  } else if (!submitted) {
    return (
      <VibePage
        valence={valence}
        danceability={danceability}
        energy={energy}
        setValence={setValence}
        setDanceability={setDanceability}
        setEnergy={setEnergy}
        handleGetRecs={handleGetRecs}
      />
    );
  } else
    return (
      <>
        {tracks.length > 0 ? (
          <div className="header-a-content">
            {chosenTracks.length > 0 ? (
              <div className='create-buttons'>
                <button
                className="purple-button"
                onClick={createPlaylist}
              >
                Create Playlist
              </button>
              <button
                className="purple-button white-button"
                onClick={addToPlaylist}
              >
                Add to Playlist
              </button>
              </div>
              
            ) : null}

            <h1>Choose Songs to Add</h1>
            <div>
              <div className="select-buttons">
                <button className="white-border-button" onClick={selectAll}>
                  Select All
                </button>
                <button className="grey-button" onClick={deselectAll}>
                  Deselect All
                </button>
              </div>

              {tracks.map((track) => (
                <TrackCard
                  key={track.id}
                  track={track}
                  addTrack={addTrack}
                  removeTrack={removeTrack}
                  allSelected={allSelected}
                  allDeselected={allDeselected}
                />
              ))}
            </div>
          </div>
        ) : null}
      </>
    );
}
