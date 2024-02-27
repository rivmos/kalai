import React, { useEffect } from 'react';
import reducer, { getProduct, useAppDispatch, useAppSelector } from '../ArtistEdit/store';
import { useLocation, useNavigate } from 'react-router-dom';
import { injectReducer } from '@/store';
import { baseUrl } from '@/configs/app.config';

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
        <div className="grid grid-cols-4 gap-4 h-full">
            {/* Left Section for Artist Info with yellow-600 background */}
            <div className="col-span-1 !py-8 space-y-4 bg-white h-full">
                <div className="text-center">
                    <img
                        src="/path-to-artist-image.jpg" // Replace with actual artist image path
                        alt={artistData.name}
                        className="w-32 h-32 rounded-full mx-auto border-4 border-orange-200"
                    />
                    <h1 className="text-xl font-bold text-orange-900">{artistData.name}</h1>
                    <p className="text-orange-200">{artistData.bio}</p>
                    <a href={artistData.website} className="text-red-300 hover:underline">
                        Visit Website
                    </a>
                </div>
            </div>

            {/* Right Section for Artworks with warmGray-100 background */}
            <div className="col-span-3 bg-warmGray-100">
                <h4 className='mb-4'>Artworks</h4>
                <div className="grid grid-cols-4 gap-4">
                    {artistData?.artworks?.map((artwork) => (
                        <div key={artwork.id} className="border p-2 hover:bg-orange-100 hover:cursor-pointer">
                            <img
                                src={`${baseUrl}/uploads/${artwork?.imgList?.[0]}`} // Replace with actual path or URL
                                alt={artwork.title}
                                className="w-full"
                            />
                            <div>
                                <h2 className="text-base text-orange-900">{artwork.title}</h2>
                                {/* <p className="text-orange-900">{artwork.description}</p> */}
                                <div className='flex justify-between'>
                                    <p>
                                        {artwork.medium}, {artwork.sizeUnit === 'centimeter' ? `${artwork.width}x${artwork.height} cm` : `${artwork.width}x${artwork.height} inch`}
                                    </p>
                                    <p>&#8377;{artwork.price}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ArtistProfile;
