import { useDispatch, useSelector } from "react-redux";
import { TbShoppingCartX } from "react-icons/tb";
import formatUSDT from "../../hooks/formatPrice";
import QuantityControls from "../menuCart/QuantityControls";
import { IoIosClose } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { removeFromCart, selectSubtotal } from "../../slices/cartSlice";
function Cart() {
  const { cartItems } = useSelector((state) => state.cart);
  const subtotal = useSelector(selectSubtotal);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  return (
    <>
      {!cartItems.length ? (
        <div className="flex mx-4 lg:mx-auto lg:w-[80%]  flex-col items-center py-16">
          <TbShoppingCartX className="text-gray-300 text-[120px] lg:text-[200px]" />
          <p className="w-full text-[20px] font-bold py-5 text-center">
            Your cart is currently empty.
          </p>
          <p className=" lg:w-[70%] text-center text-[16px] text-gray-500">
            Before proceed to checkout you must add some products to your
            shopping cart. You will find a lot of interesting products on our
            "Shop" page.
          </p>
          <button
            className="bg-red-600 mt-8 w-fit uppercase text-white px-5 py-2 text-[16px]"
            onClick={() => navigate("/shop")}
          >
            Return to Shop
          </button>
        </div>
      ) : (
        <div className="xl:px-[20px] mx-auto lg:w-[1000px] xl:w-[1276px] max-w-full overflow-hidden h-auto">
          <div className="w-full lg:my-10 lg:flex lg:justify-between lg:flex-nowrap">
            <div className="w-full">
              {/* data mobile */}
              <div className="flex mt-16 md:hidden mb-4">
                <div className="flex w-full flex-wrap mx-4 ">
                  {cartItems.map((product) => (
                    <div
                      className="w-[100%] mb-5 gap-2 flex border border-t-0 border-r-0 border-l-0 border-b-1 border-gray-300 "
                      key={product.id}
                    >
                      <img src={product.image} alt="" className="w-[100px]" />
                      <div className="w-full">
                        <div className="w-full flex justify-between items-baseline">
                          <p className="text-[14px]">{product.name}</p>
                          <IoIosClose
                            onClick={() => dispatch(removeFromCart(product.id))}
                            className="cursor-pointer"
                          />
                        </div>
                        <div className="w-full flex justify-between items-baseline pb-3 mt-2 border border-t-0 border-r-0 border-l-0 border-dashed  border-b-1 border-gray-300">
                          <p className=" text-gray-500 text-[14px]">Price</p>
                          <p className="text-gray-500 text-[14px] ">
                            {formatUSDT(product.price)}
                          </p>
                        </div>
                        <div className="w-full flex justify-between items-baseline border border-t-0 border-r-0 border-l-0 border-dashed  border-b-1 border-gray-300">
                          <p className="text-[14px]  text-gray-500">Quantity</p>
                          <QuantityControls
                            id={product.id}
                            quantity={product.quantity}
                          />
                        </div>
                        <div className="w-full flex justify-between items-baseline py-3 ">
                          <p className="text-[14px]  text-gray-500">Subtotal</p>
                          <p className="text-red-700 text-[14px]">
                            {formatUSDT(product.price * product.quantity)}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              {/* data desktop */}
              <div className="hidden  md:flex md:flex-col w-full  lg:w-[90%]">
                <div className="w-full flex py-5 items-center border border-t-0 border-r-0 border-l-0 border-b-1 border-gray-300">
                  <div className="w-[25%]"></div>
                  <h3 className="w-[30%] uppercase">product</h3>
                  <h3 className="w-[12%] uppercase">price</h3>
                  <h3 className="w-[20%] uppercase">Quantity</h3>
                  <h3 className="w-[13%] uppercase">Subtotal</h3>
                </div>

                {cartItems.map((product) => (
                  <div
                    className="flex w-full items-center border border-t-0 border-r-0 border-l-0 border-b-1 border-gray-300"
                    key={product.id}
                  >
                    <div className="flex justify-center items-center gap-2 w-[25%]">
                      <button
                        className="cursor-pointer"
                        onClick={() => dispatch(removeFromCart(product.id))}
                      >
                        <IoIosClose />
                      </button>
                      <img src={product.image} alt="" className="w-[100px]" />
                    </div>
                    <div className=" w-[30%]">
                      <p className="text-[12px]">{product.name}</p>
                    </div>
                    <div className=" w-[12%]">
                      <p className="text-gray-500 text-[15px] ">
                        {formatUSDT(product.price)}
                      </p>
                    </div>
                    <div className=" w-[20%]">
                      <QuantityControls
                        id={product.id}
                        quantity={product.quantity}
                      />
                    </div>
                    <div className=" w-[13%]">
                      <p className="text-red-600 text-[15px] break-words">
                        {formatUSDT(product.price * product.quantity)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              {/* coupon */}
              <div className="mx-4 mb-3">
                <div className=" flex flex-col md:flex-row md:items-baseline gap-2 px-4 w-full md:flex md:border-none border border-dashed border-gray-300 py-4">
                  <input
                    type="text"
                    placeholder="Coupon code"
                    className="w-full md:w-fit border p-2"
                  />
                  <button className="w-full mt-4 md:w-fit bg-red-600 uppercase text-white px-5 py-2 text-[13px] font-bold shadow-sm shadow-red-800 ">
                    apply coupon
                  </button>
                </div>
              </div>
            </div>
            {/* total cart  */}
            <div className="mx-4 lg:mx-0 my-10 lg:mt-0   lg:w-[50%]">
              <div className="w-full border border-5 p-3 border-gray-300  ">
                <h2>Cart totals</h2>
                <div className="flex justify-between py-2 mt-5 border border-t-0 border-r-0 border-l-0 border-gray-300">
                  <p className="text-[13px] ">Subtotal</p>
                  <p className="text-gray-500 text-[14px]">
                    {formatUSDT(subtotal)}
                  </p>
                </div>
                <div className="border  py-3 border-t-0 border-r-0 border-l-0 border-gray-300">
                  <div className="md:flex  md:justify-between md:items-center">
                    <p className="text-[13px]">Shipping</p>
                    <div className="flex flex-col mt-3 lg:mt-3 md:mt-0 gap-2">
                      <div className="flex gap-2">
                        <input type="checkbox" />
                        <p className="text-[13px]">
                          Flat rate:{" "}
                          <span className="text-red-500">$00.00</span>
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <input type="checkbox" />
                        <p className="text-[13px]">
                          Local pickup:{" "}
                          <span className="text-red-500">$00.00</span>
                        </p>
                      </div>
                      <p className="text-[13px] text-gray-500">
                        Shipping options will be updated during checkout.
                      </p>
                      <p className="text-red-500 text-[13px] cursor-pointer">
                        Calculate shipping
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex py-5 justify-between">
                  <p className="text-[13px]">Total</p>
                  <p className="text-red-600 text-[18px] font-bold">
                    {formatUSDT(subtotal)}
                  </p>
                </div>
                <button
                  onClick={() => navigate("/checkout")}
                  className="bg-red-600 w-full mt-8  uppercase text-white px-5 py-2 text-[13px] font-bold"
                >
                  proceed to checkout
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Cart;
