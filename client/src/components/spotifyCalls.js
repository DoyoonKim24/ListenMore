import axios from "axios";



export const getUser = async () => {
    const accessToken = await localStorage.getItem("accessToken");
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
}

export const getPlaylists = async (user) => {
    const accessToken = await localStorage.getItem("accessToken");
    let playlists = [];
    await axios
      .get(`https://api.spotify.com/v1/users/${user}/playlists`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
      .then((response) => {
        playlists=response.data.items;
      })
      .catch((error) => {
        console.log("get playlists error", error);
      });
      return playlists;
};

export const getTracks = async (hrefs) => {
    const accessToken = await localStorage.getItem("accessToken");
    let response = [];
    await axios
    .get(hrefs, { headers: { Authorization: `Bearer ${accessToken}` } 
    })
    .then((res) => {
      response = res.data.items;
    }).catch((error) => {
        console.log("get tracks error ", error);
    })
    return response;
}

export const makeAndAddPlaylist = async (playlistName, chosenTracks) => {
    const accessToken = await localStorage.getItem("accessToken");
    const userID = await localStorage.getItem("userID");
    axios
     .post(
        `https://api.spotify.com/v1/users/${userID}/playlists`,
        { name: playlistName },
        { headers: { Authorization: `Bearer ${accessToken}` } }
      )
     .then((response) => {
        axios
         .post(
            `https://api.spotify.com/v1/playlists/${response.data.id}/tracks`,
            { uris: chosenTracks },
            { headers: { Authorization: `Bearer ${accessToken}` } }
          )
         .catch((error) => {
            console.log("Adding to new playlist error: ", error);
          });
      })
     .catch((error) => {
        console.log("creating playlist error", error);
      });
}

export const getRecommendations = async (seeds, targetDanceability, targetEnergy, targetValence) => {
    const accessToken = await localStorage.getItem("accessToken");
    let recs = [];
    await axios
      .get(
        `https://api.spotify.com/v1/recommendations?limit=50&seed_artists=${seeds}&target_danceability=${targetDanceability}&target_energy=${targetEnergy}&target_valence=${targetValence}`,
        { headers: { Authorization: `Bearer ${accessToken}` } }
      )
      .then((response) => {
        recs = response.data.tracks;
      })
      .catch((error) => {
        console.log("Tracks error ", error);
      });

      return recs;
}

export const addLike = (uri) => {
  const accessToken = localStorage.getItem("accessToken");
  axios.put(
    `https://api.spotify.com/v1/me/tracks?ids=${uri}`, 
    {ids: [uri]}, 
    {
      headers: { Authorization: `Bearer ${accessToken}` }
    }
  ).catch((error) => {
    console.log("song liking error", error);
  })
}

export const removeLike = (uri) => {
  const accessToken = localStorage.getItem("accessToken");
  console.log(uri)
  axios.delete(
    `https://api.spotify.com/v1/me/tracks?ids=${uri}`, 
    {
      headers: { Authorization: `Bearer ${accessToken}` }
    }
  ).catch((error) => {
    console.log("song unliking error", error);
  })
}