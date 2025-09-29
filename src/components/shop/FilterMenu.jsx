import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { setCloseFilterMenu } from "../../slices/productSlice";
import PriceFilter from "./FilterByPrice";
import FilterByCategory from "./FilterByCategory";


function FilterMenu() {
  const dispatch = useDispatch();

  return (
    <motion.div
      className="fixed right-0 top-0 w-full bg-black bg-opacity-70 h-screen z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onClick={() => dispatch(setCloseFilterMenu())}
    >
      <motion.div
        className="absolute left-0 top-0 px-0 w-[300px] md:w-[350px] bg-white max-h-screen h-full overflow-y-auto flex flex-col"
        initial={{ x: "-100%" }}
        animate={{ x: "0%" }}
        exit={{ x: "-100%" }}
        transition={{ duration: 0.2 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* content */}
        <div className="overflow-y-auto px-4">
          <PriceFilter />
          <FilterByCategory />
        </div>
      </motion.div>
    </motion.div>
  );
}

export default FilterMenu;
