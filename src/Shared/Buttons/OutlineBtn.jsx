import "./BtnStyle.scss";
import React, { memo } from "react";
import { Button } from "reactstrap";

const OutlineBtn = (props) => {
  const { className, text, handleOnClick, disabled = false } = props;
  return (
    <Button
      className={`OutlineBtn buttonBoxShadow ${className}`}
      onClick={handleOnClick}
      disabled={disabled}
    >
      {text}
    </Button>
  );
};

export default memo(OutlineBtn);
