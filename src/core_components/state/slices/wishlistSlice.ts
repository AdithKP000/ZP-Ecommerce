import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { ProductResponse } from "@/types/ProductTypes"

interface WishlistState {
    items: ProductResponse[]
}

const initialState: WishlistState = {
    items: []
}

const whishListSlice = createSlice({
    name: "whishlist",
    initialState,
    reducers: {
        addToWishList: (state, action: PayloadAction<ProductResponse>) => {
            state.items.push(action.payload);
        },
        removeFomWishList: (state, action: PayloadAction<number>) => {
            state.items = state.items.filter((item) => item.id !== action.payload);
        }
    },
})


export const { addToWishList, removeFomWishList } = whishListSlice.actions;
export default whishListSlice.reducer