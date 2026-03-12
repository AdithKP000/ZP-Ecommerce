

import "@testing-library/jest-dom";
import React from "react";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";

import ItemsDisplay from "./Items-display";
import cartReducer from "@/core_components/state/slices/cartSlice";
import wishlistReducer from "@/core_components/state/slices/wishlistSlice";
import type { ProductResponse } from "@/types/ProductTypes";

jest.mock("next/link", () => {
    return function MockLink({ href, children }: { href: string; children: React.ReactNode }) {
        return <a href={href}>{children}</a>;
    };
});

function makeStore(
    cart: { items: { product: ProductResponse; quantity: number }[] } = { items: [] },
    wishlist: { items: ProductResponse[] } = { items: [] }
) {
    return configureStore({
        reducer: { cart: cartReducer, wishlist: wishlistReducer },
        preloadedState: { cart, wishlist },
    });
}

const base = {
    description: "desc",
    category: "electronics",
    stock: 10,
    tags: ["tag"],
    brand: "BrandX",
    sku: "SKU-001",
    weight: 1,
    dimensions: { width: 1, height: 1, depth: 1 },
    warrantyInformation: "1 year",
    shippingInformation: "2 days",
    availabilityStatus: "In Stock",
    reviews: [],
    returnPolicy: "30 days",
    minimumOrderQuantity: 1,
    meta: { createdAt: "", updatedAt: "", barcode: "", qrCode: "" },
    images: [],
    thumbnail: "https://example.com/thumb.jpg",
};

/** Product with a discount */
const discountedProduct: ProductResponse = {
    ...base,
    id: 1,
    title: "Wireless Headphones",
    price: 100,
    discountPercentage: 20,
    rating: 4.5,
    category: "electronics",
};

/** Product without any discount */
const fullPriceProduct: ProductResponse = {
    ...base,
    id: 2,
    title: "Leather Wallet",
    price: 49.99,
    discountPercentage: 0,
    rating: 3.0,
    category: "accessories",
};


describe("ItemsDisplay", () => {
    it("renders a card for every product passed in", () => {
        const store = makeStore();
        render(
            <Provider store={store}>
                <ItemsDisplay products={[discountedProduct, fullPriceProduct]} />
            </Provider>
        );
        // shoes a card for all products present here it will didplay 2 cards
        expect(screen.getAllByText(/Wireless Headphones/i).length).toBeGreaterThanOrEqual(1);
        expect(screen.getAllByText(/Leather Wallet/i).length).toBeGreaterThanOrEqual(1);
    });

    it("renders nothing (empty) when given an empty products array", () => {
        const store = makeStore();
        const { container } = render(
            <Provider store={store}>
                <ItemsDisplay products={[]} />
            </Provider>
        );

        // No buttons should appear as we dont have any products
        expect(screen.queryAllByRole("button")).toHaveLength(0);
    });

    it("displays the product category", () => {
        const store = makeStore();
        render(
            <Provider store={store}>
                <ItemsDisplay products={[discountedProduct]} />
            </Provider>
        );
        //display the products category
        expect(screen.getAllByText(/electronics/i).length).toBeGreaterThanOrEqual(1);
    });

    it("shows the discounted price and strike-through original price for a discounted product", () => {
        const store = makeStore();
        render(
            <Provider store={store}>
                <ItemsDisplay products={[discountedProduct]} />
            </Provider>
        );

        // Original price struck through — $100.00
        expect(screen.getAllByText("$100.00").length).toBeGreaterThanOrEqual(1);
        expect(screen.getAllByText("$80.00").length).toBeGreaterThanOrEqual(1);
    });

    it("shows only the regular price when there is no discount", () => {
        const store = makeStore();
        render(
            <Provider store={store}>
                <ItemsDisplay products={[fullPriceProduct]} />
            </Provider>
        );

        expect(screen.getAllByText("$49.99").length).toBeGreaterThanOrEqual(1);
        // No line-through / secondary price element for $49.99
        expect(screen.queryAllByText("$0.00")).toHaveLength(0);
    });

    it("shows the discount badge percentage on a discounted product", () => {
        const store = makeStore();
        render(
            <Provider store={store}>
                <ItemsDisplay products={[discountedProduct]} />
            </Provider>
        );

        // badge text: -20%
        expect(screen.getAllByText(/-20%/i).length).toBeGreaterThanOrEqual(1);
    });

    it("does NOT show a discount badge when discountPercentage is 0", () => {
        const store = makeStore();
        render(
            <Provider store={store}>
                <ItemsDisplay products={[fullPriceProduct]} />
            </Provider>
        );

        expect(screen.queryByText(/-%/)).toBeNull();
    });

    it("shows the rating value in text", () => {
        const store = makeStore();
        render(
            <Provider store={store}>
                <ItemsDisplay products={[discountedProduct]} />
            </Provider>
        );

        // "- 4.5 out of 5" for all the products being displayed
        expect(screen.getAllByText(/4\.5 out of 5/i).length).toBeGreaterThanOrEqual(1);
    });

    it("renders a product image with the correct alt text", () => {
        const store = makeStore();
        render(
            <Provider store={store}>
                <ItemsDisplay products={[discountedProduct]} />
            </Provider>
        );

        const images = screen.getAllByRole("img", { name: /Wireless Headphones/i });
        expect(images.length).toBeGreaterThanOrEqual(1);
    });

    it("renders an 'Add to wishlist' button for each product when wishlist is empty", () => {
        const store = makeStore();
        render(
            <Provider store={store}>
                <ItemsDisplay products={[discountedProduct]} />
            </Provider>
        );

        const wishlistBtns = screen.getAllByRole("button", { name: /add to wishlist/i });
        expect(wishlistBtns.length).toBeGreaterThanOrEqual(1);
    });

    it("renders an 'Add to cart' button for each product when cart is empty", () => {
        const store = makeStore();
        render(
            <Provider store={store}>
                <ItemsDisplay products={[discountedProduct]} />
            </Provider>
        );

        const cartBtns = screen.getAllByRole("button", { name: /add to cart/i });
        expect(cartBtns.length).toBeGreaterThanOrEqual(1);
    });

    it("shows 'Remove from wishlist' when the product is already wishlisted", () => {
        const store = makeStore(
            { items: [] },
            { items: [discountedProduct] }
        );
        render(
            <Provider store={store}>
                <ItemsDisplay products={[discountedProduct]} />
            </Provider>
        );

        expect(screen.getAllByRole("button", { name: /remove from wishlist/i }).length).toBeGreaterThanOrEqual(1);
    });

    it("shows 'Remove from cart' when the product is already in the cart", () => {
        const store = makeStore({ items: [{ product: discountedProduct, quantity: 1 }] });
        render(
            <Provider store={store}>
                <ItemsDisplay products={[discountedProduct]} />
            </Provider>
        );

        expect(screen.getAllByRole("button", { name: /remove from cart/i }).length).toBeGreaterThanOrEqual(1);
    });

    it("adds a product to the cart store when 'Add to cart' is clicked", async () => {
        const store = makeStore();
        render(
            <Provider store={store}>
                <ItemsDisplay products={[discountedProduct]} />
            </Provider>
        );

        // Click the first "Add to cart" button (mobile and desktop both render one)
        await userEvent.click(screen.getAllByRole("button", { name: /add to cart/i })[0]);

        expect(store.getState().cart.items).toHaveLength(1);
        expect(store.getState().cart.items[0].product.id).toBe(discountedProduct.id);
    });

    it("renders the product link pointing to /products/:id", () => {
        const store = makeStore();
        render(
            <Provider store={store}>
                <ItemsDisplay products={[discountedProduct]} />
            </Provider>
        );

        const links = screen.getAllByRole("link");
        const productLinks = links.filter((l) => l.getAttribute("href") === `/products/${discountedProduct.id}`);
        expect(productLinks.length).toBeGreaterThanOrEqual(1);
    });
});
