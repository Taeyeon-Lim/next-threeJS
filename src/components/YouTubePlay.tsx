'use client';

import { CSSProperties, useState } from 'react';

import YouTube, { YouTubeEvent, YouTubePlayer } from 'react-youtube';

import { BsPauseCircle, BsPlayCircle } from 'react-icons/bs';

const PLAY_BUTTON_CSS: CSSProperties = {
  height: '3rem',
  position: 'fixed',
  right: '2.5%',
  bottom: '2.5%',
  zIndex: 999,
  boxShadow: '0 0 8px 8px rgba(0,0,0,.2)',
  borderRadius: '70%',
  overflow: 'hidden',
  cursor: 'pointer',
};

export default function YouTubePlay({
  videoId,
  autoPlay = false,
  width = '0',
  height = '0',
  start = undefined,
  end = undefined,
  loop = 0,
  controls = 0,
  playButton = false,
}: {
  videoId: string;
  autoPlay?: boolean;
  width?: string;
  height?: string;
  start?: number;
  end?: number;
  loop?: 0 | 1;
  controls?: 0 | 1;
  playButton?: boolean;
}) {
  const [play, setPlay] = useState(autoPlay);
  const [player, setPlayer] = useState<YouTubePlayer>();

  const onClickPlayButton = () => {
    if (!player) return;

    if (play) {
      player.pauseVideo();
    } else {
      player.playVideo();
    }
  };
  const onStateChange = (event: YouTubeEvent<any>) => {
    const state = event.data;

    if (state === 1) {
      setPlay(true);
    } else {
      setPlay(false);
    }
  };

  const onReady = (event: YouTubeEvent<any>) => {
    setPlayer(event.target);

    if (autoPlay) {
      event.target.playVideo();
      event.target.unMute();
    }
  };

  return (
    <>
      <YouTube
        videoId={videoId}
        style={{
          width,
          height,
        }}
        opts={{
          width,
          height,
          videoId,
          host: `https://www.youtube-nocookie.com`,
          playerVars: {
            // autoplay: play ? 1 : 0,
            start,
            end,
            loop,
            controls,
            playlist: videoId,
            disablekb: 1, // Block player keyboard control (0: enable)
            modestbranding: 1, // disable youtube logo
          },
        }}
        onReady={onReady}
        onStateChange={onStateChange}
        loading='lazy'
      />

      {playButton && !!player && (
        <div style={PLAY_BUTTON_CSS} onClick={onClickPlayButton}>
          {play ? (
            <BsPauseCircle size={'3rem'} color='#ffffff' />
          ) : (
            <BsPlayCircle size={'3rem'} color='#ffffff' />
          )}
        </div>
      )}
    </>
  );
}
