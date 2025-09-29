import { useEffect, useState } from "react";
import { supabase } from "../../supabase/supabaseClient";
import { FaUserCircle } from "react-icons/fa";
import { ClipLoader } from "react-spinners";
import { useDispatch } from "react-redux";
import { setError } from "../../slices/authSlice";
export default function Comments({ productId }) {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  // دریافت کامنت‌های تایید شده بر اساس product_id
  const fetchComments = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("comments")
      .select("*")
      .eq("product_id", productId) // فیلتر بر اساس product_id
      .eq("is_approved", true); // فقط کامنت‌های تایید شده رو بگیر

    if (error) {
      dispatch(setError("Error fetching comments:", error.message));
    } else {
      setComments(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchComments();
  }, [productId]); // وقتی productId تغییر کرد، دوباره کامنت‌ها رو بگیر

  return (
    <div className="w-full mx-4 lg:w-[50%] lg:my-0 mb-10">
      <h2 className="text-xl font-bold mb-4">Reviews</h2>
      {loading ? (
        <ClipLoader color="gray" />
      ) : comments.length === 0 ? (
        <p className="text-[14px] text-gray-500">There are no reviews yet.</p>
      ) : (
        <ul>
          {comments.map((comment) => (
            <li key={comment.id} className="p-4 mb-4 border-b">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FaUserCircle size={50} color="gray" />

                  <p className="text-[14px]">{comment.name}:</p>
                </div>
              </div>
              <div className="flex justify-between items-center py-2">
                <p className="text-gray-600  text-[14px]">{comment.review}</p>
                <p className="text-sm text-gray-400">
                  <span className="flex">
                    {[1, 2, 3, 4, 5].map((value) => (
                      <svg
                        key={value}
                        className={`w-5 h-5 cursor-pointer ${
                          value <= comment.rating
                            ? "text-yellow-500"
                            : "text-gray-300"
                        }`}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M12 2l2.4 7.2h7.6l-6 4.8 2.4 7.2-6-4.8-6 4.8 2.4-7.2-6-4.8h7.6z" />
                      </svg>
                    ))}
                  </span>
                </p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
