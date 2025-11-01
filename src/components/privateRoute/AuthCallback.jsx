import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../supabase/supabaseClient";
import { useDispatch } from "react-redux";
import { setAuthStatus, setUser, setUserId } from "../../slices/authSlice";

export default function AuthCallback() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const { data: listener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === "SIGNED_IN" && session) {
          dispatch(setAuthStatus(true));
          dispatch(setUser(session));
          dispatch(setUserId(session.user.id));
          localStorage.setItem("data", JSON.stringify(session));
          navigate("/", { replace: true });
        }
      }
    );

    return () => listener.subscription.unsubscribe();
  }, [dispatch, navigate]);

  return <p>در حال ورود...</p>;
}
