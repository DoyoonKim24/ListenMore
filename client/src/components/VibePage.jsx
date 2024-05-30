export default function VibePage({ valence, danceability, energy, setValence, setDanceability, setEnergy, handleGetRecs }) {
    return (
      <div className='header-a-content'>
        <h1>Set the vibe of your music</h1>
        <div className="sliders-and-button">
          <div className='sliders'>
            <div className="slider">
              <h4>Valence</h4>
              <input type="range" min="1" max="100" value={valence} onChange={(e) => setValence(e.target.value)}></input>
              <div>{valence}</div>
            </div>
            <div className="slider">
              <h4>Danceability</h4>
              <input type="range" min="1" max="100" value={danceability} onChange={(e) => setDanceability(e.target.value)}></input>
              <div>{danceability}</div>
            </div>
            <div className="slider">
              <h4>Energy</h4>
              <input type="range" min="1" max="100" value={energy} onChange={(e) => setEnergy(e.target.value)}></input>
              <div>{energy}</div>
            </div>
          </div>
          <button className="purple-button" onClick={handleGetRecs}> Generate Playlist </button>
        </div>
      </div>
    );
}