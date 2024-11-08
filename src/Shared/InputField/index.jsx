import { Input } from "reactstrap";
import styles from "./style.module.scss";
import React, { memo, useState } from "react";
import { useTranslation } from "react-i18next";
import { GoEye, GoEyeClosed } from "react-icons/go";

const InputField = (props) => {
  const {
    placeholder,
    type,
    onChangeHandle,
    onBlurHandle,
    value,
    name,
    className,
    icon,
    disabled,
    style,
    rows,
  } = props;

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const { i18n } = useTranslation("");

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prev) => !prev);
  };

  return (
    <div className={`${styles.inputWrapper} ${i18n.dir()}`}>
      {icon && (
        <div
          className={
            i18n.dir() === "ltr"
              ? styles.leftIconWrapper
              : styles.rightIconWrapper
          }
        >
          {icon}
        </div>
      )}
      <Input
        type={
          type === "password" ? (isPasswordVisible ? "text" : "password") : type
        }
        placeholder={placeholder}
        name={name}
        style={style}
        min={type === "number" ? 0 : ""}
        step={type === "number" ? "any" : ""}
        className={`form-control-lg w-100 ${styles.inputDesign} ${
          type === "number" ? "remove-arrow" : ""
        } ${className}`}
        disabled={disabled}
        onChange={onChangeHandle}
        onBlur={onBlurHandle}
        value={value}
        rows={rows}
      />
      {type === "password" && (
        <div
          onClick={togglePasswordVisibility}
          className={
            i18n.dir() === "ltr"
              ? styles.rightIconWrapper
              : styles.leftIconWrapper
          }
        >
          {isPasswordVisible ? <GoEyeClosed /> : <GoEye />}
        </div>
      )}
    </div>
  );
};

export default memo(InputField);
