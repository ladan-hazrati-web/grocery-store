import { TbError404 } from "react-icons/tb";
import { Link } from "react-router-dom";
function NotFoundPage() {
  return (
    <div className="flex relative flex-wrap min-h-[500px] justify-center items-center">
      <TbError404 size={600} className="text-gray-300 w-full" />
      <p className="text-red-800 uppercase absolute text-[50px] font-bold">
        Not found
      </p>
      <button className="bg-red-600 text-white px-6 py-2 mb-16 -mt-10 uppercase">
        <Link to="/">return home</Link>
      </button>
    </div>
  );
}

export default NotFoundPage;
