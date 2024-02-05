import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'
//import Chart from '@/components/shared/Chart'
import Chart from 'react-apexcharts'
import { COLORS } from '@/constants/chart.constant'

type SalesReportProps = {
    data?: {
        series?: {
            name: string
            data: number[]
        }[]
        categories?: string[]
    }
    className?: string
}

const SalesReport = ({ className, data = {} }: SalesReportProps) => {
   
    return (
        <Card className={className}>
            <div className="flex items-center justify-between">
                <h4>Task Overview</h4>
                {/* <Button size="sm">Export Report</Button> */}
            </div>
            <Chart
            options={{
                plotOptions: {
                    bar: {
                        horizontal: false,
                        columnWidth: '55%',
                        borderRadius: 4,
                    },
                },
                colors: COLORS,
                dataLabels: {
                    enabled: false,
                },
                stroke: {
                    show: true,
                    width: 2,
                    colors: ['transparent'],
                },
                xaxis: {
                    categories: [
                        'Tasks Progress Status',
                    ],
                },
                fill: {
                    opacity: 1,
                },
                tooltip: {
                    y: {
                        formatter: (val) => `${val} `,
                    },
                },
            }}
            series={data.series}
            height={300}
            type="bar"
        />
           {/*  <Chart
                series={data.series}
                xAxis={data.categories}
                height="380px"
                customOptions={{ legend: { show: false } }}
            /> */}
        </Card>
    )
}

export default SalesReport
