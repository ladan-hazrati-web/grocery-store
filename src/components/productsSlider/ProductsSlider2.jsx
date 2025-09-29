import ProductSlider from "./ProductsSlider";

function ProductsSlider2() {
  return (
    <ProductSlider
      filter="NEW"
      sliceStart={10}
      sliceEnd={21}
      title="New Offers"
    ></ProductSlider>
  );
}

export default ProductsSlider2;
