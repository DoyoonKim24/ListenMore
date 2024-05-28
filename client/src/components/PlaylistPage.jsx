import { useState, useEffect } from "react";
import { getPlaylists } from "./spotifyCalls";
import PlaylistCard from "./PlaylistCard";
import Tracks from "./Tracks";


export default function PlaylistPage() {
  const [playlists, setPlaylists] = useState([]);
  const [seeds, setSeeds] = useState([]);
  const [chosen, setChosen] = useState(false);

  const userID = localStorage.getItem("userID");


  useEffect(() => {
    if (userID) {
      getPlaylists(userID).then((playlists) => setPlaylists(playlists));
    }
  }, [userID]);

  if (!chosen) {
    return (
        playlists.length > 0 ? (
          <div className="playlist-page">
            <h2>Choose A Playlist:</h2>
            <div className='playlists-grid'>
              {playlists.map((playlist) => (
              <PlaylistCard
                key={playlist.id}
                playlist={playlist}
                setChosen={setChosen}
                setSeeds={setSeeds}
              />
              ))}
            </div>
          </div>
        ) : null
    );
  }
  return <Tracks seeds={seeds} />
}
