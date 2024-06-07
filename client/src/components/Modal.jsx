import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

export default function Modal({setIsOpen, handleCreatePlaylist }) {
  const [name, setName] = useState("");
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <>
      <div className="darkBG" onClick={() => setIsOpen(false)} />
      <div className="modal">
        <FontAwesomeIcon
          icon={faXmark}
          className="x-button"
          onClick={() => setIsOpen(false)}
        />
        <h2>Name your Playlist</h2>
        <input
          type="text"
          placeholder="Playlist name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button
          className={`purple-button ${name.length === 0 ? "grey-button" : ""}`}
          onClick={() => {
            if (name.length > 0) {
              handleCreatePlaylist(name);
            }
          }}
        >
          Create Playlist
        </button>
      </div>
    </>
  );
}
