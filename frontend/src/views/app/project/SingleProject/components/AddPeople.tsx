import Dialog from '@/components/ui/Dialog'
import { useState, type Dispatch, type MouseEvent, type SetStateAction, ChangeEvent, useRef } from 'react'
import { PodjinnByServiceState, JinnByServiceState } from '@/@types/project'
import { setPod, useAppDispatch, useAppSelector } from '../store'
import { Avatar, Button, Input, Notification, ScrollBar, toast } from '@/components/ui'
import classNames from 'classnames'
import { apiAddPeople } from '@/services/ProjectService'
import acronym from '@/utils/acronym'
import { HiOutlineSearch } from 'react-icons/hi'
import { debounce } from 'lodash'

type AddPeoplePayloadState = {
    projectId: number
    users: number[]
}

const AddPeople = ({ dialogIsOpen, setIsOpen }: { dialogIsOpen: boolean, setIsOpen: Dispatch<SetStateAction<boolean>> }) => {

    const dispatch = useAppDispatch()

    const addPeople = async (data: AddPeoplePayloadState) => {
        const response = await apiAddPeople<{ status: string, message: string, data: { jinns: JinnByServiceState[] } }, AddPeoplePayloadState>(data)
        return response.data
    }

    const onSubmit = async () => {
        const success = await addPeople({ users: selectedUsers, projectId: projectOverview.id })
        setIsOpen(false)
        if (success.data) {
            dispatch(setPod({ podjinn: projectOverview.podjinn[0], jinns: [...projectOverview.jinns, ...success.data.jinns] }))
            setSelectedUsers([])
            toast.push(
                <Notification
                    title={success.status ? "Success" : "Failed"}
                    type={success.status ? "success" : "danger"}
                    duration={2500}
                >
                    {success.message}
                </Notification>,
                {
                    placement: 'bottom-end',
                }
            )
        }
    }

    const [selectedUsers, setSelectedUsers] = useState<number[]>([])

    const projectOverview = useAppSelector(state => state.project.data.projectOverview)
    const podList = useAppSelector(state => state.project.data.podList)
    const podjinnsByService = useAppSelector(state => state.project.data.podjinnsByService)
    const jinnsByService = useAppSelector(state => state.project.data.jinnsByService)
    const loading = useAppSelector(state => state.project.data.loading)

    const allUsers = [...podjinnsByService, ...jinnsByService]

    const onDialogClose = (e: MouseEvent) => {
        setIsOpen(false)
    }

    const UserCard = ({ person, alreadyInPod, role }: { person: PodjinnByServiceState, alreadyInPod: boolean, role: string }) => {
        const handleUserClick = (userId: number) => {
            const isSelected = selectedUsers.includes(userId)
            if (!alreadyInPod && !isSelected) {
                setSelectedUsers([...selectedUsers, userId])
            }
            else {
                setSelectedUsers(selectedUsers.filter(id => id !== userId));
            }
        }

        return (
            <div onClick={() => handleUserClick(person.id)} className={classNames("cursor-pointer w-36 flex flex-col h-36 justify-center items-center bg-gray-100 rounded-xl shadow duration-300", { "hover:bg-white hover:shadow-xl": !alreadyInPod && !selectedUsers.includes(person.id) }, { "bg-indigo-100": alreadyInPod }, { "bg-indigo-300 text-white": selectedUsers.includes(person.id) })}>
                <Avatar icon={acronym(person.name)} shape='circle' size={28} src={person.image} />
                <span className="mt-6 text-sm ?leading-5 font-semibold text-center capitalize">{person.name}</span>
                <span className="mt-6 text-xs text-center">{role}</span>
            </div>
        )
    }

    const [filteredUsers, setFilterUsers] = useState<PodjinnByServiceState[]>([])
    const inputRef = useRef(null)

    const debounceFn = debounce(handleDebounceFn, 500)

    function handleDebounceFn(query: string) {
        const usersData = allUsers.filter(user => (user.name).trim().toLowerCase().includes(query.toLowerCase().trim()))
        setFilterUsers(usersData as PodjinnByServiceState[])
    }

    const onSearch = (e: ChangeEvent<HTMLInputElement>) => {
        debounceFn(e.target.value)
    }


    return (
        <Dialog
            isOpen={dialogIsOpen}
            onClose={onDialogClose}
            onRequestClose={onDialogClose}
            width={800}
        >
            <div className="text-center mb-4">
                <h4>Assign More Members</h4>
                {/* <p>Assign a new podjinn to this project.</p> */}
            </div>
            <Input
                ref={inputRef}
                prefix={<HiOutlineSearch className="text-lg" />}
                placeholder="Quick search"
                onChange={onSearch}
            />
            <p className="font-semibold uppercase text-xs my-4">
                {`${allUsers.length} Members`} available
            </p>
            <div>
                <div className="overflow-y-auto h-[320px] mb-6">
                    <ScrollBar>
                        <div className='grid grid-cols-4 gap-4'>
                            {
                                filteredUsers?.map(person => {
                                    const alreadyInPod = projectOverview.podjinn.map(item => item.id).includes(person.id) || projectOverview.jinns.map(item => item.id).includes(person.id)
                                    const role = projectOverview.jinns.map(jinn => jinn.id).includes(person.id) ? '(Jinn)' : projectOverview.podjinn.map(podjinn => podjinn.id).includes(person.id) ? '(Podjinn)' : ''
                                    return (
                                        <UserCard key={person.id} person={person} alreadyInPod={alreadyInPod} role={role} />
                                    )
                                })
                            }
                        </div>
                    </ScrollBar>
                </div>
                <Button disabled={selectedUsers.length === 0} className='mt-4 ml-4' onClick={onSubmit}>{selectedUsers.length > 1 ? 'Add Users' : 'Add User'}</Button>
            </div>
        </Dialog >
    )
}

export default AddPeople