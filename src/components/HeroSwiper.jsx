import React from 'react'
import './heroSwiper.css'
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import { Autoplay } from 'swiper/modules';

const HeroSwiper = ({slides , slideChange}) => {
  return (
   <Swiper 
   slidesPerView={1}
   spaceBetween={10}
   autoplay = {{
    delay :2500 ,
    disableOnInteraction : false,
   } }
   breakpoints={{
    640 :{
        slidesPerView : 2 ,
        spaceBetween :10,
    },
    768 : {
        slidesPerView : 3 ,
        spaceBetween :20,
    },
    1024 :{
        slidesPerView : 4 ,
        spaceBetween :30,
    },
   }}
   loop = {true}
   modules={[Autoplay]}
   className='heroSwiper'
   >
      {slides.map(slide => (
        <SwiperSlide key={slide._id} className='images'>
            <img src={slide.bgImg} alt="" onClick={()=>slideChange(slide._id)} />
        </SwiperSlide>
      ))}
   </Swiper>
  )
}

export default HeroSwiper