import { Rating } from "react-simple-star-rating";
import React, { useEffect, useState } from "react";

const StarRating = (props) => {
  const { rating } = props;
  const [value, setValue] = useState(0);

  useEffect(() => {
    setValue(rating);
  }, [rating]);

  const handleRating = (rate) => {
    setValue(rate);
  };

  return (
    <Rating
      allowFraction={true}
      size={20}
      onClick={handleRating}
      initialValue={value}
      readonly
    />
  );
};

export default StarRating;
