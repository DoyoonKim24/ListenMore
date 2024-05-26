import { useState, useEffect } from "react";
import axios from "axios";
import PlaylistCard from "./PlaylistCard";
import { FastAverageColor } from "fast-average-color";
import Tracks from "./Tracks";


export default function PlaylistPage() {
  const [playlists, setPlaylists] = useState([]);
  const [userID, setUserID] = useState("");
  const [trackshref, setTrackshref] = useState([]);
  const [chosen, setChosen] = useState(false);

  const accessToken = localStorage.getItem("accessToken");

  const getUser = () => {
    axios
      .get("https://api.spotify.com/v1/me", {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
      .then((response) => {
        setUserID(response.data.id);
      })
      .catch((error) => {
        console.log("get User ID error", error);
      });
  };
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
    if (accessToken) {
      getUser();
    }
    if (userID) {
      getPlaylists(userID);
    }
  }, [accessToken, userID]);

  if (!chosen) {
    return (
      <div>
        {playlists.length > 0 ? (
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
        ) : null}
      </div>
    );
  }
  return (
    <div>
      <Tracks trackshref={trackshref} />
    </div>
  );
}
