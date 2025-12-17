import { fetchProductsAndCategories } from '@/lib/fetchProducts';
import LandingPageWrapper from "@/components/LandingPageWrapper";

export const revalidate = 3600; // Revalidate every hour (ISR)

export default async function Home() {
  // Fetch products and categories on the server at build/request time
  const categoriesWithProducts = await fetchProductsAndCategories('en');
  
  return <LandingPageWrapper initialData={categoriesWithProducts} />;
}
