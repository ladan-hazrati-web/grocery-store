import Cards from "../components/cards/Cards";
import CategoriesSection from "../components/categoriesSection/CategoriesSection";
import MainSlider from "../components/mainSlider/MainSlider";
import ProductsSlider2 from "../components/productsSlider/ProductsSlider2";
import ProductsSlider1 from "../components/productsSlider/ProductsSlider1";

import ServicesSection from "../components/servicesSection/ServicesSection";

function Home() {
  return (
    <>
      <MainSlider />
      <ServicesSection />
      <ProductsSlider1 />
      <Cards />
      <ProductsSlider2 />

      <CategoriesSection />
    </>
  );
}

export default Home;
