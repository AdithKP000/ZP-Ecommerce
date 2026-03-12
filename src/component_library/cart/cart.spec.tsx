

import "@testing-library/jest-dom";
import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";

import AddToCardButton from "./CardButton";
import cartReducer, {
    addToCart,
    removeFromCart,
    incrementQuantity,
    decrementQuantity,
    clearCart,
} from "@/core_components/state/slices/cartSlice";
import type { ProductResponse } from "@/types/ProductTypes";


function makeStore(preloadedCart: { items: { product: ProductResponse; quantity: number }[] } = { items: [] }) {
    return configureStore({
        reducer: { cart: cartReducer },
        preloadedState: { cart: preloadedCart },
    });
}

const mockProduct: ProductResponse = {
    id: 2,
    title: "Eyeshadow Palette with Mirror",
    description: "The Eyeshadow Palette with Mirror offers a versatile range of eyeshadow shades for creating stunning eye looks. With a built-in mirror, it's convenient for on-the-go makeup application.",
    category: "beauty",
    price: 19.99,
    discountPercentage: 18.19,
    rating: 2.86,
    stock: 34,
    tags: [
        "beauty",
        "eyeshadow"
    ],
    brand: "Glamour Beauty",
    sku: "BEA-GLA-EYE-002",
    weight: 9,
    dimensions: {
        width: 9.26,
        height: 22.47,
        depth: 27.67
    },
    warrantyInformation: "1 year warranty",
    shippingInformation: "Ships in 2 weeks",
    availabilityStatus: "In Stock",
    reviews: [
        {
            rating: 5,
            comment: "Great product!",
            date: "2025-04-30T09:41:02.053Z",
            reviewerName: "Savannah Gomez",
            reviewerEmail: "savannah.gomez@x.dummyjson.com"
        }
    ],
    returnPolicy: "7 days return policy",
    minimumOrderQuantity: 20,
    meta: {
        createdAt: "2025-04-30T09:41:02.053Z",
        updatedAt: "2025-04-30T09:41:02.053Z",
        barcode: "9170275171413",
        qrCode: "https://cdn.dummyjson.com/public/qr-code.png"
    },
    images: [
        "https://cdn.dummyjson.com/product-images/beauty/eyeshadow-palette-with-mirror/1.webp"
    ],
    thumbnail: "https://cdn.dummyjson.com/product-images/beauty/eyeshadow-palette-with-mirror/thumbnail.webp"
};

describe("AddToCardButton Functionalities", () => {
    it("renders the cart icon button", () => {
        const store = makeStore();
        render(
            <Provider store={store} >
                <AddToCardButton product={mockProduct} />
            </Provider>
        );

        const button = screen.getByRole("button");
        expect(button).toBeInTheDocument();
    });

    it('shows "Add to cart" aria-label when product is NOT in cart', () => {
        const store = makeStore(); // empty cart
        render(
            <Provider store={store} >
                <AddToCardButton product={mockProduct} />
            </Provider>
        );

        expect(screen.getByRole("button", { name: /add to cart/i })).toBeInTheDocument();
    });

    it('shows "Remove from cart" aria-label when product IS already in cart', () => {
        const store = makeStore({ items: [{ product: mockProduct, quantity: 1 }] });
        render(
            <Provider store={store} >
                <AddToCardButton product={mockProduct} />
            </Provider>
        );

        expect(screen.getByRole("button", { name: /remove from cart/i })).toBeInTheDocument();
    });

    it("dispatches addToCart when clicking and product is NOT in cart", async () => {
        const store = makeStore();
        const dispatchSpy = jest.spyOn(store, "dispatch");

        render(
            <Provider store={store} >
                <AddToCardButton product={mockProduct} />
            </Provider>
        );

        await userEvent.click(screen.getByRole("button"));

        expect(dispatchSpy).toHaveBeenCalledWith(addToCart(mockProduct));
    });

    it("dispatches removeFromCart when clicking and product IS in cart", async () => {
        const store = makeStore({ items: [{ product: mockProduct, quantity: 1 }] });
        const dispatchSpy = jest.spyOn(store, "dispatch");

        render(
            <Provider store={store} >
                <AddToCardButton product={mockProduct} />
            </Provider>
        );

        await userEvent.click(screen.getByRole("button", { name: /remove from cart/i }));

        // removeFromCart takes the product id (number)
        const dispatched = dispatchSpy.mock.calls.map((call) => call[0]) as { type: string; payload: unknown }[];
        expect(dispatched.some((action) => action.type === "cart/removeFromCart" && action.payload === mockProduct.id)).toBe(true);
    });

    it("adds the correct product to the store after clicking 'Add to cart'", async () => {
        const store = makeStore();

        render(
            <Provider store={store} >
                <AddToCardButton product={mockProduct} />
            </Provider>
        );

        await userEvent.click(screen.getByRole("button"));

        const cartItems = store.getState().cart.items;
        expect(cartItems).toHaveLength(1);
        expect(cartItems[0].product.id).toBe(mockProduct.id);
        expect(cartItems[0].quantity).toBe(1);
    });

    it("removes the product from the store after clicking 'Remove from cart'", async () => {
        const store = makeStore({ items: [{ product: mockProduct, quantity: 2 }] });

        render(
            <Provider store={store} >
                <AddToCardButton product={mockProduct} />
            </Provider>
        );

        await userEvent.click(screen.getByRole("button", { name: /remove from cart/i }));

        expect(store.getState().cart.items).toHaveLength(0);
    });
    it("addToCart increments quantity when product already exists in cart", () => {
        const store = makeStore({ items: [{ product: mockProduct, quantity: 1 }] });
        store.dispatch(addToCart(mockProduct));
        expect(store.getState().cart.items[0].quantity).toBe(2);
    });

    it("removeFromCart removes the matching product by id", () => {
        const store = makeStore({ items: [{ product: mockProduct, quantity: 3 }] });
        store.dispatch(removeFromCart(mockProduct.id));
        expect(store.getState().cart.items).toHaveLength(0);
    });

    it("incrementQuantity increases quantity by 1", () => {
        const store = makeStore({ items: [{ product: mockProduct, quantity: 1 }] });
        store.dispatch(incrementQuantity(mockProduct.id));
        expect(store.getState().cart.items[0].quantity).toBe(2);
    });

    it("decrementQuantity reduces quantity by 1 when quantity > 1", () => {
        const store = makeStore({ items: [{ product: mockProduct, quantity: 3 }] });
        store.dispatch(decrementQuantity(mockProduct.id));
        expect(store.getState().cart.items[0].quantity).toBe(2);
    });

    it("decrementQuantity removes the item entirely when quantity is 1", () => {
        const store = makeStore({ items: [{ product: mockProduct, quantity: 1 }] });
        store.dispatch(decrementQuantity(mockProduct.id));
        expect(store.getState().cart.items).toHaveLength(0);
    });

    it("clearCart empties all items", () => {
        const store = makeStore({ items: [{ product: mockProduct, quantity: 2 }] });
        store.dispatch(clearCart());
        expect(store.getState().cart.items).toHaveLength(0);
    });

});

