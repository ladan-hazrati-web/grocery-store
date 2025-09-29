import { useNavigate } from "react-router-dom";

function Menu({ inSidebarMenu }) {
  const navLinks = ["Home", "Shop", "Blog", "Pages", "Elements", "Buy"];
  const navigate = useNavigate();
  function addressHandler(link) {
    if (link === "Shop") {
      navigate("/shop");
    } else if (link === "Home") {
      navigate("/");
    }
  }
  return (
    <ul
      className={`flex ${!inSidebarMenu && "gap-7"} ${
        inSidebarMenu && "flex-wrap gap-0 w-full "
      }`}
    >
      {navLinks.map((link, index) => (
        <li
          onClick={() => addressHandler(link)}
          key={index}
          className={`cursor-pointer hover:text-red-600 text-[13px] ${
            inSidebarMenu &&
            "flex-wrap w-full p-4 border border-t-0 border-l-0 border-r-0 border-gray-200 "
          }`}
        >
          {link}
        </li>
      ))}
    </ul>
  );
}

export default Menu;
