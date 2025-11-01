import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { supabase } from "../supabase/supabaseClient";
import { clearWishlist } from "./productSlice";

// ثبت‌نام کاربر
export const signUpUser = createAsyncThunk(
  "auth/signUpUser",
  async ({ email, password, username }, { rejectWithValue }) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { username },
        },
      });

      if (error) throw error;

      if (data.user) {
        if (data.user.role === "") {
          return rejectWithValue("Invalid email, please use another one.");
        } else {
          return data;
        }
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// ورود کاربر
export const loginUser = createAsyncThunk(
  "auth/login",
  async ({ email, password, rememberMe }, { rejectWithValue }) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    try {
      // ذخیره کردن وضعیت کاربر در storage بر اساس rememberMe
      const storage = rememberMe ? localStorage : sessionStorage;
      storage.setItem("user", JSON.stringify(data)); // ذخیره‌سازی در localStorage یا sessionStorage

      if (error) throw new Error(error.message);
      localStorage.setItem("data", JSON.stringify(data));

      return { data, userId: data.user.id };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// ورود با گیت‌هاب
export const loginWithGitHub = createAsyncThunk(
  "auth/loginWithGitHub",
  async (_, { rejectWithValue }) => {
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "github",
        redirectTo: `${window.location.origin}/auth/callback`,
      });

      if (error) {
        return rejectWithValue(error.message);
      }

      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// خروج کاربر
export const logoutUser = createAsyncThunk(
  "auth/logoutUser",
  async (_, { dispatch }) => {
    await supabase.auth.signOut();

    // حذف وضعیت ورود از localStorage یا sessionStorage
    localStorage.removeItem("user");
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("loginSuccessShown");
    localStorage.removeItem("data");

    dispatch(clearWishlist());

    return null;
  }
);

// reset password
export const resetPassword = createAsyncThunk(
  "auth/resetPassword",
  async (email, { rejectWithValue }) => {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/resetpassword`,
      });
      if (error) {
        return rejectWithValue(error.message);
      }
      return "Check your email for the reset link!"; // پیام موفقیت
    } catch (error) {
      console.error(error); // برای اشکال‌زدایی
      return rejectWithValue("An error occurred while resetting the password.");
    }
  }
);
const authSlice = createSlice({
  name: "auth",
  initialState: {
    openMenuAuth: false,
    user:
      JSON.parse(localStorage.getItem("user")) ||
      JSON.parse(sessionStorage.getItem("data")) ||
      null, // بارگذاری وضعیت کاربر از localStorage یا sessionStorage
    loading: false,
    error: null,
    messageSuccess: "",
    loadingGithub: false,
    isAuthenticated: false,
    page: "dashboard",
  },
  reducers: {
    setOpenMenuAuth: (state) => {
      state.openMenuAuth = true;
    },
    setCloseMenuAuth: (state) => {
      state.openMenuAuth = false;
    },
    clearMessages: (state) => {
      state.messageSuccess = "";
      state.error = null;
    },
    setMessageSuccess: (state, action) => {
      state.messageSuccess = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setAuthStatus: (state, action) => {
      state.isAuthenticated = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setPage: (state, action) => {
      state.page = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signUpUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.messageSuccess = "";
      })
      .addCase(signUpUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.messageSuccess =
          "Sign up successful! Please check your email and verify.";
      })
      .addCase(signUpUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.messageSuccess = "";
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        localStorage.setItem("data", JSON.stringify(action.payload.data));
        state.messageSuccess = "Login successful!";
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.isAuthenticated = false;
        state.messageSuccess = "Logged out successfully!";
      })
      .addCase(loginWithGitHub.pending, (state) => {
        state.loadingGithub = true;
      })
      .addCase(loginWithGitHub.fulfilled, (state) => {
        state.loadingGithub = false;
      })
      .addCase(loginWithGitHub.rejected, (state, action) => {
        state.loadingGithub = false;
        state.error = action.payload;
      })
      .addCase(resetPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.loading = false;
        state.messageSuccess = action.payload;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {
  setOpenMenuAuth,
  setCloseMenuAuth,
  clearMessages,
  setMessageSuccess,
  setAuthStatus,
  setError,
  setUser,
  setPage,
} = authSlice.actions;

export default authSlice.reducer;
