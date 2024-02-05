import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { apiGetJinns, apiGetPodjinns, apiGetPods, apiGetServices, apiGetSpecificServices } from '@/services/WebService';
import { OptionsOrGroups, GroupBase } from 'react-select';
import { PodResponseState } from '@/views/web/catalogue/store';
import { ReactNode } from 'react';
import { JSX } from 'react/jsx-runtime';


export type PodjinnsState = {
  id: number,
  name: string,
  image: string,
  service: string,
  technology: string

};

export type ServicesState = {
  id: number,
  name: string
}
export type SpecificServiceState = {
  id: number,
  name: string
}
export type TechState = {
  id:number,
  name:string
}
export type JinnState = {
  id:number,
  name:string
  image:string
}
export type PodState = {
  id:number,
  pod_name:string,
  podjinn:{
    id:number,
    name:string,
    image:string,
  }
  assignedJinns:{
    id:number,
    name:string,
    image:string
  }
}

export type PodjinnsResponseState = {
  podjinns: any;
  status: string,
  message: string,
  data: PodjinnsState[]
}
export type ServicesResponseState = {
  map(arg0: (service: any) => { value: any; label: any; }): import("react-select").OptionsOrGroups<unknown, import("react-select").GroupBase<unknown>> | undefined;
  status: string,
  message: string,
  data: ServicesState[]
}
export type SpecificServiceResponseState = {
  

  status: string,
  message: string,
  specific_services_list: SpecificServiceState[],
  tech_list:TechState
 
}
export type JinnResponseState = {
  

  status: string,
  message: string,
 jinns:JinnState[]
 
}
export type PodsResponseState={
  status:string,
  message:string,
  data:PodState[]
}
export type DataState = {
  members: any;
  loading: boolean
  podjinns: PodjinnsResponseState
  services: ServicesResponseState
  sservices: SpecificServiceState[]
  techservices:TechState[]
  jinnservices:JinnState[]
  pods:PodResponseState
 

}

export const SLICE_NAME = 'podjinns'


export const getPodjinns = createAsyncThunk(
  SLICE_NAME + '/getpodjinns',
  async () => {
    const response = await apiGetPodjinns<
      PodjinnsResponseState
    >()
    return response.data
  }
)
export const getServices = createAsyncThunk(
  SLICE_NAME + '/getservices',
  async () => {
    const response = await apiGetServices<
      ServicesResponseState
    >()
    return response.data
  }
)
export const getSpecificServices = createAsyncThunk(
  SLICE_NAME + '/getspecificservices',
  async (serviceId: number, { dispatch }) => {
    const response = await apiGetSpecificServices<SpecificServiceResponseState>(serviceId);
   
    return response.specific_services_list;
  }
);

export const getTechServices = createAsyncThunk(
  SLICE_NAME + '/gettechservices',
  async (serviceId: number, { dispatch }) => {
    
  
const response = await apiGetSpecificServices<SpecificServiceResponseState>(serviceId);
    
  
return response.tech_list;
  })
  export const getJinnServices = createAsyncThunk(
    SLICE_NAME + '/getjinnservices',
    async (serviceId: number, { dispatch }) => {
      
    
  const response = await apiGetJinns<JinnResponseState>(serviceId);
      
    
  return response;
    })

    export const getPods = createAsyncThunk(
      SLICE_NAME + '/getpods',
      async () => {
        const response = await apiGetPods<
          PodResponseState
        >()
        return response.data
      }
    )
  


const initialState: DataState = {
  loading: false,
  podjinns: {
    status: '',
    message: '',
    data: [],
    podjinns: undefined
  },
  services: {
    status: '',
    message: '',
    data: [],
    map: function (arg0: (service: any) => { value: any; label: any; }): OptionsOrGroups<unknown, GroupBase<unknown>> | undefined {
      throw new Error('Function not implemented.');
    }
  },
  sservices: [],
  techservices:[],
  jinnservices:[],
  pods:{
    status: "",
    message: "",
    data: [],
    map: function (arg0: (project: {  id: number; pod_name?: string | undefined;  podjinn?: { id: number; name: string; image: string; } | undefined; assignedJinns?: { id: number; name: string; image: string; }[] | undefined; projects?: { id: number; project_name: string; project_status: string; }[] | undefined; }) => JSX.Element): ReactNode {
      throw new Error('Function not implemented.');
    }
  },
  members: undefined,
  
};

const podjinnsSlice = createSlice({
  name: `${SLICE_NAME}/state`,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getPodjinns.fulfilled, (state, action) => {
        state.podjinns = action.payload;
        state.loading = false;
      })
      .addCase(getPodjinns.pending, (state) => {
        state.loading = true;
      })
      .addCase(getServices.fulfilled, (state, action) => {
        state.services = action.payload;
        state.loading = false;
      })
      .addCase(getServices.pending, (state) => {
        state.loading = true;
      })
      .addCase(getSpecificServices.fulfilled, (state, action) => {
        state.sservices = action.payload
        state.loading = false;
      })
      .addCase(getSpecificServices.pending, (state) => {
        state.loading = true;
      })
      .addCase(getTechServices.fulfilled, (state, action) => {
        state.techservices = Array.isArray(action.payload) ? action.payload : [action.payload];
        state.loading = false;
      })
      .addCase(getTechServices.pending, (state) => {
        state.loading = true;
      })
      .addCase(getJinnServices.fulfilled, (state, action) => {
        state.jinnservices = action.payload.data.jinns
        state.loading = false;
      })
      .addCase(getJinnServices.pending, (state) => {
        state.loading = true;
      })
      .addCase(getPods.fulfilled, (state, action) => {
        state.loading = false;
        state.pods = action.payload;
      })
      .addCase(getPods.pending, (state) => {
        state.loading = true;
      });
      
     
    
  },
});

export default podjinnsSlice.reducer;

