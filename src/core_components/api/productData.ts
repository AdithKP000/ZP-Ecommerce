import axiosInstance from "../hooks/axios";
import { Product } from "../../app/types/types";



const ALLOWED_CATEGORIES: Product["category"][] = [
    "men's clothing",
    "jewelery",
    "women's clothing",
]

export const getAllProducts = async (): Promise<Product[]> => {
    try {
        const response = await axiosInstance.get<Product[]>("/")
        if (!response) {
            throw new Error("Failed to fetch all products")
        }
        const filtered = response.data.filter((product) =>
            ALLOWED_CATEGORIES.includes(product.category)
        )
        return filtered
    }
    catch (error) {
        console.log("An error occured while Getting all the product data", error)
        return []
    }
}





