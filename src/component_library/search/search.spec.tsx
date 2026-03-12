
import "@testing-library/jest-dom";
import React from "react";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import SearchComponent from "./SearchComponent";
import type { ProductResponse } from "@/types/ProductTypes";
import { useRouter } from "next/navigation";
jest.mock("next/navigation", () => ({
    useRouter: jest.fn(() => ({
        push: jest.fn(),
    })),
}));

describe("Search Bar", () => {
    it("renders the search bar", () => {
        render(<SearchComponent open={true} onClose={() => { }} />);
        expect(screen.getByRole("search")).toBeInTheDocument();
    });
    it('should render "search for products" as the placeholder', () => {
        render(<SearchComponent open={true} onClose={() => { }} />);
        expect(screen.getByPlaceholderText(/search for products/i)).toBeInTheDocument();
    })
    it("should render the users querry when the user enters the text onto the textfield", async () => {
        const user = userEvent.setup();
        render(<SearchComponent open={true} onClose={() => { }} />);
        const input = screen.getByPlaceholderText(/search for products/i);
        await user.type(input, "Mascara");
        expect(input).toHaveValue("Mascara");
    })
    it("should return if the query was empty (no navigation)", async () => {
        const push = jest.fn();
        (useRouter as jest.Mock).mockReturnValue({ push });

        const user = userEvent.setup();
        render(<SearchComponent open={true} onClose={() => { }} />);

        const input = screen.getByPlaceholderText(/search for products/i);
        await user.type(input, "{enter}");

        expect(push).not.toHaveBeenCalled();
    });
    it("should navigate to products page when search is submitted", async () => {
        const push = jest.fn();

        (useRouter as jest.Mock).mockReturnValue({ push });

        const user = userEvent.setup();

        render(<SearchComponent open={true} onClose={() => { }} />);

        const input = screen.getByPlaceholderText(/search for products/i);

        await user.type(input, "Mascara{enter}");

        expect(push).toHaveBeenCalledWith(
            "/products/allProducts?search=Mascara"
        );
    });
    it("should return the recent searches", () => {
        render(<SearchComponent open={true} onClose={() => { }} />);
        expect(screen.getByText("RECENT SEARCHES")).toBeInTheDocument();
    })
    it("shold search with one of the recent search values ", async () => {
        const push = jest.fn();

        (useRouter as jest.Mock).mockReturnValue({ push });

        const user = userEvent.setup();

        render(<SearchComponent open={true} onClose={() => { }} />);

        const button = screen.getByRole("button", { name: "Mascara" });

        await user.click(button);

        expect(push).toHaveBeenCalledWith(
            "/products/allProducts?search=Mascara"
        );
    })


});