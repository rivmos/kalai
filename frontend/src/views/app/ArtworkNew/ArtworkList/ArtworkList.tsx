import reducer from './store'
import { injectReducer } from '@/store'
import AdaptableCard from '@/components/shared/AdaptableCard'
import ArtworkTable from './components/ArtworkTable'
import ArtworkTableTools from './components/ArtworkTableTools'

injectReducer('artworkListSlice', reducer)

const CategoryList = () => {
    return (
        <AdaptableCard className="h-full" bodyClass="h-full">
            <div className="lg:flex items-center justify-between mb-4">
                <h3 className="mb-4 lg:mb-0">Artworks</h3>
                <ArtworkTableTools />
            </div>
            <ArtworkTable />
        </AdaptableCard>
    )
}

export default CategoryList
