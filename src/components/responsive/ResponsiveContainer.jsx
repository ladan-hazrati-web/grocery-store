import React from "react";

function ResponsiveContainer({ children, type }) {
  // تعیین استایل‌ها بر اساس نوع (type)
  const getContainerStyles = () => {
    switch (type) {
      case "services":
        return "relative z-10 px-2 lg:mx-auto lg:w-[1000px] -mt-[40px] shadow-sm shadow-gray-100 mb-10 mx-5 xl:w-[1100px] bg-white border py-8";
      case "slider":
        return "lg:px-[100px] px-2 mx-auto sm:w-[500px] md:w-[750px] lg:w-[1000px] xl:w-[1276px] max-w-full overflow-hidden flex md:justify-between justify-center items-center flex-wrap h-full";
      case "footer":
        return "xl:px-[20px] mx-auto lg:w-[1000px] xl:w-[1276px] max-w-full overflow-hidden h-auto";
      case "header":
        return "px-[20px] mx-auto sm:w-[500px] md:w-[750px] lg:w-[1000px] xl:w-[1276px] max-w-full flex justify-between items-center flex-wrap h-auto";
      case "section":
        return "xl:px-[20px] mx-auto lg:w-[1000px] xl:w-[1276px] max-w-full overflow-hidden h-auto";
      default:
        return "";
    }
  };

  return <div className={getContainerStyles()}>{children}</div>;
}

export default ResponsiveContainer;
