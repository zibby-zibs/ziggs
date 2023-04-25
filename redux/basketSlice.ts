import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState, store } from "./store";


export interface BasketSlice {
    items: Product[]

}

const initialState: BasketSlice = {
    items: [],
}

export const basketSlice = createSlice({
    name: "basket",
    initialState,
    reducers: {
        addToBasket: (state: BasketSlice, action: PayloadAction<Product>) => {
            state.items = [...state.items, action.payload]
        },
        removeFromBasket: (state: BasketSlice, action: PayloadAction<{id: string}>)=>{
            //Find the index of the item whose id matches the payload id
            const index = state.items.findIndex((item: Product)=>item._id === action.payload.id);
            //preserve the old state: it is just the items arrray
            let newBasket = [...state.items];
            //if the index exists, we will remove it from the array of items
            if (index >= 0){
                newBasket.splice(index, 1)
            } else {
                console.log(`Can't remove product (id: ${action.payload.id}) as it is not in basket)`)
            }

            state.items = newBasket;
        }
    }
})

export const { addToBasket, removeFromBasket } = basketSlice.actions;

//selectors
export const selectBasketItems = (state: RootState) => state.basket.items;
export const selectBasketItemsWithId = (state: RootState, id: string) => {
    state.basket.items.filter((item: Product)=> item._id === id)
};
export const selectBasketTotal = (state: RootState) => 
    state.basket.items.reduce((total: number, items: Product) => (total += items.price),0)


export default basketSlice.reducer