







import React from 'react';
import './header.css';
import { Container } from 'react-bootstrap';
import data from '../Pages/labtopsjson/dell.json'
import { useDispatch, useSelector } from 'react-redux';
import { removeFavorite, removeFavorite123 } from '../Components/redux/Actions/action-types';

const Favorites = ()=> {
  const x = useSelector(state=> state.x4);
  const dispatch123 = useDispatch();
  return (
     <div className='cart-div text-center'>
        <Container>
           <h1 style={{display : x.length > 0 ? 'block' : 'none'}}>Favorites</h1>
           <h1 style={{display : x.length > 0 ? 'none' : 'block'}}>No items to display</h1>
            {
              x.map((obj)=>{
                if(obj !== null){ 
                 return <div className='cart-div-ele'>
                    <img src={data[obj].image} width="350px"/>
                    <div>
                    <h2>Brand : <h3 style={{display : 'inline'}}>{data[obj].brand}</h3></h2>
                    <h2>Model : <h3 style={{display : 'inline'}}>{data[obj].model}</h3></h2>
                    <h2>Price : <h3 style={{display : 'inline'}}>{data[obj].price}$</h3></h2>
                    <button className='btn btn-danger' onClick={()=>{dispatch123({type: removeFavorite , index : data[obj].id})}}>Remove item</button>
                    </div>
                 </div>
                }
              })
            }
        </Container>
     </div>
  )
}

export default React.memo(Favorites);