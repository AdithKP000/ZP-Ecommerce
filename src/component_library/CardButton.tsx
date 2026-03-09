"use client"
import IconButton from "@mui/material/IconButton";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useAppSelector, useAppDispatch } from "@/core_components/hooks/redux";
import { addToCart, removeFromCart } from "@/core_components/state/slices/cartSlice";
import { ProductResponse } from "@/types/types";

interface CartButtonProps {
    product: ProductResponse;
    iconSize?: number;
    buttonSize?: number;
}

export default function AddToCardButton({ product, iconSize = 16, buttonSize = 32 }: CartButtonProps) {
    const dispatch = useAppDispatch();
    const cart = useAppSelector((state) => state.cart.items)
    const inCart = cart.some((item) => item.product.id === product.id)

    const handleAddToCart = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (inCart) {
            dispatch(removeFromCart(product.id))
        } else {
            dispatch(addToCart(product))
        }
    };
    return (
        <IconButton
            size="small"
            onClick={handleAddToCart}
            aria-label={inCart ? "Remove from cart" : "Add to cart"}
            sx={{
                bgcolor: "white",
                boxShadow: "0 1px 4px rgba(0,0,0,0.12)",
                width: buttonSize,
                height: buttonSize,
                "&:hover": { bgcolor: "white" },
            }}
        >
            {inCart ? <ShoppingCartIcon sx={{ fontSize: iconSize }} /> : <ShoppingCartIcon sx={{ fontSize: iconSize }} />}
        </IconButton>
    )

}



























//     const cart = useAppSelector((state) => state.cart.items);
//     const inCart = cart.some((item) => item.id === product.id);
//     const handleAddToCart = (e: React.MouseEvent) => {
//         e.stopPropagation();
//         if (inCart) {
//             dispatch(removeFromCart(product.id));
//         } else {
//             dispatch(addToCart(product));
//         }
//     };
//     return (
//         <IconButton
//             size="small"
//             onClick={handleAddToCart}
//             aria-label={inCart ? "Remove from cart" : "Add to cart"}
//             sx={{
//                 bgcolor: "white",
//                 boxShadow: "0 1px 4px rgba(0,0,0,0.12)",
//                 width: buttonSize,
//                 height: buttonSize,
//                 "&:hover": { bgcolor: "white" },
//             }}
//         >
//             {inCart ? <ShoppingCartIcon sx={{ fontSize: iconSize, color: "#e53935" }} /> : <ShoppingCartIcon sx={{ fontSize: iconSize, color: "#888" }} />}
//         </IconButton>
//     );
// }