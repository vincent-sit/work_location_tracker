import React, { useState } from "react";
import "./index.css";

const DropdownBox = ({ options, onSelect }) => {
  const [value, setValue] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const filteredOptions = options.filter((option) =>
    option.toLowerCase().includes(value.toLowerCase())
  );

  const handleSelect = (selectedOption) => {
    setValue(selectedOption);
    setIsOpen(false);
    onSelect(selectedOption);
  };

  return (
    <div className="dropdown">
      <input
        type="text"
        value={value}
        placeholder="Type to search"
        onFocus={() => setIsOpen(true)}
        onBlur={() => setIsOpen(false)}
        onChange={(e) => setValue(e.target.value)}
      />
      {isOpen && (
        <select size={filteredOptions.length}>
          {filteredOptions.map((option) => (
            <option key={option} onClick={() => handleSelect(option)}>
              {option}
            </option>
          ))}
        </select>
      )}
    </div>
  );
};

export default DropdownBox;
