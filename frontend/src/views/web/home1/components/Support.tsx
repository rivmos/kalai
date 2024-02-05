import { ContactDataState } from '../../types/types';
export default function Support({data} : {data : ContactDataState}) {
    return (
        <div className="support-sec">
            <div className="container">
                <div className="support-sec-inner">
                    <div className="row">
                        <div className="col-md-8">
                            <h3>
                                {data.title}
                            </h3>
                        </div>
                        <div className="col-md-4">
                            <div className="txt">
                                <p>
                                {data.message}
                                
                                </p>
                                <a href={`tel:${data.phoneNumber}`}>{data.phoneNumber}</a>
                                <a href={data.buttonLink} className="btn">
                                {data.buttonText}{' '}
                                    <img
                                        src="/img/web/icons/btn-right-arrow.png"
                                        alt=""
                                    ></img>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
