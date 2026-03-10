import ItemsDisplay from "@/component_library/Items-display";
import HeroCarousel from "../component_library/HeroCarousel";
import CategoryBanner from "@/component_library/CategoryBanner";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import { getAllNewProducts, getFeaturedProducts, onSaleProducts } from "@/core_components/api/productData";
import { Product, ProductResponse } from "../types/ProductTypes";
import { Montserrat } from "next/font/google";
import { IconButton } from "@mui/material";
import { ArrowForward } from "@mui/icons-material";
import Footer from "@/component_library/Footer";

const montserrat = Montserrat({ subsets: ["latin"] });

export default async function Home() {
  const allProducts: ProductResponse[] = await getFeaturedProducts();
  const previewProducts = allProducts.slice(0, 6);
  const saleProducts: ProductResponse[] = await onSaleProducts();
  const previewSaleProducts = saleProducts.slice(0, 6)

  return (
    <>
      <Box sx={{ mb: 2 }}>
        <HeroCarousel />
      </Box>



      {/* most rated Products */}
      <Box sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        px: 2,
        mt: 4,
        mb: 1,
      }}>
        <Typography variant="h4" sx={{
          textAlign: "left",
          flex: 1
        }}
          fontSize={{ xs: "1.5rem", md: "2rem" }}
          fontWeight={700}
          fontFamily={montserrat.style.fontFamily}>
          Featured Products
        </Typography>

        <Link
          href="/products/allProducts"
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

      {/* Products on Sale */}
      <Box sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        px: 2,
        mt: 4,
        mb: 1,
      }}>
        <Typography variant="h4" sx={{
          textAlign: "left",
          flex: 1
        }}
          fontSize={{ xs: "1.5rem", md: "2rem" }}
          fontWeight={700}
          fontFamily={montserrat.style.fontFamily}>
          🔥 ON Sale!
        </Typography>

        <Link
          href="/products/allProducts"
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

      <ItemsDisplay products={previewSaleProducts} />



      <CategoryBanner />
      <Footer />
    </>
  );
}
