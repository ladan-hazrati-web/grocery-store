import { setAuthStatus, setUser } from "../../slices/authSlice";

import { setUserId } from "../../slices/cartSlice";
import { supabase } from "../../supabase/supabaseClient";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function AuthCallback() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const { data: listener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === "SIGNED_IN" && session) {
          localStorage.setItem("user", JSON.stringify(session));
          localStorage.setItem("data", JSON.stringify(session));

          dispatch(setAuthStatus(true));
          dispatch(setUser(session));
          dispatch(setUserId(session.user.id));

          // 🔹 پاک‌سازی هش از URL
          window.history.replaceState({}, document.title, "/");
          navigate("/", { replace: true });
        }
      }
    );

    return () => listener.subscription.unsubscribe();
  }, [dispatch, navigate]);

  return <p>در حال ورود...</p>;
}
