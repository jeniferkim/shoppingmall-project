import { useState } from "react";
import { IoStar, IoStarOutline } from "react-icons/io5";

export default function Star() {
  const [rating, setRating] = useState(3);

  return (
    <div>
      {[...Array(5)].map((_, i) => {
        const starIndex = i + 1;
        return starIndex <= rating ? (
          <IoStar
            key={i}
            className="star-lg"
            onClick={() => setRating(starIndex)}
          />
        ) : (
          <IoStarOutline
            key={i}
            className="star-lg"
            onClick={() => setRating(starIndex)}
          />
        );
      })}
    </div>
  );
}
