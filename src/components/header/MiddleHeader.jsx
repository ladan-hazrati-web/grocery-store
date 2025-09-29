import { useSelector } from "react-redux";
import { selectSubtotal } from "../../slices/cartSlice";
import Logo from "./Logo";
import Search from "./Search";
import IconUserAccount from "./IconUserAccount";
import IconCart from "./IconCart";
import formatUSDT from "../../hooks/formatPrice";

import IconFavorite from "./IconFavorite";
function MiddleHeader() {
  const subtotal = useSelector(selectSubtotal);

  return (
    <div className="lg:block hidden w-full ">
      <div className="flex justify-between items-center py-5 h-auto">
        <Logo />
        <Search />
        <div className="flex items-center gap-3 w-[15%] justify-end">
          <IconUserAccount />
          <IconFavorite />
          <IconCart />
          <p className="text-[13px]">{formatUSDT(subtotal)}</p>
        </div>
      </div>
    </div>
  );
}

export default MiddleHeader;
