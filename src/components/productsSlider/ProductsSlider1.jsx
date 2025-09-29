import ProductSlider from "./ProductsSlider";

function ProductsSlider1() {
  return (
    <ProductSlider
      filter="NEW" // فیلتر برای این کامپوننت
      title="Discounts and Promotions"
      sliceStart={0}
      sliceEnd={10}
    />
  );
}

export default ProductsSlider1;
