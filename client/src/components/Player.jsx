import React from 'react';
import SpotifyPlayer from 'react-spotify-player';

const Player = ({ track }) => {
  const size = {
    width: '100%',
    height: 300,
  };
  const view = 'list'; // or 'coverart'
  const theme = 'black'; // or 'white'
  return (
    <div className="player">
      <SpotifyPlayer
        uri={track}
        size={size}
        view={view}
        theme={theme}
      />
    </div>
  )
}

export default Player;