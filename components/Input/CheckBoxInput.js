import React from 'react';

const CheckBoxItem = ({value, lable, type, onChange, isChecked}) => {
    return (
        <label className="flex space-x-2 items-center mr-6">
            <input type={type}
                   value={value}
                   onChange={onChange}
                   autoComplete="on"
                   checked={isChecked}
                   // aria-checked={true}
                   // defaultChecked={false}
                   className="border-gray-300 shadow-sm active:bg-indigo-500 text-indigo-500
                   focus:border-none focus:ring-0"/>
            <span>{lable}</span>
        </label>
    );
};

export default CheckBoxItem;
