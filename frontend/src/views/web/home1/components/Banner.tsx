import reducer from '../store'
import { injectReducer } from '@/store';
import { BannerDataState } from '../../types/types';

injectReducer('homePage', reducer)

const Banner = ({ data }: { data: BannerDataState }) => {
  return (
    <div className="home-banner">
      <div className="container">
        <h2>{data.largeHeading}</h2>
        {<p>{data.subHeading}</p>}
        <div className="banner-btn">
          {<a className='btn-txt' href={data.btnLink}>{data.btnText} <img src="/img/web/icons/btn-right-arrow.png" alt="" /></a>}
        </div>
        <div className="podjin-baner-img">
          <img src={data.image} alt="" />
          <span>Award Wining Agency</span>
        </div>
      </div>
    </div>
  )
}

export default Banner
