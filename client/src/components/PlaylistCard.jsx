function PlaylistCard({ playlist: { id, name, tracks, images } }) {
  return (
    <a className="playlist">
      {images ? (
        <img src={images[0].url} />
      ) : (
        <img src="https://via.placeholder.com/400" />
      )}
      <h4>{name}</h4>
    </a>
  );
}

export default PlaylistCard;
