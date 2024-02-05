import Card from '@/components/ui/Card'
import { useAppSelector } from '../store'
import { CiMoneyBill, CiDollar } from "react-icons/ci";
import { AiOutlineHourglass } from "react-icons/ai";

type StatisticCardProps = {
    data?: number | string
    label: string
    valuePrefix?: string
    valueSuffix?: string
    icon?: React.ReactNode
    color: string
}

type StatisticProps = {
    projectAmount?: string
    estimatedTime?: string
    billableTime?: number
    serviceName: string,
    specificServiceName: string,
    technologyName: string,
}


const Heading = ({ text }: { text: string }) => <h6>{text}</h6>

const StatisticCard = ({
    data,
    label,
    valuePrefix,
    valueSuffix,
    icon,
    color
}: StatisticCardProps) => {
    return (
        <Card className='rounded-xl'>
            <div className='flex justify-between items-center'>
                <div>
                    <h4 className="font-semibold mb-4 text-sm">{label}</h4>
                    <h2 className="font-semibold mb-4 text-2xl">{valuePrefix}{data} {valueSuffix}</h2>
                </div>
                <div>
                    <span className={`text-4xl bg-${color}-400 inline-block p-3 rounded-full text-white`}>{icon}</span>
                </div>
            </div>
        </Card>
    )
}

const Statistic = ({ projectAmount, estimatedTime, billableTime, serviceName, specificServiceName, technologyName }: StatisticProps) => {

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatisticCard
                data={projectAmount}
                valuePrefix="$"
                label="Project Amount"
                icon={<CiDollar />}
                color='yellow'
            />
            <StatisticCard data={estimatedTime} valueSuffix='Hours' label="Estimated Time" icon={<AiOutlineHourglass />} color='pink' />
            <StatisticCard
                data={billableTime}
                valueSuffix='Hours'
                label="Billable Time"
                icon={<CiMoneyBill />}
                color='green'
            />
            <Card>
                <div className='flex items-center gap-2'>
                    <Heading text="Service" />
                    <label className='flex gap-4'>
                        {serviceName}
                    </label>
                </div>
                <div className='flex items-center gap-2'>
                    <Heading text="Specific Service" />
                    <label className='flex gap-4'>
                        {specificServiceName}
                    </label>
                </div>
                <div className='flex items-center gap-2'>
                    <Heading text="Technology" />
                    <label className='flex gap-4'>
                        {technologyName}
                    </label>
                </div>
            </Card>
        </div>
    )
}

export default Statistic
