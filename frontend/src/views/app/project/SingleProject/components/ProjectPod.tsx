import { useState } from 'react'
import { Avatar, Button, Card } from '@/components/ui';
import { useAppSelector } from '../store';
import { IoMdAdd } from "react-icons/io";
import AssignPod from './AssignPod';
import AddPeople from './AddPeople';
import classNames from 'classnames'

interface ProjectPodProps {
    className?: string
}


const ProjectPod = ({
    className
}: ProjectPodProps) => {

    const [openAssignPodDialog, setOpenAssignPodDialog] = useState<boolean>(false)
    const [addPeopleOpen, setAddPeopleOpen] = useState<boolean>(false)
    const podjinn = useAppSelector(state => state.project.data.projectOverview.podjinn)
    const jinns = useAppSelector(state => state.project.data.projectOverview.jinns)
    
    return (
        <>
            <Card className={className}>
                <h4>Pod Name</h4>
                {
                    podjinn?.length === 0
                        ?
                        <Button onClick={() => setOpenAssignPodDialog(true)} variant='default' className='border-dashed w-full mt-3 h-80 border-[1px] rounded-md flex justify-center items-center text-xl'>
                            <IoMdAdd className='text-xl' />
                            <span>Assign Pod</span>
                        </Button>
                        :
                        <div className="mt-6 space-y-2">
                            <h6>Podjinn</h6>

                            <Card bordered className='p-0 flex items-center'>
                                <div className='flex gap-2 items-center'>
                                    <Avatar shape='circle' size='sm' src={podjinn[0]?.image}></Avatar>
                                    <span className='capitalize'>{podjinn[0]?.name}</span>
                                </div>
                            </Card>

                            <h6>Jinns</h6>
                            <div className='grid grid-cols-2 gap-4'>
                            {
                                jinns.map(jinn => {
                                    return (
                                        <Card key={jinn.id} bordered className='p-0 flex items-center gap-2'>
                                            <div className='flex gap-2 items-center'>
                                                <Avatar shape='circle' size='sm' src={jinn.image}></Avatar>
                                                <span className='capitalize'>{jinn.name}</span>
                                            </div>
                                        </Card>
                                    )
                                })
                            }
                            <Card onClick={() => setAddPeopleOpen(true)} className={classNames('border-dashed w-full h-18 border-[1px] rounded-md flex justify-center items-center text-sm', {'col-span-2':jinns.length%2 === 0})}>
                                <div className={'flex gap-2 items-center cursor-pointer'}>
                                <IoMdAdd className='text-xl' />
                                <span>{jinns.length === 0 ? 'Add People' : 'Add More People'}</span>
                                </div>
                            </Card>
                            </div>
                        </div>
                }

            </Card>
            <AssignPod setIsOpen={setOpenAssignPodDialog} dialogIsOpen={openAssignPodDialog} />
            <AddPeople setIsOpen={setAddPeopleOpen} dialogIsOpen={addPeopleOpen} />
        </>
    )
}

export default ProjectPod
