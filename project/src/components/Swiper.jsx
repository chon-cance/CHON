import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./Swiper.css";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

import img1 from "../assets/img/1.jpg";
import img2 from "../assets/img/2.jpg";
import img3 from "../assets/img/3.jpg";
import img4 from "../assets/img/4.jpg";

const MySwiper = () => {
  const slides = [
    { id: 1, img: img1 },
    { id: 2, img: img2 },
    { id: 3, img: img3 },
    { id: 4, img: img4 },
  ];

  return (
    <Swiper
      modules={[Navigation, Pagination]}
      spaceBetween={30}
      slidesPerView={1}
      pagination={{
        clickable: true,
        renderBullet: function (index, className) {
          return `<span class="${className}" style="background-image: url(${slides[index].img})"></span>`;
        },
      }}
      navigation
      loop={true}
    >
      {slides.map((slide) => (
        <SwiperSlide key={slide.id}>
          <img src={slide.img} alt={`Slide ${slide.id}`} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default MySwiper;
