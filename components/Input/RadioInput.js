import React from 'react';

const RadioInput = ({value, lable, type, onChange, isChecked, disable = false}) => {
    return (
        <label className="flex space-x-2 items-center mr-6">
            <input type={type}
                   value={value}
                   onChange={onChange}
                   disabled={disable}
                   autoComplete="on"
                   checked={isChecked}
                   className="border-gray-300 rounded-lg shadow-sm active:bg-indigo-500 text-indigo-500
                   focus:border-none focus:ring-0"/>
            <span>{lable}</span>
        </label>
    );
};

export default RadioInput;