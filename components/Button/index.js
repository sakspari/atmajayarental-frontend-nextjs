import React from 'react';

const Button = ({variant, text, action}) => {
    switch (variant) {
        case "primary":
            return (
                <button onClick={action}
                        className="w-full flex justify-center py-2 px-4 border h-fit
                                border-transparent rounded-md shadow-sm text-sm font-medium
                                text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none">
                    {text}
                </button>
            )
        case "primary-rounded":
            return (
                <button onClick={action}
                        className="w-full flex justify-center py-2 px-4 border h-fit
                                border-transparent rounded-full shadow-sm text-sm font-medium
                                text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none">
                    {text}
                </button>
            )
        case "warning":
            return (
                <button onClick={action}
                        type="reset"
                        className="w-full flex justify-center py-2 px-4 border h-fit
                                border-transparent rounded-md shadow-sm text-sm font-medium
                                text-white bg-red-600 hover:bg-red-700 focus:outline-none">
                    {text}
                </button>
            )
        case "primary-text-btn":
            return (
                <button onClick={action}
                        className="w-full flex justify-center py-2 px-4 border h-fit
                                border-transparent rounded-md shadow-sm text-sm font-medium
                                text-indigo-900 font-bold focus:outline-none">
                    {text}
                </button>
            )
        case "secondary-rounded":
            return (
                <button onClick={action}
                        type="reset"
                        className="w-full flex justify-center py-2 px-4 border h-fit
                                border-transparent rounded-full shadow-sm text-sm font-medium
                                text-white bg-gray-500 hover:bg-gray-700 focus:outline-none">
                    {text}
                </button>
            )
        default:
            return (
                <button onClick={action}
                        className="flex justify-center py-2 px-4 border h-fit
                                border-transparent rounded-md shadow-sm text-sm font-medium
                                text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none">
                    {text}
                </button>
            )
    }

};

export default Button;