import React from 'react';
import {Card} from "@mui/material";
import {GiReceiveMoney} from "@react-icons/all-files/gi/GiReceiveMoney";

const CardButton = ({text, icon, action}) => {
    return (
        <Card onClick={action} elevation={12} className={'cursor-pointer'}>
            <div className={'bg-indigo-100'}>
                <div
                    className="bg-indigo-700 w-full rounded-xl flex flex-col items-center justify-center p-4 border-2 text-white">
                    <div className="text-9xl">
                        {icon}
                    </div>
                </div>
                <span className="text-xl px-8 text-center py-4 font-semibold">{text}</span>
                <div className={'h-2'}></div>
            </div>
        </Card>
    );
};

export default CardButton;
