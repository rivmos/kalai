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
        onSlideChange={() => {}}
        onSwiper={(swiper) => {}}
        className='h-[500px] lg:h-[700px]'
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
        <h2 className="text-2xl lg:text-3xl font-bold tracking-tight text-white sm:text-4xl">
          Elevate Your Art Journey.
        </h2>
        <p className="mt-6 text-base md:text-lg text-gray-300 w-1/2">
          Forge a closer bond to the art world by interacting directly with the creators. Learn about their processes, visions, and stories behind each masterpiece.

        </p>
        <div className="mt-10 flex flex-col sm:flex-row lg:items-center justify-center gap-x-6 lg:justify-start">
          <Button
            variant='solid'
            className='hover:!text-gray-900 bg-orange-900 !px-2 !py-1'
          >
            Get started
          </Button>
          <a href="#" className="flex items-center gap-2 text-sm font-semibold leading-6 text-white">
            Discover more <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>

    </div>

  )
}

export default Banner