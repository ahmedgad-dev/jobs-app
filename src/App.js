import { Fragment } from "react";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Landing, Error, Register, ProtectedRoute}from "./pages";

import {
  Profile,
  AddJob,
  AllJobs,
  Stats,
  SharedLayout,
} from './pages/dashboard';



function App() {
  return (
    <Fragment>
       <Routes>
         <Route path='/' 
          element={
          //  <ProtectedRoute>
             <SharedLayout/>
          //  </ProtectedRoute>
           } > 
            <Route index element={<Stats/>}/>
            <Route path="all-jobs" element={<AllJobs/>}/>
            <Route path="add-job" element={<AddJob/>}/>
            <Route path="profile" element={<Profile/>}></Route>
         </Route>
         <Route path='landing' element={<Landing/>} />
         <Route path='register' element={<Register />} />
         <Route path='*' element={<Error/>} />
       </Routes>
      <ToastContainer position="top-center" />
    </Fragment>     
  );
}

export default App;
