import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { apiGetLeadPipeline, apiGetProjectOverview, apiGetBidPipeline } from '@/services/WebService';
import { useParams } from 'react-router-dom';


export type LeadpipelineState = {
    id: number;
    total_spent: null;
    project_title: string;
    project_url: string;
    project_service: string;
    project_description: string;
    project_status: null;
 
};

type CrmLead = {
    id: number;
    lead_vertical: {
        id: number;
        name: string;
        created_at: string;
        updated_at: string;
    };
    lead_location: null | string;
    lead_source: {
        id: number;
        name: string;
        vertical_id: string;
        created_at: string;
        updated_at: string;
    };
    client_representative: string;
    client_type: string;
    client_name: string;
    email: string;
    phone: string;
    skype_id: null | string;
    designation: null | string;
    country: string;
    state: string;
    city: string;
    member_since: string;
    payment_method: string;
    number_of_hires: string;
    hire_rate: string;
    no_of_job_posted: string;
    open_jobs: string;
    total_spent: string;
    contract_type: null | string;
    membership_type: null | string;
    gender: null | string;
    average_hourly_rate: null | string;
    hours_billed: null | string;
    project_title: string;
    project_url: string;
    project_service: string;
    project_specific_services: string;
    project_bidding_executive: null | string;
    project_action: string;
    project_description: null | string;
    proposal_letter: null | string;
    propose_terms: null | string;
    bid_rate: null | string;
    bid_currency: null | string;
    project_status: null | string;
    assign_to: number;
    requested_for_proposal: null | string;
    requested_for_estimate: null | string;
    requested_for_project: null | string;
    remarks: string;
    chat_message: null | string;
    chat_sender: null | string;
    chat_sender_type: null | string;
    call_datetime: null | string;
    call_duration: null | string;
    email_from: null | string;
    email_subject: null | string;
    email_message: null | string;
    email_from_type: null | string;
    status: string;
    clientRepresentative: {
        id: number;
        name: string;
        image: string;
        email: string;
        phone_number: number;
        resume: string;
        country: string;
        state: string;
        city: string;
        zipcode: number;
    };
   
   
};

export type OverViewState = {
    data: {
        crmLead: CrmLead;
        salesRep: {
            id: number;
            photo: string;
            name: string;
            email: string;
            user_id: number;
            correspondence_address: string;
            emergency_number: string;
            position_name: null | string;
        };
        emp_assigned_proposal: string;
        emp_assigned_estimation: string;
    };
};


export type BidpipelineState = {
    id: number;
    name: string;
    package_slug: string;
    service_id: string;
    specific_service_id: string;
    technology_id: string;
    framework_id?: string;
    javascript_framework_id?: string;
    plateform_id: string;
    cms_id?: string;
    service_plateform_id?: string;
    parameter_id?: string;
    service_category_id?: string;
    service_type_id?: string;
    service_parameter_id: null;
    service_format_id?: string;
    digital_service_parameter_id?: string;
    language_id?: string;
    database_id: null;
    industry_id: number;
    total_time: string;
    price: string;
    hourlyRate: number;
    discount?: string;
    discountPrice?: string;
    finalPrice: string;
    task_items: string;
    task_items_qty: string;
    turnaround_time: null;
    package_time_option: null;
    status: number;
    lead_id: string;
    package_created_by: string;
    description: null;
    features: null;
    is_published: number;
    publish_platform: string;
    escrow_enabled: number;
    payment_option_enabled: string;
    recuring_payment_option_enabled: string;
    revise_requested_by: null;
};

export type OverViewResponseState = {
    status: string,
    message: string,
    data: OverViewState[]
}
export type LeadpipelineResponseState = {
    status: string,
    message: string,
    data: LeadpipelineState[]
}

export type BidpipelineResponseState = {
    status: string,
    message: string,
    data: BidpipelineState[]
}
export type DataState = {
    loading: boolean
    leadpipeline: LeadpipelineResponseState
    overview: OverViewResponseState
    bidpipeline: BidpipelineResponseState
}

export const SLICE_NAME = 'pipeline'

export const getLeadpipeline = createAsyncThunk(
    SLICE_NAME + '/getPipeline',
    async () => {
        const response = await apiGetLeadPipeline<
            LeadpipelineResponseState
        >()
        return response.data
    }
)

export const getprojectoverview = createAsyncThunk(
    SLICE_NAME + '/getOverview/projectId',
    async () => {
        const { projectId } = useParams();
        if (!projectId) {
            throw new Error("Project ID is undefined");
        }
        const id = parseInt(projectId);
        const response = await apiGetProjectOverview<OverViewResponseState>(id)
        return response.data
    }
)

export const getBidpipeline = createAsyncThunk(
    SLICE_NAME + '/bidPipeline',
    async () => {
        const response = await apiGetBidPipeline<
            BidpipelineResponseState
        >()
        return response.data
    }
)

const initialState: DataState = {
    loading: false,
    leadpipeline: {
        status: '',
        message: '',
        data: []
    },
    overview: {
        status: '',
        message: '',
        data: []
    },
    bidpipeline: {
        status: '',
        message: '',
        data: []
    }
}

const pipelineSlice = createSlice({
    name: `${SLICE_NAME}/state`,
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getLeadpipeline.fulfilled, (state, action) => {
                state.leadpipeline = action.payload
                state.loading = false
            })
            .addCase(getLeadpipeline.pending, (state) => {
                state.loading = true
            })
            .addCase(getprojectoverview.fulfilled, (state, action) => {
                state.overview = action.payload
                state.loading = false
            })
            .addCase(getprojectoverview.pending, (state) => {
                state.loading = true
            })

            .addCase(getBidpipeline.fulfilled, (state, action) => {
                state.bidpipeline = action.payload
                state.loading = false
            })
            .addCase(getBidpipeline.pending, (state) => {
                state.loading = true
            })
    },
})

export default pipelineSlice.reducer
