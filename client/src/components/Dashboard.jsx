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
        return (<div className="options-page">
            <h2> Find songs based on: </h2>
            <div className="options-box">
                <button onClick = { handleClick }> Playlist </button>
                <button> Artists </button>
                <button> Songs </button>
                <button> Album </button>
            </div>
        </div>)
    }
    return (
            <PlaylistPage />
    )
}