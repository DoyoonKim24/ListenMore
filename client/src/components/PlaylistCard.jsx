import { useState, useEffect } from "react";
import axios from "axios";

function PlaylistCard({ playlist: { id, name, tracks, images }, setChosen, setSeeds }) {
  const [playTracks, setPlayTracks] = useState([]);
  const accessToken = localStorage.getItem("accessToken");

  const findtopArtists = (array) => {
    const frequencyMap = {};
  
    array.forEach(item => {
      frequencyMap[item] = (frequencyMap[item] || 0) + 1;
    });
    const sortedItems = Object.entries(frequencyMap)
                           .sort((a, b) => b[1] - a[1])
                           .map(([item]) => item);
    return sortedItems.slice(0, 5).toString();
  }

  const handleClick = () => {
    axios
      .get(tracks.href, { headers: { Authorization: `Bearer ${accessToken}` } })
      .then((res) => {
        return res.data.items;
      }).then((items) => {
        const newTrackIDs = items.map((item) => item.track.artists[0].id);
        setPlayTracks(newTrackIDs)
      })

  }

  useEffect(() => {
    if (playTracks.length > 0) {
      setSeeds(findtopArtists(playTracks));
      setChosen(true);
    }
  }, [playTracks]);
    

  return (
    <a onClick={handleClick} className="playlist">
      {images ? (
        <img src={images[0].url} />
      ) : (
        <img src="https://via.placeholder.com/400" />
      )}
      <p>{name}</p>
    </a>
  );
}

export default PlaylistCard;
