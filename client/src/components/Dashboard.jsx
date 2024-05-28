import { useState, useEffect } from "react";
import { getUser } from './spotifyCalls'
import PlaylistPage from "./PlaylistPage"

export default function Dashboard() {
    const [playlist, setPlaylist] = useState(false)
    window.history.pushState({}, null, "/")
    const accessToken = localStorage.getItem("accessToken");

    useEffect(() => {
        getUser()
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
    else return (
            <PlaylistPage />
    )
}