import axiosInstance from "../hooks/axios";
import { Product, ProductResponse } from "../../types/ProductTypes";



const ALLOWED_CATEGORIES: Product["category"][] = [
    "beauty",
    "fragrances",
    "furniture",
]

export const getAllProducts = async (): Promise<ProductResponse[]> => {
    try {
        const response = await axiosInstance.get<{ products: ProductResponse[] }>("/")
        if (!response) {
            throw new Error("Failed to fetch all products")
        }
        return response.data.products
    }
    catch (error) {
        console.log("An error occured while Getting all the product data", error)
        return []
    }
}


export const getFeaturedProducts = async (): Promise<ProductResponse[]> => {
    try {
        const response = await axiosInstance.get<{ products: ProductResponse[] }>("/")
        if (!response) {
            throw new Error("Unable to fetch featured products")
        }

        const filtered = response.data.products.filter((product) =>
            product.rating > 3.8
        )
        if (filtered.length === 0) {
            console.log("No products found with a rating above 3.8")
        }

        return filtered

    } catch (error) {
        console.log("Error occurred while fetching featured products", error)
        return []
    }
}





export const onSaleProducts = async (): Promise<ProductResponse[]> => {
    try {
        const response = await axiosInstance.get<{ products: ProductResponse[] }>("/")
        if (!response) {
            throw new Error("Unable to fetch featured products")
        }

        let filtered = response.data.products.filter((product) =>
            product.discountPercentage > 10
        )
        filtered = filtered.filter((product) =>
            ALLOWED_CATEGORIES.includes(product.category)
        )
        if (filtered.length === 0) {
            console.log("No products found with a rating above 3.5")
        }

        return filtered

    } catch (error) {
        console.log("Error occurred while fetching featured products", error)
        return []
    }
}


export const mensCloting = async (): Promise<Product[]> => {
    try {
        const reponse = await axiosInstance.get<Product[]>(`category/men's clothing`)
        if (!reponse) {
            throw new Error("Unable to fetch mens cloting")
        }
        return reponse.data
    } catch (error) {
        console.log("Error occurred while fetching mens cloting", error)
        return []
    }
}


export const femaleClothing = async (): Promise<Product[]> => {
    try {
        const reponse = await axiosInstance.get<Product[]>(`category/women's clothing`)
        if (!reponse) {
            throw new Error("Unable to fetch mens cloting")
        }
        return reponse.data
    } catch (error) {
        console.log("Error occurred while fetching mens cloting", error)
        return []
    }
}

// Maps URL-friendly slugs (?category=...) → real API category names
const CATEGORY_SLUG_MAP: Record<string, string> = {
    "beauty": "beauty",
    "fragrances": "fragrances",
    "furniture": "furniture",
    "groceries": "groceries",
}

export const getProductsByCategory = async (slug: string): Promise<ProductResponse[]> => {
    const apiCategory = CATEGORY_SLUG_MAP[slug];
    if (!apiCategory) return [];

    console.log((`/category/${encodeURIComponent(apiCategory)}`))
    try {
        const response = await axiosInstance.get<{ products: ProductResponse[] }>(`/category/${encodeURIComponent(apiCategory)}`);
        if (!response) throw new Error(`Unable to fetch category: ${apiCategory}`);
        return response.data.products;
    } catch (error) {
        console.log("Error fetching category products", error);
        return [];
    }
}



export const getAllNewProducts = async (): Promise<ProductResponse[]> => {
    try {
        const response = await axiosInstance.get<{ products: ProductResponse[] }>("/")
        if (!response) {
            throw new Error("Failed to fetch all products")
        }
        return response.data.products
    }
    catch (error) {
        console.log("An error occurred while getting all product data", error)
        return []
    }
}

export const getProductById = async (id: number): Promise<ProductResponse | null> => {
    try {
        const response = await axiosInstance.get<ProductResponse>(`/${id}`);
        if (!response) throw new Error(`Failed to fetch product #${id}`);
        return response.data;
    } catch (error) {
        console.log(`Error fetching product #${id}`, error);
        return null;
    }
}
