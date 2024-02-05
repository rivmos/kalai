import { useEffect } from 'react'
import Loading from '@/components/shared/Loading'
import Statistic from './Statistic'
import ReportAnalysisReport from './ReportAnalysisReport'
import ReportAnalysisByCategories from './ReportAnalysisByCategories'
import LatestOrder from './LatestOrder'
import TopProduct from './TopProduct'
import { getReportAnanlysisDashboardData, useAppSelector } from '../store'
import { useAppDispatch } from '@/store'

const ReportAnalysisDashboardBody = () => {
    const dispatch = useAppDispatch()

    const dashboardData = useAppSelector(
        (state) => state.reportsananlysisDashboard.data.dashboardData
    )
    //console.log(dashboardData)
    const loading = useAppSelector((state) => state.reportsananlysisDashboard.data.loading)

    useEffect(() => {
        fetchData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const fetchData = () => {
        dispatch(getReportAnanlysisDashboardData())
    }

    return (
        <Loading loading={loading}>
            {<Statistic data={dashboardData?.statisticData} />}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <ReportAnalysisReport
                    data={dashboardData?.salesReportData}
                    className="col-span-2"
                />
                <ReportAnalysisByCategories
                    data={dashboardData?.salesByCategoriesData}
                />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <LatestOrder
                    data={dashboardData?.latestOrderData}
                    className="lg:col-span-2"
                />
                <TopProduct data={dashboardData?.topProductsData} />
            </div>
        </Loading>
    )
}

export default ReportAnalysisDashboardBody
