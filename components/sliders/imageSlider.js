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
          <Carousel
            selectedItem={review}
            showArrows={false}
            showStatus={false}
            showIndicators={false}
            swipeable={false}
            emulateTouch={false}
            dynamicHeight={false}
            useKeyboardArrows={true}
            centerMode={false}
            centerSlidePercentage={100}
            infiniteLoop={false}
            // images={images}
            // renderThumbs={() => (
            //   <CarouselThumb
            //     images={images}
            //     review={review}
            //     setReview={setReview}
            //   />
            // )}
           
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
            
          </Carousel>
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

// const CarouselThumb = ({ images, review, setReview }) => {
//   const handleClick = (index) => {
//     setReview(index);
//   };

//   const children = Array.isArray(images) ? images : [images];

//   return (
//     <div className="flex justify-center items-center">
//       {children.map((image, i) => (
//         <div
//           key={i}
//           onClick={() => handleClick(i)}
//           className={`
//             cursor-pointer
//             mx-1
//             ${
//               review === i
//                 ? "border-gray-400 border-opacity-100"
//                 : "border-gray-400 border-opacity-50"
//             }
//           `}
//           style={{
//             height: 50,
//             width: `${100 / children.length}%`,
//             backgroundImage: `url(${image.url})`,
//             backgroundPosition: "center",
//             backgroundSize: "cover",
//           }}
//         />
//       ))}
//     </div>
//   );
// };


          
          export default ImageSlider;
