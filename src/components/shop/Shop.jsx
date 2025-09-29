import React, { useEffect, useState } from "react";
import ResponsiveContainer from "../responsive/ResponsiveContainer";
import { Link } from "react-router-dom";
import { IoIosMenu } from "react-icons/io";
import { RiArrowDropDownLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProducts,
  setFilterProducts,
  setOpenFilterMenu,
} from "../../slices/productSlice";
import ProductItem from "../productsSlider/ProductItem";
import PriceFilter from "./FilterByPrice";
import FilterByCategory from "./FilterByCategory";
import FilterBySort from "./FilterBySort";
import { TfiFaceSad } from "react-icons/tfi";
import { ClipLoader } from "react-spinners";
import ReactPaginate from "react-paginate";
import { IoIosArrowForward } from "react-icons/io";
const options = [
  {
    value: "Default sorting",
    label: "Default sorting",
    icon: <RiArrowDropDownLine className="text-black" />,
  },
  {
    value: "Sort by popularity",
    label: "Sort by popularity",
    icon: <RiArrowDropDownLine className="text-black" />,
  },
  {
    value: "Sort by price:low to high",
    label: "Sort by price:low to high",
    icon: <RiArrowDropDownLine className="text-black" />,
  },
  {
    value: "Sort by price:high to low",
    label: "Sort by price:high to low",
    icon: <RiArrowDropDownLine className="text-black" />,
  },
];

function Shop() {
  const dispatch = useDispatch();

  const {
    filterProducts,
    selectedBySort,
    products,
    selectedByCategory,
    priceRange,
    loading,
  } = useSelector((state) => state.items);

  const [currentPage, setCurrentPage] = useState(0);
  const [productsPerPage] = useState(6); // تعداد محصول در هر صفحه

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch, currentPage]);

  useEffect(() => {
    let sortedProducts = [...products];

    // مرتب‌سازی بر اساس انتخاب کاربر
    if (selectedBySort === "Default sorting") {
      // بدون تغییر در آرایه، فقط به حالت اولیه بدون مرتب‌سازی می‌رویم
    } else if (selectedBySort === "Sort by popularity") {
      sortedProducts.sort((a, b) => Number(b.rating) - Number(a.rating));
    } else if (selectedBySort === "Sort by price:low to high") {
      sortedProducts.sort((a, b) => Number(a.price) - Number(b.price));
    } else if (selectedBySort === "Sort by price:high to low") {
      sortedProducts.sort((a, b) => Number(b.price) - Number(a.price));
    }

    // فیلتر بر اساس دسته‌بندی
    if (selectedByCategory && selectedByCategory !== "All") {
      sortedProducts = sortedProducts.filter(
        (product) =>
          product.category.trim().toLowerCase() ===
          selectedByCategory.trim().toLowerCase()
      );
    }

    // فیلتر بر اساس رنج قیمت
    if (priceRange) {
      sortedProducts = sortedProducts.filter(
        (product) =>
          Number(product.price) >= priceRange[0] &&
          Number(product.price) <= priceRange[1]
      );
    }

    dispatch(setFilterProducts(sortedProducts));
  }, [dispatch, selectedBySort, selectedByCategory, priceRange, products]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [filterProducts, currentPage]);

  useEffect(() => {
    setCurrentPage(0);
  }, [selectedByCategory, priceRange]);

  const indexOfLastProduct = (currentPage + 1) * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filterProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  // تغییر صفحه
  const handlePageClick = (event) => {
    setCurrentPage(event.selected);
  };

  return (
    <ResponsiveContainer type="section">
      <div className="flex justify-between mb-5 w-full">
        <div className="hidden lg:block lg:w-[30%] mx-4">
          <PriceFilter />
          <FilterByCategory />
        </div>
        <div className="mx-4 lg:mx-0 w-full lg:w-[100%]">
          <div className="lg:flex lg:py-4 lg:justify-between w-full lg:items-center">
            {/* title */}
            <div className="w-full py-4 lg:border-none border border-gray-300 border-t-0 border-l-0 border-r-0 text-[14px]">
              <Link to="/">
                <span className="text-gray-500">Home </span>
              </Link>
              <span className="text-gray-400">/</span>
              <span className="font-bold"> Shop</span>
            </div>
            <div className="w-full flex items-center justify-between">
              {/* menu hamburgur */}
              <div
                className="items-center flex gap-2 lg:hidden cursor-pointer"
                onClick={() => dispatch(setOpenFilterMenu())}
              >
                <IoIosMenu size={25} className="text-gray-700" />
                <p className="text-[14px] py-4 font-bold text-gray-700">
                  Show sidebar
                </p>
              </div>
              <FilterBySort options={options} />
            </div>
          </div>
          <div className="flex flex-wrap w-full">
            <div className="flex flex-wrap w-full ">
              {loading ? (
                <div className="w-full py-10 flex justify-center">
                  <ClipLoader color="gray" size={100} />
                </div>
              ) : currentProducts.length > 0 ? (
                currentProducts.map((product) => (
                  <ProductItem
                    product={product}
                    inShop={true}
                    key={product.id}
                  />
                ))
              ) : (
                <div className="w-full py-10 flex flex-col items-center">
                  <TfiFaceSad size={150} className="text-gray-300" />
                  <p className="mt-3 text-center text-[20px] text-gray-600">
                    No products found
                  </p>
                </div>
              )}
            </div>
          </div>
          {/* Pagination */}
          <div className="w-full mt-10 flex justify-center py-4">
            <ReactPaginate
              nextLabel={<IoIosArrowForward />}
              breakLabel={"..."}
              pageCount={
                filterProducts.length > 0
                  ? Math.ceil(filterProducts.length / productsPerPage)
                  : 1
              }
              marginPagesDisplayed={2}
              pageRangeDisplayed={5}
              onPageChange={handlePageClick}
              containerClassName={"flex gap-2 items-center"}
              pageClassName={
                "bg-white w-8 h-8 flex items-center justify-center"
              }
              pageLinkClassName={"text-gray-700"}
              previousClassName={"hidden"}
              activeLinkClassName={"bg-red-700 px-4 py-2 text-white"}
              forcePage={currentPage}
            />
          </div>
        </div>
      </div>
    </ResponsiveContainer>
  );
}

export default Shop;
