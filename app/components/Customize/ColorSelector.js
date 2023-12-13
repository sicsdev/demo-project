import React, { useEffect, useState, useRef } from "react";

const ColorSelector = ({ colorCodes, onChange, selectedColor, label, disabled }) => {
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropdown = () => {
    if (disabled) return
    setShowDropdown(!showDropdown);
    setClickedOutside(false);
  };

  const handleColorClick = (color) => {
    onChange(color);
    setShowDropdown(false);
  };

  const [clickedOutside, setClickedOutside] = useState(false);
  const myRef = useRef();

  const handleClickOutside = (e) => {
    if (!myRef.current.contains(e.target)) {
      setClickedOutside(true);
    }
  };
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  });
  return (
    <div className="flex items-center justify-between w-full mt-2 gap-2 px-2 sm:px-0">
      <div className="flex justify-start  w-1/2">
        <span className="new_input_label block text-sm text-heading font-medium text-gray-700">{label}</span>
      </div>
      <div
        className="relative w-1/2"
        ref={myRef}
        onClick={toggleDropdown}
      >
        <div className="new_input  border border-gray p-2 rounded cursor-pointer">
          <div
            className="border border-gray mx-1 rounded"
            style={{
              width: "50px",
              height: "20px",
              backgroundColor: selectedColor || "",
            }}
          ></div>
        </div>
        {showDropdown && (
          <div
            className={clickedOutside ? "" : "absolute z-10 mt-2 bg-white border rounded-md p-4 border-gray"}
          >
            {clickedOutside ? (
              " "
            ) : (
              <div style={{ display: "flex", flexWrap: "wrap" }}>
                {colorCodes.map((color, index) => (
                  <div
                    key={index}
                    className={`border border-gray selected`}
                    style={{
                      width: "20px",
                      height: "20px",
                      backgroundColor: color.code,
                      marginRight: "4px",
                      cursor: "pointer",
                    }}
                    onClick={() => handleColorClick(color)}
                  ></div>
                ))}
              </div>
            )}

          </div>
        )}
      </div>
    </div>
  );
};

export default ColorSelector;
