import React from "react";
import { useTranslation } from "react-i18next";

const MyDropdown = (props) => {
  const {
    Options,
    className,
    name,
    onChangeHandle,
    onBlurHandle,
    placeholder,
    value,
  } = props;

  const { i18n } = useTranslation("");

  return (
    <div className={`mb-0 customSelect`}>
      <select
        className={`customDropdownRadius w-100 form-control-lg ${className} ${i18n.dir()}`}
        name={name}
        onChange={onChangeHandle}
        onBlur={onBlurHandle}
        value={value}
      >
        <option value="">{placeholder}</option>
        {Options &&
          Options?.map((item, index) => (
            <option key={index} value={item?.value}>
              {item.label}
            </option>
          ))}
      </select>
    </div>
  );
};

export default MyDropdown;
