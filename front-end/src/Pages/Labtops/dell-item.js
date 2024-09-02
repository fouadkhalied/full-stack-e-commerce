





import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../Labtops.css';
import data101 from '../labtopsjson/dell.json'
import { useState } from 'react';
import { faArrowDown ,faArrowUp, faHeart, faL, faStar} from '@fortawesome/free-solid-svg-icons';
import { faStarHalfStroke } from '@fortawesome/free-solid-svg-icons';
import Collapse from 'react-bootstrap/Collapse';
import React from 'react';
import { useDispatch } from 'react-redux';
import { addFavorite, addProduct, deleteProduct, removeFavorite } from '../../Components/redux/Actions/action-types';
import { useNavigate } from 'react-router-dom';
import cookie from 'js-cookie'
import axios from 'axios';



const Dellitem =()=>{
        const x3 = localStorage.getItem("key");
        const router311 = useNavigate()
        
        let cart = JSON.parse(localStorage.getItem("productsID")) || [];
        let cart2 = JSON.parse(localStorage.getItem("favoID")) || [];
        let found = cart.find((obj) => {return obj === x3});
        let found2 = cart2.find((obj) => {return obj === x3});
        let def = found2 !== undefined ? true : false
        const [x,setx] = useState(0);
        const [open, setOpen] = useState(false);
        const [clicked , setclicked] = useState(found);
        const [red , setred] = useState(def);
        const seemore = "see more";
        const seeless = "see less";
        const dispatch1 = useDispatch();
      //   /////////////////////////////////////////////////////////////
      const buttonhandle =()=>
      {
         if (!cookie.get('token')) {
            window.location ="/login";
            return;
         }
         setclicked(x3)
         dispatch1({
            type : addProduct ,  
            id : x3
         })      
      }
      ////////////////////////////////////////////////////////////////////
      const deletehandle =()=>{
         setclicked(undefined);
         dispatch1({
            type : deleteProduct ,
            index : x3
         })
      }
      const favohandle =()=>
      {
         setred(!red);
         if (red !== true) {
         dispatch1({
            type : addFavorite,
            id : x3
         })
         }
         else{ 
         dispatch1({
            type : removeFavorite , 
            index : x3
         })
        }
      }
   return(
       <div className='dell-item-div mt-3'>
          <div className='dell-item-div-sidebar'>
          <a style={{cursor : 'pointer'}} onClick={()=>router311(-1)}>Go back</a>
          {
            data101[x3].img.map((ele,index)=>{
               return <div className='dell-item-div-sidebar-div'><img onMouseEnter={()=>setx(index)} width="50px" height="40px" src={ele}/></div>
            })
          }
          </div> 
          <div className='dell-item-div-img'>
             {
                <img src={data101[x3].img[x]} width="100%" height="100%"/>
             }
             <div className='dell-item-div-img-buttons'>
                  <button className='btn btn-dark' style={{display : clicked !== undefined ? 'none' : 'block'}} onClick={buttonhandle}>
                     Add to cart
                  </button>
                  <button className='btn btn-dark' style={{display : clicked === undefined ? 'none' : 'block'}} onClick={deletehandle}>
                     Remove item
                  </button>
                  <FontAwesomeIcon className='faheart' style={{color : red === true ? 'red' : 'black'}} onClick={favohandle} icon={faHeart}/>
             </div>
          </div>
          <div className='dell-item-div-content'>
             <div className='dell-item-div-img-content-paragraph'>
                 <h4>
                    {
                        data101[x3].paragraph
                    }
                 </h4>
             </div>
             <div className='dell-item-div-content-stars'>
                 {
                 data101[x3].stars.map((obj)=>{
                      return obj !==3 ? <FontAwesomeIcon icon={faStar} style={{color : obj ===1 ? 'orange' : ''}}/> 
                      : <FontAwesomeIcon style={{color : 'orange'}} icon={faStarHalfStroke}/>
                    })
                 }
             </div>
             <div className='dell-item-div-content-size'>
               <p>Size : <p style={{fontWeight : "bold" , display : 'inline'}}>{data101[x3].size}</p></p>
             </div>
             <div className='dell-item-div-content-quality'>
               <h5>
               This product is inspected, tested, and refurbished, as necessary to be fully functional according to Amazon Renewed standards.
               </h5>
             </div>
             <div className='dell-item-div-content-info'>
                <h5 style={{fontWeight : 'bold'}} >Brand : <h5 style={{display : 'inline', fontWeight : 'normal'}}>{data101[x3].brand}</h5></h5>
                <h5 style={{fontWeight : 'bold'}} >Model name : <h5 style={{display : 'inline', fontWeight : 'normal'}}>{data101[x3].model}</h5></h5>
                <h5 style={{fontWeight : 'bold'}} >Screen size : <h5 style={{display : 'inline', fontWeight : 'normal'}}>{data101[x3].display}</h5></h5>
                <h5 style={{fontWeight : 'bold'}} >Storage : <h5 style={{display : 'inline', fontWeight : 'normal'}}>{data101[x3].storage}</h5></h5>
                <div>
            <Collapse in={open}>
                <div id="example-collapse-text">
                <h5 style={{fontWeight : 'bold'}} >Ram : <h5 style={{display : 'inline', fontWeight : 'normal'}}>{data101[x3].memory}</h5></h5>
                <h5 style={{fontWeight : 'bold'}} >Processor : <h5 style={{display : 'inline', fontWeight : 'normal'}}>{data101[x3].processor}</h5></h5>
                <h5 style={{fontWeight : 'bold'}} >Graphics : <h5 style={{display : 'inline', fontWeight : 'normal'}}>{data101[x3].graphics}</h5></h5>
                <h5 style={{fontWeight : 'bold'}} >Price : <h5 style={{display : 'inline', fontWeight : 'normal'}}>{data101[x3].price}$</h5></h5>
                </div>
            </Collapse>
            <a
               onClick={() => setOpen(!open)}
               aria-controls="example-collapse-text"
               aria-expanded={open}
               style={{color : 'blue' , cursor : 'pointer' , textDecoration : 'underline'}}
            >
            {open ? <p> <FontAwesomeIcon icon={faArrowUp}/> {seeless} </p> : <p> <FontAwesomeIcon icon={faArrowDown}/> {seemore} </p>}
            </a>
            </div>
          </div>
        </div>
    </div>
   )
}
export default React.memo(Dellitem);