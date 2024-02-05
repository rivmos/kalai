import { FeatureDataState } from "../types/types"

const Features = ({ data }: { data: FeatureDataState }) => {
    const allFeatureCards = data.featureCards.map((f) => {
        return (
            <div className='col-md-3 select-none' key={f.id}>
                <div key={f.id} className='box-card'>
                    <div className='icon-img'>
                        <img src={f.image} />
                    </div>
                    <h4>{f.title}</h4>
                    <p>{f.description}</p>
                    <a href="" className="btn-txt">Learn More</a>
                </div>
            </div>
        )
    })

    return (
        <div className="feature-sec">
            <div className="container">
                <div className="what-head">
                    <div className="row">
                        <div className="col-md-6">
                            <h5>{data.heading}</h5>
                            <h2>{data.largeHeading}</h2>
                            <p>{data.subHeading}</p>
                        </div>
                    </div>
                </div>
                <div className="row">
                    {allFeatureCards}
                </div>
            </div>
        </div>
    )
}

export default Features
