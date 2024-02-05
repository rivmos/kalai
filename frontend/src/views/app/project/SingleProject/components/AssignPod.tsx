import Dialog from '@/components/ui/Dialog'
import { useEffect, type Dispatch, type MouseEvent, type SetStateAction, useState, useRef, ChangeEvent } from 'react'
import { PodState, setPod, useAppDispatch, useAppSelector } from '../store'
import { Avatar, Button, Input, Notification, ScrollBar, Tabs, toast } from '@/components/ui'
import { PodjinnByServiceState, JinnByServiceState } from '@/@types/project'
import AvatarGroup from '@/components/ui/Avatar/AvatarGroup'
import { apiAssignPodjinn } from '@/services/ProjectService'
import EmptyState from './EmptyState'
import { HiOutlineSearch } from 'react-icons/hi'
import { debounce } from 'lodash'
import wildCardSearch from '@/utils/wildCardSearch'
import { UsersAvatarGroup } from '@/components/shared'

type AssignPodjinnPayloadState = {
    projectId: number
    podjinnId: number
    podId: number
}

const { TabContent, TabList, TabNav } = Tabs

const AssignPod = ({ dialogIsOpen, setIsOpen }: { dialogIsOpen: boolean, setIsOpen: Dispatch<SetStateAction<boolean>> }) => {

    const dispatch = useAppDispatch()

    const [currentTab, setCurrentTab] = useState<string>('podjinns')

    const assignPodjinn = async (data: AssignPodjinnPayloadState) => {
        const response = await apiAssignPodjinn<{ status: string, message: string, data: { podjinn: PodjinnByServiceState, jinns: JinnByServiceState[] } }, AssignPodjinnPayloadState>(data)
        return response.data
    }

    const handlePodjinnClick = async (data: AssignPodjinnPayloadState) => {
        const success = await assignPodjinn({ podId: data.podId, podjinnId: data.podjinnId, projectId: data.projectId })
        setIsOpen(false)
        if (success.data) {
            dispatch(setPod(success.data))
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


    const projectId = useAppSelector(state => state.project.data.projectOverview.id)
    const podList = useAppSelector(state => state.project.data.podList)
    const podjinnsByService = useAppSelector(state => state.project.data.podjinnsByService)
    const loading = useAppSelector(state => state.project.data.loading)

    const onDialogClose = (e: MouseEvent) => {
        setIsOpen(false)
    }

    const PodCard = ({ pod }: { pod: PodState }) => {
        return (

            <div onClick={() => handlePodjinnClick({ podId: pod.id, podjinnId: 0, projectId: projectId })} className="w-36 flex flex-col h-36 justify-center items-center cursor-pointer bg-gray-100 rounded-xl shadow duration-300 hover:bg-white hover:shadow-xl">
                <span className="mt-6 text-sm ?leading-5 font-semibold text-center">{pod.podName}</span>
                <AvatarGroup className='mt-2' chained maxCount={2} omittedAvatarProps={{ shape: 'circle', size: 36 }}>
                    {
                        pod.assignedJinns.map(jinn => <Avatar key={jinn.id} size={36} shape='circle' src={jinn.image} />)
                    }
                </AvatarGroup>
            </div>
        )
    }

    const PodjinnCard = ({ podjinn }: { podjinn: PodjinnByServiceState }) => {
        return (
            <div onClick={() => handlePodjinnClick({ podId: 0, podjinnId: podjinn.id, projectId: projectId })} className="w-36 flex flex-col h-36 justify-center items-center cursor-pointer bg-gray-100 rounded-xl shadow duration-300 hover:bg-white hover:shadow-xl">
                <Avatar shape='circle' size={28} src={podjinn.image} />
                <span className="mt-6 text-sm ?leading-5 font-semibold text-center">{podjinn.name}</span>
            </div>
        )
    }

    const inputRef = useRef(null)
    const [filteredPods, setFilteredPods] = useState<PodState[]>([...podList])
    const [filteredPodjinns, setFilteredPodjinns] = useState<PodjinnByServiceState[]>([...podjinnsByService])

    const debounceFn = debounce(handleDebounceFn, 500)

    function handleDebounceFn(query: string) {
        const podData = podList.filter(pod => (pod.podName).trim().toLowerCase().includes(query.toLowerCase().trim()))
        const podjinnsData = podjinnsByService.filter(podjinn => (podjinn.name).trim().toLowerCase().includes(query.toLowerCase().trim()))
        currentTab === 'podjinns' ? setFilteredPodjinns(query ? podjinnsData : podjinnsByService) : setFilteredPods(query ? podData : podList)
    }

    const onSearch = (e: ChangeEvent<HTMLInputElement>) => {
        debounceFn(e.target.value)
    }

    const data = currentTab === 'podjinns' ? podjinnsByService : podList

    return (
        <Dialog
            isOpen={dialogIsOpen}
            onClose={onDialogClose}
            onRequestClose={onDialogClose}
            width={800}
        >
            <div className='p-4'>
                <div className="text-center mb-4">
                    <h4 className="mb-2">Assign {currentTab === "pods" ? 'Pod' : 'Podjinn'}</h4>
                    <p>{currentTab === "pods" ? 'Assign a new pod to this project.' : 'Assign a new podjinn to this project.'}</p>
                </div>
                <Tabs defaultValue="tab1" value={currentTab} variant="pill" onChange={(value) => setCurrentTab(value)}>
                    <TabList className='flex justify-center mb-4'>
                        <TabNav value="podjinns">Podjinns</TabNav>
                        <TabNav value="pods">Pods</TabNav>
                    </TabList>
                    <Input
                        ref={inputRef}
                        prefix={<HiOutlineSearch className="text-lg" />}
                        placeholder="Quick search"
                        onChange={onSearch}
                    />
                    <p className="font-semibold uppercase text-xs my-4">
                        {currentTab === "podjinns" ? `${filteredPodjinns.length} Podjinns` : `${filteredPods.length} Pods`} available
                    </p>
                    <div>
                        <TabContent value="podjinns">
                            <div className="mt-4">
                                <div className="overflow-y-auto h-80 mb-6">
                                    <ScrollBar>
                                        {filteredPodjinns.length > 0 ? (
                                            <div className='grid grid-cols-4 gap-4'>
                                                {
                                                    filteredPodjinns?.map(podjinn => <PodjinnCard key={podjinn.id} podjinn={podjinn} />)
                                                }
                                            </div>) : (
                                            <EmptyState text='Podjinn' />
                                        )}
                                    </ScrollBar>
                                </div>
                            </div>
                        </TabContent>

                        <TabContent value="pods">
                            <div className="mt-4">
                                <div className="overflow-y-auto h-[400px] mb-6">
                                    <ScrollBar>
                                        {filteredPods.length > 0 ? (<div className='grid grid-cols-4 gap-4'>
                                            {
                                                filteredPods?.map(pod => <PodCard key={pod.id} pod={pod} />)
                                            }
                                        </div>) : (
                                            <EmptyState text='Pod' />
                                        )}
                                    </ScrollBar>
                                </div>
                            </div>
                        </TabContent>
                    </div>
                </Tabs>
            </div>
        </Dialog>
    )
}

export default AssignPod