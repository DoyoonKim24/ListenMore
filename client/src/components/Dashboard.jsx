import { useState, useEffect } from "react";
import PlaylistPage from "./PlaylistPage"
import axios from "axios";

export default function Dashboard() {
    const [playlist, setPlaylist] = useState(false)
    window.history.pushState({}, null, "/")
    const accessToken = localStorage.getItem("accessToken");

    useEffect(() => {
    axios
      .get("https://api.spotify.com/v1/me", {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
      .then((response) => {
        localStorage.setItem("userID", response.data.id);
      })
      .catch((error) => {
        console.log("get User ID error", error);
      });
    }, [])


    const handleClick = () => {
        setPlaylist(!playlist)
    }
    if (!playlist) {
        return (<div>
            <button onClick = { handleClick }> Songs by Playlist </button>
            <button> Songs by Mood </button>
        </div>)
    }
    return (
            <PlaylistPage />
    )
}