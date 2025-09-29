function ServiceCard({ icon, title, description, isMiddleCard }) {
  return (
    <div
      className={`flex flex-col items-center py-4 px-8 text-center justify-center gap-4 w-full md:w-1/3 ${
        isMiddleCard
          ? "md:my-0 my-8 md:border md:border-t-0 md:border-b-0 md:border-l-1 md:border-r-1 md:border-r-gray-300 md:border-l-gray-300"
          : ""
      }`}
    >
      <img src={icon} alt={title} />
      <h3 className="font-bold">{title}</h3>
      <p className="text-[14px] text-gray-800">{description}</p>
    </div>
  );
}
export default ServiceCard;
