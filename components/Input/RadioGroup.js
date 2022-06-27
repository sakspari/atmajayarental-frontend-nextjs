import React from 'react';
import RadioInput from "./RadioInput";

const RadioGroup = ({value, label, options, errorMsg, onChange, disable = false}) => {
    return (
        <div>
            <div className="flex items-start space-x-6">
                <label htmlFor="gender" className="block text-sm font font-medium text-gray-700">
                    {label}:
                </label>
                <fieldset className="flex items-start content-start flex-wrap" aria-required>
                    {options.map(opt =>
                        <RadioInput key={opt.value} type="radio" value={opt.value} lable={opt.label}
                                    disable={disable}
                                    isChecked={value==opt.value}
                                    onChange={onChange}/>
                    )}
                </fieldset>
            </div>
            <div className="text-red-500 text-sm">{errorMsg}</div>
        </div>
    );
};

export default RadioGroup;