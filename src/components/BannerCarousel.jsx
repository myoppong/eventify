// src/components/BannerCarousel.jsx
import React from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
const responsive = { desktop: { breakpoint: { max: 3000, min: 1024 }, items: 1 }, tablet: { breakpoint: { max: 1024, min: 464 }, items: 1 }, mobile: { breakpoint: { max: 464, min: 0 }, items: 1 } };
export default function BannerCarousel({ children, className = '' }) {
  return (
    <Carousel
      responsive={responsive}
      swipeable
      draggable
      showDots
      arrows
      infinite
      autoPlay
      autoPlaySpeed={6000}
      transitionDuration={800}
      containerClass={`${className} carousel-container`}
      itemClass="carousel-item"
    >
      {children}
    </Carousel>
  );
}