import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedBySort } from "../../slices/productSlice";
import { LuArrowDownUp } from "react-icons/lu";

function FilterBySort({ options }) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  const dispatch = useDispatch();
  const { selectedBySort } = useSelector((state) => state.items);

  const handleSelect = (option) => {
    dispatch(setSelectedBySort(option.value));
    setIsOpen(false);
  };
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <>
      {/* sorting  */}
      {/* mobile  */}
      <div className="relative md:hidden" ref={menuRef}>
        <button onClick={() => setIsOpen(!isOpen)} className="p-2">
          <LuArrowDownUp />
        </button>
        {isOpen && (
          <ul className="absolute -left-40 z-10 mt-2 w-[210px] bg-white border border-gray-200 rounded-lg shadow-lg">
            {options.map((option) => (
              <li
                key={option.value}
                onClick={() => handleSelect(option)}
                className="p-2 text-gray-700 w-full cursor-pointer hover:bg-gray-100"
              >
                {option.label}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* desktop  */}
      <div className="lg:w-full justify-end hidden md:flex">
        <select
          className="w-58 p-2 border-[2px] text-[14px] border-t-0 border-r-0 border-l-0 border-red-500 focus:outline-none "
          value={selectedBySort}
          onChange={(e) => dispatch(setSelectedBySort(e.target.value))}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
      {/* end sorting  */}
    </>
  );
}

export default FilterBySort;
