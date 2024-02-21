import { createSlice } from "@reduxjs/toolkit";
import { CartData } from "../../data";

export const CartSlice = createSlice({
    name: "cart",
    initialState: [] as CartData[],
    reducers: {
        add: (state, action) => {
            const index = state.findIndex(item => item.id === action.payload.id);
            if(index !== -1){
                state[index].quantity = state[index].quantity + 1;
            }
            else{
                state.push(action.payload);
            }
        },
        remove: (state, action) => {
            return state.filter((item: any) => item.id !== action.payload);
        },
        updateQuantity: (state, action) => {
            const { id, quantity } = action.payload;
            const updatedState = state.map((item: CartData) => {
                if (item.id === id) {
                    return { ...item, quantity };
                }
                return item;
            });
            state.splice(0, state.length, ...updatedState);
        },
        removeAll: (state, action) => {
            state = [];
            return state;
        }
    }
});

export const { add, remove, updateQuantity, removeAll } = CartSlice.actions;
export default CartSlice.reducer;