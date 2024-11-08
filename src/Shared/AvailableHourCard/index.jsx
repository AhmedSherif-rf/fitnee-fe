import React, { memo } from "react";

const AvailableHourCard = (props) => {
  const { index, day, time, className } = props;

  return (
    <div
      key={index}
      className={`d-flex justify-content-between mb-2 p-3 ${className}`}
    >
      <div className="ltr">{day}</div>
      <div className="ltr">{time}</div>
    </div>
  );
};

export default memo(AvailableHourCard);
