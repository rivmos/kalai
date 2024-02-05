import Menu from '@/components/ui/Menu'
import classNames from 'classnames'
import { Dispatch, SetStateAction } from 'react'

const LeadSteps = ({
    steps, setCurrentStep, currentStep
}: {steps: {label:string, value:number, icon:React.ReactNode}[], setCurrentStep: Dispatch<SetStateAction<string>>, currentStep:string}) => {

    return (
        <Menu variant="transparent" className="px-2 !h-full">
            {steps.map((step) => (
                <Menu.MenuItem
                    key={step.value}
                    eventKey={step.value.toString()}
                    className={classNames(`mb-2`, { '!bg-indigo-50 !text-indigo-800': currentStep === step.label})}
                    isActive={currentStep === step.label}
                    onSelect={() => setCurrentStep(step.label)}
                >
                    <span>{step.icon}</span>
                    <span>{step.label}</span>
                </Menu.MenuItem>
            ))}
        </Menu>
    )
}

export default LeadSteps
