import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import Timeline from '@/components/ui/Timeline'
import Event from '@/views/app/account/ActivityLog/components/Event'
import TimelineAvatar from '@/views/app/account/ActivityLog/components/TimeLineAvatar'
import { useNavigate } from 'react-router-dom'
import isEmpty from 'lodash/isEmpty'

type ActivitiesProps = {
    data?: {
        id:number
        type: string
        dateTime: number
        body:string
        userId:number
        userName: string
        userImage?: string
    }[],
    className:string
}


const Activities = ({ data = [], className }: ActivitiesProps) => {
    const navigate = useNavigate()

    const onViewAllActivity = () => {
        navigate('/app/account/activity')
    }

    return (
        <Card className={className}>
            <div className="flex items-center justify-between mb-6">
                <h4>Activities</h4>
                <Button size="sm" onClick={onViewAllActivity}>
                    View All
                </Button>
            </div>
            <div className="mt-6">
                <Timeline>
                    {isEmpty(data) ? (
                        <Timeline.Item>No Activities</Timeline.Item>
                    ) : (
                        data.slice(0,15).map((event, index) => (
                            <Timeline.Item
                                key={event.type + index}
                                media={<TimelineAvatar data={event} />}
                            >
                                <Event compact data={event} />
                            </Timeline.Item>
                        ))
                    )}
                </Timeline>
            </div>
        </Card>
    )
}

export default Activities
