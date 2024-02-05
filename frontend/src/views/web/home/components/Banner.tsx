import React from 'react'
// Import Swiper React components
import { Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import { Button } from '@/components/ui';

const Banner = () => {
  return (
    <div className="relative">

      <Swiper
        modules={[Autoplay]}
        spaceBetween={0}
        autoplay
        slidesPerView={1}
        onSlideChange={() => console.log('slide change')}
        onSwiper={(swiper) => console.log(swiper)}
        className='h-[700px]'
      >
        {
          [1, 2, 3, 4].map(number => {
            return (
              <SwiperSlide key={number}>
                <img src={`/img/banner/${number}.jpg`} className='w-full h-full object-cover' />
              </SwiperSlide>
            )
          })
        }
      </Swiper>

      <div className="absolute top-[50%] -translate-y-[50%] left-0 right-0 z-[1] mx-auto container">
        <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
          Elevate Your Art Journey.
        </h2>
        <p className="mt-6 text-lg leading-8 text-gray-300 w-1/2">
          Forge a closer bond to the art world by interacting directly with the creators. Learn about their processes, visions, and stories behind each masterpiece.

        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6 lg:justify-start">
          <Button
            variant='solid'
            className="!text-black rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            Get started
          </Button>
          <a href="#" className="text-sm font-semibold leading-6 text-white">
            Discover more <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>

    </div>

  )
}

export default Banner