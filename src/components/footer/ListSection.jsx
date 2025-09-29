import { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";

const stores = [
  {
    id: 1,
    content: [
      "New York",
      "London SF",
      "Edinburgh",
      "Los Angeles",
      "Chicago",
      "LasVegas",
    ],
    title: "Our Stores",
  },
  {
    id: 2,
    content: [
      "Privacy Policy",
      "Returns",
      "Terms & Conditions",
      "Contact Us",
      "Latest News",
      "Our Sitemap",
    ],
    title: "Useful Links",
  },
  {
    id: 3,
    content: [
      "Instagram profile",
      "New Collection",
      "Woman Dress",
      "Contact Us",
      "Latest News",
      "Purchase Theme",
    ],
    title: "Footer Menu",
  },
];

const ListSection = () => {
  const [openIds, setOpenIds] = useState([]);

  const toggleId = (id) => {
    if (openIds.includes(id)) {
      setOpenIds(openIds.filter((openId) => openId !== id));
    } else {
      setOpenIds([...openIds, id]);
    }
  };

  return (
    <div
      className="
      w-full
      flex
      flex-wrap
      gap-5
      md:gap-0
      md:flex-nowrap
      md:col-span-2
      lg:col-span-1"
    >
      {stores.map((item) => (
        <div key={item.id} className="w-full mt-4 md:mt-0">
          <div className="flex justify-between items-center">
            <h4 className="text-[15px]">{item.title}</h4>
            <button
              className="cursor-pointer md:hidden"
              onClick={() => toggleId(item.id)}
            >
              {openIds.includes(item.id) ? (
                <IoIosArrowDown />
              ) : (
                <IoIosArrowUp />
              )}
            </button>
          </div>
          <ul
            className={`md:h-auto h-0 overflow-hidden transition-all duration-300 ${
              openIds.includes(item.id) ? "h-[190px] overflow-visible" : ""
            }`}
          >
            {item.content.map((data, index) => (
              <li
                key={index}
                className="text-[13px] text-gray-200 mt-4 md:scale-y-100  md:block"
              >
                {data}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default ListSection;
