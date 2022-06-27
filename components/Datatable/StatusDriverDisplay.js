import React from 'react';

const StatusDriverDisplay = ({status}) => {
    return (
        <span className={`py-0.5 px-2 rounded 
        ${status == 1 && "bg-green-200"} 
        ${status == 0 && "bg-red-200"}`
        }>
            {status == 1 && "Tersedia"}
            {status == 0 && "Sibuk"}

        </span>
    );
};

export default StatusDriverDisplay;
