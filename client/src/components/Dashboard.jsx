import { useState } from "react";
import PlaylistPage from "./PlaylistPage"

export default function Dashboard({ code }) {
    const [playlist, setPlaylist] = useState(false)
    const handleClick = () => {
        setPlaylist(!playlist)
    }
    if (!playlist) {
        return (<div>
            <button onClick = { handleClick }> Songs by Mood </button>
            <button> Songs by Playlist </button>
        </div>)
    }
    return (
        <div>
            <PlaylistPage code={ code } />
        </div>
    )
}