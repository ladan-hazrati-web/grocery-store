import { useSelector } from "react-redux";
import { FaRegFaceFrownOpen } from "react-icons/fa6";
import formatUSDT from "../../hooks/formatPrice";
function Orders() {
  const { productOrdered } = useSelector((state) => state.cart);
  return (
    <>
      {productOrdered.length > 0 ? (
        <>
          <div className="w-full xl:hidden">
            {productOrdered.map((item) => (
              <div key={item.id}>
                <div className="flex justify-between py-4 border border-t-0 border-r-0 border-l-0 border-gray-300 border-dashed">
                  <p>order</p>
                  <p className="font-bold">{item.id}</p>
                </div>
                <div className="flex justify-between py-4 border border-t-0 border-r-0 border-l-0 border-gray-300 border-dashed">
                  <p>Date</p>
                  <p className="text-gray-400">{item.time}</p>
                </div>
                <div className="flex justify-between py-4 border border-t-0 border-r-0 border-l-0 border-gray-300 border-dashed">
                  <p>Status</p>
                  <p className=" text-gray-400">{item.status}</p>
                </div>
                <div className="flex justify-between py-4 border border-t-0 border-r-0 border-l-0 border-gray-300 ">
                  <p>Total</p>
                  <p>
                    <span className="text-red-500">
                      {" "}
                      {formatUSDT(
                        item.items.reduce(
                          (sum, product) =>
                            sum + product.price * product.quantity,
                          0
                        )
                      )}
                    </span>
                    <span className="text-gray-500">
                      {" "}
                      for{" "}
                      {item.items.reduce(
                        (sum, product) => sum + product.quantity,
                        0
                      )}{" "}
                      items{" "}
                    </span>
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="w-full hidden xl:inline-block">
            <div className="flex w-full py-5  border border-gray-400 border-t-0 border-r-0 border-l-0">
              <h4 className="uppercase w-[25%]">Order</h4>
              <h4 className="uppercase w-[25%]">Date</h4>
              <h4 className="uppercase w-[25%]"> Status</h4>
              <h4 className="uppercase w-[25%]">Total</h4>
            </div>
            {productOrdered.map((item) => (
              <div
                key={item.id}
                className="flex py-5 border border-gray-400 border-t-0 border-r-0 border-l-0  "
              >
                <p className="w-[25%] font-bold">{item.id}</p>
                <p className="w-[25%] text-gray-500">{item.time}</p>
                <p className="w-[25%] text-gray-500">{item.status}</p>
                <p className="w-[25%]">
                  {" "}
                  <span className="text-red-500">
                    {" "}
                    {formatUSDT(
                      item.items.reduce(
                        (sum, product) =>
                          sum + product.price * product.quantity,
                        0
                      )
                    )}
                  </span>
                  <span className="text-gray-500">
                    {" "}
                    for{" "}
                    {item.items.reduce(
                      (sum, product) => sum + product.quantity,
                      0
                    )}{" "}
                    items{" "}
                  </span>
                </p>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="w-full flex flex-col items-center lg:mt-16 justify-center">
          <FaRegFaceFrownOpen size={150} className="text-gray-200" />
          <p className="text-[25px] mt-2 ">This orders is empty.</p>
          <p className="text-gray-500">
            You will find a lot of interesting products on our "Shop" page.
          </p>
          <button className="mt-5 uppercase text-white bg-red-600 shadow-sm px-4 py-4 shadow-red-900">
            return to shop
          </button>
        </div>
      )}
    </>
  );
}

export default Orders;
