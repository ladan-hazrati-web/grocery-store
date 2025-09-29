import { useState } from "react";

const StarRating = ({ onRatingChange }) => {
  const [rating, setRating] = useState(0);

  const handleClick = (ratingValue) => {
    setRating(ratingValue);
    onRatingChange(ratingValue);
  };

  return (
    <div className="flex items-center gap-2">
      <p className="text-[14px]">
        Your rating <span className="text-red-600">*</span>
      </p>
      <div className="flex">
        {[1, 2, 3, 4, 5].map((value) => (
          <svg
            key={value}
            onClick={() => handleClick(value)}
            className={`w-6 h-6 cursor-pointer ${
              value <= rating ? "text-yellow-500" : "text-gray-300"
            }`}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M12 2l2.4 7.2h7.6l-6 4.8 2.4 7.2-6-4.8-6 4.8 2.4-7.2-6-4.8h7.6z" />
          </svg>
        ))}
      </div>
    </div>
  );
};

export default StarRating;
