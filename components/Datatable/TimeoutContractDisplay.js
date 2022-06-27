import React from 'react';
import {getDaysToToday} from "../../util/converter/date_converter";

const TimeoutContractDisplay = ({periode_selesai}) => {
    return (
        <div>
            {getDaysToToday(periode_selesai) <= 14 ? (
                <span className="py-0.5 px-1 rounded bg-red-200">
                    {`Berakhir dalam ${getDaysToToday(periode_selesai)} hari`}
                </span>
            ):(
                <span className="py-0.5 px-1 rounded bg-yellow-200">
                    {`Berakhir dalam ${getDaysToToday(periode_selesai)} hari`}
                </span>
            )}
        </div>
    );
};

export default TimeoutContractDisplay;