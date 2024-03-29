import React, { useEffect, useState } from 'react'
// Import Swiper React components
import { Autoplay, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import { Button } from '@/components/ui';
import { Link } from 'react-router-dom';
import { getAllCategories, useAppDispatch, useAppSelector } from '@/store';
import { baseUrl } from '@/configs/app.config';

const ShopByTheme = () => {
    const dispatch = useAppDispatch()
    useEffect(() => {
        dispatch(getAllCategories())
    }, [])
    const categories = useAppSelector(state => state.base.common.categories)
    return (
        <>
            <div className='container mx-auto !py-16 md:!py-20 lg:!py-28'>
                <h2 className="text-3xl font-bold uppercase text-center tracking-tight text-gray-700 sm:text-4xl text-orange-900">Artworks</h2>
                <p className='text-center mt-2 text-base'>Discover from a curated collection of works by renowned Indian artists</p>
                <div className='flex justify-center items-center'>

                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 place-items-center place-items-center my-16'>
                    {
                    categories.map((category, index) => {
                        return(
                            <div key={category.id} className='relative rounded-full overflow-hidden group cursor-pointer w-52 h-52'>
                                <img src={category.img ? `${baseUrl}/uploads/category/${category.img}` : `/img/banner/${index+1}.jpg`} className='group-hover:scale-125 transition-all duration-[4000ms] h-full object-cover'/>
                                <div className='bg-gray-600 opacity-40 absolute top-0 left-0 z-[1] h-full w-full'></div>
                                <div className='text-center text-white font-semibold text-lg z-[2] absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]'>
                                    {category.name}
                                </div>
                            </div>
                        )
                    })
                    }
                </div>
                </div>
                <div className='flex justify-center'>
                    <Button variant='solid' >View All Artworks</Button>
                </div>
            </div>
        </>
    )
}

export default ShopByTheme