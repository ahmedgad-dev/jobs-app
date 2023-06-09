import { configureStore } from "@reduxjs/toolkit";
import JobSlice from "./features/job/JobSlice";
import  userSlice  from "./features/userSlice";
import allJobsSlice from "./features/allJobs/AllJobsSlice";

export const store = configureStore({
    reducer:{
        user: userSlice,
        job: JobSlice,
        allJobs: allJobsSlice
    }
})