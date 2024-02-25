import reducer from './store'
import { injectReducer } from '@/store'
import AdaptableCard from '@/components/shared/AdaptableCard'
import ArtistTable from './components/ArtistTable'
import ArtistTableTools from './components/ArtistTableTools'

injectReducer('artistListSlice', reducer)

const ArtistList = () => {
    return (
        <AdaptableCard className="h-full" bodyClass="h-full">
            <div className="lg:flex items-center justify-between mb-4">
                <h3 className="mb-4 lg:mb-0">Artists</h3>
                <ArtistTableTools />
            </div>
            <ArtistTable />
        </AdaptableCard>
    )
}

export default ArtistList
