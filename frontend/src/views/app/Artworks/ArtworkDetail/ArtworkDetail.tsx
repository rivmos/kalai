import React, { useEffect, useState } from 'react';
import reducer, { getProduct, useAppDispatch, useAppSelector } from '../ArtworkEdit/store';
import { useLocation, useNavigate } from 'react-router-dom';
import { injectReducer } from '@/store';
import { baseUrl } from '@/configs/app.config';
import { BsStar } from 'react-icons/bs';
import classNames from 'classnames';

injectReducer('artworkEditSlice', reducer)

const product = {
    name: 'Basic Tee 6-Pack',
    price: '$192',
    href: '#',
    breadcrumbs: [
        { id: 1, name: 'Men', href: '#' },
        { id: 2, name: 'Clothing', href: '#' },
    ],
    images: [
        {
            src: 'https://tailwindui.com/img/ecommerce-images/product-page-02-secondary-product-shot.jpg',
            alt: 'Two each of gray, white, and black shirts laying flat.',
        },
        {
            src: 'https://tailwindui.com/img/ecommerce-images/product-page-02-tertiary-product-shot-01.jpg',
            alt: 'Model wearing plain black basic tee.',
        },
        {
            src: 'https://tailwindui.com/img/ecommerce-images/product-page-02-tertiary-product-shot-02.jpg',
            alt: 'Model wearing plain gray basic tee.',
        },
        {
            src: 'https://tailwindui.com/img/ecommerce-images/product-page-02-featured-product-shot.jpg',
            alt: 'Model wearing plain white basic tee.',
        },
    ],
    colors: [
        { name: 'White', class: 'bg-white', selectedClass: 'ring-gray-400' },
        { name: 'Gray', class: 'bg-gray-200', selectedClass: 'ring-gray-400' },
        { name: 'Black', class: 'bg-gray-900', selectedClass: 'ring-gray-900' },
    ],
    sizes: [
        { name: 'XXS', inStock: false },
        { name: 'XS', inStock: true },
        { name: 'S', inStock: true },
        { name: 'M', inStock: true },
        { name: 'L', inStock: true },
        { name: 'XL', inStock: true },
        { name: '2XL', inStock: true },
        { name: '3XL', inStock: true },
    ],
    description:
        'The Basic Tee 6-Pack allows you to fully express your vibrant personality with three grayscale options. Feeling adventurous? Put on a heather gray tee. Want to be a trendsetter? Try our exclusive colorway: "Black". Need to add an extra pop of color to your outfit? Our white tee has you covered.',
    highlights: [
        'Hand cut and sewn locally',
        'Dyed with our proprietary colors',
        'Pre-washed & pre-shrunk',
        'Ultra-soft 100% cotton',
    ],
    details:
        'The 6-Pack includes two black, two white, and two heather gray Basic Tees. Sign up for our subscription service and be the first to get new, exciting colors, like our upcoming "Charcoal Gray" limited release.',
}
const reviews = { href: '#', average: 4, totalCount: 117 }



const ArtworkDetail = () => {

    const [selectedImage, setSelectedImage] = useState(0)

    const dispatch = useAppDispatch()

    const location = useLocation()

    const artworkData = useAppSelector(
        (state) => state.artworkEditSlice.data.artworkData
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
        <div className="bg-white">
            <div>

                {/* Product info */}
                <div className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">

                    <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
                        <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">{artworkData.title}</h1>
                    </div>

                    {/* Options */}
                    <div className="mt-4 lg:row-span-3 lg:mt-0">
                        <h2 className="sr-only">Artwork information</h2>
                        <div className="aspect-h-5 aspect-w-4 lg:aspect-h-4 lg:aspect-w-3 sm:overflow-hidden sm:rounded-lg">
                            <img
                                src={`${baseUrl}/uploads/artwork/${artworkData?.imgList?.[selectedImage]}`}
                                alt={artworkData?.imgList?.[0]}
                                className="h-full w-full object-cover object-center"
                            />
                        </div>
                        <p className="text-3xl tracking-tight text-gray-900 mt-2">&#8377;{artworkData.price}</p>

                        {/* Reviews */}
                        {/* <div className="mt-6">
                            <h3 className="sr-only">Reviews</h3>
                            <div className="flex items-center">
                                <div className="flex items-center">
                                    {[0, 1, 2, 3, 4].map((rating) => (
                                        <BsStar
                                            key={rating}
                                            className={classNames(
                                                reviews.average > rating ? 'text-gray-900' : 'text-gray-200',
                                                'h-5 w-5 flex-shrink-0'
                                            )}
                                            aria-hidden="true"
                                        />
                                    ))}
                                </div>
                                <p className="sr-only">{reviews.average} out of 5 stars</p>
                                <a href={reviews.href} className="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500">
                                    {reviews.totalCount} reviews
                                </a>
                            </div>
                        </div> */}

                        <form className="mt-10">
                            <button
                                type="submit"
                                className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                            >
                                Enquire
                            </button>
                        </form>
                    </div>

                    <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">

                        <div className="mt-10">
                            <h3 className="text-sm font-medium text-gray-900">Features</h3>

                            <div className="mt-4">
                                <ul role="list" className="list-disc space-y-2 pl-4 text-sm">
                                    <li className="text-gray-400">
                                        <span className="text-gray-600">{artworkData.medium}, {artworkData.sizeUnit === 'centimeter' ? `${artworkData.width}x${artworkData.height} cm` : `${artworkData.width}x${artworkData.height} inch`}</span>
                                    </li>
                                    <li className="text-gray-400">
                                        <span className="text-gray-600">{artworkData.category}</span>
                                    </li>
                                    <li className="text-gray-400">
                                        <span className="text-gray-600">{artworkData.deliveredAs}</span>
                                    </li>
                                    <li className="text-gray-400">
                                        <span className="text-gray-600">{artworkData.medium}</span>
                                    </li>
                                    <li className="text-gray-400">
                                        <span className="text-gray-600">{artworkData.isSold ? 'Sold' : 'Not Sold'}</span>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div className="mt-10">
                            <h2 className="text-sm font-medium text-gray-900">Details</h2>

                            <div className="mt-4 space-y-6">
                                <div className="text-base text-gray-900" dangerouslySetInnerHTML={{ __html: artworkData.description as TrustedHTML }} />
                            </div>
                        </div>
                        <div className='mt-4 flex gap-4 items-center'>
                            {artworkData?.imgList?.map((img, index) => (
                                <img onClick={() => setSelectedImage(index)} key={index} src={`${baseUrl}/uploads/artwork/${img}`} alt={img} className={classNames("object-cover h-full w-20 cursor-pointer filter saturate-150 contrast-120 hue-rotate-10 drop-shadow-md p-2 border rounded-xl", { 'border-orange-200': index === selectedImage })} />
                            ))}
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default ArtworkDetail;
