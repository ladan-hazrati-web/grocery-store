import ContactInfo from "./ContactInfo";
import ListSection from "./ListSection";
import RecentPosts from "./RecentPosts";
import payments from "../../assets/images/footer/payments.png";
import ResponsiveContainer from "../responsive/ResponsiveContainer";

function Footer() {
  return (
    <footer className="w-full py-5" style={{ background: "#373839" }}>
      <ResponsiveContainer type="footer">
        <div className="w-full text-white grid grid-cols-1 md:grid-cols-[1fr_1fr] md:grid-rows-[1fr_1fr] lg:grid-rows-1 lg:grid-cols-[250px_250px_1fr] xl:grid-cols-[300px_330px_1fr]  gap-5 lg:gap-2 p-4 ">
          <ContactInfo />
          <RecentPosts />
          <ListSection />
        </div>
      </ResponsiveContainer>
      <hr className="border-gray-600" />
      <ResponsiveContainer type="footer">
        <div className=" w-full flex justify-center mt-4 flex-wrap lg:flex-nowrap lg:justify-between gap-4 items-center px-4 pb-[60px] lg:pb-0 h-auto">
          <p className="text-[10px] text-gray-200 w-full text-center lg:w-fit">
            WOODMART © 2025 CREATED BY Ladan Hazrati. PREMIUM E-COMMERCE
            SOLUTIONS.
          </p>
          <img src={payments} alt="payments" />
        </div>
      </ResponsiveContainer>
    </footer>
  );
}

export default Footer;
