import React, { ChangeEvent, Dispatch, SetStateAction, SyntheticEvent, useState } from 'react'
import { CreateProjectState } from './CreateProject'
import Checkbox from '@/components/ui/Checkbox'
import { Alert, Button, Card, Notification, Segment, Switcher, Tooltip } from '@/components/ui'
import NewMilestoneForm from './NewMilestoneForm';
import { StepSixResponse } from './CreateProject';
import { PaymentTermsFormState, useAppDispatch, useAppSelector } from '../store';
import { updatePaymentFormField } from '../store';
import { StickyFooter } from '@/components/shared';
import { apiSetPaymentTerms } from '@/services/ProjectService';
import toast from '@/components/ui/toast'
import { useNavigate } from 'react-router-dom';

const PaymentTerms = ({ userSelection, setUserSelection }: { userSelection: CreateProjectState, setUserSelection: Dispatch<SetStateAction<CreateProjectState>> }) => {

    const handleSelectionChange = (field: PaymentTermsFormState[keyof PaymentTermsFormState]) => (evt: any) => {
        dispatch(updatePaymentFormField({ field, value: evt }));
    }

    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const form = useAppSelector(state => state.projectList.data.paymentTermsForm)
    const submittedProject = useAppSelector(state => state.projectList.data.submittedProject)

    const [discount, setDiscount] = useState(0)
    const [isSubmitting, setIsSubmitting] = useState({draft:false, pipeline:false, publish:false, ongoing:false})
    const [dialogIsOpen, setIsOpen] = useState(false)

    const handleDiscountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = parseInt(e.target.value, 10);
        // Ensure that the value is between 0 and 59
        value = isNaN(value) ? 0 : Math.min(Math.max(0, value), 100);
        setDiscount(value)
    };

    const addDiscount = () => {
        dispatch(updatePaymentFormField({ field: 'discountPercentage', value: discount }))
    }

    const removeDiscount = () => {
        setDiscount(0)
        dispatch(updatePaymentFormField({ field: 'discountPercentage', value: 0 }))
    }

    const addPaymentTerms = async (data: PaymentTermsFormState) => {
        const response = await apiSetPaymentTerms<{status:boolean, message:string}, PaymentTermsFormState>(data)
        return response.data
    }

    const totalTasksTime = submittedProject.tasks.map(task => Number(task.estimatedTime)).reduce((acc, curr) => acc + curr)

    const allTaskAddedAsMilestone = form.milestones.flatMap(ml => ml.tasks).length !== submittedProject.tasks.length

    const paymentTermsValidation = () => {
        if(form.billingOptions.includes('mfp')){
            return false
        }
        if(form.billingOptions.includes('hourly') && form.hourlyBillingOptions.length >= 1){
            return false
        }
        if(form.billingOptions.includes('milestone') && !allTaskAddedAsMilestone){
            return false
        }
        return true
    }

    const isDisabled = paymentTermsValidation() || Object.values(isSubmitting).includes(true) // second condition is to disable other two buttons when one is loading - using paymentTermsValidation() logic

    const onSubmit = async (buttonAction:'isPipeline' | 'isPublished' | 'isOngoing' | '') => {
        buttonAction === 'isPipeline' ? setIsSubmitting({...isSubmitting, pipeline:true}) : buttonAction === 'isPublished' ? setIsSubmitting({...isSubmitting, publish:true}) : buttonAction === 'isOngoing' ? setIsSubmitting({...isSubmitting, ongoing:true}) : setIsSubmitting({...isSubmitting, draft:true})
        const callToAction = () => buttonAction === 'isPipeline' ? addPaymentTerms({...form, isPipeline:1, totalTime:totalTasksTime}) : buttonAction === 'isPublished' ? addPaymentTerms({...form, isPublished:1, totalTime:totalTasksTime}) : buttonAction === 'isOngoing' ? addPaymentTerms({...form, isOngoing:1, totalTime:totalTasksTime}) : addPaymentTerms({...form, totalTime:totalTasksTime})
        const success = await callToAction()

        if (success.status) {
        setIsSubmitting({draft:false, pipeline:false, publish:false, ongoing:false})
            toast.push(
                <Notification
                    title={'Successfull'}
                    type="success"
                    duration={2500}
                >
                    Payment Terms Added
                </Notification>,
                {
                    placement: 'bottom-end',
                }
            )
            buttonAction === 'isPipeline' ? navigate('/app/pipeline/leads') : buttonAction === 'isPublished' ? navigate('/app/projects/allprojects') : buttonAction === 'isOngoing' ? navigate('/app/projects/allprojects') : navigate('/app/projects/draftprojects')
            
        }
        else{
            setIsSubmitting({draft:false, pipeline:false, publish:false, ongoing:false})
        }
    }

    // const toggleEscrow = () => {
    //     setUserSelection({ ...userSelection, escrowEnabled: !userSelection.escrowEnabled, discountPercentage: 0 })
    // }

    // const onBillingOptionsChange = (options: (string | number)[], e: SyntheticEvent) => {
    //     setUserSelection({ ...userSelection, billingOptions: options })
    // }


    return (
        <div className='space-y-4'>

            <div className='grid grid-cols-2 gap-4'>

                <Card bordered>
                    <h4 className='mb-4'>Escrow Option</h4>
                    <Checkbox onChange={handleSelectionChange('escrowEnabled')}>
                        {!userSelection.escrowEnabled ? 'Activate Escrow?' : 'Escrow Activated'}
                    </Checkbox>
                </Card>

                <Card bordered>
                    <h4 className='mb-4'>Billing Options</h4>
                    <Checkbox.Group value={userSelection.billingOptions} onChange={handleSelectionChange('billingOptions')}>
                        <Checkbox value="hourly" className='select-none'>Hourly</Checkbox>
                        <Checkbox value="milestone" className='select-none'>Milestone</Checkbox>
                        <Checkbox value="mfp" className='select-none'>Make Full Payment</Checkbox>
                    </Checkbox.Group>
                </Card>

            </div>

            <div className='grid grid-cols-3 gap-4'>
                {/* {form.escrowEnabled && <Card bordered>
                    <h4 className='mb-4'>Escrow Discount</h4>
                    {
                        (form.discountPercentage != 0) && (
                            <div className='mt-4'>
                                <Alert className='!py-3 mb-2' type='success'>{`${form.discountPercentage}% Discount Added`}</Alert>
                                <Button onClick={removeDiscount}>Remove</Button>
                            </div>
                        )
                    }
                    {
                        (!form.discountPercentage) && (

                            <div className='mt-4'>
                                <input className='rounded-lg border-[1px] border-gray-200' value={discount} onChange={handleDiscountChange} />
                                <Button onClick={addDiscount}>Add Discount</Button>
                            </div>
                        )
                    }
                </Card>} */}
                {
                    (form.billingOptions.includes('hourly')) && (
                        <Card bordered>
                            <h4 className='mb-4'>Hourly Billing Options</h4>
                            <Segment
                                className="w-full"
                                selectionType='multiple'
                                onChange={handleSelectionChange('hourlyBillingOptions')}
                            >
                                <div className="grid grid-cols-3 gap-4 w-full">
                                    {['daily', 'weekly', 'monthly'].map((priority) => (
                                        <Segment.Item key={priority} value={String(priority)}>
                                            {priority[0].toUpperCase() + priority.slice(1)}
                                        </Segment.Item>
                                    ))}
                                </div>
                            </Segment>
                        </Card>
                    )
                }
                {
                    (form.billingOptions.includes('milestone')) && (
                        <Card bordered>
                            <h4 className='mb-4'>Milestones : {form.milestones.length === 0 ? 'No' : `${form.milestones.length}`} Milestones Added</h4>
                            <div>
                                {form.milestones.map(milestone =>
                                    <li>{milestone.title} - {milestone.time} hrs</li>
                                )}
                            </div>
                            {allTaskAddedAsMilestone && <div className='grid grid-cols-1'>
                                <Button onClick={() => setIsOpen(true)}>+ Milestone</Button>
                            </div>}
                        </Card>
                    )
                }

            </div>

            <StickyFooter
                stickyClass="border-t bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
            >
                <div className="mt-4 text-right space-x-2">
                    <Button loading={isSubmitting.draft} disabled={isDisabled} onClick={() => onSubmit('')} variant='twoTone'>
                        Move To Draft
                    </Button>
                    <Tooltip title="Only Client Accessible">                                    
                        <Button loading={isSubmitting.pipeline} disabled={isDisabled} onClick={() => onSubmit('isPipeline')} variant='twoTone'>
                            Create Pipeline
                        </Button>
                    </Tooltip>
                    <Button loading={isSubmitting.publish} disabled={isDisabled} onClick={() => onSubmit('isPublished')} variant='twoTone'>
                        Publish Project
                    </Button>
                    <Button loading={isSubmitting.publish} disabled={isDisabled} onClick={() => onSubmit('isOngoing')} variant='twoTone'>
                        Move To Ongoing
                    </Button>
                </div>
            </StickyFooter>

            <NewMilestoneForm userSelection={userSelection} setUserSelection={setUserSelection} dialogIsOpen={dialogIsOpen} setIsOpen={setIsOpen} />
        </div>
    )
}

export default PaymentTerms