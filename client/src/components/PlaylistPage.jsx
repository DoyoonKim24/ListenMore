import { useState, useEffect } from "react";
import axios from "axios";
import PlaylistCard from "./PlaylistCard";
import { FastAverageColor } from "fast-average-color";
import Tracks from "./Tracks";


export default function PlaylistPage() {
  const [playlists, setPlaylists] = useState([]);
  const [trackshref, setTrackshref] = useState([]);
  const [chosen, setChosen] = useState(false);

  const accessToken = localStorage.getItem("accessToken");
  const userID = localStorage.getItem("userID");
  
  const getPlaylists = (user) => {
    axios
      .get(`https://api.spotify.com/v1/users/${user}/playlists`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
      .then((response) => {
        setPlaylists(response.data.items);
      })
      .catch((error) => {
        console.log("get playlists error", error);
      });
  };

  useEffect(() => {
    if (userID) {
      getPlaylists(userID);
    }
  }, []);

  if (!chosen) {
    return (
        playlists.length > 0 ? (
          <div className="container">
            {playlists.map((playlist) => (
              <PlaylistCard
                key={playlist.id}
                playlist={playlist}
                setChosen={setChosen}
                setTracks={setTrackshref}
              />
            ))}
          </div>
        ) : null
    );
  }
  return (<Tracks trackshref={trackshref} />
  );
}
