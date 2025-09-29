import { useSelector } from "react-redux";
import ProductItem from "../productsSlider/ProductItem";
import { IoHeartOutline } from "react-icons/io5";
function Wishlist() {
  const { wishlist } = useSelector((state) => state.items);

  return (
    <>
      {wishlist.length > 0 ? (
        <div className="w-full flex justify-evenly gap-5 flex-wrap  ">
          {wishlist.map((product) => (
            <ProductItem
              product={product}
              customWidth={true}
              inWishlist={true}
              key={product.id}
            />
          ))}
        </div>
      ) : (
        <div className="w-full text-center flex flex-col items-center lg:mt-16 justify-center">
          <IoHeartOutline size={150} className="text-gray-200" />
          <p className="text-[25px] mt-2 ">This wishlist is empty.</p>
          <p className="text-gray-500 mt-5">
            You don't have any products in the wishlist yet. You will find a lot
            of interesting products on our "Shop" page.
          </p>
          <button className="mt-5 uppercase text-white bg-red-600 shadow-sm px-4 py-4 shadow-red-900">
            return to shop
          </button>
        </div>
      )}
    </>
  );
}

export default Wishlist;
