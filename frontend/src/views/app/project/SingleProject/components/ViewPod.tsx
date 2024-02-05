import Dialog from '@/components/ui/Dialog'
import { useState, type Dispatch, type MouseEvent, type SetStateAction } from 'react'
import { PodjinnByServiceState, JinnByServiceState } from '@/@types/project'
import { setPod, useAppDispatch, useAppSelector } from '../store'
import { Avatar, Button, Notification, toast } from '@/components/ui'
import classNames from 'classnames'
import { apiAddPeople } from '@/services/ProjectService'
import acronym from '@/utils/acronym'
import { IoEyeOutline } from 'react-icons/io5'
import { Link } from 'react-router-dom'

const ViewPod = ({ isViewOpen, setIsViewOpen }: { isViewOpen: boolean, setIsViewOpen: Dispatch<SetStateAction<boolean>> }) => {

    const [selectedUsers, setSelectedUsers] = useState<number[]>([])

    const projectOverview = useAppSelector(state => state.project.data.projectOverview)
    const podjinnsByService = useAppSelector(state => state.project.data.podjinnsByService)
    const jinnsByService = useAppSelector(state => state.project.data.jinnsByService)

    const allUsers = [...podjinnsByService, ...jinnsByService]

    const onDialogClose = (e: MouseEvent) => {
        setIsViewOpen(false)
    }

    const UserCard = ({ person, role }: { person: PodjinnByServiceState, role: string }) => {

        return (
            <div className={classNames("cursor-pointer w-36 flex flex-col h-36 justify-center items-center bg-gray-100 rounded-xl shadow duration-300", { "bg-indigo-300 text-white": selectedUsers.includes(person.id) })}>
                <Avatar icon={acronym(person.name)} shape='circle' size={28} src={person.image} />
                <span className="mt-4 text-sm ?leading-5 font-semibold text-center capitalize">{person.name}</span>
                <span className="mt-1 text-xs text-center">{role}</span>
                <span className="mt-1 text-blue-500 text-xs cursor-pointer">
                    <Link to={`/web/users/profile/${person.id}`}>
                        View
                    </Link>
                </span>
            </div>
        )
    }


    return (
        <Dialog
            isOpen={isViewOpen}
            onClose={onDialogClose}
            onRequestClose={onDialogClose}
            width={800}
        >
            <div className='p-4'>
                <h4 className='mb-4 px-4'>Assigned Pod</h4>
                <div className='grid grid-cols-4 gap-4 overflow-y-auto max-h-[600px] px-4 pb-4'>
                    {
                        [...projectOverview.jinns, ...projectOverview.podjinn]?.map(person => {
                            const role = projectOverview.jinns.map(jinn => jinn.id).includes(person.id) ? '(Jinn)' : projectOverview.podjinn.map(podjinn => podjinn.id).includes(person.id) ? '(Podjinn)' : ''
                            return (
                                <UserCard key={person.id} person={person} role={role} />
                            )
                        })
                    }
                </div>
            </div>
        </Dialog >
    )
}

export default ViewPod