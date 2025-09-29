import { useSelector } from "react-redux";
import Cover from "../components/cart/CoverCart";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import ResponsiveContainer from "../components/responsive/ResponsiveContainer";
import formatUSDT from "../hooks/formatPrice";

function OrderPage() {
  const { productOrdered } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (!productOrdered.length) {
      navigate("/shop");
    }
  }, []);

  return (
    <>
      <Cover />
      <ResponsiveContainer type="section">
        {productOrdered.length > 0 && (
          <div className="w-full  lg:mx-auto lg:w-[80%] ">
            <h3 className="text-center mx-4 border-[5px] my-8 py-5 border-green-600 border-dashed">
              Thank you.Your order has been received
            </h3>
            <div className="flex flex-wrap lg:flex-nowrap">
              <>
                <div className="w-full lg:w-[20%] flex flex-col items-center py-6 px-2 lg:border lg:border-t-0 lg:border-b-0 lg:border-l-0 lg:border-gray-300">
                  <p className="text-gray-500">Ordered number:</p>
                  <p>{productOrdered[productOrdered.length - 1].id}</p>
                </div>
                <div className="w-full lg:w-[20%] flex flex-col items-center py-6 px-2 lg:border lg:border-t-0 lg:border-b-0 lg:border-l-0 lg:border-gray-300">
                  <p className="text-gray-500">Date:</p>
                  <p>{productOrdered[productOrdered.length - 1].time}</p>
                </div>
                <div className="w-full lg:w-[20%] flex flex-col items-center py-6 px-2 lg:border lg:border-t-0 lg:border-b-0 lg:border-l-0 lg:border-gray-300">
                  <p className="text-gray-500">Email:</p>
                  <p className="w-full break-words px-5 lg:inline-block flex justify-center">
                    {user?.session?.user?.email}
                  </p>
                </div>
                <div className="w-full lg:w-[20%] flex flex-col items-center py-6 px-2 lg:border lg:border-t-0 lg:border-b-0 lg:border-l-0 lg:border-gray-300">
                  <p className="text-gray-500">Total:</p>
                  <p className="break-words w-full flex justify-center">
                    {formatUSDT(
                      productOrdered[productOrdered.length - 1].items.reduce(
                        (sum, item) => sum + item.price * item.quantity,
                        0
                      )
                    )}
                  </p>
                </div>
                <div className="w-full lg:w-[20%] flex flex-col items-center py-6 px-2">
                  <p className="text-gray-500">Payment method:</p>
                  <p>
                    {productOrdered[productOrdered.length - 1].orderDetails
                      .pay && "paypal"}
                  </p>
                </div>
              </>
            </div>
            <div className="mx-4 my-5">
              <h2 className="uppercase text-[18px]">Order Details</h2>
              <div className="flex mt-4 justify-between items-center border border-b border-dashed border-gray-300 border-t-0 border-l-0 border-r-0 py-3">
                <p>Product</p>
                <p>Total</p>
              </div>
              {productOrdered[productOrdered.length - 1].items.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between items-center border border-b border-dashed border-gray-300 border-t-0 border-l-0 border-r-0 py-3"
                >
                  <p className="text-[14px]">
                    {item.name}{" "}
                    <span className="text-gray-400">x{item.quantity}</span>
                  </p>
                  <p className="text-[14px] text-red-500">
                    {formatUSDT(item.price * item.quantity)}
                  </p>
                </div>
              ))}
              <div className="flex justify-between items-center py-3 border border-b border-dashed border-gray-300 border-t-0 border-l-0 border-r-0">
                <p className="text-[18px] uppercase">Total</p>
                <p className="text-[20px] text-red-500">
                  {formatUSDT(
                    productOrdered[productOrdered.length - 1].items.reduce(
                      (sum, item) => sum + item.price * item.quantity,
                      0
                    )
                  )}
                </p>
              </div>
            </div>
            <div className="mx-4 my-8">
              <h2 className="uppercase text-[18px]">Billing Address</h2>
              <div className="flex flex-col gap-3 mt-6 text-gray-500 text-[12px] font-thin">
                <p>
                  {
                    productOrdered[productOrdered.length - 1].orderDetails
                      .firstName
                  }{" "}
                  {
                    productOrdered[productOrdered.length - 1].orderDetails
                      .lastName
                  }
                </p>
                <p>
                  {" "}
                  {
                    productOrdered[productOrdered.length - 1].orderDetails.city
                  }{" "}
                  {
                    productOrdered[productOrdered.length - 1].orderDetails
                      .zipCode
                  }
                </p>
                <p>
                  {productOrdered[productOrdered.length - 1].orderDetails.phone}
                </p>
              </div>
            </div>
          </div>
        )}
      </ResponsiveContainer>
    </>
  );
}

export default OrderPage;
