import React, { memo } from "react";
import Styles from "./style.module.scss";
import { Input, Label } from "reactstrap";

const ToggleSwitch = ({ id, isOn, handleToggle, colorOne, colorTwo }) => {
  return (
    <>
      <Input
        id={id}
        checked={isOn}
        type="checkbox"
        onChange={handleToggle}
        className={`${Styles.switchCheckbox}`}
      />
      <Label
        style={{ background: isOn ? colorOne : colorTwo }}
        className={`${Styles.switchLabel} mb-0`}
        htmlFor={id}
      >
        <span className={`${Styles.switchButton}`} />
      </Label>
    </>
  );
};
export default memo(ToggleSwitch);
