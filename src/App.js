import Landing from "./pages/Landing";
import { Fragment } from "react";
import { Route, Routes } from "react-router-dom";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Error from "./pages/Error";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



function App() {
  return (
    <Fragment>
       <Routes>
         <Route path='/' element={<Dashboard/>} />
         <Route index element={<Landing/>} />
         <Route path='register' element={<Register />} />
         <Route path='*' element={<Error/>} />
       </Routes>
      <ToastContainer position="top-center" />
    </Fragment>
      
  );
}

export default App;
