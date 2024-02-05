import reducer from './store'
import { injectReducer } from '@/store'
import AdaptableCard from '@/components/shared/AdaptableCard'
import LoglistTable from './components/LoglistTable'

injectReducer('salesProductList', reducer)

const LogList = () => {
    return (
        <AdaptableCard className="h-full" bodyClass="h-full">
            <LoglistTable />
        </AdaptableCard>
    )
}

export default LogList
