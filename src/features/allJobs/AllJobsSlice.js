import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import customFetch from "../../utils/axios";


const initialFiltersState = {
    search: '',
    searchStatus: 'all',
    searchType: 'all',
    sort: 'latest',
    sortOptions: ['latest', 'oldest', 'a-z', 'z-a'],
  };

  const initialState = {
    isLoading: true,
    jobs: [],
    totalJobs: 0,
    numOfPages: 1,
    page: 1,
    stats: {},
    monthlyApplications: [],
    ...initialFiltersState,
  };

  export const getAllJobs = createAsyncThunk('allJobs/getJobs',
    async(_, thunkAPI) => {    
     try {
       const response = await customFetch.get('/jobs',{
          headers:{
            authorization: `Bearer ${thunkAPI.getState().user.user.token}`
          }
       })
        console.log(response.data)
        return response.data       
     } catch (error) {
        return thunkAPI.rejectWithValue(error)
     }
  }) 


  export const showStats = createAsyncThunk('allJobs/showStats', async(_, thunkAPI) => {
    try {
      const response = await customFetch.get('/jobs/stats',{
        headers:{
          authorization: `Bearer ${thunkAPI.getState().user.user.token}`
        }
      })
      console.log(response.data)
      return response.data    
    } catch (error) {
        return thunkAPI.rejectWithValue(error.res.data.msg)
    }
  })

const allJobsSlice = createSlice({
    name: 'allJobs',
    initialState,
    reducers:{
      hideLoading: (state) => {
        state.isLoading = false
      },
      showLoading: (state) => {
        state.isLoading = true
      }
    },
    extraReducers: (builder) => {
      builder
        .addCase(getAllJobs.pending, (state) => {
          state.isLoading = true
        })
       .addCase(getAllJobs.fulfilled,  (state, {payload}) => {
            state.isLoading = false
            state.jobs = payload.jobs
        })
       .addCase(getAllJobs.rejected, (state) => {
            state.isLoading = false
        })
       .addCase(showStats.pending, (state) => {
            state.isLoading = true
        })
       .addCase(showStats.fulfilled,  (state, {payload}) => {
        state.isLoading = false
        state.stats = payload.defaultStats
        state.monthlyApplications = payload.monthlyApplications
       })
       .addCase(showStats.rejected, (state, {payload}) => {
        state.isLoading = false
        toast.error(payload)
       })
    }
})



export const {showLoading, hideLoading} = allJobsSlice.actions
export default allJobsSlice.reducer


