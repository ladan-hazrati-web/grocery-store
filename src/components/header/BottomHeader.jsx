import ResponsiveContainer from "../responsive/ResponsiveContainer";

function BottomHeader() {
  return (
    <div
      className="w-full text-white py-4 hidden lg:block"
      style={{ backgroundColor: "#d12c2c" }}
    >
      <ResponsiveContainer type="header">
        <div className="w-full flex justify-between">
          <ul className="flex gap-6 items-center w-[60%] text-[13px]">
            <li>Fresh Food</li>
            <li>Bakery</li>
            <li>Frozen Food</li>
            <li>Food Cupboard</li>
            <li>Drinks</li>
            <li>Pets</li>
          </ul>
          <div className="flex gap-5 items-center w-[50%] justify-end text-[14px]">
            <p className="border-r-2 px-5 border-gray-800 border-opacity-30">
              SPECIAL OFFER
            </p>
            <p>PURCHASE THEME</p>
          </div>
        </div>
      </ResponsiveContainer>
    </div>
  );
}

export default BottomHeader;
