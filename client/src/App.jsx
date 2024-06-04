import Login from "./components/Login";
import PlaylistPage from "./components/PlaylistPage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpotify } from "@fortawesome/free-brands-svg-icons";
import "./App.css";

export default function App() {
  const accessToken = new URLSearchParams(window.location.search).get(
    "access_token"
  );

  //window.history.pushState({}, null, "/")
  localStorage.setItem("accessToken", accessToken);

  return (
    <>
      <div className="head-logo">
        <div className="listen">Listen</div>
        <FontAwesomeIcon className="logo" icon={faSpotify} />
        <div className="more">More</div>
      </div>

      <div className="purple-ellipse"></div>
      <div className="red-ellipse"></div>
      
      {accessToken ? <PlaylistPage /> : <Login />}
    </>
  );
}
