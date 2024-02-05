import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {
    apiGetTeamList,
} from '@/services/UserService'


export type UserDataState = {
    id: string;
    name: string;
    image: null | string;
    resume: string;
    email: string;
    personalEmail: null | string;
    gender: string;
    DOB: string;
    availability: number;
    countryCode: string;
    phoneNumber: string;
    companyName: string;
    country: string;
    state: string;
    city: string;
    zipcode: string;
    residentialAddress: null | string;
    location: null | string;
    isActive: number;
    userId: number;
    photo: string;
    nickname: string;
    funPhoto: string;
    qualification: null | string;
    postApplicant: string;
    mobileNo: string;
    dateOfBirth: string;
    positionHire: string;
    parmanentAddress: string;
    correspondenceAddress: string;
    pincodeTwo: number;
    pincode: string;
    countryTwo: number;
    stateTwo: number;
    cityTwo: number;
    resumeUpload: string;
    totalYearExp: null | string;
    workExperience: string;
    totalMonthExp: null | string;
    portfolioUpload: null;
    currentSalaryCurrency: null;
    currentSalary: number;
    currentSalaryDuration: null;
    expactedSalaryCurrency: string;
    expactedSalary: number;
    expectedSalaryDuration: string;
    offeredCtc: number;
    photoUrl: null;
    dateOfJoining: string;
    department: null;
    desination: string;
    technologyName: string;
    serviceName: string;
    userSkills: Skill[];
    userEductions: Education[];
}

interface Skill {
    name: string;
}

export type Education = {
    id: number;
    document_id: number;
    board_university: string;
    parcentage: string;
    year_passing: string;
    school_institute: string;
    streams: string;
    candi_qulification: string;
    candidate_id: number;
    user_id: number;
    document_type: null;
    document_attachment: null;
}


export type ResponseState = {
    status: boolean
    message: string
    userdetail: UserDataState[]
}


export type DataState = {
    loading: boolean
    data: ResponseState
}

export const SLICE_NAME = 'teamList'

export const getTeamList = createAsyncThunk(
    SLICE_NAME + '/getTeamList',
    async () => {
        const response = await apiGetTeamList<
            ResponseState
        >()
        return response.data
    }
)

const initialState: DataState = {
    loading: false,
    data: {
        status: false,
        message: '',
        userdetail: []
    },
}

const teamListSlice = createSlice({
    name: `${SLICE_NAME}/state`,
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getTeamList.fulfilled, (state, action) => {
                state.data = action.payload
                state.loading = false
            })
            .addCase(getTeamList.pending, (state) => {
                state.loading = true
            })
    },
})

export default teamListSlice.reducer
