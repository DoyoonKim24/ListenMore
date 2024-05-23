import { useState, useEffect } from "react";
import useAuth from "./useAuth";
import SpotifyWebApi from "spotify-web-api-node";
import PlaylistCard from "./PlaylistCard";
import { FastAverageColor } from 'fast-average-color';

var spotifyApi = new SpotifyWebApi({
  clientId: "533d6a5cfa884e42ae4ee458898c72a8",
});

export default function PlaylistPage({ code }) {
  const [playlists, setPlaylists] = useState([]);
  const [userID, setUserID] = useState("");

  const accessToken = useAuth(code);
  spotifyApi.setAccessToken(accessToken);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await spotifyApi.getMe();
        setUserID(userData.body.id);

        const playlistsData = await spotifyApi.getUserPlaylists(userID);
        setPlaylists(playlistsData.body.items);
      } catch (err) {
        console.log("Something went wrong!", err);
      }
    };
    
    const fac = new FastAverageColor();

    fac.getColorAsync('https://image-cdn-ak.spotifycdn.com/image/ab67706c0000da84c8090ee9c5325d606fb9dc85')
        .then(color => {
            console.log('Average color', color);
        })
        .catch(e => {
            console.log(e);
        });

    if (accessToken) {
      fetchData();
    }
  }, [accessToken]);

  console.log(playlists);
  return (
    <div>
      {playlists.length > 0 ? (
        <div className='container'>
          {playlists.map((playlist) => (
            <PlaylistCard playlist={playlist} />
          ))}
        </div>
      ) : (
        "Loading..."
      )}
    </div>
  );
}
