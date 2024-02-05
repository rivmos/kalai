import { useState, useEffect } from 'react'
import { FormItem, FormContainer } from '@/components/ui/Form'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import Select from '@/components/ui/Select'
import Avatar from '@/components/ui/Avatar'
import hooks from '@/components/ui/hooks'
import { Field, Form, Formik, FieldProps } from 'formik'
import { HiCheck } from 'react-icons/hi'
import { components, MultiValueGenericProps, OptionProps } from 'react-select'
import {
    getManualLogList,
    setFilterData,
    initialTableData,
    //putProject,
    createManualLog,
    toggleNewManualLogDialog,
    useAppDispatch,
    useAppSelector,
} from '../store'
import cloneDeep from 'lodash/cloneDeep'
import * as Yup from 'yup'
import { values } from 'lodash'
import DatePicker from '@/components/ui/DatePicker'
import { CgUserList } from 'react-icons/cg'
import Radio from '@/components/ui/Radio'
import toast from '@/components/ui/toast'
import Notification from '@/components/ui/Notification'
import dayjs from 'dayjs'
import { apiCreateManualLog } from '@/services/ReportsAnalysis'

type FormModel = {
    meeting_type: string
    start_time: string
    end_time: string
    description_meeting: string
    meetingtime: string
    meeting_agenda: string
    billable: number
    project_list: string
    choose_participant: {
        value: string
        label: string
    }[]
}

type TaskCount = {
    completedTask?: number
    totalTask?: number
}



const { useUniqueId } = hooks

const validationSchema = Yup.object().shape({
     meeting_type: Yup.string().required('Meeting Type required'),
     project_list: Yup.string().required('Project List required'),
     choose_participant: Yup.array().min(1, 'Choose Participant required'),
     start_time: Yup.string().required('Start Time required'),
     end_time: Yup.string().required('End Time required'),
     description_meeting: Yup.string().required('Description required'),
    //projects: Yup.array().min(1, 'Assignee required'),
    //rememberMe: Yup.bool(),
})

const NewManualLogForm = ({onDialogClose} : {onDialogClose : () => void}) => {
    const projectslist = useAppSelector(
        (state) => state.ManualLogList.data.projectList
    )
    const { DateTimepicker } = DatePicker
    const userslist = useAppSelector(
        (state) => state.ManualLogList.data.userList
    )
    const [selectedStatus, setSelectedStatus] = useState(null);
    const dispatch = useAppDispatch()
    const members = [
        {
            value: 'Meeting', label: 'Meeting'
        },
        {
            value: 'Conference', label: 'Conference'
        },
        {
            value: 'Force Majeure', label: 'Force Majeure'
        },
        {
            value: 'Events', label: 'Events'
        },
        {
            value: 'Waiting For', label: 'Waiting For'
        },
        {
            value: 'Other', label: 'Other'
        },
    ]

    const newId = useUniqueId('project-')

    const [taskCount, setTaskCount] = useState<TaskCount>({})

  

    const handleAddNewTask = (count: TaskCount) => {
        setTaskCount(count)
    }

    const onSubmit = (
        formValue: FormModel,
        setSubmitting: (isSubmitting: boolean) => void
    ) => {
        setSubmitting(true)
    }

    const [selectedOption, setSelectedOption] = useState('');
    const [inputValue, setInputValue] = useState('');


    const handleStatusChange = (selectedOption: any) => {
        console.log(selectedOption.value)
        setSelectedOption(selectedOption.value);
        setInputValue(''); 
        setSelectedStatus(selectedOption);
    };
    const tableData = useAppSelector(
        (state) => state.ManualLogList.data.tableData
    )
    const [dialogIsOpen, setIsOpen] = useState(false)

    return (
        <Formik
            initialValues={{
                meeting_type: '',
                project_list: '',
                choose_participant: [],
                start_time: '',
                end_time: '',
                description_meeting: '',
                meeting_agenda: '',
                billable: '',
                meetingtime: '',
            }}
            validationSchema={validationSchema}
            onSubmit={async (values, { setSubmitting }) => {
                console.log('Form Values:', values);
                //const success = await createManualLog({ formdata: values })
                const success = await apiCreateManualLog({formdata:values})
                //dispatch(getFilterLoglist());
                //dispatch(getLoglist());
                if (success) {
                    dispatch(getManualLogList(tableData))
                    onDialogClose()
                    toast.push(
                        <Notification
                            title={'Successfuly Created'}
                            type="success"
                            duration={2500}
                        >
                            Successfuly Created
                        </Notification>,
                        {
                            placement: 'top-center',
                        }
                    )
                }
                setSubmitting(true);
            }}
        >
            {({ touched, errors, values, setFieldValue }) => (
                <Form>
                    <FormContainer>
                        <div className='row'>
                            <div className='col-md-4'>
                                <FormItem
                                    label="Meeting Type"


                                    invalid={
                                        (errors.meeting_type && touched.meeting_type) as ''
                                    }
                                    errorMessage={errors.meeting_type as string}
                                >
                                    <Select
                                        placeholder="Please Select"
                                        options={members}
                                        // name="meeting_type"
                                        onChange={(selectedOption) => {
                                            setFieldValue("meeting_type", selectedOption?.value);
                                            handleStatusChange(selectedOption);
                                        }}
                                    />
                                </FormItem>
                                {selectedOption === 'Other' && (
                                    <FormItem
                                    label=""
                                    >
                                        <Field
                                            type="text"
                                            name="othertextbox"
                                            placeholder="Enter your text"
                                            component={Input}
                                        />
                                    </FormItem>
                                )}

                            </div>
                            <div className='col-md-4'>
                                <FormItem
                                    label="Projects List"
                                    invalid={
                                        (errors.project_list && touched.project_list) as ''
                                    }
                                    errorMessage={errors.project_list as string}
                                >
                                    <Select
                                        placeholder="Please Select"
                                        //name="project_list"
                                        options={projectslist}
                                        onChange={(selectedOption) => {
                                            setFieldValue("project_list", selectedOption?.value);
                                            handleStatusChange(selectedOption);
                                        }}
                                    ></Select>
                                </FormItem>
                            </div>
                            <div className='col-md-4'>
                                <FormItem
                                    label="Choose Participants"
                                    invalid={
                                        (errors.choose_participant && touched.choose_participant) as ''
                                    }
                                    errorMessage={errors.choose_participant as string}
                                >
                                    <Select
                                        placeholder="Please Select"
                                        // name="choose_participant"
                                        isMulti
                                        options={userslist}
                                        onChange={(selectedOption) => {
                                            setFieldValue("choose_participant", selectedOption);
                                            handleStatusChange(selectedOption);
                                        }}
                                    ></Select>
                                </FormItem>
                            </div>
                            <div className='col-md-4'>
                                <FormItem
                                    label="Start Date Time"
                                    invalid={errors.start_time && touched.start_time}
                                    errorMessage={errors.start_time}
                                >
                                    <DateTimepicker                                     
                                        placeholder="Pick date & time"
                                        // name="start_time"                                     
                                        onChange={(date) => setFieldValue("start_time", date) }
                                    />
                                </FormItem>
                            </div>
                            <div className='col-md-4'>
                                <FormItem
                                    label="End Date Time"
                                    invalid={errors.end_time && touched.end_time}
                                    errorMessage={errors.end_time}
                                >
                                    <DateTimepicker                                     
                                        placeholder="Pick date & time"
                                        // name="end_time"
                                        onChange={(date) => setFieldValue("end_time", date)} 
                                    />
                                </FormItem>
                            </div>
                            {/* <div className='col-md-4'>
                                <FormItem
                                    label="Meeting Time"
                                >
                                    <Field
                                        type="text"
                                        autoComplete="off"
                                        name="meetingtime"
                                        placeholder="Meeting Time"
                                        component={Input}
                                    />
                                </FormItem>
                            </div> */}
                            

                            <div className='col-md-4'>
                                <FormItem
                                    label="Log Type"
                                    invalid={errors.billable && touched.billable}
                                    errorMessage={errors.billable}
                                >
                                    <div>
                                        <Field
                                            type="radio"
                                            name="billable"
                                            value="1"
                                            component={Input}
                                        />Billable
                                        <Field
                                            type="radio"
                                            name="billable"
                                            value="0"
                                            component={Input}
                                        />Non Billable
                                    </div>
                                </FormItem>
                            </div>
                            <div className='col-md-4'>
                                <FormItem
                                    label="Meeting Agenda"
                                >
                                    <Field
                                        type="text"
                                        name="meeting_agenda"
                                        placeholder="Meeting Time"
                                        component={Input}
                                    />
                                </FormItem>
                            </div>
                            <div className='col-md-4'>
                                <FormItem
                                    label="Content"
                                    invalid={errors.description_meeting && touched.description_meeting}
                                    errorMessage={errors.description_meeting}
                                >
                                    <Field
                                        textArea
                                        type="text"
                                        autoComplete="off"
                                        name="description_meeting"
                                        placeholder="Enter content"
                                        component={Input}
                                    />
                                </FormItem>
                            </div>
                            <div className='col-md-4'>
                                <Button block variant="solid" type="submit">
                                    Submit
                                </Button>
                            </div>
                        </div>
                    </FormContainer>
                </Form>
            )}
        </Formik>
    )
}

export default NewManualLogForm