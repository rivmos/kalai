import reducer from './store'
import { injectReducer } from '@/store'
import AdaptableCard from '@/components/shared/AdaptableCard'
import CategoryTable from './components/CategoryTable'
import CategoryTableTools from './components/CategoryTableTools'

injectReducer('categoryListSlice', reducer)

const CategoryList = () => {
    return (
        <AdaptableCard className="h-full" bodyClass="h-full">
            <div className="lg:flex items-center justify-between mb-4">
                <h3 className="mb-4 lg:mb-0">Categories</h3>
                <CategoryTableTools />
            </div>
            <CategoryTable />
        </AdaptableCard>
    )
}

export default CategoryList
