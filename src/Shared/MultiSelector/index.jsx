import "./styles.scss";
import Select from "react-select";
import React, { useEffect, useState } from "react";

const MultiSelector = ({ field, form, options, ...props }) => {
  const [items, setItems] = useState(options);

  useEffect(() => {
    let temp = [];
    setItems(options);

    field.value.forEach((item) => {
      const label = findLabel(item.value);
      if (label) {
        temp.push({ label: label, value: item.value });
      }
    });

    form.setFieldValue(field.name, temp);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [options]);

  const findLabel = (value) => {
    const item = options.find((item) => item.value === value);
    return item ? item.label : null;
  };

  const handleChange = (selectedOptions) => {
    form.setFieldValue(field.name, selectedOptions);
  };

  return (
    <Select
      options={items}
      value={field.value}
      onChange={handleChange}
      isMulti={true}
      isSearchable={false}
      {...props}
      labelledBy={props.placeholder}
    />
  );
};

export default MultiSelector;
