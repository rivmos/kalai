import { useMemo } from 'react'
import Avatar from '@/components/ui/Avatar'
import acronym from '@/utils/acronym'
import useTwColorByName from '@/utils/hooks/useTwColorByName'
import {
    HiTag,
    HiUserCircle,
    HiDocumentText,
    HiXCircle,
    HiTicket,
} from 'react-icons/hi'
import { MdAddTask } from "react-icons/md";
import {
    ADD_TAGS_TO_TICKET,
    ADD_FILES_TO_TICKET,
    UPDATE_TICKET,
    CREATE_TICKET,
    TASK_UPDATED,
    avatarType,
    iconType,
    PROJECT_CREATED,
    TASK_CREATED
} from '../constants'
import type { AvatarProps } from '@/components/ui/Avatar'

type TimelineAvatar = {
    data: {
        id: number,
        type: string
        body: string
        dateTime: number
        userName: string
        userImage?: string
        comment?: string
    }
}

const Icon = ({ type }: { type: string }) => {
    switch (type) {
        case ADD_TAGS_TO_TICKET:
            return <HiTag />
        case ADD_FILES_TO_TICKET:
            return <HiDocumentText />
        case TASK_UPDATED:
            return <HiXCircle />
        case PROJECT_CREATED:
            return <HiTicket />
        case TASK_CREATED:
            return <MdAddTask />
        default:
            return <HiUserCircle />
    }
}

const TimelineAvatar = ({ data }: TimelineAvatar) => {
    const color = useTwColorByName()

    const defaultAvatarProps: AvatarProps = useMemo(
        () => ({ size: 30, shape: 'circle' }),
        []
    )

    if (data && avatarType.includes(data.type)) {
        const avatarProps = data.userImage
            ? { src: data.userImage }
            : { className: `${color(data.userName || '')}` }

        return (
            <Avatar {...avatarProps} {...defaultAvatarProps}>
                {acronym(data.userName || '')}
            </Avatar>
        )
    }

    if (data && iconType.includes(data.type)) {
        return (
            <Avatar
                className="text-gray-700 bg-gray-200 dark:text-gray-100"
                icon={<Icon type={data.type} />}
                {...defaultAvatarProps}
            />
        )
    }

    return null
}

export default TimelineAvatar
