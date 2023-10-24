import React from "react";

const Select = ({
  id,
  placeholder,
  className,
  onChange,
  value,
  disabled,
  data,
}) => {
  return (
    <>
      <select
        id={id || ""}
        className={
          className ||
          "w-full  px-3 min-h-[35px] bg-[#F2F2F2] border border-[#595b89] mt-[7px]"
        }
        value={value || ""}
        placeholder={placeholder || ""}
        disabled={disabled || false}
        onChange={(e) => onChange(e.target.value)}
      >
        {data.length > 0 && (
          <>
            {data.map((item, index) => {
              if (typeof item === "string") {
                return (
                  <option key={index} value={item}>
                    {item}
                  </option>
                );
              } else {
                const { key, value } = item;
                return (
                  <option key={index} value={value}>
                    {key}
                  </option>
                );
              }
            })}
          </>
        )}
      </select>
    </>
  );
};

export default Select;
