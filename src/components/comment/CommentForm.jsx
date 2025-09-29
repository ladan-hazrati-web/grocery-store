import StarRating from "./RatingStar";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useState } from "react";
import { supabase } from "../../supabase/supabaseClient";
import { useDispatch, useSelector } from "react-redux";
import { ClipLoader } from "react-spinners";
import { setError, setMessageSuccess } from "../../slices/authSlice";
const schema = yup.object({
  review: yup
    .string()
    .required("Review is required")
    .min(10, "Review must be at least 10 characters"),
  name: yup.string().required("Name is required"),
  email: yup
    .string()
    .required("Email is required")
    .email("Invalid email format"),
  rating: yup
    .number()
    .required("Rating is required")
    .min(1, "Please select a rating"),
});

function CommentForm({ productId, productName }) {
  const [rating, setRating] = useState(0);
  const { userId } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
  });

  // ست کردن مقدار ریتینگ در فرم
  const handleRatingChange = (value) => {
    setRating(value);
    setValue("rating", value); // مقدار رو داخل فرم قرار می‌دیم
  };

  const onSubmit = async (data) => {
    const { error } = await supabase.from("comments").insert([
      {
        review: data.review,
        name: data.name,
        email: data.email,
        rating: data.rating,
        product_id: productId,
        is_approved: false,
        user_id: userId,
      },
    ]);

    if (error) {
      dispatch(setError("Error submitting comment:", error.message));
    } else {
      dispatch(setMessageSuccess("Comment submitted for approval!"));
      reset();
      setRating(0); // ریتینگ رو هم ریست می‌کنیم
    }
  };

  return (
    <div className="w-full lg:w-[50%] mx-4">
      <p className="text-[14px]">Be the first to review “{productName}”</p>
      <p className="text-[14px] text-gray-500 my-6">
        Your email address will not be published. Required fields are marked{" "}
        <span className="text-red-600">*</span>
      </p>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-4">
        {/* Review */}
        <div>
          <label className="text-[13px] text-gray-900">
            Your review <span className="text-red-600">*</span>
          </label>
          <textarea
            {...register("review")}
            className="border-2 min-h-[150px] border-gray-200 py-2 w-full mb-2 px-2 focus:outline-none text-gray-500"
          />
          {errors.review && (
            <p className="text-red-500 text-sm">{errors.review.message}</p>
          )}
        </div>

        {/* Rating */}
        <div className="mb-4">
          <StarRating onRatingChange={handleRatingChange} />
          {errors.rating && (
            <p className="text-red-500 text-sm">{errors.rating.message}</p>
          )}
        </div>

        {/* Name */}
        <div>
          <label className="text-[13px] text-gray-900">
            Name <span className="text-red-600">*</span>
          </label>
          <input
            {...register("name")}
            type="text"
            className="border-2 border-gray-200 py-2 w-full mb-2 px-2 focus:outline-none text-gray-500"
          />
          {errors.name && (
            <p className="text-red-500 text-sm">{errors.name.message}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label className="text-[13px] text-gray-900">
            Email <span className="text-red-600">*</span>
          </label>
          <input
            {...register("email")}
            type="email"
            className="border-2 border-gray-200 py-2 w-full mb-2 px-2 focus:outline-none text-gray-500"
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
        </div>

        {/* Hidden Rating Field */}
        <input type="hidden" {...register("rating")} value={rating} />

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="uppercase text-[14px] my-4 text-white font-bold py-2 bg-red-600 px-5 flex justify-center transition-all duration-300 shadow-sm shadow-red-700 hover:bg-red-700"
        >
          {isSubmitting ? <ClipLoader color="white" /> : "Submit"}
        </button>
      </form>
    </div>
  );
}

export default CommentForm;
