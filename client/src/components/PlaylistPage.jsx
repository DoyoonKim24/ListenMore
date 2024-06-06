import { useState, useEffect } from "react";
import { getPlaylists, getUser } from "./spotifyCalls";
import PlaylistCard from "./PlaylistCard";
import Tracks from "./Tracks";


export default function PlaylistPage() {
  const [playlists, setPlaylists] = useState([]);
  const [artistSeeds, setArtistSeeds] = useState([]);
  const [genreSeeds, setGenreSeeds] = useState([]);
  const [chosen, setChosen] = useState(false);

  window.history.pushState({}, null, "/")

  useEffect(() => {
    getUser()
}, [])

  const userID = localStorage.getItem("userID");


  useEffect(() => {
    if (userID) {
      getPlaylists(userID).then((playlists) => setPlaylists(playlists));
    }
  }, [userID]);

  if (!chosen) {
    return (
        playlists.length > 0 ? (
          <div className="header-a-content">
            <h1>Choose A Playlist:</h1>
            <div className='playlists-grid'>
              {playlists.map((playlist) => (
              <PlaylistCard
                key={playlist.id}
                playlist={playlist}
                setChosen={setChosen}
                setArtistSeeds={setArtistSeeds}
                setGenreSeeds={setGenreSeeds}
              />
              ))}
            </div>
          </div>
        ) : null
    );
  }
  return <Tracks playlist={chosen} artistSeeds={artistSeeds} genreSeeds={genreSeeds}/>
}