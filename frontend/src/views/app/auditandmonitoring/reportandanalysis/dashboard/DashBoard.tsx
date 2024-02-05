import React from 'react'
import reducer from "./store"
import { injectReducer } from '@/store'
import ReportAnalysisDashboardHeader from "./components/ReportAnalysisDashboardHeader"
import ReportAnalysisDashboardBody from "./components/ReportAnalysisDashboardBody"

injectReducer('reportsananlysisDashboard', reducer)

const reportsananlysisDashboard = () => {
    return (
        <div className="flex flex-col gap-4 h-full">
            <ReportAnalysisDashboardHeader />
            <ReportAnalysisDashboardBody />
        </div>
    )
}

export default reportsananlysisDashboard