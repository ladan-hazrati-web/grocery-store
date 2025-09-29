import { useEffect, useState } from "react";
import { supabase } from "../../supabase/supabaseClient";
import { ClipLoader } from "react-spinners";
import { setError, setMessageSuccess } from "../../slices/authSlice";
import { useDispatch } from "react-redux";
export default function AdminComments() {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  // دریافت کامنت‌های تأیید نشده
  const fetchComments = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("comments")
      .select("*")
      .eq("is_approved", false);

    if (error) {
      dispatch(setError("Error fetching comments:", error.message));
    } else {
      setComments(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchComments();
  }, []);

  // تایید کامنت
  const approveComment = async (id) => {
    const { error } = await supabase
      .from("comments")
      .update({ is_approved: true })
      .eq("id", id);

    if (error) {
      dispatch(setError("Error approving comment:", error.message));
    } else {
      setComments(comments.filter((comment) => comment.id !== id));
      dispatch(setMessageSuccess("This comment was approved by you."));
    }
  };

  // حذف کامنت
  const deleteComment = async (id) => {
    const { error } = await supabase.from("comments").delete().eq("id", id);

    if (error) {
      dispatch(setError("Error deleting comment:", error.message));
    } else {
      setComments(comments.filter((comment) => comment.id !== id));
      dispatch(setMessageSuccess("This comment was deleted by you."));
    }
  };

  return (
    <div className="p-5">
      <h1 className="text-xl font-bold mb-4">Pending Comments</h1>
      {loading ? (
        <ClipLoader color="gray" />
      ) : comments.length === 0 ? (
        <p className="text-[14px] text-gray-500">No pending comments.</p>
      ) : (
        <ul>
          {comments.map((comment) => (
            <li
              key={comment.id}
              className="border flex items-center flex-wrap  justify-between p-4 mb-4 rounded"
            >
              <div className="flex flex-col gap-1">
                <p className="text-[14px]">
                  Name: <span className="font-bold">{comment.name}</span>
                </p>
                <p className="text-gray-600 text-[15px]">{comment.review}</p>
                <p className="text-sm text-gray-400">
                  Rating: {comment.rating}
                </p>
              </div>
              <div className="flex w-full   gap-4 mt-5">
                <button
                  onClick={() => approveComment(comment.id)}
                  className="bg-green-500 text-[14px] text-white px-3 py-1 rounded"
                >
                  Approve
                </button>
                <button
                  onClick={() => deleteComment(comment.id)}
                  className="bg-red-500 text-[14px] text-white px-3 py-1 rounded"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
