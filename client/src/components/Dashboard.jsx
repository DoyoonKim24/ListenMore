import { useState } from "react";
import PlaylistPage from "./PlaylistPage"

export default function Dashboard() {
    const [playlist, setPlaylist] = useState(false)
    window.history.pushState({}, null, "/")


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
        <div>
            <PlaylistPage />
        </div>
    )
}