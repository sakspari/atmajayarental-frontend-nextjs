import React from 'react';

const StatusUserDisplay = ({ status }) => {
    return (
        <div>
            {status==="1"?(
                <span className="py-0.5 px-2 rounded bg-green-200">
                    Verified
                </span>
            ):(
                <span className="py-0.5 px-2 rounded bg-red-200">
                    Belum Verifikasi
                </span>
            )}
        </div>
    );
};

export default StatusUserDisplay;