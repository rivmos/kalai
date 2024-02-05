import { useState } from 'react';
import { Badge, Button, Card } from '@/components/ui'
import { FaTasks } from 'react-icons/fa'
import { TaskState } from '@/@types/project'
import Avatar from '@/components/ui/Avatar/Avatar';
import acronym from '@/utils/acronym';
import { COLORS } from '@/constants/chart.constant';

const CatalogueTaskCard = (props: { task: TaskState, index: number }) => {
    const { task, index } = props
    return (
        <Card bordered>
        <div className='flex justify-between'>
            <div className='flex items-center gap-2 w-52'>
                <div className='flex items-center bg-amber-400 p-2 rounded-full text-white'>
                    <FaTasks />
                </div>
                <span className='flex items-center gap-2 font-semibold'>
                    {task.title}
                </span>
            </div>

            <div className='flex items-center gap-2'>
                <span className='font-semibold'>Delivery:</span>
                <span>
                    {task.estimatedTime} Hrs
                </span>
            </div>

        </div>
        </Card>
    )
}

export default CatalogueTaskCard