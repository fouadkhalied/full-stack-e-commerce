






const cartSlice = createSlice({
    name : "cart" ,
    intialstate,
    reducers : {
        addToCart(state , action){
            state.cartItems.push(action.payload)
        }
    },
})

export const {addToCart } = cartSlice.actions;
export default cartSlice.reducer;