import ItemsDisplay from "@/component_library/Items-display";
import HeroCarousel from "../component_library/HeroCarousel";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import { getAllProducts } from "@/core_components/api/productData";
import { Product } from "./types/types";
import { Montserrat } from "next/font/google";
import { IconButton } from "@mui/material";
import { ArrowForward } from "@mui/icons-material";

const montserrat = Montserrat({ subsets: ["latin"] });

export default async function Home() {
  const allProducts: Product[] = await getAllProducts();
  const previewProducts = allProducts.slice(0, 4);

  return (
    <>
      <Box sx={{ mb: 2 }}>
        <HeroCarousel />
      </Box>

      <Box sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        px: 2,
        mt: 4,
        mb: 1,
      }}>
        <Typography variant="h4" fontWeight={700} fontFamily={montserrat.style.fontFamily}>
          Featured Products
        </Typography>

        <Link
          href="/products"
          style={{
            fontSize: "0.875rem",
            fontWeight: 500,
            padding: "4px 14px",
            borderRadius: "8px",
            margin: 4,
            color: '#1111d4',
            textDecoration: "none",
          }}
        >

          View All
          <IconButton sx={{
            color: "#1111d4"
          }}>
            <ArrowForward />
          </IconButton>
        </Link>

      </Box>

      <ItemsDisplay products={previewProducts} />
    </>
  );
}
