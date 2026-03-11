"use client";

import IconButton from "@mui/material/IconButton";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";

import { useAppSelector, useAppDispatch } from "@/core_components/hooks/redux";
import { addToWishList, removeFomWishList } from "@/core_components/state/slices/wishlistSlice";
import { ProductResponse } from "@/types/ProductTypes";

interface WishlistButtonProps {
    product: ProductResponse;
    /** Icon size in px. Defaults to 16. */
    iconSize?: number;
    /** Button box size in px. Defaults to 32. */
    buttonSize?: number;
}

export default function WishlistButton({ product, iconSize = 16, buttonSize = 32 }: WishlistButtonProps) {
    const dispatch = useAppDispatch();

    const liked = useAppSelector((state) =>
        state.wishlist.items.some((item) => item.id === product.id)
    );

    const handleWishlistToggle = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (liked) {
            dispatch(removeFomWishList(product.id));
        } else {
            dispatch(addToWishList(product));
        }
    };

    return (
        <IconButton
            size="small"
            onClick={handleWishlistToggle}
            aria-label={liked ? "Remove from wishlist" : "Add to wishlist"}
            sx={{
                bgcolor: "white",
                boxShadow: "0 1px 4px rgba(0,0,0,0.12)",
                width: buttonSize,
                height: buttonSize,
                "&:hover": { bgcolor: "white" },
            }}
        >
            {liked
                ? <FavoriteIcon sx={{ fontSize: iconSize, color: "#e53935" }} />
                : <FavoriteBorderIcon sx={{ fontSize: iconSize, color: "#888" }} />}
        </IconButton>
    );
}
