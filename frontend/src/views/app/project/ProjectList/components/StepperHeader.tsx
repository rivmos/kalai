import { Steps } from '@/components/ui'
import React from 'react'

const StepperHeader = (props:{step:number}) => {
    return (
        <div>
            <Steps current={props.step}>
                <Steps.Item title="Service" />
                <Steps.Item title="Specific Service" />
                <Steps.Item title="Technology" />
                <Steps.Item title="Project Details" />
                <Steps.Item title="Tasks" />
                <Steps.Item title="Payment Terms" />
            </Steps>
        </div>
    )
}

export default StepperHeader