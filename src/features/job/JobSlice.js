import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import customFetch from '../../utils/axios';
import { getUserFromLocalStorage } from '../../utils/localStorage';
import { logoutUser } from '../userSlice';
//import { createJobThunk, deleteJobThunk, editJobThunk } from './jobThunk';
import {showLoading, hideLoading, getAllJobs} from '../allJobs/AllJobsSlice'

const initialState = {
  isLoading: false,
  position: '',
  company: '',
  jobLocation: '',
  jobTypeOptions: ['full-time', 'part-time', 'remote', 'internship'],
  jobType: 'full-time',
  statusOptions: ['interview', 'declined', 'pending'],
  status: 'pending',
  isEditing: false,
  editJobId: '',
};

export const createJob = createAsyncThunk(
    'job/createJob',
    async(job, thunkAPI) => {
        try {
            const response = await customFetch.post('/jobs', job, {
                headers: {
                  authorization: `Bearer ${thunkAPI.getState().user.user.token}`}
             })
             thunkAPI.dispatch(clearValues())
             return response.data
        } catch (error) {
             if(error.response.status === 401){
                thunkAPI.dispatch(logoutUser())
               return thunkAPI.rejectWithValue("Unauthorized, logging out")
             }
             return thunkAPI.rejectWithValue(error.response.data.msg)
        }
    }
)

export const deleteJob = createAsyncThunk('job/deleteJob', async(jobID, thunkAPI) => {
    thunkAPI.dispatch(showLoading())
   try {
      const response = customFetch.delete(`/jobs/${jobID}`, {
        headers:{
          authorization: `Bearer ${thunkAPI.getState().user.user.token}`
        }
      })
      thunkAPI.dispatch(getAllJobs())
      return response.data.msg
   } catch (error) {
       thunkAPI.dispatch(hideLoading())
       return thunkAPI.rejectWithValue(error.response.data.msg)
   }
})

export const EditJob = createAsyncThunk()

const jobSlice = createSlice({
    name: 'job',
    initialState,
    reducers:{
        handleChange: (state, {payload: {name, value}}) => {
            state[name] = value
        },
        clearValues: () => {
            return {...initialState,jobLocation:getUserFromLocalStorage()?.location || ''}
        }
    },
    extraReducers:{
        [createJob.pending] : (state) => {
            state.isLoading = true
        },
        [createJob.fulfilled] : (state) => {
            state.isLoading = false
            toast.success('Job Created')
        },
        [createJob.rejected] : (state, {payload}) => {
            state.isLoading = false
            toast.error(payload)
        },
        [deleteJob.fulfilled] : (state, {payload}) => {
            toast.success(payload)
        },
        [deleteJob.rejected] : (state, {payload}) => {
            toast.error(payload)
        }
    }
})

export const {handleChange, clearValues} = jobSlice.actions
export default jobSlice.reducer