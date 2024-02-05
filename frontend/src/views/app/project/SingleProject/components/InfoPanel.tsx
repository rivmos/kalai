import { Card } from '@/components/ui';

interface InfoPanelProps {
    className?: string
    serviceName: string,
    specificServiceName: string,
    technologyName: string,
}

const Heading = ({ text }: { text: string }) => <h6>{text}</h6>

const InfoPanel = ({
    className,
    serviceName,
    specificServiceName,
    technologyName
}: InfoPanelProps) => {
    return (
        <Card className={className}>
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
    )
}

export default InfoPanel