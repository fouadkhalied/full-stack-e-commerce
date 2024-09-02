//reducer 
// access => state , action
// state => edit by action 

import { add100, addProduct , addFavorite, deleteProduct, removeFavorite, deleteProduct123, removeFavorite123 } from "./Actions/action-types";
import cookie from 'js-cookie';
import axios from 'axios';



let CartID = JSON.parse(localStorage.getItem("productsID"))||[];
let favoID = JSON.parse(localStorage.getItem("favoID")) || [];

const fun_add_product = async(car)=>{
    try{
        axios.interceptors.request.use((config)=>{
            config.headers.Authorization = `Bearer ${cookie.get('token')}`
            return config
        })

        axios.patch('/add_products' , {"id_of_products" : car , "num_of_orders" : car.length}).then((data)=>{
            console.log(data);
        }).catch((error)=>{
            console.log(error);
        })
    } catch(error){
        console.log(error); 
    }
}


const fun_delete_product = async(car)=>{
    try{
        axios.interceptors.request.use((config)=>{
            config.headers.Authorization = `Bearer ${cookie.get('token')}`
            return config
        })

        axios.patch('/delete_products' , {"id_of_products" : car , "num_of_orders" : car.length}).then((data)=>{
            console.log(data);
        }).catch((error)=>{
            console.log(error.message);
        })
    } catch(error){
        console.log(error); 
    }
}

const reducer1 = (state = {
    x1 : 0 , 
    x2 : JSON.parse(localStorage.getItem("productsID"))||[] , 
    x3 : JSON.parse(localStorage.getItem("productsID"))||[] ,
    x4 : JSON.parse(localStorage.getItem("favoID"))||[] } , action)=>{    
    switch (action.type) {  
        case add100:
        {
            localStorage.setItem("key" , action.value);
            return {...state , x1 : action.value}
        }
        case addProduct:
        {
            const c = CartID.find((obj) => {return obj === action.id});
            if(c===undefined){
                CartID.push(action.id);
                //state.x2.push(action.id);
                localStorage.setItem("productsID",JSON.stringify(CartID));
                fun_add_product(CartID);
                return {...state , x2 : JSON.parse(localStorage.getItem("productsID")) , x3 : JSON.parse(localStorage.getItem("productsID"))}
            }
        }
        case deleteProduct:
        {
            const c = CartID.findIndex((obj)=>{return obj === action.index});
            if (c!==-1) {
                CartID.splice(c,1);
                //state.x2.splice(c,1);
                localStorage.setItem("productsID" , JSON.stringify(CartID))
                fun_delete_product(CartID);
                return {...state , x2 : JSON.parse(localStorage.getItem("productsID"))}
            }
        }
        case deleteProduct123:
        {
            const c = CartID.findIndex((obj)=>{return obj == action.index123});
            if (c!==-1) {
                CartID.splice(c,1);
                //state.x2.splice(c,1);
                localStorage.setItem("productsID" , JSON.stringify(CartID))
                return {...state , x3 : JSON.parse(localStorage.getItem("productsID"))}
            }
        }         
        case addFavorite:
            {
                const c = favoID.find((obj) => {return obj === action.id});
                if(c===undefined && action.id !== null)
                {
                    favoID.push(action.id);
                    localStorage.setItem("favoID",JSON.stringify(favoID))
                }
                return {...state}
            }
        case removeFavorite:
            {                    
                console.log(121212);
                const c = favoID.findIndex((obj)=>{return obj == action.index});
                if (c!==-1) {
                    favoID.splice(c,1);
                    localStorage.setItem("favoID" , JSON.stringify(favoID));
                    return {...state , x4 : JSON.parse(localStorage.getItem("favoID"))}
                }
            }            
        default:
            return state;
    }
}
export default reducer1;

