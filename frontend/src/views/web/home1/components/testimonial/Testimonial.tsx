import React, { useEffect } from 'react'
import { Swiper, SwiperSlide, SwiperRef } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/navigation'
import { Navigation } from 'swiper/modules'

import { useRef } from 'react'
import TestimonialContent from './TestimonialContent'
import { getHome, useAppSelector } from '../../store'
import { injectReducer, useAppDispatch } from '@/store'
import { ReviewSectionDataState } from '@/views/web/types/types'

export default function Testimonial({data} : {data: ReviewSectionDataState}) {

    const slideRef = useRef<SwiperRef>(null)

    return (
        <>
            <div className="testimonial-sec">
                <div className="container">
                    <div className="testimonial-inner">
                        <div className="row">
                            <div className="col-md-6">
                                <div className="testimonail-alider">
                                    <Swiper
                                        ref={slideRef}
                                        modules={[Navigation]}
                                        className=""
                                    >
                                        {data.cards.map(card => (
                                            <SwiperSlide key={card.id}>
                                                <p>
                                                    “{card.testimonial}”
                                                </p>
                                                <h6>{card.name}</h6>
                                                <span>
                                                    {card.position}
                                                </span>
                                            </SwiperSlide>
                                        ))}
                                    </Swiper>

                                    <button
                                        className="prev"
                                        onClick={() =>
                                            slideRef?.current?.swiper.slidePrev()
                                        }
                                    >
                                        {'<'}
                                    </button>
                                    <button
                                        className="next"
                                        onClick={() =>
                                            slideRef?.current?.swiper.slideNext()
                                        }
                                    >
                                        {'>'}
                                    </button>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <TestimonialContent data={data}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
