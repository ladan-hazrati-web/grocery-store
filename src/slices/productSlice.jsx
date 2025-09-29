import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchProducts = createAsyncThunk(
  "items/fetchProducts",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(
        "https://6794d2e4aad755a134ea83c6.mockapi.io/woodmart/products"
      );
      return response.data; // بازگرداندن داده‌های واقعی
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
export const removeFromWishlist = createAsyncThunk(
  "items/removeFromWishlist",
  async (productId, { getState, dispatch }) => {
    const userId = getState().cart.userId;

    const wishlist =
      JSON.parse(localStorage.getItem(`wishlist_${userId}`)) || [];

    const updatedWishlist = wishlist.filter((item) => item.id !== productId);

    localStorage.setItem(`wishlist_${userId}`, JSON.stringify(updatedWishlist));

    dispatch(setWishlist(updatedWishlist));
  }
);

const productSlice = createSlice({
  name: "items",
  initialState: {
    products: [],
    loading: false,
    error: null,
    categories: [],
    wishlist: [],
    openSidebarMenu: false,
    openFilterMenu: false,
    // filter
    selectedBySort: "Default sorting",
    filterProducts: [],
    filterProductsBySearch: [],
    selectedByCategory: "All",
    priceRange: [0, 8200],
    openProductModal: false,
    product: {},
  },
  reducers: {
    addToWishlist: (state, action) => {
      const index = state.products.findIndex(
        (item) => item.id === action.payload.product.id
      );

      if (index !== -1) {
        state.products[index] = { ...state.products[index], isFavorite: true };

        const wishlistIndex = state.wishlist.findIndex(
          (item) => item.id === action.payload.product.id
        );
        if (wishlistIndex === -1) {
          state.wishlist.push(state.products[index]);
        }
      }

      localStorage.setItem(
        `wishlist_${action.payload.userId}`,
        JSON.stringify(state.wishlist)
      );
    },

    setWishlist: (state, action) => {
      state.wishlist = action.payload;
    },
    updateProductsWithWishlist: (state, action) => {
      const wishlist = action.payload;

      state.products = state.products.map((product) => ({
        ...product,
        isFavorite: wishlist.some((item) => item.id === product.id),
      }));
    },
    setFilterProducts: (state, action) => {
      state.filterProducts = action.payload;
    },
    clearWishlist: (state) => {
      state.wishlist = []; // پاک کردن wishlist
    },
    setOpenSidebarMenu: (state) => {
      state.openSidebarMenu = true;
    },
    setCloseSidebarMenu: (state) => {
      state.openSidebarMenu = false;
    },
    setOpenFilterMenu: (state) => {
      state.openFilterMenu = true;
    },
    setCloseFilterMenu: (state) => {
      state.openFilterMenu = false;
    },
    setSelectedBySort: (state, action) => {
      state.selectedBySort = action.payload;
    },
    setSelectedByCategory: (state, action) => {
      state.selectedByCategory = action.payload;
    },
    setPriceRange: (state, action) => {
      state.priceRange = action.payload;
    },
    setFilterProductsBySearch: (state, action) => {
      state.filterProductsBySearch = action.payload;
    },
    setOpenProductModal: (state) => {
      state.openProductModal = true;
    },
    setCloseProductModal: (state) => {
      state.openProductModal = false;
    },
    getProductById: (state, action) => {
      state.product = state.products.find((x) => x.id === action.payload.id);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.products = [];
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
        state.categories = [
          "All",
          ...new Set(action.payload.map((product) => product.category)),
        ];
        state.error = null;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.products = [];
        state.error = action.payload;
      });
  },
});
export const {
  addToWishlist,
  setWishlist,
  updateProductsWithWishlist,
  clearWishlist,
  setOpenSidebarMenu,
  setCloseSidebarMenu,
  setOpenFilterMenu,
  setCloseFilterMenu,
  setSelectedBySort,
  filterProductsHandler,
  setFilterProducts,
  setSelectedByCategory,
  setPriceRange,
  setFilterProductsBySearch,
  setOpenProductModal,
  setCloseProductModal,
  getProductById,
} = productSlice.actions;

export default productSlice.reducer;
