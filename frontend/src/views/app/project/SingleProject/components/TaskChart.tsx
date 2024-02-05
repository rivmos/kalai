import React from 'react'
import { Card } from '@/components/ui';
import Badge from '@/components/ui/Badge'
import Chart from '@/components/shared/Chart'
import { COLORS } from '@/constants/chart.constant'

interface TaskChartProps {
    className?: string
    data?: {
        labels: string[]
        data: number[]
    }
}

const TaskChart = ({
    className,
    data = {
        labels: ['Backlog', 'In Progress', 'At Risk', 'Complete'],
        data: [351, 246, 144, 83],
    },
}: TaskChartProps) => {
    return (
        <Card className={className}>
            <h4>Task Status</h4>
            <div className="mt-6">
                {data.data.length > 0 && (
                    <>
                        <Chart
                            donutTitle={`${data.data.reduce(
                                (a, b) => a + b,
                                0
                            )}`}
                            donutText="Total Tasks"
                            series={data.data}
                            customOptions={{ labels: data.labels }}
                            type="donut"
                        />
                        {data.data.length === data.labels.length && (
                            <div className="mt-6 grid grid-cols-2 gap-4 max-w-[250px] mx-auto">
                                {data.labels.map((value, index) => (
                                    <div
                                        key={value}
                                        className="flex items-center gap-1"
                                    >
                                        <Badge
                                            badgeStyle={{
                                                backgroundColor: COLORS[index],
                                            }}
                                        />
                                        <span className="font-semibold">
                                            {value}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </>
                )}
            </div>
        </Card>
    )
}

export default TaskChart
