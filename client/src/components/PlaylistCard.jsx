import { useState, useEffect } from "react";
import { getTracks, getArtistGenres } from "./spotifyCalls";
import genresData from './genres.json';


function PlaylistCard({ playlist: { id, name, tracks, images }, setChosen, setArtistSeeds, setGenreSeeds}) {
  const [artists, setArtists] = useState([]);
  const [sortedArtists, setSortedArtists] = useState([]);
  const [genres, setGenres] = useState([]);



  const sortMost = (array) => {
    const frequencyMap = {};
  
    array.forEach(item => {
      frequencyMap[item] = (frequencyMap[item] || 0) + 1;
    });
    const sortedItems = Object.entries(frequencyMap)
                           .sort((a, b) => b[1] - a[1])
                           .map(([item]) => item);
    return sortedItems
  }

  const handleClick = () => {
    getTracks(tracks.href).then(async (items) => {
        const artistIDs = await items.map((item) => item.track.artists[0].id).filter((id) => id !== null);
        setArtists(artistIDs)
      })
  }

  const filterGenres = (genres) => {
    const availableGenres = genresData.genresData;
    const filteredGenres = genres.filter(genre => availableGenres.includes(genre));
    return filteredGenres;
  };

  useEffect(() => {
    if (artists.length > 0) {
      const topArtists = sortMost(artists)
      setSortedArtists(topArtists)
      setArtistSeeds(topArtists.slice(0, 2).toString());
    }
  }, [artists]);

  useEffect(() => {
    if (sortedArtists.length > 0) {
      let reducedArtists = sortedArtists.slice(0, 50);
      getArtistGenres(reducedArtists).then((res) => {
        let genreArray = res.artists.reduce((acc, item) => {
          return acc.concat(item.genres);
        }, []);
        const sortedGenres = sortMost(genreArray).map(str => str.replace('bossa nova', 'bossanova').replace('pov: ', '').replace(' ', '-').replace('&', '-n-'));
        const finalGenres = filterGenres(sortedGenres);
        setGenreSeeds(finalGenres.slice(0, 3).toString());
        setChosen([id, name]);
      })
    }
  }, [sortedArtists]);

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
