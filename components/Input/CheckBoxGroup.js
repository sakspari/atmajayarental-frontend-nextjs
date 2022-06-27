import React from 'react';
import RadioInput from "./RadioInput";
import CheckBoxInput from "./CheckBoxInput";

const CheckBoxGroup = ({value, label, options, errorMsg, onChange}) => {
    let isChecked = false
    let tempValue = ""
    return (
        <div>
            <div className="flex items-start space-x-6">
                <label htmlFor="gender" className="block text-sm font font-medium text-gray-700">
                    {label}:
                </label>
                <fieldset className="flex items-start content-start flex-col flex-wrap">
                    {options.map(opt =>
                        <div key={opt.value}>
                            {value.includes(opt.value) ? isChecked = true : isChecked = false}
                            <CheckBoxInput type="checkbox" value={opt.value} lable={opt.label}
                                           isChecked={isChecked}
                                           onChange={(e) => {
                                               if (e.target.checked) {
                                                   tempValue = tempValue + e.target.value
                                               } else {
                                                   tempValue = tempValue.replace(e.target.value, "")
                                               }
                                               onChange(tempValue, e.target.value)
                                           }}/>
                        </div>
                    )}
                </fieldset>
            </div>
            <div className="text-red-500 text-sm">{errorMsg}</div>
        </div>
    );
};

export default CheckBoxGroup;
