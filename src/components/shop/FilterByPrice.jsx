import React, { useState } from "react";
import { Range } from "react-range";
import { useDispatch } from "react-redux";
import { setPriceRange } from "../../slices/productSlice";

const PriceFilter = () => {
  const dispatch = useDispatch();
  const [values, setValues] = useState([0, 25]);
  const max = 25;

  const handleChange = (values) => setValues(values);
  const handleFilter = () => dispatch(setPriceRange(values));

  return (
    <div className="pr-4">
      <h2 className="py-6 text-[14px]">Filter by Price</h2>
      <Range
        values={values}
        step={1}
        min={0}
        max={max}
        onChange={handleChange}
        renderTrack={({ props, children }) => {
          const { key, ...restProps } = props; // جدا کردن key از props
          return (
            <div
              {...restProps}
              key={key} // اعمال key جداگانه
              style={{
                ...restProps.style,
                height: "4px",
                width: "100%",
                background: "#ddd",
                borderRadius: "2px",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  left: `${(values[0] / max) * 100}%`,
                  right: `${100 - (values[1] / max) * 100}%`,
                  top: 0,
                  height: "100%",
                  backgroundColor: "#ff0303",
                  borderRadius: "2px",
                }}
              />
              {children}
            </div>
          );
        }}
        renderThumb={({ props }) => {
          const { key, ...restProps } = props; // جدا کردن key از props
          return (
            <div
              {...restProps}
              key={key} // اعمال key جداگانه
              style={{
                ...restProps.style,
                height: "16px",
                width: "5px",
                backgroundColor: "#c73030",
                cursor: "ew-resize",
              }}
            />
          );
        }}
      />
      <div className="flex items-center justify-between mt-8 pb-4 text-[14px] border-b">
        <p>
          <span className="text-gray-500">Price:</span>
          <span className="font-bold">
            {" "}
            {values[0]}$ - {values[1]}$
          </span>
        </p>
        <button onClick={handleFilter} className="uppercase p-2  bg-gray-200">
          Filter
        </button>
      </div>
    </div>
  );
};

export default PriceFilter;
