import ResponsiveContainer from "../responsive/ResponsiveContainer";
import img1 from "../../assets/images/categories/wood-food-market-category-1.jpg";
import img2 from "../../assets/images/categories/wood-food-market-category-2.jpg";
import img3 from "../../assets/images/categories/wood-food-market-category-3.jpg";
import img4 from "../../assets/images/categories/wood-food-market-category-4.jpg";

const categoryData = [
  { img: img1, title: "CLOCKS" },
  { img: img2, title: "TOYS" },
  { img: img3, title: "FURNITURE" },
  { img: img4, title: "ACCESSORIES" },
];

function CategoriesSection() {
  return (
    <ResponsiveContainer type="section">
      <div className="w-full relative my-5 md:flex-nowrap flex-wrap after:w-full mx-4 after:h-[1px] after:absolute after:bottom-0 after:left-0 after:bg-gray-200 flex">
        <h2 className="uppercase text-[14px] xl:text-[18px]  w-fit whitespace-nowrap relative after:w-full after:content-[''] after:z-10 after:absolute after:bg-red-500 after:h-[2px] after:bottom-0 after:left-0">
          POPULAR CATEGORIES
        </h2>
      </div>
      <div className="w-full  flex items-center gap-4 lg:flex-nowrap justify-center lg:justify-between flex-wrap my-10">
        {categoryData.map((category, index) => (
          <figure
            key={index}
            className="relative lg:shadow-md shadow-gray-200 w-[45%] lg:w-1/4 group overflow-hidden cursor-pointer"
          >
            <img
              src={category.img}
              alt={category.title}
              className="w-full scale-[1] lg:group-hover:scale-[1.1] transition-all duration-500"
            />
            <figcaption className="uppercase lg:absolute text-center lg:text-left py-2 bottom-3 left-4 lg:text-[18px]">
              {category.title}
            </figcaption>
          </figure>
        ))}
      </div>
    </ResponsiveContainer>
  );
}

export default CategoriesSection;
