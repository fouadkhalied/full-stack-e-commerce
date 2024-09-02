






import React from 'react';
import './header.css';
import { Container } from 'react-bootstrap';
import data from '../Pages/labtopsjson/dell.json'
import { useDispatch, useSelector } from 'react-redux';
import { deleteProduct, deleteProduct123 } from '../Components/redux/Actions/action-types';

function Cart() {
   const x = useSelector(state => state.x3);
   var total = 0;
   const dispatch1 = useDispatch();
   return (
      <div className='cart-div text-center'>
         <Container>
            <h1 style={{display : x.length > 0 ? 'block' : 'none'}}>
               {
                  x.map((obj)=>{
                     total += data[obj].price
                  })
               }
               Total price is {total}$
            </h1>
            <h1 style={{display : x.length > 0 ? 'none' : 'block'}}>No items to display</h1>
             {
               x.map((obj)=>{
                  return <div className='cart-div-ele'>
                     <img src={data[obj].image} width="350px"/>
                     <div>
                     <h2>Brand : <h3 style={{display : 'inline'}}>{data[obj].brand}</h3></h2>
                     <h2>Model : <h3 style={{display : 'inline'}}>{data[obj].model}</h3></h2>
                     <h2>Price : <h3 style={{display : 'inline'}}>{data[obj].price}$</h3></h2>
                     <button onClick={()=>{dispatch1({type : deleteProduct123 , index123:data[obj].id});console.log(data[obj].id);}} className='btn btn-danger'>Remove item</button>
                     </div>
                  </div>
               })
             }
         </Container>
      </div>
  );
}




export default React.memo(Cart);