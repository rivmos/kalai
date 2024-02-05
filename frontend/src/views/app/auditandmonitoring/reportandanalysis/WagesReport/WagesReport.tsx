import reducer from './store'
import { injectReducer } from '@/store'
import AdaptableCard from '@/components/shared/AdaptableCard'
import WagesTable from './components/WagesTable'
import WagesTableTools from './components/WagesTableTools'

injectReducer('reportsanalysisWagesList', reducer)

const WagesList = () => {
    return (
        <AdaptableCard className="h-full" bodyClass="h-full">
            <div className="lg:flex items-center justify-between mb-4">
                <h3 className="mb-4 lg:mb-0">Wages Report</h3>
                <WagesTableTools />
            </div>
            <WagesTable />
        </AdaptableCard>
    )
}

export default WagesList
