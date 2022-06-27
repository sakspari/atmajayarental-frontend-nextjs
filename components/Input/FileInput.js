import React from 'react';

const FileInput = ({lable, disable=false, onChange, errorMsg, acceptType}) => {
    return (
        <div>
            <label htmlFor="input-field" className="block text-sm font font-medium text-gray-700">
                {lable}
            </label>
            <div className="mt-1">
                <input type={"file"}
                       accept={acceptType}
                       onChange={onChange}
                       name={name}
                       disabled={disable}
                       autoComplete="on"
                       className="w-full border-gray-300 rounded-md shadow-sm appearance-none
                       focus:border-indigo-500 focus:ring-indigo-500"/>
            </div>
            <div className="text-red-500 text-sm">{errorMsg}</div>
        </div>
    );
};

export default FileInput;
