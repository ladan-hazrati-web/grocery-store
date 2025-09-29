import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedByCategory } from "../../slices/productSlice";

function FilterByCategory() {
  const { categories, selectedByCategory } = useSelector(
    (state) => state.items
  );
  const dispatch = useDispatch();

  return (
    <div className="w-full pr-4">
      <h3 className="text-sm py-4 ">Filter by Category</h3>
      <select
        value={selectedByCategory}
        onChange={(e) => dispatch(setSelectedByCategory(e.target.value))}
        className="text-sm w-full border-b-2 pb-2 border-red-500 focus:outline-none"
      >
        {categories.map((category, index) => (
          <option value={category} key={index}>
            {category}
          </option>
        ))}
      </select>
    </div>
  );
}

export default FilterByCategory;
