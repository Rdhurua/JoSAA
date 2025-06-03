import React from 'react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { experts } from '../utils/Data';
import Image from 'next/image';


const OurExpert = () => {
  return (
   <div className="border-b-2 border-gray-300 bg-gradient-to-b from-white via-blue-50 to-white">
  <section
    id="our-experts"
    className="w-full max-w-7xl mx-auto px-4 md:px-8 py-20"
  >
    <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-700 mb-16 text-center">
      Meet Our Experts
    </h2>

    <Swiper
      modules={[Navigation, Autoplay]}
      spaceBetween={30}
      slidesPerView={1}
      navigation
      pagination={{ clickable: true }}
      autoplay={{ delay: 3500 }}
      breakpoints={{
        640: { slidesPerView: 1 },
        768: { slidesPerView: 2 },
        1024: { slidesPerView: 3 },
      }}
      className="px-4"
    >
      {experts.map((expert, idx) => (
        <SwiperSlide key={idx} className='px-[15px] py-[30px]'>
          <div className="bg-white rounded-3xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-105 p-8 flex flex-col items-center text-center h-full">
            <Image
  src={expert.img}
  alt={expert.name}
  width={112}
  height={112}
  className="w-28 h-28 rounded-full object-cover border-4 border-blue-200 shadow-md mb-4"
/>

            <h3 className="text-xl font-bold text-gray-700">{expert.name}</h3>
            <p className="text-gray-600 text-sm mt-2">{expert.desc}</p>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  </section>
</div>

  );
};

export default OurExpert;
