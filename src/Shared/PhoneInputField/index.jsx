import PhoneInput from "react-phone-input-2";
import { memo, useEffect, useState } from "react";

const PhoneInputField = (props) => {
  const {
    value,
    setFieldValue,
    defaultCountry,
    inputProps,
    className,
    disabled,
  } = props;

  const [tempValue, setTempValue] = useState(value);

  useEffect(() => {
    setTempValue(value);
  }, [value]);

  return (
    <PhoneInput
      inputProps={{
        ...inputProps,
      }}
      masks={{sa: '... ... ...'}}
      onlyCountries={[defaultCountry]}
      country={defaultCountry}
      value={tempValue}
      className={`${className} border ltr`}
      onChange={(value) => setFieldValue(inputProps.name, value)}
      disabled={disabled}
    />
  );
};

export default memo(PhoneInputField);
