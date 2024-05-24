import { useState } from "react";
import PlaylistPage from "./PlaylistPage"
import Tracks from "./Tracks";
import useAuth from "./useAuth";

export default function Dashboard({ code }) {
    const [playlist, setPlaylist] = useState(false)
    const accessToken = useAuth(code);
    localStorage.setItem("accessToken", accessToken);
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
            <Tracks trackshref="hello"/>
        </div>
    )
}