function ResponsiveSlider({ children }) {
  return (
    <div className="lg:px-[100px] px-2 mx-auto sm:w-[500px] md:w-[750px] lg:w-[1000px] xl:w-[1276px] max-w-full  flex md:justify-between justify-center items-center flex-wrap h-full">
      {children}
    </div>
  );
}

export default ResponsiveSlider;
