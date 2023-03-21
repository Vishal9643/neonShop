import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import { Carousel } from "react-responsive-carousel";
import styled from "styled-components";

const Container = styled.div`
  align-items: center;
  height: 400px;
  max-width: 800px;
  max-height: 600px;
  margin: 0 auto;
`;

const ImageSlider = ({ images }) => {
  const [review, setReview] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setReview((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [images]);

  const nextImage = () => {
    setReview((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setReview((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <Container>
      <div className="relative" style={{ height: "100%", width: "100%" }}>
        <Controls nextImage={nextImage} prevImage={prevImage} />
        <div className="relative overflow-hidden">
          <motion.div
            className="flex"
            style={{ width: `${images.length * 100}%` }}
            initial={{ x: 0 }}
            animate={{
              x: `-${(review / images.length) * 100}%`,
              transition: { duration: 0.5 },
            }}
          >
            {images.map((image, i) => (
              <div
                key={i}
                style={{
                  width: `${(1 / images.length) * 100}%`,
                  height: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <img
                  src={image.url}
                  alt={image.alt}
                  className="max-h-full max-w-full object-contain"
                />
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </Container>
  );
};

const Controls = ({ nextImage, prevImage }) => {
  return (
    <div className="absolute z-10 top-1/2 -translate-y-1/2  inset-x-0 transform  flex justify-between text-3xl text-white">
      <button
        className="transform focus:outline-none  transition py-5"
        onClick={prevImage}
      >
        <BsChevronLeft />
      </button>
      <button
        className="transform focus:outline-none  transition py-5"
        onClick={nextImage}
      >
        <BsChevronRight />
      </button>
    </div>
  );
};

export default ImageSlider;
