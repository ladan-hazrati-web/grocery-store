import { AiTwotoneShop } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
function IconShop({ inFixHeaderMobile }) {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate("/shop")}
      className={`cursor-pointer ${
        inFixHeaderMobile && "w-1/4 flex flex-col items-center"
      }`}
    >
      <AiTwotoneShop size={25} style={{ fontWeight: "bold" }} />
      {inFixHeaderMobile && <p className="text-[12px]">shop</p>}
    </div>
  );
}

export default IconShop;
