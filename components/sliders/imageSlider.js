import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import styled from "styled-components";

const Container = styled.div`
  position: relative;
  z-index: 1;
  width: 900px; /* set width to desired dimension */
  height: 750px; /* set height to desired dimension */
`;

const SlideContainer = styled.div`
  display: flex;
  flex-direction: row;
  height: 600px;
  width: 800px; /* Width of a single slide */
  justify-content: center;
  align-items: center;
  // margin: 0 auto; /* To center the slides */
`;

const Slide = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  height: 100%;
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: top;
  object-fit: cover;
  // padding: 50px;
  // margin: 40px;

  img {
    width: 800px;
    height: 600px;
    object-fit: cover;
    border-radius: 30px;
  }
`;

const ThumbnailContainer = styled.div`
  position: absolute;
  bottom: 10px;
  left: 0;
  width: 100%;
  height: 120px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Thumbnail = styled.div`
  width: 120px;
  height: 120px;
  margin: 0 5px;
  background-color: #ccc;
  background-size: cover;
  background-position: center;
  border: 2px solid ${({ active }) => (active ? "#ccc" : "#333")};
  cursor: pointer;
  padding: 10px;
  margin-top: 20px;
`;

const ImageSlider = ({ images }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleThumbnailClick = (index) => {
    setActiveIndex(index);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [images]);

  return (
    <Container>
      <SlideContainer>
        {images.map((image, index) => (
          <Slide
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: activeIndex === index ? 1 : 0 }}
          >
            <img src={image.url} alt={image.alt} />
          </Slide>
        ))}
      </SlideContainer>
      <ThumbnailContainer>
        {images.map((image, index) => (
          <Thumbnail
            key={index}
            style={{ backgroundImage: `url(${image.url})` }}
            active={activeIndex === index}
            onClick={() => handleThumbnailClick(index)}
          />
        ))}
      </ThumbnailContainer>
    </Container>
  );
};

export default ImageSlider;
