import { Link } from 'react-router-dom'
import { homePageData } from '@/mock/data/webHomeData'
import { OfferDataState } from '../../types/types'

const Services = ({data} : {data : OfferDataState}) => {
    const cardsData = data.cards
    const allServicesCards = cardsData.map((s) => {
        return (
            <div className="col-md-4" key={s.id}>
                <Link to={s.path}>
                    <div className="inner-box">
                        <div className="what-box-head">
                            <h6>{s.title}</h6>
                            <span>
                                <img className="" src={s.image} alt="" />
                            </span>
                        </div>
                        <div className="desp">
                            <p>{s.description}</p>
                        </div>
                    </div>
                </Link>
            </div>
        )
    })


    return (
        <div className="What-we-do">
            <div className="container">
                <div className="what-head">
                    <div className="row">
                        <div className="col-md-6">
                            <h5>{data.heading ?? homePageData.offer.heading}</h5>
                            <h2>{data.largeHeading ?? homePageData.offer.largeHeading}</h2>
                        </div>
                        <div className="col-md-6">
                            <p>
                            {data.subHeading ?? homePageData.offer.subHeading}
                            </p>
                            <a href="" className="btn-txt">
                            {data.btnText}
                            </a>
                        </div>
                    </div>
                </div>
                <div className="what-we-sec">
                    <div className="row">{ allServicesCards}</div>
                </div>
            </div>
        </div>
    ) 
}

export default Services
