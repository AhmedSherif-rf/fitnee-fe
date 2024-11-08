import "./style.scss";
import React, { memo } from "react";
import { Progress } from "reactstrap";
import { FaCheck } from "react-icons/fa";

const ProfileProgressBar = ({ value = 100 }) => {
  
  const percentageCircleStyle = {
    position: "absolute",
    fontSize: "8px",
    left: `${value}%`,
    top: "50%",
    transform: "translate(-50%, -50%)",
    width: "25px",
    height: "25px",
    backgroundColor: "white",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#91F533",
    fontWeight: "bold",
    border: "1px solid #91F533",
  };

  return (
    <div style={{ position: "relative" }}>
      <Progress
        animated
        color="warning"
        striped
        value={value}
        className="CustomProgress"
      >
        <div style={percentageCircleStyle}>{value}%</div>
      </Progress>
    </div>
  );
};

export default memo(ProfileProgressBar);
