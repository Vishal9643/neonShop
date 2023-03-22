import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import styled from "styled-components";

const Container = styled.div`
  position: relative;
  z-index: 1;
  width: 900px; /* set width to desired dimension */
  height: 600px; /* set height to desired dimension */
`;

const SlideContainer = styled.div`
  display: flex;
  flex-direction: row;
  height: 400px;
  width: 600px;
  justify-content: center;
  align-items: center;
`;

// const Slide = styled(motion.div)`
//   position: absolute;
//   top: 0;
//   left: 0;
//   right: 0;
//   bottom: 0;
//   display: flex;
//   justify-content: center;
//   align-items: center;
// `;

const Slide = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  flex: 1;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  object-fit: cover;
  

  img {
    width: 500px;
    height: 400px;
    object-fit: cover;
  }
`;




const ThumbnailContainer = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Thumbnail = styled.div`
  width: 50px;
  height: 50px;
  margin: 0 5px;
  background-color: #ccc;
  background-size: cover;
  background-position: center;
  border: 2px solid ${({ active }) => (active ? "#333" : "#ccc")};
  cursor: pointer;
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
            

            <img src={image.url} alt={image.alt}  />
            
          </Slide>
        ))}
      </SlideContainer>
      
      <hr style={{ margin: "auto", marginTop: "130px", border: "0.5px solid white", boxShadow: "0px 4px 10px rgba(0, 0, 0, 1)", width: "300px", alignItems: "center", display: "flex", justifyContent: "center" }} />

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
