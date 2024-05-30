import { useState, useEffect } from "react";
import { getUser } from './spotifyCalls'
import PlaylistPage from "./PlaylistPage"

export default function Dashboard() {
    const [playlist, setPlaylist] = useState(false)
    window.history.pushState({}, null, "/")

    useEffect(() => {
        getUser()
    }, [])


    const handleClick = () => {
        setPlaylist(!playlist)
    }
    if (!playlist) {
        return (<div className="header-a-content">
            <h1> Find songs based on: </h1>
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