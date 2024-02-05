import reducer, { getManualLogList, initialTableData, useAppDispatch } from './store'
import { injectReducer } from '@/store'
import AdaptableCard from '@/components/shared/AdaptableCard'
import ManualLogTable from './components/ManualLogTable'
import ManualLogTableTools from './components/ManualLogTableTools'
import { useEffect } from 'react'

injectReducer('ManualLogList', reducer)

const ManualLogList = () => {
    return (
        <AdaptableCard className="h-full" bodyClass="h-full">
            <div className="lg:flex items-center justify-between mb-4">
                <h3 className="mb-4 lg:mb-0">Manual Logs</h3>
                <ManualLogTableTools />
            </div>
            <ManualLogTable />
        </AdaptableCard>
    )
}

export default ManualLogList
