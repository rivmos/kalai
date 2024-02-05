import DatePicker from '@/components/ui/DatePicker'
import Button from '@/components/ui/Button'
import {
    setStartDate,
    setEndDate,
    getReportAnanlysisDashboardData,
    useAppSelector,
} from '../store'
import { useAppDispatch } from '@/store'
import { HiOutlineFilter } from 'react-icons/hi'
import dayjs from 'dayjs'
import { apiGetReportAnanlysisDashboardData } from '@/services/ReportsAnalysis'
import { useEffect } from 'react'

const dateFormat = 'MMM DD, YYYY'

const { DatePickerRange } = DatePicker

const ReportAnalysisDashboardHeader = () => {
    const dispatch = useAppDispatch()

    const startDate = useAppSelector(
        (state) => state.reportsananlysisDashboard.data.startDate
    )
    const endDate = useAppSelector((state) => state.reportsananlysisDashboard.data.endDate)

    const handleDateChange = async (value: [Date | null, Date | null]) => {
        const selecteddates = value[0]+','+value[1];
        //console.log(selecteddates)
        dispatch(setStartDate(dayjs(value[0]).unix()))
        dispatch(setEndDate(dayjs(value[1]).unix()))
        dispatch(getReportAnanlysisDashboardData({selectdate : selecteddates}))
    }

    const onFilter = () => {
        dispatch(getReportAnanlysisDashboardData())
    }

    return (
        <div className="lg:flex items-center justify-between mb-4 gap-3">
            <div className="mb-4 lg:mb-0">
                <h3>Reports Overview</h3>
                {/* <p>View your current Reports & Analysis</p> */}
            </div>
            <div className="flex flex-col lg:flex-row lg:items-center gap-3">
                <DatePickerRange
                    value={[
                        dayjs.unix(startDate).toDate(),
                        dayjs.unix(endDate).toDate(),
                    ]}
                    inputFormat={dateFormat}
                    size="sm"
                    onChange={handleDateChange}
                />
                {/* <Button size="sm" icon={<HiOutlineFilter />} onClick={onFilter}>
                    Filter
                </Button> */}
            </div>
        </div>
    )
}

export default ReportAnalysisDashboardHeader
