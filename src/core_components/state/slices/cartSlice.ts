import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ProductResponse } from "@/types/types";

interface CartItem {
    product: ProductResponse;
    quantity: number;
}

interface CartState {
    items: CartItem[];
}

const initialState: CartState = {
    items: [],
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<ProductResponse>) => {
            const existing = state.items.find((i) => i.product.id === action.payload.id);
            if (existing) {
                existing.quantity += 1;
            } else {
                state.items.push({ product: action.payload, quantity: 1 });
            }
        },
        removeFromCart: (state, action: PayloadAction<number>) => {
            state.items = state.items.filter((i) => i.product.id !== action.payload);
        },
        incrementQuantity: (state, action: PayloadAction<number>) => {
            const item = state.items.find((i) => i.product.id === action.payload);
            if (item) item.quantity += 1;
        },
        decrementQuantity: (state, action: PayloadAction<number>) => {
            const item = state.items.find((i) => i.product.id === action.payload);
            if (item) {
                if (item.quantity <= 1) {
                    // remove if quantity reaches 0
                    state.items = state.items.filter((i) => i.product.id !== action.payload);
                } else {
                    item.quantity -= 1;
                }
            }
        },
        clearCart: (state) => {
            state.items = [];
        },
    },
});

export const { addToCart, removeFromCart, incrementQuantity, decrementQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;