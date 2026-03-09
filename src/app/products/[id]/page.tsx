import { notFound } from "next/navigation";
import { getProductById } from "@/core_components/api/productData";
import ProductDetailClient from "./ProductDetailClient";

interface Props {
    params: Promise<{ id: string }>;
}

export default async function ProductDetailPage({ params }: Props) {

    const { id } = await params;
    const product = await getProductById(Number(id));

    if (!product) return notFound();

    return <ProductDetailClient product={product} />;
}