import { SyntheticEvent, useState } from 'react';
import { Badge, Button, Card, Dropdown } from '@/components/ui'
import { FaTasks } from 'react-icons/fa'
import { RiskState, TaskState } from '@/@types/project'
import Avatar from '@/components/ui/Avatar/Avatar';
import acronym from '@/utils/acronym';
import { COLORS } from '@/constants/chart.constant';
// import TaskForm from './TaskForm';
import { IoIosEye } from "react-icons/io";
import { useAppSelector } from '../../store'
// import AssignedUserAvatar from './AssignedUserAvatar';
import { IoEyeOutline } from "react-icons/io5";
import { RiSkull2Line } from "react-icons/ri";
import shortenText from '@/utils/shortenText';
import AddRisk from './AddRisk';

const RiskCard = (props: { risk: RiskState }) => {
    const [dialogIsOpen, setIsOpen] = useState(false)
    const { risk} = props

    return (
        <Card bordered>
            <div className='flex justify-between'>
                <div className='flex items-center gap-2 w-52'>
                    <div className='flex items-center bg-red-400 p-2 rounded-full text-white'>
                        <RiSkull2Line />
                    </div>
                    <div className='flex flex-col'>
                    <span className='flex items-center gap-2 font-semibold capitalize'>
                        {risk.name && shortenText(risk.name)}
                    </span>
                    <label className='text-xs'>{risk.description && shortenText(risk.description)}</label>
                    </div>
                </div>

                <div className='flex items-center gap-2'>
                    <span className='font-semibold'>Delivery:</span>
                    <span>
                        {risk.riskImpact} Hrs
                    </span>
                </div>


                <div className='flex items-center gap-2'>
                        <span>
                        Assigned To :
                        </span>
                        {/* {risk.assignedUser ? <AssignedUserAvatar showAvatar userId={risk.assignedUser} /> : <span>No One</span>} */}

                </div>

                <div className='border-[1px] rounded-bl-3xl rounded-tr-3xl flex items-center px-12 gap-2'>
                    <Badge
                        badgeStyle={{
                            backgroundColor: COLORS[risk.status === 0 ? 2 : 4],
                        }}
                    />
                    {risk.status === 0 ? 'Open' : 'Closed'}
                </div>

                <div className='flex items-center'>
                    <Button variant="default" className='relative !p-2 border-0' onClick={() => setIsOpen(true)} ><IoEyeOutline className='text-xl' /></Button>
                </div>
                <AddRisk openAddRisk={dialogIsOpen} setOpenAddRisk={setIsOpen} risk={risk} />
            </div>
        </Card>
    )
}



export default RiskCard