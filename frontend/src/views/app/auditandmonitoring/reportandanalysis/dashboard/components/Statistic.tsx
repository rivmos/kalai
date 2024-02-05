import Card from '@/components/ui/Card'
import { NumericFormat } from 'react-number-format'
import GrowShrinkTag from '@/components/shared/GrowShrinkTag'
import { useAppSelector } from '../store'
import dayjs from 'dayjs'

type StatisticCardProps = {
    data?: {
        value: number
        growShrink: number
    }
    label: string
    valuePrefix?: string
    date: number
}

type StatisticProps = {
    data?: {
        billable?: {
            value: number
            growShrink: number
        }
        nonbillable?: {
            value: number
            growShrink: number
        }
        wageshour?: {
            value: number
            growShrink: number
        }
    }
}

const StatisticCard = ({
    data = { value: 0, growShrink: 0 },
    label,
    valuePrefix,
    date,
}: StatisticCardProps) => {
    return (
        <Card>
            <h6 className="font-semibold mb-4 text-sm">{label}</h6>
            <div className="flex justify-between items-center">
                <div>
                    <h3 className="font-bold">
                        <NumericFormat
                            thousandSeparator
                            displayType="text"
                            value={data.value}
                            prefix={valuePrefix}
                        />
                    </h3>
                    <p>
                        Current months prior {/* to{' '} */}
                       {/*  <span className="font-semibold">
                            {dayjs(date).format('DD MMM')}
                        </span> */}
                    </p>
                </div>
                {<GrowShrinkTag value={data.growShrink} suffix="%" />}
            </div>
        </Card>
    )
}

const Statistic = ({ data = {} }: StatisticProps) => {
    const startDate = useAppSelector(
        (state) => state.reportsananlysisDashboard.data.startDate
    )

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <StatisticCard
                data={data.billable}
                valuePrefix=""
                label="Billable Hours"
                date={startDate}
            />
            <StatisticCard data={data.nonbillable} label="Non Billable Hours" date={startDate} />
            <StatisticCard
                data={data.billable}
                valuePrefix=""
                label="Wages Hour"
                date={startDate}
            />
        </div>
    )
}

export default Statistic
