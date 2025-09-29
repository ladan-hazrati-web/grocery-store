import { useDispatch, useSelector } from "react-redux";
import QuantityControls from "../menuCart/QuantityControls";
import ResponsiveContainer from "../responsive/ResponsiveContainer";
import formatUSDT from "../../hooks/formatPrice";
import {
  clearCart,
  selectSubtotal,
  setProductOrdered,
} from "../../slices/cartSlice";
import { useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { setError } from "../../slices/authSlice";

// تعریف اسکیمای yup برای اعتبارسنجی
const schema = yup.object().shape({
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  country: yup
    .string()
    .required("Country is required")
    .notOneOf([""], "Please select a country"),
  city: yup.string().required("City is required"),
  state: yup.string().required("State is required"),
  zipCode: yup
    .number()
    .typeError("Must be a number")
    .required("ZIP Code is required"),
  phone: yup
    .number()
    .typeError("Must be a number") // اطمینان از اینکه ورودی عدد باشه
    .test("length", "Number must have at least 10 digits", (value) => {
      return value && value.toString().length >= 10;
    })
    .required("Phone is required"),
  orderNotes: yup.string().optional(),
  pay: yup.bool().required("pay is required"),
  approve: yup
    .bool()
    .required("approved is required")
    .oneOf([true], "You must agree to the terms and conditions"), // اعتبارسنجی برای checkbox
});

function Checkout() {
  const { cartItems } = useSelector((state) => state.cart);
  const subtotal = useSelector(selectSubtotal);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    if (cartItems.length > 0) {
      dispatch(setProductOrdered(data));
      navigate("/order");
      dispatch(clearCart());
    } else {
      dispatch(setError("You have not selected any products to order."));
      setTimeout(() => {
        navigate("/shop");
      }, 1000);
    }
  };

  return (
    <ResponsiveContainer type="section">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex w-full flex-wrap lg:flex-nowrap items-start"
      >
        {/* first section  */}
        <div className="w-full mt-6 mx-4 lg:mx-0 lg:w-[50%]">
          <h2 className="font-bold text-[18px] uppercase">Billing details</h2>
          <div className="w-full">
            {/* First Name */}
            <div className="mt-8">
              <label
                htmlFor="firstName"
                className="text-[13px] capitalize text-gray-900"
              >
                First name <span className="text-red-600">*</span>
              </label>
              <br />
              <Controller
                name="firstName"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    id="firstName"
                    type="text"
                    className={`border-2 border-gray-200 py-2 w-full mb-4 px-2 focus:outline-none text-gray-500`}
                  />
                )}
              />
              {errors.firstName && (
                <span className="text-red-500 text-sm">
                  {errors.firstName.message}
                </span>
              )}
            </div>

            {/* Last Name */}
            <div className="mt-4">
              <label
                htmlFor="lastName"
                className="text-[13px] capitalize text-gray-900"
              >
                Last name <span className="text-red-600">*</span>
              </label>
              <br />
              <Controller
                name="lastName"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    id="lastName"
                    type="text"
                    className={`border-2 border-gray-200 py-2 w-full mb-4 px-2 focus:outline-none text-gray-500`}
                  />
                )}
              />
              {errors.lastName && (
                <span className="text-red-500 text-sm">
                  {errors.lastName.message}
                </span>
              )}
            </div>

            {/* Company Name */}
            <div className="mt-4">
              <label
                htmlFor="companyName"
                className="text-[13px] capitalize text-gray-900"
              >
                Company name <span>(optional)</span>
              </label>
              <br />
              <Controller
                name="companyName"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    id="companyName"
                    type="text"
                    className={`border-2 border-gray-200 py-2 w-full mb-4 px-2 focus:outline-none text-gray-500`}
                  />
                )}
              />
            </div>

            {/* Country */}
            <div className="mt-4">
              <label
                htmlFor="country"
                className="text-[13px] capitalize text-gray-900"
              >
                Country / Region <span className="text-red-600">*</span>
              </label>
              <br />
              <Controller
                name="country"
                control={control}
                render={({ field }) => (
                  <select
                    {...field}
                    id="country"
                    className={`border-2  border-gray-200 py-2 w-full mb-4 px-2 focus:outline-none text-gray-500`}
                  >
                    <option value="">Select Country</option>
                    <option value="Iran">Iran</option>
                    <option value="USA">USA</option>
                  </select>
                )}
              />
              {errors.country && (
                <span className="text-red-500 text-sm">
                  {errors.country.message}
                </span>
              )}
            </div>

            {/* City */}
            <div className="mt-4">
              <label
                htmlFor="city"
                className="text-[13px] capitalize text-gray-900"
              >
                Town / City <span className="text-red-600">*</span>
              </label>
              <br />
              <Controller
                name="city"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    id="city"
                    type="text"
                    className={`border-2 border-gray-200 py-2 w-full mb-4 px-2 focus:outline-none text-gray-500`}
                  />
                )}
              />
              {errors.city && (
                <span className="text-red-500 text-sm">
                  {errors.city.message}
                </span>
              )}
            </div>

            {/* State */}
            <div className="mt-4">
              <label
                htmlFor="state"
                className="text-[13px] capitalize text-gray-900"
              >
                State <span className="text-red-600">*</span>
              </label>
              <br />
              <Controller
                name="state"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    id="state"
                    type="text"
                    className={`border-2 border-gray-200 py-2 w-full mb-4 px-2 focus:outline-none text-gray-500`}
                  />
                )}
              />
              {errors.state && (
                <span className="text-red-500 text-sm">
                  {errors.state.message}
                </span>
              )}
            </div>

            {/* ZIP Code */}
            <div className="mt-4">
              <label
                htmlFor="zipCode"
                className="text-[13px] capitalize text-gray-900"
              >
                ZIP Code <span className="text-red-600">*</span>
              </label>
              <br />
              <Controller
                name="zipCode"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    id="zipCode"
                    type="text"
                    className={`border-2 border-gray-200 py-2 w-full mb-4 px-2 focus:outline-none text-gray-500`}
                  />
                )}
              />
              {errors.zipCode && (
                <span className="text-red-500 text-sm">
                  {errors.zipCode.message}
                </span>
              )}
            </div>

            {/* Phone */}
            <div className="mt-4">
              <label
                htmlFor="phone"
                className="text-[13px] capitalize text-gray-900"
              >
                Phone <span className="text-red-600">*</span>
              </label>
              <br />
              <Controller
                name="phone"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    id="phone"
                    type="text"
                    className={`border-2 border-gray-200 py-2 w-full mb-4 px-2 focus:outline-none text-gray-500`}
                  />
                )}
              />
              {errors.phone && (
                <span className="text-red-500 text-sm">
                  {errors.phone.message}
                </span>
              )}
            </div>

            {/* Order Notes */}
            <div className="mt-4">
              <label
                htmlFor="orderNotes"
                className="text-[13px] capitalize text-gray-900"
              >
                Order notes <span>(optional)</span>
              </label>
              <br />
              <Controller
                name="orderNotes"
                control={control}
                render={({ field }) => (
                  <textarea
                    {...field}
                    id="orderNotes"
                    className={`border-2 border-gray-200 min-h-[150px] py-2 w-full mb-4 px-2 focus:outline-none text-gray-500`}
                    placeholder="Notes about your order, e.g. special notes for delivery"
                  />
                )}
              />
            </div>
          </div>
        </div>

        {/* second section */}
        <div className="w-full lg:w-[50%] px-4 mx-4 bg-gray-100 my-8">
          <h2 className="uppercase text-center mt-4 font-bold">Your order</h2>
          <div className="bg-white shadow-sm shadow-gray-300 my-5 p-5 pb-0">
            <h3 className="uppercase border px-2 py-3 border-b-5 border-t-0 border-l-0 border-r-0 border-gray-300">
              product
            </h3>
            {cartItems.length > 0 ? (
              cartItems.map((product) => (
                <div
                  key={product.id}
                  className="flex text-gray-500 pb-2 border text-[13px] my-5 border-3 border-t-0 border-l-0 border-r-0 border-gray-30"
                >
                  <figure className="w-[100px] flex justify-center">
                    <img src={product.image} alt="" className="w-[80%]" />
                  </figure>
                  <div>
                    <p>{product.name}</p>
                    <QuantityControls
                      id={product.id}
                      quantity={product.quantity}
                    />
                    <p>{formatUSDT(product.price)}</p>
                  </div>
                </div>
              ))
            ) : (
              <div className="pb-3">
                <p className=" pt-4">
                  You have not selected any products to order.
                </p>
                <button className="bg-red-600 mt-4 w-fit uppercase text-white px-5 py-2 text-[16px]">
                  Return to Shop
                </button>
              </div>
            )}
          </div>
          <div className="flex pb-4 items-center justify-between border border-b-5 border-t-0 border-l-0 border-r-0 border-gray-300">
            <p className="text-[13px]">Total</p>
            <p className="text-red-500 text-[18px] font-bold">
              {formatUSDT(subtotal)}
            </p>
          </div>
          <div className="pb-2 text-[12px] text-gray-900 flex flex-col gap-5 border border-b-5 border-t-0 border-l-0 border-r-0 border-gray-300">
            <div className="flex mt-5 gap-2">
              <Controller
                name="pay"
                control={control}
                render={({ field }) => (
                  <input {...field} id="payPaypal" type="checkbox" />
                )}
              />
              <p>PayPal</p>
            </div>
            {errors.pay && (
              <span className="text-red-500 text-sm">{errors.pay.message}</span>
            )}
          </div>

          <div className="flex gap-2 py-5">
            <Controller
              name="approve"
              control={control}
              render={({ field }) => (
                <input {...field} id="approve" type="checkbox" />
              )}
            />
            <p className="text-[14px] text-gray-800">
              I have read and agree to the website{" "}
              <span className="text-black font-bold">Terms and conditions</span>
              <span className="text-red-500">*</span>
            </p>
            {errors.approve && (
              <span className="text-red-500 text-sm">
                {errors.approve.message}
              </span>
            )}
          </div>
          <button
            type="submit"
            className="w-full mb-5 bg-red-500 text-white py-3 mt-4"
          >
            Place Order
          </button>
        </div>
      </form>
    </ResponsiveContainer>
  );
}

export default Checkout;
