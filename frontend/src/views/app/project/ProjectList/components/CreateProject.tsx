import { useEffect, useState } from 'react'
import Button from '@/components/ui/Button'
import classNames from 'classnames'
import { useConfig } from '@/components/ui/ConfigProvider'
import { Alert, Avatar, Notification, Tooltip } from '@/components/ui'
import CreateProjectForm from './CreateProjectForm'
import { StickyFooter } from '@/components/shared'
import reducer, { getPodjinnsByService, getServices, getSpecificServices, useAppDispatch, useAppSelector } from '../store'
import { SegmentValue } from '@/components/ui/Segment/context'
import { injectReducer } from '@/store'
import NewTaskForm from './NewTaskForm'
import { IoMdAdd } from "react-icons/io";
import TaskList from './TaskList'
import toast from '@/components/ui/toast'
import { apiCreateProject } from '@/services/ProjectService'
import PaymentTerms from './PaymentTerms'
import { updatePaymentFormField, addSubmittedProjectData } from '../store'
import StepperHeader from './StepperHeader'
import { PodjinnByServiceState, TaskState } from '@/@types/project'
import Dialog from '@/components/ui/Dialog'

injectReducer('projectList', reducer)

export type MilestoneState = {
    title: string,
    description: string,
    tasks: number[],
    time: number
}


export type CreateProjectState = {
    selectedIndustry: number,
    selectedService: number,
    selectedSpecificService: number,
    selectedTechnology: number,
    title: string,
    description: string,
    taskCategory: string,
    taskList: TaskState[],
    escrowEnabled: Boolean,
    discountPercentage: number,
    billingOptions: (string | number)[],
    hourlyBillingOptions: SegmentValue
    milestones: MilestoneState[]
    totalTime: number
    assignPodjinn: number
}


export type StepSixResponse = {
    status: boolean,
    message: string,
    data: {
        projectId: string,
        taskCategoryId: number
        tasks:
        {
            id: number,
            title: string,
            description: string,
            estimatedTime: string,
        }[]
    }
}


const PodjinnCard = ({ podjinn }: { podjinn: PodjinnByServiceState }) => {
    return (
        <div className="w-36 flex flex-col h-36 justify-center items-center bg-gray-100 rounded-xl shadow duration-300 hover:bg-white hover:shadow-xl">
            <Avatar shape='circle' size={28} src={podjinn.image} />
            <span className="mt-6 text-sm ?leading-5 font-semibold text-center">{podjinn.name}</span>
        </div>
    )
}


const OptionCard = ({ name, onClick, isActive }: { name?: string, onClick: () => void, isActive: boolean }) => {
    const { themeColor, primaryColorLevel } = useConfig()
    return (
        <div onClick={onClick} className="box transition-all duration-200">
            <div className={classNames("inner-box transition-all duration-200", { "active": isActive })}>
                <span>{name}</span>
            </div>
        </div>
    )
}

const OptionCardSkeleton = () => {
    return (
        <div className='border-[1px] box rounded-lg p-2'>
            <div className="inner-box animate-pulse">
                <div className="h-3 bg-gray-200 rounded-full dark:bg-gray-700 mt-2 mb-4"></div>
                <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px] mb-2.5"></div>
                <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
                <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[330px] mb-2.5"></div>
                <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[300px] mb-2.5"></div>
                <span className="sr-only">Loading...</span>
            </div>
        </div>
    )
}


const CreateProject = () => {
    const [step, setStep] = useState(0)
    const [error, setError] = useState('')
    const [dialogIsOpen, setIsOpen] = useState(false)
    const [openAssignDialog, setOpenAssignDialog] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [submittedProject, setSubmittedProject] = useState<StepSixResponse['data']>({
        projectId: '',
        taskCategoryId: 0,
        tasks: []
    })

    const openDialog = () => {
        setIsOpen(true)
    }

    const [userSelection, setUserSelection] = useState<CreateProjectState>({
        selectedIndustry: 0,
        selectedService: 0,
        selectedSpecificService: 0,
        selectedTechnology: 0,
        title: '',
        description: '',
        taskCategory: '',
        taskList: [],
        escrowEnabled: false,
        discountPercentage: 0,
        billingOptions: [],
        hourlyBillingOptions: [],
        milestones: [],
        totalTime: 0,
        assignPodjinn: 0
    })

    const onChange = (nextStep: number) => {
        if (nextStep < 0) {
            setStep(0)
        } else if (nextStep > 5) {
            setStep(4)
        } else {
            setStep(nextStep)
        }
    }

    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(getServices())
    }, [])

    useEffect(() => {
        dispatch(getSpecificServices(userSelection.selectedService))
        dispatch(getPodjinnsByService(userSelection.selectedService))
    }, [userSelection.selectedService])


    const loading = useAppSelector(state => state.projectList.data.loading)
    const services = useAppSelector(state => state.projectList.data.services)
    const specificServices = useAppSelector(state => state.projectList.data.specificServices)
    const technologies = useAppSelector(state => state.projectList.data.technologies)
    const podjinnsByService = useAppSelector(state => state.projectList.data.podjinnsByService)

    const addProject = async (data: CreateProjectState) => {
        const response = await apiCreateProject<StepSixResponse, CreateProjectState>(data)
        return response.data
    }

    const onSubmit = async () => {
        setIsSubmitting(true)
        const tasksTotalTime = userSelection.taskList.map(task => task.estimatedTime).reduce((partialSum, a) => partialSum + a, 0);
        const projectToSubmit = { ...userSelection, totalTime: tasksTotalTime }
        const success = await addProject(projectToSubmit)
        setSubmittedProject(success.data)
        if (success.data) {
            setIsSubmitting(false)
            dispatch(updatePaymentFormField({ field: 'projectId', value: success.data.projectId }))
            dispatch(addSubmittedProjectData(success.data))
            onNext()
            toast.push(
                <Notification
                    title={'Successfuly added'}
                    type="success"
                    duration={2500}
                >
                    Project Successfuly Added
                </Notification>,
                {
                    placement: 'bottom-end',
                }
            )
        }
        else {
            setIsSubmitting(false)
            setError('Project Could Not Be Submitted!')
        }
    }


    const onNext = () => onChange(step + 1)

    const onPrevious = () => onChange(step - 1)

    const handleServiceSelection = (service: { name: string, id: number }, concernedKey: string) => {
        if (concernedKey === 'selectedSpecificService') {
            setUserSelection({ ...userSelection, taskCategory: service.name, [concernedKey]: service.id })
        }
        else {
            setUserSelection({ ...userSelection, [concernedKey]: service.id })
        }
    }

    const handleDeleteTask = (taskTitle: string) => {
        const filteredTaskCategories = userSelection.taskList.filter(task => task.title != taskTitle)
        setUserSelection({ ...userSelection, taskList: filteredTaskCategories })
    }

    const validateStep = (step: number) => {
        switch (step) {
            case 0:
                if (!userSelection.selectedService) {
                    setError('Please Select Service First!')
                    return false;
                }
                break;
            case 1:
                if (!userSelection.selectedSpecificService) {
                    setError('Please Select Specific Service First!')
                    return false;
                }
                break;
            case 2:
                if (!userSelection.selectedTechnology) {
                    setError('Please Select Technology First!')
                    return false;
                }
                break;
            case 3:
                if (!userSelection.title || !userSelection.description) {
                    setError('Enter Project Details!')
                    return false;
                }
                break;
            case 4:
                if (!userSelection.taskList.length) {
                    setError('Please Add A Task First!')
                    return false;
                }
                if (submittedProject.projectId === '') {
                    return false;
                }
                break;
            default:
                // Handle unknown step
                return false;
        }

        // Proceed to the next step
        onNext();
        if (error) {
            setError('')
        }
        return true;
    };

    return (
        <div>
            <h3 className='mb-4'>Create Project</h3>
            <StepperHeader step={step} />
            <div className="steps-sec">
                {error && <Alert closable onClose={() => setError('')} className='mb-8'>{error}</Alert>}
                <div className='grid grid-cols-6 gap-6'>
                    {(services.length === 0 && step === 0) && Array.from({ length: 56 }).map((_, index) => (
                        <OptionCardSkeleton key={index} />
                    ))}
                </div>
                <div className='step-box'>
                    {step === 0 && <>
                        <h3 className='head'>Select Service</h3>
                        {services.map(service => {
                            return (
                                <OptionCard key={service.id} isActive={service.id === userSelection.selectedService} onClick={() => handleServiceSelection(service, 'selectedService')} name={service.name} />
                            )
                        })}
                    </>}
                    {step === 1 && <>
                        <h3 className='head'>Select Specific Service</h3>
                        {specificServices.map(specificService => {
                            return (
                                <OptionCard key={specificService.id} isActive={specificService.id === userSelection.selectedSpecificService} onClick={() => { handleServiceSelection(specificService, 'selectedSpecificService') }} name={specificService.name} />
                            )
                        })}
                    </>}
                    {step === 2 && <>
                        <h3 className='head'>Select Technology</h3>
                        {technologies.length > 0 ? technologies.map(technology => {
                            return (
                                <OptionCard key={technology.id} isActive={technology.id === userSelection.selectedTechnology} onClick={() => handleServiceSelection(technology, 'selectedTechnology')} name={technology.name} />
                            )
                        }) : <OptionCard isActive={true} onClick={() => handleServiceSelection({ name: 'default', id: 0 }, 'selectedTechnology')} name='Default' />}
                    </>}
                </div>
                {step === 3 &&
                    <div className='pd-sec'>
                        <h3 className='head two'>Project Details</h3>
                        <div className="row">
                            <div className="col-md-6">
                                <div className='input-field'>{services.find(service => userSelection.selectedService === service.id)?.name}</div>
                                <div className='input-field'>{specificServices.find(specificService => userSelection.selectedSpecificService === specificService.id)?.name}</div>
                                <div className='input-field'>{technologies.find(technology => userSelection.selectedTechnology === technology.id)?.name}</div>
                                <CreateProjectForm userSelection={userSelection} setUserSelection={setUserSelection} />
                            </div>
                            <div className="col-md-6">
                                <img src="/img/create-project/project-details-img.png" alt="" className='imgg' />
                            </div>
                        </div>
                    </div>
                }
                {step === 4 &&
                    <> <h3 className='mb-1'>{specificServices.find(ss => ss.id === userSelection.selectedSpecificService)?.name}</h3>
                        <div className='flex justify-between items-center'>
                            {step === 4 && <div className='text-base px-4 py-2 rounded-xl bg-green-100 text-green-500'>
                                Approx. Estimation : ${userSelection.taskList.reduce((acc, sum) => { return acc + sum.estimatedTime }, 0) * 30}
                            </div>
                            }
                            <div className="task-right-btn">
                                <div className='mr-2'>
                                    {!userSelection.assignPodjinn ? <Button variant="default" className='flex gap-2 items-center' onClick={() => setOpenAssignDialog(true)}>Assign Podjinn<IoMdAdd /></Button> : <Button variant="default" className='flex gap-2 items-center'>{<Avatar shape='circle' size={28} src={podjinnsByService.find(podjinn => podjinn.id === userSelection.assignPodjinn)?.image} />}{podjinnsByService.find(podjinn => podjinn.id === userSelection.assignPodjinn)?.name}</Button>}
                                </div>
                                <Dialog
                                    isOpen={openAssignDialog}
                                    onClose={() => setOpenAssignDialog(false)}
                                    onRequestClose={() => setOpenAssignDialog(false)}
                                >
                                    <Tooltip title="Only Client Accessible">
                                        <div className='flex flex-col gap-2'>
                                            {
                                                podjinnsByService.map(podjinn => <PodjinnCard podjinn={podjinn} /> )
                                            }
                                        </div>
                                    </Tooltip>
                                </Dialog>
                                <Button variant="default" className='flex gap-2 items-center' onClick={openDialog}>Task<IoMdAdd /></Button>
                            </div>
                        </div>
                        <div>
                            {userSelection.taskList.length != 0 && <>
                                <div className='mt-4 flex flex-col gap-4'>
                                    <TaskList userSelection={userSelection} handleDeleteTask={handleDeleteTask} />
                                </div>
                            </>}

                        </div>
                        <NewTaskForm userSelection={userSelection} setUserSelection={setUserSelection} dialogIsOpen={dialogIsOpen} setIsOpen={setIsOpen} handleDeleteTask={handleDeleteTask} />
                    </>
                }
                {step === 5 &&
                    <>
                        <h3 className='head two'>Payment Terms</h3>
                        <PaymentTerms userSelection={userSelection} setUserSelection={setUserSelection} />
                    </>
                }
                {step < 5 && <StickyFooter
                    stickyClass="border-t bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
                >
                    <div className="text-right flex items-center justify-end gap-2">
                        {step !== 0 && <div><Button className="mx-2" disabled={step === 0} onClick={() => { onPrevious(); setError('') }}>Previous</Button>

                        </div>
                        }
                        {step === 0 && <Tooltip title="You Need Premium Subscription For This">
                            <Button
                                className="mx-2"
                                disabled={step === 0}
                                onClick={onPrevious}
                            >
                                Select Multiple Services?
                            </Button>
                        </Tooltip>}
                        <Button disabled={(step === 5 && userSelection.taskList.length === 0) || loading === true} loading={isSubmitting} variant="solid" onClick={() => {
                            validateStep(step)
                            // onNext()
                            if (step === 4) {
                                onSubmit()
                            }
                        }}>
                            {step === 5 ? 'Submit' : 'Next'}
                        </Button>
                    </div>
                </StickyFooter>}
            </div>
        </div>
    )
}

export default CreateProject
