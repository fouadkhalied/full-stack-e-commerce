import React, { useEffect, useRef, useState } from 'react';
import './header.css';
import { Container } from 'react-bootstrap';
import de from './imgs/nuhuhuuhuh.jpg';
import { faCheck , faTimes , faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Alert } from 'react-bootstrap';
import axios from 'axios';
import { toast } from 'react-toastify';


const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
const PASS_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;





const Register =()=> {
  const userRef = useRef();
  const errRef = useRef();
  const delay = 2500;

  const [user , setuser] = useState("");
  const [Validuser , setValiduser] = useState(false);
  const [userFocus , setuserFocus] = useState(false);
  

  const [pass , setpass] = useState("");
  const [Validpass , setValidpass] = useState(false);
  const [Focuspass , setFocuspass] = useState(false);
  
    
  const [matchpass , setmatchpass] = useState("");
  const [Validmatchpass , setValidmatchpass] = useState(false);
  const [Focusmatchpass , setFocusmatchpass] = useState(false);


  const [email , setemail] = useState("");
  const [Validemail , setValidemail] = useState(false);
  const [Focusemail , setFocusemail] = useState(false);


  const [errMsg , seterrMsg] = useState("");
  const [success , setsuccess] = useState(false);


  useEffect(()=>{
    userRef.current.focus();
  },[]);

  useEffect(()=>{
    const result = USER_REGEX.test(user);
    // console.log(result);
    // console.log(user);
    setValiduser(result);
  },[user]);


  useEffect(()=>{
    const result = EMAIL_REGEX.test(email);
    // console.log(result);
    // console.log(user);
    setValidemail(result);
  },[email]);


  useEffect(()=>{
    const result = PASS_REGEX.test(pass);
    // console.log(result);
    // console.log(pass);
    setValidpass(result);
    const matching = pass === matchpass;
    setValidmatchpass(matching);
  },[pass,matchpass]);
  
  useEffect(()=>{
    seterrMsg('');
  },[user,pass,matchpass]);
  
  const handle = async (e)=>{
    e.preventDefault();
    //if button enabled with JS hack
    const v1 = USER_REGEX.test(user);
    const v2 = PASS_REGEX.test(pass);
    const v3 = EMAIL_REGEX.test(email);
    if (!v1 || !v2 || !v3) {
      seterrMsg("Invalid entry");
      return;
    }
    const getData = async ()=>{
      try
      { 
          await axios.post('/register_new_user',{"username" : user , "email" : email , "password" : pass});
          toast.success('email signed up successfully');
          setTimeout(function() {
            window.location='/login'
          }, delay);
      }
      catch(ex) {
          if(ex.response.status == 404)
          {toast.error(ex.message);console.log("error");}
      }
    }
    if (v1 && v2 && v3) {
      getData();
      return;
    }
  }

 

  return (
    <div>
    <Container>
    <div className="Register">
      <div className='Register-app d-flex text-center'>
          <form className='Register-app-page'>
            <p ref={errRef} className={errMsg ? "errmsg" : 'offscreen'} aria-live='assertive'>{errMsg}</p>
            <h1 style={{color : 'white'}}>Sign up</h1><br></br>
             <h2 style={{color : 'white'}}>Welcome to Pixelpoint</h2>
             <div className='Register-app-page-div'>
              {/* ////////////////////////////////////////////// */}
              {/* label username */}
             <label htmlFor='username' style={{color : 'white',position :'relative' , right :'30%'}}>
              Username:
              <span className={Validuser ? "valid" : "hide"}>
                 <FontAwesomeIcon icon={faCheck}/>
              </span>
              <span className={Validuser || !user ? "hide" : "invalid"}>
                  <FontAwesomeIcon icon ={faTimes}/>
              </span>
              </label> 
              {/* input username */}
             <input 
             id='username' 
             ref={userRef} 
             required  
             onChange={(e)=>{setuser(e.target.value)}} 
             type='text' 
             autoComplete='off'
             aria-invalid={Validuser ? "false" : "true"}
             aria-describedby='uidnote'
             onFocus={()=> setuserFocus(true)}
             onBlur={()=> setuserFocus(true)}
             />
             {/* instructions username */}
             <p id='uidnote' className={userFocus && user && !Validuser ? "instructions" : "offscreen"} >
                <FontAwesomeIcon icon={faInfoCircle}/>
                4 to 24 characters.<br/>
                Must begin with a letter.<br/>
                Letters, numbers , underscores , hyphens allowed.
             </p>
             {/* ?????????????????????????????????????????????????????????????????????? */}

              {/* ////////////////////////////////////////////////// */}
             {/* label email */}
             <label htmlFor='email' style={{color : 'white',position :'relative' , right :'33%'}}>
                 Email:  
                 <span className={Validemail ? "valid" : "hide"}>
                 <FontAwesomeIcon icon={faCheck}/>
              </span>
              <span className={Validemail || !email ? "hide" : "invalid"}>
                  <FontAwesomeIcon icon ={faTimes}/>
              </span>
             </label>
             {/* input email */}
             <input 
             id='email'  
             required  
             onChange={(e)=>{setemail(e.target.value)}} 
             type='email' 
             aria-invalid={Validemail ? "false" : "true"}
             aria-describedby='emailnote'
             onFocus={()=> setFocusemail(true)}
             onBlur={()=> setFocusemail(true)}
             />
             {/* instructions email */}
             <p id='emailnote' className={Focusemail && !Validemail ? "instructions" : "offscreen"}>
              <FontAwesomeIcon icon={faInfoCircle} />
              Uppercase and lowercase letters (A-Z and a-z)<br/>
              Numeric characters (0-9) Special characters - ! # $ % & ' * + - / = ? ^ _ ` '{' | '}' ~<br/>
             </p>
              

             {/* ?????????????????????????????????????????????????????????????????????? */}
             {/* ////////////////////////////////////////////////// */}
             {/* label password */}
             <label htmlFor='password' style={{color : 'white',position :'relative' , right :'31%'}}>
                 Password:
                 <span className={Validpass ? "valid" : "hide"}>
                 <FontAwesomeIcon icon={faCheck}/>
              </span>
              <span className={Validpass || !pass ? "hide" : "invalid"}>
                  <FontAwesomeIcon icon ={faTimes}/>
              </span>
             </label>
             {/* input password */}
             <input 
             id='password'  
             required  
             onChange={(e)=>{setpass(e.target.value)}} 
             type='password' 
             aria-invalid={Validpass ? "false" : "true"}
             aria-describedby='passnote'
             onFocus={()=> setFocuspass(true)}
             onBlur={()=> setFocuspass(true)}
             />
             {/* instructions password */}
             <p id='passnote' className={Focuspass && !Validpass ? "instructions" : "offscreen"}>
              <FontAwesomeIcon icon={faInfoCircle} />
              8 to 24 characters.<br/>
              Must include uppercase and lowercase letters, a number and a special character.<br/>
              Allowed special characters: ! @ # $ % 
             </p>
             {/* /////////////////////////////////////////////////////// */}
             {/* label matching password */}
             <label htmlFor='matching' style={{color : 'white',position :'relative' , right :'24%'}}>
              Confirm password:
              <span className={Validmatchpass && matchpass ? "valid" : "hide"}>
                 <FontAwesomeIcon icon={faCheck}/>
              </span>
              <span className={Validmatchpass || !matchpass ? "hide" : "invalid"}>
                  <FontAwesomeIcon icon ={faTimes}/>
              </span>
             </label>
             {/* input matching password */}
             <input 
             id='matchpassword'  
             required  
             onChange={(e)=>{setmatchpass(e.target.value)}} 
             type='password' 
             aria-invalid={ Validmatchpass ? "false" : "true"}
             aria-describedby='matchpassnote'
             onFocus={()=> setFocusmatchpass(true)}
             onBlur={()=> setFocusmatchpass(false)}
             />
             {/* instruction matching password */}
             <span id='matchpassnote' className={!Validmatchpass && Focusmatchpass ? 'instructions' : 'offscreen'}>
              <FontAwesomeIcon icon={faInfoCircle}/>
               Must match the first password input field.
             </span>
             </div>
             <br></br>
             {/* ///////////////////////////////////////////////////// */}
             {/* submit button */}
             <button
             onClick={handle}
             disabled ={!Validuser || !Validpass || !Validmatchpass || !Validemail ? true : false} 
             className='btn btn-light Register-app-page-btn'>Sign up</button>
             <h6 style={{color : 'white'}}>Already have an account <a style={{color : 'white'}} href='/login'>Login</a></h6>
          </form>
        </div>
        </div>
     </Container>
    </div> 
  )
}


export default React.memo(Register);