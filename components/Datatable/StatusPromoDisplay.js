import React from 'react';

const StatusPromoDisplay = ({ status }) => {
    return (
        <div>
            {status==1?(
                <span className="py-0.5 px-2 rounded bg-green-200">
                    Active
                </span>
            ):(
                <span className="py-0.5 px-2 rounded bg-red-200">
                    Expired
                </span>
            )}
        </div>
    );
};

export default StatusPromoDisplay;