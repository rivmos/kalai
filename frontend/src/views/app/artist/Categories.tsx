import React, { useEffect, useState } from 'react'
// Import Swiper React components
import { Autoplay, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import { Button } from '@/components/ui';
import reducer, { getCategories, setSelectedArtist, useAppDispatch, useAppSelector } from './store';
import { Link } from 'react-router-dom';
import useResponsive from '@/utils/hooks/useResponsive';
import { Loading } from '@/components/shared';
import { injectReducer } from '@/store';
import EmptyState from '../project/SingleProject/components/EmptyState';

injectReducer('formSlice', reducer)

const Artists = () => {
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(getCategories())
    }, [])

    const categories = useAppSelector(state => state.formSlice.data.categories)
    const loading = useAppSelector(state => state.formSlice.data.loading)

    return (
        <>
            <div>
                <h2 className="text-3xl font-semibold uppercase tracking-tight text-gray-700 sm:text-4xl text-orange-900 mb-8">Categories</h2>
                <Loading loading={loading}>
                    {categories.length > 0 && <div className='grid grid-cols-4 gap-4'>
                        {
                            categories?.map((category, index) => {
                                return (
                                    <div key={category.id} className='relative rounded-full overflow-hidden group cursor-pointer w-52 h-52'>
                                        <img src={`/img/banner/${index + 1}.jpg`} className='group-hover:scale-125 transition-all duration-[4000ms] h-full object-cover' />
                                        <div className='bg-gray-600 opacity-40 absolute top-0 left-0 z-[1] h-full w-full'></div>
                                        <div className='text-center text-white font-semibold text-lg z-[2] absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]'>
                                            {category.name}
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>}
                    <div>
                        <EmptyState text='Catogries'/>
                    </div>
                </Loading>
            </div >
        </>
    )
}

export default Artists