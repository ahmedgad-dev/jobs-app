import { createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import customFetch from '../utils/axios';

import {
  addUserToLocalStorage,
  getUserFromLocalStorage,
  removeUserFromLocalStorage,
} from '../utils/localStorage';


const initialState = {
    isLoading: false,
    isSidebarOpen: false,
    user: getUserFromLocalStorage(),
}

export const registerUser = createAsyncThunk(
    'user/registerUser' , 
      async(user, thunkAPI) => {
        try {
          const response = await customFetch.post('/auth/register', user);
          return response.data     
        } catch (error) {
            thunkAPI.rejectWithValue(error.response.data.msg)
        }
    }
)

export const loginUser = createAsyncThunk(
    'user/loginUser' , async(user, thunkAPI) => {
        try {
           const response = await customFetch.post('/auth/login', user)
           return response.data 
        } catch (error) {
           thunkAPI.rejectWithValue(error.response.data.msg)
        }
    }
)

export const updateUser = createAsyncThunk(
  'user/updateUser',
  async (user, thunkAPI) => {
    try {
      const response = customFetch('/auth/updateUser', user,{
        headers: `Bearer ${thunkAPI.getState().user.user.token}`
      });
      return response.data
    } catch (error) {
       if(error.response.status === 401){
        thunkAPI.dispatch(logoutUser())
        return thunkAPI.rejectWithValue('Unauthorized login, logging out!')
       }     
       return thunkAPI.rejectWithValue(error.response.data.msg)
    }
  }
);

const userSlice = createSlice({
   name: 'user',
   initialState,
   reducers: {
    toggleSidebar: (state) => {
      state.isSidebarOpen = !state.isSidebarOpen
    },
    logoutUser:(state, {payload}) => {
      state.user = null
      state.isSidebarOpen = false
      removeUserFromLocalStorage()
      if(payload){
        toast.success(payload)
      }
    },
   },
   extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state, { payload }) => {
        const { user } = payload;
        state.isLoading = false;
        state.user = user;
        addUserToLocalStorage(user);
        toast.success(`Hello There ${user.name}`);
      })
      .addCase(registerUser.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, { payload }) => {
        const { user } = payload;
        state.isLoading = false;
        state.user = user;
        addUserToLocalStorage(user);
        toast.success(`Ahmed Gad waving Welcome Back ${user.name}`);
      })
      .addCase(loginUser.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      })

      .addCase(updateUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateUser.fulfilled, (state, { payload }) => {
        const { user } = payload;
        state.isLoading = false;
        state.user = user;
        addUserToLocalStorage(user);
        toast.success(`Updated successfully Ahmed Gad greetings`);
      })
      .addCase(updateUser.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      })
    }
})

export const {toggleSidebar, logoutUser} = userSlice.actions
export default userSlice.reducer