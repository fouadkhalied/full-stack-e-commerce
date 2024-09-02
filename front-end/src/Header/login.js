import React, { useState } from 'react';
import './header.css';
import { Container } from 'react-bootstrap';
import axios from 'axios';
import cookie from 'js-cookie';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Login =()=> {
  const [email,setemail] = useState("");
  const [pass,setpass] = useState("");
  const delay = 3000;
  const handle = async ()=>{
    if(email && pass) {
        try 
        {       
          const response = await axios.post('/login_new_user', {"email" : email , "password" : pass});
          const token = response.data.mytoken;
          cookie.set('token',token); 
          axios.interceptors.request.use((config)=>{
              config.headers.Authorization = `Bearer ${token}`
              return config
          })
          toast.success("login success");
          setTimeout(function() {
            window.location='/'
          }, delay);
        } catch(ex) {
            if(ex.response.status == 404)
            {
              toast.error(ex.response.data.message);
            }
        }       
        //console.log(email , pass);
    }


    // const Username = localStorage.getItem("usernametry");
    // const Password = localStorage.getItem("passwordtry");
    // if (Username === user && Password === pass) {
    //    alert("Successfully logged in");
    //    localStorage.setItem("user" , user);
    //    window.location = "/";
    // }
    // else{
    //   alert("Wrong username or password");
    // }
  }
  return (
    <div className="Login">
     <Container>
    <div className="Register">
      <div className='Register-app d-flex text-center'>
          <div className='Register-app-page' style={{height : '340px'}}>
            <h1 style={{color : 'white'}}>Sign in</h1><br></br>
             <h2 style={{color : 'white'}}>Welcome to Pixelpoint</h2>
             <div className='Register-app-page-div' style={{height : '120px'}}>
             {/* label username */}
             <label style={{color : 'white',position :'relative' , right :'33%'}}>
               Email:
             </label>
             {/* username input */}
             <input 
             type='text'
             onChange={(e)=>{setemail(e.target.value)}} 
             />
             {/* /////////////////////////////////////////////////////// */}
             {/* password label */}
             <label style={{color : 'white',position :'relative' , right :'30%'}}>
              Password:
             </label>
             {/* password input */}
             <input 
             type='password'
             onChange={(e)=>{setpass(e.target.value)}}
             />
             </div>
             <br></br>
             <button disabled={email && pass ? false : true} onClick={handle} className='btn btn-light Register-app-page-btn'>Sign in</button>
             <h6 style={{color : 'white'}}>Don't have an account <a style={{color : 'white'}} href='/Register'> Register</a></h6>
          </div>
        </div>
        </div>
     </Container>
    </div>
  );
}

export default React.memo(Login);
