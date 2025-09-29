import { LuMapPin } from "react-icons/lu";
import { MdOutlineEmail } from "react-icons/md";
import Menu from "./Menu";
import { TiPhoneOutline } from "react-icons/ti";

const contactInfo = [
  { icon: <TiPhoneOutline />, text: "09360548278" },
  { icon: <MdOutlineEmail />, text: "ms_hazrati@yahoo.com" },
  { icon: <LuMapPin />, text: "Choose an address" },
];
function TopHeader() {
  return (
    <div className="w-full hidden lg:block">
      <div className="w-full flex  justify-between items-center py-3">
        <div className="flex gap-5">
          {contactInfo.map((item, index) => (
            <p
              key={index}
              className="flex items-center text-[13px] text-gray-600"
            >
              <span className="mr-1 text-gray-400">{item.icon}</span>
              <span>{item.text}</span>
            </p>
          ))}
        </div>
        <Menu />
      </div>
    </div>
  );
}

export default TopHeader;
