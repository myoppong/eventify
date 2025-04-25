// src/components/ui/PromoVideo.jsx
import React from 'react';

const VIDEO_URLS = [
  'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4',
  'https://cdn.coverr.co/videos/coverr-butterfly-rain-1576339422771?auto=compress&format=mp4',
  'https://pixabay.com/videos/download/video-58116_p.mp4'
];

export default function PromoVideo({ index = 0, alt }) {
  const src = VIDEO_URLS[index % VIDEO_URLS.length];

  return (
    <video
      className="w-full h-full object-cover"
      src={src}
      autoPlay
      loop
      muted
      playsInline
      aria-label={alt}
    />
  );
}
