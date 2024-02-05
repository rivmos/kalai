import RepDetail from './RepDetail'
import LeadSource from './LeadSource'
import LeadDetail from './LeadDetail'
import ProjectDetail from './ProjectDetail'
import Association from './Association'
import LeadSteps from './LeadSteps'
import { Suspense, useState } from 'react'
import { AdaptableCard } from '@/components/shared'
import { MdOutlineCoPresent, MdOutlineSource, MdOutlineDetails, MdOutlineTaskAlt, MdOutlineContacts } from "react-icons/md";
import { Card } from '@/components/ui'

const steps = [
    { label: 'Representative Detail', value: 0, component: <RepDetail />, icon: <MdOutlineCoPresent /> },
    { label: 'Lead Source', value: 1, component: <LeadSource />, icon: <MdOutlineSource /> },
    { label: 'Lead Detail', value: 2, component: <LeadDetail />, icon: <MdOutlineDetails /> },
    { label: 'Project Detail', value: 3, component: <ProjectDetail />, icon: <MdOutlineTaskAlt /> },
    { label: 'Association', value: 4, component: <Association />, icon: <MdOutlineContacts /> },
]

const LeadOverview = () => {
    const [currentStep, setCurrentStep] = useState<string>('Representative Detail')
    return (
        <div className="grid lg:grid-cols-5 xl:grid-cols-3 2xl:grid-cols-5 gap-4 h-full">

            <Card bordered>
                <div className="2xl:col-span-1 xl:col-span-1 lg:col-span-2 !px-0">
                    <LeadSteps steps={steps} currentStep={currentStep} setCurrentStep={setCurrentStep} />
                </div>
            </Card>

            <div className='2xl:col-span-4 lg:col-span-3 xl:col-span-2 py-2'>
                <Suspense fallback={<></>}>
                    {steps.map(step => {
                        return (
                            <div key={step.label}>
                                {
                                    step.label === currentStep && step.component
                                }
                            </div>
                        )
                    })}
                </Suspense>
            </div>
        </div>
    )
}

export default LeadOverview