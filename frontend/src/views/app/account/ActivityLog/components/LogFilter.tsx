import { useCallback } from 'react'
import classNames from 'classnames'
import Checkbox from '@/components/ui/Checkbox'
import Affix from '@/components/shared/Affix'
import {
    setSelected,
    setActivityIndex,
    // filterLogs,
    useAppDispatch,
    useAppSelector,
} from '../store'
import {
    // UPDATE_TICKET,
    COMMENT,
    COMMENT_MENTION,
    // ASSIGN_TICKET,
    // ADD_TAGS_TO_TICKET,
    // ADD_FILES_TO_TICKET,
    // CREATE_TICKET,
    PROJECT_CREATED,
    PROJECT_ASSIGNED,
    PROJECT_UPDATED,
    PROPOSAL_RECEIVED,
    PROPOSAL_SENT,
    TASK_CREATED,
    TASK_UPDATED
} from '../constants'
import type { CommonProps } from '@/@types/common'

type CategoryTitleProps = CommonProps

const commentCheckboxes = [
    { label: 'Comment on post', value: COMMENT },
    { label: 'Mentioned you', value: COMMENT_MENTION },
]

const ticketCheckboxes = [
    { label: 'Project Updated', value: PROJECT_UPDATED },
    { label: 'Project Assigned', value: PROJECT_ASSIGNED },
    { label: 'Project Created', value: PROJECT_CREATED },
    { label: 'Task Added', value: TASK_CREATED },
    { label: 'Task Updated', value: TASK_UPDATED },
]

const CategoryTitle = ({ children, className }: CategoryTitleProps) => {
    return (
        <h6
            className={classNames(
                'text-gray-900 uppercase tracking-wide font-semibold text-sm lg:text-xs',
                className
            )}
        >
            {children}
        </h6>
    )
}

const LogFilter = () => {
    const dispatch = useAppDispatch()
    const selectedType = useAppSelector(
        (state) => state.accountActivityLog.data.selectedType
    )
    const activityIndex = useAppSelector(
        (state) => state.accountActivityLog.data.activityIndex
    )

    const onFilterChange = useCallback(
        (selected: string[]) => {
            // dispatch(filterLogs({ filter: selected, activityIndex: 1 }))
            if (activityIndex !== 1) {
                dispatch(setActivityIndex(1))
            }
            dispatch(setSelected(selected))
        },
        [dispatch, activityIndex]
    )

    return (
        <div>
            <Affix className="hidden lg:block" offset={80}>
                <h5 className="mb-4">Filter Activity</h5>
                <Checkbox.Group
                    vertical
                    value={selectedType}
                    onChange={(value) => {
                        onFilterChange(value as string[])
                    }}
                >
                    <CategoryTitle className="mb-3">Ticket</CategoryTitle>
                    {ticketCheckboxes.map((checkbox) => (
                        <Checkbox
                            key={checkbox.value}
                            className="mb-4"
                            value={checkbox.value}
                        >
                            {checkbox.label}
                        </Checkbox>
                    ))}
                    <CategoryTitle className="mt-4 mb-3">Comment</CategoryTitle>
                    {commentCheckboxes.map((checkbox) => (
                        <Checkbox
                            key={checkbox.value}
                            className="mb-4"
                            value={checkbox.value}
                        >
                            {checkbox.label}
                        </Checkbox>
                    ))}
                </Checkbox.Group>
            </Affix>
        </div>
    )
}

export default LogFilter
