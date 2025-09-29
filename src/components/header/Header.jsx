import ResponsiveContainer from "../responsive/ResponsiveContainer";
import BottomHeader from "./BottomHeader";
import FixHeaderDesktop from "./FixHeaderDesktop";
import FixHeaderMobile from "./FixHeaderMobile";
import MiddleHeader from "./MiddleHeader";
import MobileHeader from "./MobileHeader";
import TopHeader from "./TopHeader";

function Header() {
  return (
    <header>
      <ResponsiveContainer type="header">
        <TopHeader />
        <MiddleHeader />
      </ResponsiveContainer>
      <BottomHeader />
      <MobileHeader />
      <FixHeaderDesktop />
      <FixHeaderMobile />
    </header>
  );
}

export default Header;
