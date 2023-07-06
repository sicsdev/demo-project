import React, { useState } from 'react';

const ColorSelector = ({ colorCodes, onChange, selectedColor, label }) => {
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleColorClick = (color) => {
    onChange(color);
    setShowDropdown(false);
  };

  return (
    <div className="flex items-center w-full gap-2">
      <div className="flex justify-start w-1/2">
        <span className="text-gray-700">{label}</span>
      </div>
      <div className="relative w-1/2 mt-2 my-2" onClick={toggleDropdown}>
        <div className='border border-gray p-2 rounded cursor-pointer'>
          <div
            className='border border-gray mx-1 rounded'
            style={{
              width: '50px',
              height: '20px',
              backgroundColor: selectedColor || ''
            }}
          ></div>

        </div>
        {showDropdown && (
          <div className={`absolute z-10 mt-2 bg-white border rounded-md p-4 border-gray`}>
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
              {colorCodes.map((color, index) => (
                <div
                  key={index}
                  className={`border border-gray selected`}
                  style={{
                    width: '20px',
                    height: '20px',
                    backgroundColor: color.code,
                    marginRight: '4px',
                    cursor: 'pointer'
                  }}
                  onClick={() => handleColorClick(color)}
                ></div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ColorSelector;
