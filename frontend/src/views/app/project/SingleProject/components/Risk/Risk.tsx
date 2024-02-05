import { Button } from '@/components/ui'
import React, { useState } from 'react'
import { HiOutlinePlusCircle } from 'react-icons/hi'
import AddRisk from './AddRisk'
import { useAppSelector } from '../../store'
import RiskCard from './RiskCard'
import RiskActionBar from './RiskActionBar'

const Risk = () => {
    const [openAddRisk, setOpenAddRisk] = useState<boolean>(false)
    const risks = useAppSelector(state => state.project.data.projectOverview.risks)
    return (
        <div>
            <AddRisk openAddRisk={openAddRisk} setOpenAddRisk={setOpenAddRisk} />
            <RiskActionBar />
            <div className='flex flex-col gap-4'>
                {
                    risks.map(risk => <RiskCard risk={risk} />)
                }
            </div>
            <div className='flex justify-end mt-2'>
                <Button
                    size="sm"
                    variant="twoTone"
                    icon={<HiOutlinePlusCircle />}
                    onClick={() => setOpenAddRisk(true)}
                >
                    Add Risk
                </Button>
            </div>
        </div>
    )
}

export default Risk