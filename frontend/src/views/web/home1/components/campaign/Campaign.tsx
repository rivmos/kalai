import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/pagination'
import { Pagination } from 'swiper/modules'
// import function to register Swiper custom elements
import { register } from 'swiper/element/bundle'
import { CampaignDataState } from '@/views/web/types/types'
// register Swiper custom elements
register()


export default function CampaignSlider({ data }: { data: CampaignDataState }) {

    return (
        <>
            <div className="campaign-slider-sec">
                <div className="container">
                    <div className="row">
                        <div className="col-md-4">
                            <h5>Campaigns</h5>
                            <h2>{data.heading}</h2>
                            <p>{data.subHeading}</p>
                        </div>
                        <div className="col-md-8">
                            <Swiper
                                slidesPerView={2}
                                slidesPerGroup={2}
                                pagination={{
                                    dynamicBullets: true,
                                }}
                                modules={[Pagination]}
                                className=""
                            >

                                {data.campaignCards.map(
                                    (item) => {
                                        return (
                                            <SwiperSlide key={item.id}>
                                                <div className={`inner-swiper maxscr relative`}>
                                                    <div className='absolute top-0 left-0'><img src={item.imgLink} className='rounded-[40px]' /></div>
                                                    <div className="div-inner">
                                                        <h6>{item.title}</h6>
                                                        <div className="">
                                                            <span>
                                                                UpTo
                                                            </span>
                                                            <h4>
                                                                {item.upto}
                                                            </h4>
                                                            <span>
                                                                {item.subTitle}
                                                            </span>
                                                        </div>

                                                        <ul>
                                                            {item.tags.map(
                                                                (tag) => {
                                                                    return (
                                                                        <li
                                                                            key={
                                                                                tag
                                                                            }
                                                                        >
                                                                            <a href="">
                                                                                {
                                                                                    tag
                                                                                }
                                                                            </a>
                                                                        </li>
                                                                    )
                                                                }
                                                            )}
                                                        </ul>
                                                    </div>
                                                </div>
                                            </SwiperSlide>
                                        )
                                    }
                                )}
                            </Swiper>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
