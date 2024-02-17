import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import reducer, { getArtistProfile, useAppDispatch, useAppSelector } from './store'
import { Autoplay, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import shortenText from '@/utils/shortenText';

// Import Swiper styles
import 'swiper/css';
import { Link } from 'react-router-dom';
import { injectReducer } from '@/store'
import { Button } from '@/components/ui';
import useResponsive from '@/utils/hooks/useResponsive';
import { baseUrl } from '@/configs/app.config';
injectReducer('profile', reducer)

const Profile = () => {

    const { id } = useParams()
    const {larger} = useResponsive()
    const dispatch = useAppDispatch()
    const profile = useAppSelector(state => state.profile.data.profile)
    const [showBio, setShowBio] = useState(false)

    useEffect(() => {
        dispatch(getArtistProfile(id as string))
    }, [])

    const getImageName = (path:string) => {
        return path.slice(path.indexOf('/backend') + ('/backend').length);
    }

    return (
        <>
            <div className="container mx-auto px-8 lg:px-48">
                {/* <img alt="avatar" loading="lazy" width="1024" height="1024" decoding="async" data-nimg="1" className="w-40 rounded-xl" src="/nextjs-tailwind-author-page/image/avatar1.jpg" /> */}
                <div className="flex mt-8 lg:mt-16  justify-between">
                    <h5 className="block antialiased tracking-normal font-sans font-semibold text-inherit text-lg md:text-xl lg:text-3xl">{profile?.name}</h5>
                    <button className="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-1 px-2 lg:py-3 lg:px-6 rounded-lg bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none" type="button">follow</button>
                </div>
                <div className="flex flex items-center justify-between mt-4 gap-6">
                    <div className="flex flex-col lg:flex-row items-center gap-1 mt-3">
                        <p className="block antialiased font-sans text-base leading-relaxed text-inherit !text-gray-900 font-bold">323</p>
                        <p className="block antialiased font-sans text-base leading-relaxed text-inherit !text-gray-500 font-normal">Posts</p>
                    </div>
                    <div className="flex flex-col lg:flex-row items-center gap-1 mt-3">
                        <p className="block antialiased font-sans text-base leading-relaxed text-inherit !text-gray-900 font-bold">3.5k</p>
                        <p className="block antialiased font-sans text-base leading-relaxed text-inherit !text-gray-500 font-normal">Followers</p>
                    </div>
                    <div className="flex flex-col lg:flex-row items-center gap-1 mt-3">
                        <p className="block antialiased font-sans text-base leading-relaxed text-inherit !text-gray-900 font-bold">260</p>
                        <p className="block antialiased font-sans text-base leading-relaxed text-inherit !text-gray-500 font-normal">Following</p>
                    </div>
                </div>
                <p className="block antialiased font-sans text-base md:text-lg lg:text-xl font-normal leading-relaxed text-inherit !text-gray-500 mt-4">{showBio ? shortenText(profile?.bio) : profile?.bio}</p>
                <Button variant='solid' onClick={() => setShowBio(!showBio)} className='flex items-center gap-2' type="button">
                    {showBio ? 'Show More' : 'Show Less'}
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="3" stroke="white" aria-hidden="true" className="h-3.5 w-3.5 text-gray-900">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"></path>
                    </svg>
                </Button>
                <h2 className="text-3xl mt-16 font-bold uppercase text-center tracking-tight text-gray-700 sm:text-4xl text-orange-900">Artworks</h2>
                <Swiper
                    modules={[Autoplay, Pagination]}
                    spaceBetween={20}
                    autoplay={true}
                    slidesPerView={larger.sm === false ? 1 : larger.md === false ? 2 : 4}
                    onSwiper={(swiper) => console.log(swiper.autoplay)}
                    className='my-8 h-[300px]'
                    onMouseEnter={(swiper) => console.log(swiper)}
                >
                    {
                        profile?.artworks.map((artwork, index) => {
                            return (
                                <SwiperSlide className='cursor-pointer'>
                                    {/* <img src={`/img/banner/${index + 1}.jpg`} className='object-cover h-[300px] hover:scale-125 transition-all duration-1000' />
            <div>{artist.name}</div> */}
                                    <Link to={`/web/artworks/${artwork.id}`}>
                                        <div className="text-gray-700">
                                            <img src={baseUrl + getImageName(artwork?.imageUrls?.[0] as string)} alt=" random imgee" className="w-full h-[250px] object-cover rounded-lg shadow-md" />
 
                                            <div className="relative px-6 -mt-8  ">
                                                <div className="bg-white p-4 rounded-lg shadow-lg">
                                                    <h4 className="mt-1 text-base capitalize text-center leading-tight text-gray-700 truncate">{artwork.title}</h4>
                                                </div>
                                            </div>

                                        </div>
                                    </Link>
                                </SwiperSlide>
                            )
                        })
                    }
                </Swiper>
            </div>
            <div>
            </div>
        </>

    )
}

export default Profile