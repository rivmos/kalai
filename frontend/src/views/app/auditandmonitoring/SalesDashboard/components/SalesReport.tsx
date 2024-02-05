import React from 'react';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import Chart from '@/components/shared/Chart';

type SalesReportProps = {
    data?: {
        series?: {
            name: string;
            data: number[];
        }[];
        categories?: string[];
    };
    className?: string;
};

const SalesReport = ({ className, data = {} }: SalesReportProps) => {
    // Static data for testing purposes
    const staticData = {
        series: [
            { name: 'Product A', data: [100, 150, 200, 120, 180] },
            { name: 'Product B', data: [50, 80, 120, 90, 150] },
        ],
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
    };

    return (
        <Card className={className}>
            <div className="flex items-center justify-between">
                <h4>Activity Report</h4>
            </div>
            <Chart
                series={data.series || staticData.series}
                xAxis={data.categories || staticData.categories}
                height="380px"
                customOptions={{ legend: { show: false } }}
            />
        </Card>
    );
};

export default SalesReport;
