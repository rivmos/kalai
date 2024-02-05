import { Avatar } from '@/components/ui'
import acronym from '@/utils/acronym'
import React from 'react'
import { useAppSelector } from '../store'

const AssignedUserAvatar = ({ userId, showAvatar}: { userId: number, showAvatar?:boolean }) => {

    const podjinn = useAppSelector(state => state.project.data.projectOverview.podjinn)
    const jinns = useAppSelector(state => state.project.data.projectOverview.jinns)

    const assignedUser = [...podjinn, ...jinns].find(user => user.id == userId)
    return (
        <span className='flex items-center gap-2'>
            {showAvatar && <Avatar shape='circle' size={28} icon={acronym(assignedUser?.name)} src={assignedUser?.image} />}
            <span className='capitalize'>{assignedUser?.name}</span>
        </span>
    )
}

export default AssignedUserAvatar