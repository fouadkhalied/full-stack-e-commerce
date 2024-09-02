import React from "react";
import './header.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const Alert = ()=>{
    const notify = () => toast("Wow so easy!");

    return (
      <div>
        {notify}
        <ToastContainer />
      </div>
    );
}

export default React.memo(Alert);