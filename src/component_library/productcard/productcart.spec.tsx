import "@testing-library/jest-dom";
import React from "react";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";

import { ProductCard } from "./ProductCard";
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

describe("All Product Display section", () => {
    it("renders a card for a discounted product", () => {
        const store = makeStore();
        render(
            <Provider store={store}>
                <ProductCard product={discountedProduct} />
            </Provider>
        );

        expect(screen.getByText(/Wireless Headphones/i)).toBeInTheDocument();
    });

    it("renders a card for a full-price product", () => {
        const store = makeStore();
        render(
            <Provider store={store}>
                <ProductCard product={fullPriceProduct} />
            </Provider>
        );

        expect(screen.getByText(/Leather Wallet/i)).toBeInTheDocument();
    });

    it("should display product category", () => {
        const store = makeStore();
        render(
            <Provider store={store}>
                <ProductCard product={discountedProduct} />
            </Provider>
        )
        expect(screen.getByText(/electronics/i)).toBeInTheDocument();
    })

    it("should display the discount badge", () => {
        const store = makeStore()
        render(
            <Provider store={store}>
                <ProductCard product={discountedProduct} />
            </Provider>
        )
        expect(screen.getByText(/-20%/i)).toBeInTheDocument();

    })
    it("Does not show discount badge when the discountPercentage is 0", () => {
        const store = makeStore()
        render(
            <Provider store={store}>
                <ProductCard product={fullPriceProduct} />
            </Provider>
        )

        expect(screen.queryByText(/-%/i)).toBeNull();
    });



    it("renders a product image with the correct alt text", () => {
        const store = makeStore();
        render(
            <Provider store={store}>
                <ProductCard product={discountedProduct} />
            </Provider>
        );

        const images = screen.getByRole("img", { name: /Wireless Headphones/i });
        expect(images).toBeInTheDocument();
    });

    it("renders an 'Add to wishlist' button for each product when wishlist is empty", () => {
        const store = makeStore();
        render(
            <Provider store={store}>
                <ProductCard product={discountedProduct} />
            </Provider>
        );
        const wishlistBtns = screen.getByRole("button", { name: /add to wishlist/i });
        expect(wishlistBtns).toBeInTheDocument;
    })
    it("renders an 'Add to cart' button for each product when cart is empty", () => {
        const store = makeStore();
        render(
            <Provider store={store}>
                <ProductCard product={discountedProduct} />
            </Provider>
        );

        const cartBtns = screen.getByRole("button", { name: /add to cart/i });
        expect(cartBtns).toBeInTheDocument();
    });
    it("shows 'Remove from wishlist' when the product is already wishlisted", () => {
        const store = makeStore(
            { items: [] },
            { items: [discountedProduct] }
        );
        render(
            <Provider store={store}>
                <ProductCard product={discountedProduct} />
            </Provider>
        );

        expect(screen.getByRole("button", { name: /remove from wishlist/i })).toBeInTheDocument();
    });
    it("shows 'Remove from cart' when the product is already in the cart", () => {
        const store = makeStore({ items: [{ product: discountedProduct, quantity: 1 }] });
        render(
            <Provider store={store}>
                <ProductCard product={discountedProduct} />
            </Provider>
        );

        expect(screen.getByRole("button", { name: /remove from cart/i })).toBeInTheDocument();
    });

    it("adds a product to the cart store when 'Add to cart' is clicked", async () => {
        const store = makeStore();
        render(
            <Provider store={store}>
                <ProductCard product={discountedProduct} />
            </Provider>
        );

        // Click the first "Add to cart" button (mobile and desktop both render one)
        await userEvent.click(screen.getByRole("button", { name: /add to cart/i }));

        expect(store.getState().cart.items).toHaveLength(1);
        expect(store.getState().cart.items[0].product.id).toBe(discountedProduct.id);
    });

    it("renders the product link pointing to /products/:id", () => {
        const store = makeStore();
        render(
            <Provider store={store}>
                <ProductCard product={discountedProduct} />
            </Provider>
        );

        const link = screen.getByRole("link");
        expect(link).toHaveAttribute("href", `/products/${discountedProduct.id}`);
    });

});