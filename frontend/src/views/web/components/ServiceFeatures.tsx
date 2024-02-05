import { FeatureCardState, FeatureDataState } from "../types/types"

const Features = ({ heading, largeHeading, subHeading, featuresData }: { heading: string, largeHeading: string, subHeading:string, featuresData: FeatureCardState[] }) => {
    const allFeatureCards = featuresData.map((f) => {
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
                            <h5>{heading}</h5>
                            <h2>{largeHeading}</h2>
                            <p>{subHeading}</p>
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
