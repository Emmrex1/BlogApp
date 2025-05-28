import React from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import { Autoplay, Pagination } from "swiper/modules";
import img1 from '../../../assets/logo/hotel img 1.jpeg'
import img2 from "../../../assets/logo/hotel img 2.jpg";
import img3 from "../../../assets/logo/hotel img 3.jpeg"
import img4 from "../../../assets/logo/hotel img 4.jpg";
import img5 from "../../../assets/logo/hotel img 5.jpeg";

const FirstSection = () => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-center md:gap-14 gap-8">
      <div className="md:w-1/2 w-full text-center ">
        <h1 className="md:text-5xl text-3xl font-bold md:leading-tight">
          Hotel with Rooftop Pools Near me
        </h1>
        <p className="py-4 ">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Error quam
          est assumenda quis quisquam voluptatibus tenetur nisi hic mollitia,
          ducimus officiis exercitationem, cupiditate qui distinctio, asperiores
          dolor voluptate consequuntur veniam!
        </p>
      </div>
      <div className="md:w-1/2 w-full mx-auto ">
        <Swiper
          slidesPerView={1}
          spaceBetween={10}
          pagination={{
            clickable: true,
          }}
          autoplay={{
            delay: 1500,
            disableOnInteraction: false,
          }}
          breakpoints={{
            640: {
              slidesPerView: 1,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 1,
              spaceBetween: 40,
            },
            1024: {
              slidesPerView: 1,
              spaceBetween: 50,
            },
          }}
          modules={[Pagination,Autoplay]}
          className="mySwiper"
        >
          <SwiperSlide>
            <img
              src={img1}
              alt=""
              className="w-full lg:h-[420px] sm-h-96 h-80 "
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              src={img2}
              alt=""
              className="w-full lg:h-[420px] sm-h-96 h-80 "
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              src={img3}
              alt=""
              className="w-full lg:h-[420px] sm-h-96 h-80 "
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              src={img4}
              alt=""
              className="w-full lg:h-[420px] sm-h-96 h-80 "
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              src={img5}
              alt=""
              className="w-full lg:h-[420px] sm-h-96 h-80 "
            />
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
}

export default FirstSection;
