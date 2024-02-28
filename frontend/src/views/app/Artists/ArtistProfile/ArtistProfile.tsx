import React, { useEffect } from 'react';
import reducer, { getProduct, useAppDispatch, useAppSelector } from '../ArtistEdit/store';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { injectReducer } from '@/store';
import { baseUrl } from '@/configs/app.config';
import './profile.css'
import { Button } from '@/components/ui';
import { FaFacebookF, FaLinkedinIn, FaPinterestP, FaTwitter } from 'react-icons/fa';

injectReducer('artistEditSlice', reducer)

const ArtistProfile = () => {
    const dispatch = useAppDispatch()

    const location = useLocation()
    const navigate = useNavigate()

    const artistData = useAppSelector(
        (state) => state.artistEditSlice.data.artistData
    )
    const loading = useAppSelector(
        (state) => state.artistEditSlice.data.loading
    )

    const fetchData = (data: { id: string }) => {
        dispatch(getProduct(data))
    }

    useEffect(() => {
        const path = location.pathname.substring(
            location.pathname.lastIndexOf('/') + 1
        )
        const rquestParam = { id: path }
        fetchData(rquestParam)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location.pathname])

    return (
        <div className="grid grid-cols-4 gap-8 h-full">
            {/* Left Section for Artist Info with yellow-600 background */}

            <div className="frame flex flex-col items-between bg-white col-span-1">
                <div className="profile">
                    <div className="image mx-auto mt-8 mb-8">
                        <div className="circle-1"></div>
                        <div className="circle-2"></div>
                        <img src={`${baseUrl}/uploads/avatar/${artistData.avatar}`} alt={`${artistData.name}'s Avatar`} className='h-full'/>
                    </div>

                    <div className="name text-gray-700">{artistData.name}</div>

                    {/* <div className="actions !h-full flex items-end justify-center gap-4">
                        <button className="btn">Follow</button>
                        <button className="btn">Message</button>
                    </div> */}

                    <div className="stats mt-4 gap-4">
                        <div className="box px-6 py-4 rounded-xl">
                            <span className="value">{artistData.artworks?.length}</span>
                            <span className="parameter">Artworks</span>
                        </div>
                        {/* <div className="box px-6 py-4 rounded-xl">
                            <span className="value">1387</span>
                            <span className="parameter">Likes</span>
                        </div>
                        <div className="box px-6 py-4 rounded-xl">
                            <span className="value">146</span>
                            <span className="parameter">Follower</span>
                        </div> */}
                    </div>
                    <div className="job mt-4 text-gray-500" dangerouslySetInnerHTML={{ __html: artistData.bio as TrustedHTML}} />
                </div>
                <div className="mt-8 flex flex-col items-center">
                    <span>Socials</span>
                    <div className="flex mt-2">
                        <Button
                            className="mr-2"
                            shape="circle"
                            size="sm"
                            icon={
                                <FaFacebookF className="text-[#1773ea]" />
                            }
                        />
                        <Button
                            className="mr-2"
                            shape="circle"
                            size="sm"
                            icon={<FaTwitter className="text-[#1da1f3]" />}
                        />
                        <Button
                            className="mr-2"
                            shape="circle"
                            size="sm"
                            icon={
                                <FaLinkedinIn className="text-[#0077b5]" />
                            }
                        />
                        <Button
                            className="mr-2"
                            shape="circle"
                            size="sm"
                            icon={
                                <FaPinterestP className="text-[#df0018]" />
                            }
                        />
                    </div>
                </div>
            </div>

            {/* Right Section for Artworks with warmGray-100 background */}
            <div className="col-span-3 bg-warmGray-100">
                <h4 className='mb-4'>Artworks</h4>
                <div className="grid grid-cols-4 gap-4">
                    {artistData?.artworks?.map((artwork) => (
                        <Link to={`/app/artworks/${artwork.id}`}>
                            <div key={artwork.id} className="group align-bottom relative cursor-pointer">
                                {artwork.isSold && <span className='absolute bg-red-500 px-2 py-1 text-sm rounded-xl right-2 top-2 text-white'>Sold</span>}
                                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none">
                                    <img
                                        src={`${baseUrl}/uploads/artwork/${artwork?.imgList?.[0]}`} // Replace with actual path or URL
                                        alt={artwork.title}
                                    />
                                </div>
                                <div className="mt-4 flex justify-between">
                                    <div>
                                        <h3 className="text-sm text-gray-700">
                                            <a>
                                                <span aria-hidden="true" className="absolute inset-0" />
                                                {artwork.title}
                                            </a>
                                        </h3>
                                        <p className="mt-1 text-sm text-gray-500">{artwork.medium}, {artwork.sizeUnit === 'centimeter' ? `${artwork.width}x${artwork.height} cm` : `${artwork.width}x${artwork.height} inch`}</p>
                                    </div>
                                    <p className="text-sm font-medium text-gray-900">&#8377;{artwork.price}</p>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ArtistProfile;
