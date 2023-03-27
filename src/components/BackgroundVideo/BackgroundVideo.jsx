import React from 'react';
import video from '../../assests/videos/beck.mp4'

const BackgroundVideo = () => {
  return (
    <div
      className="background-video"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        zIndex: -1,
      }}
    >
      <video
        src={video}
        autoPlay
        muted
        loop
        style={{
          objectFit: 'cover',
          width: '100%',
          height: '100%',
        }}
      />
    </div>
  );
};

export default BackgroundVideo;
