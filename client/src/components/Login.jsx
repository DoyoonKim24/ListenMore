function Login() {
  
  const redirect = () => {
    window.location.href = "http://localhost:8888/login";
  }

  return (
    <div className='login-page'>
      <h1 className='hero-header'> Get personalized music recommendations based on your  playlists, artists, and mood. </h1>
      <button onClick={redirect} className ='purple-button'>Login with Spotify</button>

    </div>
)}
export default Login;