import React from 'react';

const StatusTransaksi = ({status}) => {
    return (
        <span className={`py-0.5 px-2 rounded 
        ${status === "0" && "bg-amber-200"} 
        ${status === "1" && "bg-sky-200"}
        ${status === "2" && "bg-red-200"}
        ${status === "3" && "bg-amber-200"}
        ${status === "4" && "bg-amber-200"}
        ${status === "5" && "bg-green-200"}`
        }>
            {status === "0" && "belum verifikasi"}
            {status === "1" && "sedang berjalan"}
            {status === "2" && "belum bayar"}
            {status === "3" && "sudah bayar belum verifikasi"}
            {/*{status === "4" && "belum verifikasi"}*/}
            {status === "5" && "selesai"}
        </span>
    );
};

export default StatusTransaksi;
