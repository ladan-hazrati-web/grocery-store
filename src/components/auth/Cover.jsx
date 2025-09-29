import { Link } from "react-router-dom";
import imgCover from "../../assets/images/auth/page-title-shop.jpg";
function Cover() {
  return (
    <figure className="w-full relative lg:h-[300px]">
      <img src={imgCover} alt="" className="object-cover w-full h-full" />
      <figcaption className="absolute text-white h-full w-full flex flex-col items-center top-5 justify-center">
        <h2 className="text-[20px] md:text-[25px] lg:text-[40px] xl:text-[45px] font-bold">
          My Account
        </h2>
        <div className="flex text-[10px] md:text-[14px] mt-2">
          <span className="mr-1 text-gray-200 hover:text-white">
            <Link to="/"> Home </Link>
          </span>
          <span> / My Account</span>
        </div>
      </figcaption>
    </figure>
  );
}

export default Cover;
