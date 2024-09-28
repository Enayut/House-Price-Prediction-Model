import React, { useState } from 'react';
import options from '../../constants.js'

function Dropdown({selectedValue, setSelectedValue}) {
    const [searchTerm, setSearchTerm] = useState('');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const filteredOptions = options.filter((option) =>
        option.label.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleChange = (value) => {
        setSelectedValue(value);
        setIsDropdownOpen(false);
        setSearchTerm(''); // Reset the search term when an option is selected
    };

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };
    

    return (
        <div className="relative col-span-full sm:col-span-6">
            <label htmlFor="dropdown" className="block mb-2">Select an option:</label>
            <div className="relative">
                <input
                    id="dropdown"
                    type="text"
                    placeholder="Select an option"
                    value={isDropdownOpen ? searchTerm : (selectedValue ? selectedValue.label : '')}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onClick={toggleDropdown}
                    className="block w-full p-2 border border-gray-300 rounded"
                />
                {isDropdownOpen && (
                    <ul className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded shadow-lg max-h-48 overflow-y-auto">
                        {filteredOptions.length > 0 ? (
                            filteredOptions.map((option) => (
                                <li
                                    key={option.value}
                                    onClick={() => handleChange(option.value)}
                                    className={`cursor-pointer p-2 hover:bg-gray-200 ${
                                        selectedValue === option.value ? 'bg-gray-200' : ''
                                    }`}
                                >
                                    {option.label}
                                </li>
                            ))
                        ) : (
                            <li className="p-2 text-gray-500">No options found</li>
                        )}
                    </ul>
                )}
            </div>
            {selectedValue && <p className="mt-2">Selected: {selectedValue}</p>}
        </div>
    );
}

export default Dropdown;
