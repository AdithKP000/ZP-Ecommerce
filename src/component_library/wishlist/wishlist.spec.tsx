import "@testing-library/jest-dom"
import React from "react"
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import WishlistButton from "./WishlistButton"
import { ProductResponse } from "@/types/ProductTypes";
import wishlistReducer, { addToWishList, removeFomWishList } from "@/core_components/state/slices/wishlistSlice";

function makeStore(preloadedWishlist: { items: ProductResponse[] } = { items: [] }) {
    return configureStore({
        reducer: { wishlist: wishlistReducer },
        preloadedState: { wishlist: preloadedWishlist },
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

describe("Wishlist button functionalities", () => {
    // button render check
    it("Cheching to see whether the wishlist button is rendered", () => {
        const store = makeStore();
        render(
            <Provider store={store}>
                <WishlistButton product={mockProduct} />
            </Provider>
        )

        const button = screen.getByRole("button");
        expect(button).toBeInTheDocument();
    })

    //checking to see whether it displayes add to wishlist when the product is not already on wishlist
    it('shows "add to wishlist"  on the aria-label when no products are added in the wishlist', async () => {
        const store = makeStore();
        render(
            <Provider store={store}>
                <WishlistButton product={mockProduct} />
            </Provider>
        )

        const button = screen.getByRole("button", { name: /add to wishlist/i })
        expect(button).toBeInTheDocument();
    })
    //checking to see whether it displayes remove from wishlist when the product is already on wishlist
    it('shows "remove from wishlist" when the item is already present ', () => {
        const store = makeStore({ items: [mockProduct] })
        render(
            <Provider store={store}>
                <WishlistButton product={mockProduct} />
            </Provider>
        )

        const button = screen.getByRole("button", { name: /remove from wishlist/i })
        expect(button).toBeInTheDocument();
    })
    // checking whether the the element is added to the wishlist when the button is checked
    it("dispacthes addtoWishlist when clicking the button", async () => {
        const store = makeStore();
        const dispatchSpy = jest.spyOn(store, "dispatch")
        render(
            <Provider store={store}>
                <WishlistButton product={mockProduct} />
            </Provider>
        )

        await userEvent.click(screen.getByRole("button"));
        expect(dispatchSpy).toHaveBeenCalledWith(addToWishList(mockProduct));
    })

    // checking the whether the element is removed from the wishlist when the button is clicked again
    it("dispatches removeFromWishlist when clickin the button the second time  ", async () => {
        const store = makeStore({ items: [mockProduct] });
        const dispatchSpy = jest.spyOn(store, "dispatch");
        render(
            <Provider store={store}>
                <WishlistButton product={mockProduct} />
            </Provider>
        )

        await userEvent.click(screen.getByRole("button", { name: /remove from wishlist/i }));
        const dispatched = dispatchSpy.mock.calls.map((call) => call[0]) as { type: string, payload: unknown }[]
        expect(dispatched.some((action) => action.type === "wishlist/removeFomWishList" && action.payload === mockProduct.id))
    })
})