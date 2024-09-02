import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../Labtops.css';
import dat from '../labtopsjson/dell.json'
import { Container} from 'react-bootstrap';
import { faStar} from '@fortawesome/free-solid-svg-icons';
import { faStarHalfStroke } from '@fortawesome/free-solid-svg-icons';
import { useDispatch } from 'react-redux';
import { add100} from '../../Components/redux/Actions/action-types';
import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import cookie from 'js-cookie';


const Dell = ()=>{
  const [x,setx] = useState('');
  const y = dat.filter((obj)=>{
    const cv = obj.brand.toLocaleLowerCase();
    return (
      cv.includes(x)
    )
  })
  const dispatch1 = useDispatch()
    const add123= (z1)=>{
      if (!cookie.get('token')) {
        window.location ="/login";
        return;
     }
        dispatch1({
          type : add100,
          value : z1
        })
    }
    return(
      <div className='products-dell-div'> 
      <Container>
        <div className='header-search-div123'>
          <input type="search" value={x} onChange={(e)=>{setx(e.target.value)}} className="search_query" placeholder="Enter your search brand" />
          </div>
        <div className='products-dell'>
          {
             y.map((obj)=>{ return  <div className='items'>
             <div className='items-img'>
                 <Link onClick={()=>add123(obj.id)} to='/dell-item'>
                   <img src={obj.image} width="360px" loading='lazy'/>
                 </Link>
             </div>
             <div className='items-content'>
               {/* paragraph */}
                <div className='items-content-para'>
                <Link to='/dell-item' style={{textDecoration : 'none' , color : 'black' , fontWeight : '600'}}>
                 <p> 
                 {
                   obj.para
                 }
                 </p>
                </Link>
                </div>
                {/* stars */}
                <div className='items-content-stars'>
                 {
                     obj.stars.map((obj)=>{
                     return obj !==3 ? <FontAwesomeIcon icon={faStar} style={{color : obj ===1 ? 'orange' : ''}}/> 
                     : <FontAwesomeIcon style={{color : 'orange'}} icon={faStarHalfStroke}/>
                   })
                 }
                </div>
                <div className='items-content-price'>
                 {
                   obj.price 
                 }
                 $
                </div>
                <div className='items-content-ship'>
                Delivery Wed, Mar {(obj.price % 30)} <br/>
                Ships to Egypt
                </div>
             </div>
           </div>})
          }
        </div>
      </Container>   
      </div>
    )        
}
export default React.memo(Dell);