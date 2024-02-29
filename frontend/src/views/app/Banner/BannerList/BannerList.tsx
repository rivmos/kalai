import reducer from './store'
import { injectReducer } from '@/store'
import AdaptableCard from '@/components/shared/AdaptableCard'
import BannerTable from './components/BannerTable'
import BannerTableTools from './components/BannerTableTools'

injectReducer('bannerListSlice', reducer)

const BannerList = () => {
    return (
        <AdaptableCard className="h-full" bodyClass="h-full">
            <div className="lg:flex items-center justify-between mb-4">
                <h3 className="mb-4 lg:mb-0">Banner Images</h3>
                <BannerTableTools />
            </div>
            <BannerTable />
        </AdaptableCard>
    )
}

export default BannerList
