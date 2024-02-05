import { useState, useEffect } from 'react'
import { FormItem, FormContainer } from '@/components/ui/Form'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import Select from '@/components/ui/Select'
import { useParams } from 'react-router-dom';
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
import { apiUpdateManualLog, apiEditManualLog, apiGetProjectsUsersList } from '@/services/ReportsAnalysis'
import reducer from '../store'
import { injectReducer } from '@/store'

injectReducer('ManualLogList', reducer)


type FormModel = {
    meeting_type: string
    other_meeting_type: string
    start_time: string
    end_time: string
    description_meeting: string
    meetingtime: string
    meeting_agenda: string
    billable: number
    project_list: {
        value: string
        label: string
    }
    choose_participant: {
        value: string
        label: string
    }[]
}

type TaskCount = {
    completedTask?: number
    totalTask?: number
}
type MeetingOtherType = {
    other_meeting_type: string
}
type MeetingType = {
    meeting_type: string
}
type meetingtypes = {
    value: string
    label: string
}[]
const { useUniqueId } = hooks
const validationSchema = Yup.object().shape({
   /*  meeting_type: Yup.string().required('Meeting Type required'),
    project_list: Yup.array().min(1, 'Project List required'),
    choose_participant: Yup.array().min(1, 'Choose Participant required'),
    start_time: Yup.string().required('Start Time required'),
    end_time: Yup.string().required('End Time required'),
    description_meeting: Yup.string().required('Description required'), */
    //projects: Yup.array().min(1, 'Assignee required'),
    //rememberMe: Yup.bool(),
})

const EditManualLogForm = () => {
    const [loading, setLoading] = useState(true);
    //console.log(projectslist)
    const { DateTimepicker } = DatePicker
     
    const [selectedStatus, setSelectedStatus] = useState(null);
    
    const dispatch = useAppDispatch()

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

    const [selectedOption, setSelectedOption] = useState<MeetingType>();
    const [inputValue, setInputValue] = useState('');


    useEffect(() => {   
        dispatch(getManualLogList(initialTableData))
    }, [])


    const handleStatusChange = (selectedOption: any) => {
        //console.log(selectedOption.value)
        setSelectedOption(selectedOption.value);
        setInputValue('');
        setSelectedStatus(selectedOption);
    };
   
    const { Id } = useParams();
      
    const [manualLogoptions, setManualLogData] = useState([]); // Replace with your actual data source
  
    // Simulate fetching data on component mount


    const [selectedOptions1, setSelectedOptions1] = useState([]);
    const [selectedOptions2, setSelectedOptions2] = useState([]);
    const [projectlist, setProjectsList] = useState([]); 
    const [userlist, setUsersList] = useState([]);
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedEndDate, setSelectedEndDate] = useState(null);
    const [otherMeetingtype, setOtherMeetingType] = useState<MeetingOtherType>();
    const [meetingAgenda, setMeetingAgenda] = useState('');
    const [meetingDiscription, setMeetingDiscription] = useState('');
    
    useEffect(() => {
        //setMeetingDiscription(meetingDiscription || '');
        const fetchData = async () => {
            // Meeting type selected
            const meetingtypes = await meetingtype();        
            const manuallogdetail = await apiEditManualLog({ Id });
            const getprojectslist = await apiGetProjectsUsersList();
            //const getuserslist = await apiGetUsersList();
            //console.log(getprojectslist.data.projects_list)
            setManualLogData(meetingtypes);  
            const selectedOption = meetingtypes.find(option => option.value === manuallogdetail?.data?.data?.meeting_type);
            setSelectedOption(selectedOption);
            //console.log(manuallogdetail?.data?.data?.meeting_type)
            // other meeting type
            const otherMeetingtype = manuallogdetail?.data?.data?.other_meeting_type;
            setOtherMeetingType(otherMeetingtype)

            // meeting agenda
            const meetingAgenda = manuallogdetail?.data?.data?.meeting_agenda;
            setMeetingAgenda(meetingAgenda)

            // meeting description
            const meetingdescription = manuallogdetail?.data?.data?.description_meeting;
            setMeetingDiscription(meetingdescription)
            //console.log(meetingdescription)
            // projects list
            const data1 = getprojectslist?.data?.projects_list;
            setProjectsList(data1);
            const selectedOptions1 = data1.find(option => option.value === manuallogdetail?.data?.data?.project_id);
            setSelectedOptions1(selectedOptions1);

            // users list
            const data2 = getprojectslist?.data?.users_list;
            setUsersList(data2);
            //console.log(manuallogdetail?.data?.data?.participants)
            const selectedValues2 =  manuallogdetail?.data?.data?.participants;
            //const selectedValues2 =  {326,167};
            const selectedOptions2 = data2.filter(option => selectedValues2.includes(option.value));
            setSelectedOptions2(selectedOptions2);
            console.log(selectedValues2)
            // selected start date time
            const preselectedDate = manuallogdetail?.data?.data?.start_date_time;
            setSelectedDate(preselectedDate);

            // selected end date time
            const preselectedendDate = manuallogdetail?.data?.data?.end_date_time;
            setSelectedEndDate(preselectedendDate);

            try {
                const manuallogdetail = await apiEditManualLog({ Id });
                setSelectedStatus(manuallogdetail);
              } catch (error) {
                console.error('Error fetching data:', error);
              }
              setLoading(false)
        };  
        fetchData();
    }, [Id]); // Empty dependency array to run only once on mount
    const handleSelectChange1 = selectedOptions => {
        setSelectedOptions1(selectedOptions);
        // You can also perform any additional actions on option change here
    };
    const handleSelectChange2 = selectedOptions => {
        setSelectedOptions2(selectedOptions);
        // You can also perform any additional actions on option change here
    };
   
    const meetingtype = async () => {
      return [
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
        // Add more options as needed
      ];
    };
  
    const handleSelectChange = selectedOption => {
        setSelectedOption(selectedOption);
    };  
    console.log('other meeting', selectedOption)
    
    return (
        <Formik
            initialValues={{
                meeting_type: '',
                other_meeting_type: '',
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
                const success = await apiUpdateManualLog({ formdata: values, Id:Id })
                if (success) {
                    toast.push(
                        <Notification
                            title={'Successfuly Updated'}
                            type="success"
                            duration={2500}
                        >
                            Successfuly Updated
                        </Notification>,
                        {
                            placement: 'top-center',
                        }
                    )
                    window.location.reload();
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
                                        value={selectedOption}                                       
                                        onChange={(selectedOption) => {
                                            setFieldValue("meeting_type", selectedOption?.value);
                                            handleSelectChange(selectedOption);
                                        }}
                                        options={manualLogoptions}
                                    />
                                </FormItem>
                                {/* {selectedOption.value === 'Other' && (
                                    <FormItem
                                        label=""
                                    >
                                        <Field
                                            type="text"
                                            name="other_meeting_type"
                                            placeholder="Enter your text"
                                            value={otherMeetingtype}
                                            onChange={(e) => {setOtherMeetingType(e.target.value)
                                                setFieldValue("other_meeting_type", otherMeetingtype)}}
                                            component={Input}
                                           
                                        />
                                    </FormItem>
                                )} */}

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
                                      
                                        value={selectedOptions1}                                       
                                        onChange={(selectedOptions1) => {
                                            setFieldValue("project_list", selectedOptions1?.value);
                                            handleSelectChange1(selectedOptions1);
                                        }}
                                        options={projectlist}
                                    />
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
                                        isMulti
                                        
                                        value={selectedOptions2}                                       
                                        onChange={(selectedOptions2) => {
                                            setFieldValue("choose_participant", selectedOptions2);
                                            handleSelectChange2(selectedOptions2);
                                        }}
                                        options={userlist}
                                    />

                                </FormItem>
                            </div>
                            <div className='col-md-4'>
                                <FormItem
                                    label="Start Date Time"
                                    invalid={errors.start_time && touched.start_time}
                                    errorMessage={errors.start_time}
                                >
                                    <DateTimepicker
                                        // name="start_time"

                                        placeholder="Pick date & time"
                                        name="start_time"
                                        value={selectedDate ? new Date(selectedDate) : null}
                                        //onChange={(date) => setSelectedDate(date)}
                                        onChange={(date) => {setFieldValue("start_time", date)
                                        setSelectedDate(date)}}
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
                                        name="end_time"
                                        value={selectedEndDate ? new Date(selectedEndDate) : null}
                                        //onChange={(date) => setSelectedEndDate(date)}
                                        onChange={(date) => {setFieldValue("end_time", date)
                                        setSelectedEndDate(date)}}
                                    />
                                </FormItem>
                            </div>
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
                                            checked={selectedStatus?.data?.data?.billable === 1}
                                            //component={Input}
                                        />Billable
                                        <Field
                                            type="radio"
                                            name="billable"
                                            value="0"
                                            checked={selectedStatus?.data?.data?.billable === 0}
                                            //component={Input}
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
                                        placeholder="Meeting Agenda"
                                        value={meetingAgenda}
                                        onChange={(e) => {setMeetingAgenda(e.target.value)
                                            setFieldValue("meeting_agenda", meetingAgenda)}}
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
                                        placeholder="Enter content"
                                        value={meetingDiscription}
                                        onChange={(e) => {
                                            setFieldValue("description_meeting", meetingDiscription);
                                            setMeetingDiscription(e.target.value)
                                        }}
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

export default EditManualLogForm