# ListenMore - A Spotify Powered Playlist Generator

ListenMore is a web application where users can select one of their personal playlists as a template and set desired levels of valence, energy, and danceability to curate a customized playlist.


## Tech Stack

**Front-end:** React, JavaScript, CSS, HTML, Axios

**Back-end::** Node, Express

**Other:** Spotify Web API, Figma


## Features

- **Select Base Playlist**: Choose an existing playlist from your Spotify library to base the new playlist on.
- **Set Preferences**: Adjust the valence, energy, and danceability parameters to tailor the new playlist to your mood and preferences.
- **Add Music**: Create a new playlist or add to an existing playlist with the generated tracks.
- **Responsive Design:** Developed so that the program can be used on a wide array of different screen sizes.

## Getting Started

### Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/DoyoonKim24/ListenMore.git
    cd ListenMore
    ```

2. Install the server-side dependencies:
    ```sh
    cd server
    npm install
    ```

3. Install the client-side dependencies:
    ```sh
    cd ../client
    npm install
    ```

4. Set up your Spotify Developer credentials:
    - Create a new application on the [Spotify Developer Dashboard](https://developer.spotify.com/dashboard/applications).
    - Note down your Client ID and Client Secret.
    - Set the Redirect URI to `http://localhost:8888/callback`.

5. Configure the server:
    - Create a `.env` file in the `server` directory and add the following:
      ```env
      CLIENT_ID=your_spotify_client_id
      CLIENT_SECRET=your_spotify_client_secret
      ```

### Running the Application

1. Start the Express server:
    ```sh
    cd server
    npm start
    ```

2. Start the React app:
    ```sh
    cd ../client
    npm start
    ```
