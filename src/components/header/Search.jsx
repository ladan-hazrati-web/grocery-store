import { useEffect, useState, useMemo } from "react";
import { IoIosSearch } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProducts,
  setFilterProductsBySearch,
} from "../../slices/productSlice";
import { useDebounce } from "use-debounce";
import { IoIosClose } from "react-icons/io";
import { useNavigate } from "react-router-dom";

function Search() {
  const { categories, products, filterProductsBySearch } = useSelector(
    (state) => state.items
  );
  const [category, setCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm] = useDebounce(searchTerm, 500);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const handleSearchSubmit = () => {
    setSelectedCategory(category);
  };

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const isCategoryMatch =
        selectedCategory === "All" || product.category === selectedCategory;
      const isSearchMatch = product.name
        .toLowerCase()
        .includes(debouncedSearchTerm.toLowerCase());

      return isCategoryMatch && isSearchMatch;
    });
  }, [selectedCategory, debouncedSearchTerm, products]);

  useEffect(() => {
    dispatch(setFilterProductsBySearch(filteredProducts));
  }, [filteredProducts, dispatch]);

  return (
    <form
      className="flex w-[60%] relative justify-end"
      onSubmit={(e) => e.preventDefault()}
    >
      <div className="relative border-[2px] border-r-0 border-gray-200 w-[100%]">
        <input
          type="text"
          placeholder="search for products"
          className="w-[100%]  text-[17px] p-2 focus:outline-none placeholder:text-gray-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {searchTerm && (
          <button
            className="absolute top-[50%] right-0 translate-y-[-50%]"
            onClick={() => setSearchTerm("")}
          >
            <IoIosClose size={25} />
          </button>
        )}
      </div>
      <select
        value={category}
        onChange={handleCategoryChange}
        className="w-[200px] border-[2px] border-gray-200 p-3 bg-white focus:outline-none text-gray-500 border-r-0"
      >
        {categories.map((category, index) => (
          <option key={index} value={category}>
            {category}
          </option>
        ))}
      </select>
      <button
        type="button"
        className="border-[2px] border-gray-200 px-4 focus:outline-none"
        onClick={handleSearchSubmit} // دکمه سرچ برای اعمال کتگوری
      >
        <IoIosSearch size={25} />
      </button>

      {/* کشویی به زیر فرم منتقل شده */}
      {debouncedSearchTerm && (
        <div className="absolute top-full left-0 w-full overflow-y-auto bg-white max-h-[300px] shadow-lg z-30 rounded-lg">
          <ul className="flex flex-wrap">
            {filterProductsBySearch.length > 0 ? (
              filterProductsBySearch.map((product) => (
                <li
                  onClick={() => {
                    navigate(`/product/${product.id}`, { replace: true });
                    setSearchTerm("");
                  }}
                  key={product.id}
                  className="flex text-center flex-col w-[33%] items-center gap-1 p-2 cursor-pointer hover:bg-gray-100"
                >
                  <img src={product.image} className="w-[80px]" />
                  <div>
                    <p className="text-[13px]">{product.name}</p>
                    <p className="text-[12px] text-gray-300">
                      {product.category}
                    </p>
                  </div>
                </li>
              ))
            ) : (
              <div className="h-fit text-[14px] w-full flex">
                <p className="text-gray-400 py-3 px-2">No products found</p>
              </div>
            )}
          </ul>
        </div>
      )}
    </form>
  );
}

export default Search;
