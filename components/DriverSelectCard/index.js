import React from 'react';
import {Button, Card} from "@mui/material";
import Avatar from "../Avatar";

const DriverSelectCard = ({driver, onSelect, enable=true}) => {
    return (
        <div className="w-fit shadow-lg">
            <div className="w-[8rem] flex flex-col space-y-2 items-center justify-center m-4">
                <Avatar source={driver.picture} isEditable={false}/>
                <span>{driver.name}</span>
                <span>{`${(driver.price)/1000}K / Hari`}</span>
                <Button
                    variant="contained"
                    disabled={!enable}
                    onClick={()=>{
                        onSelect(driver)
                    }}
                >
                    Pilih
                </Button>
            </div>
        </div>
    );
};

export default DriverSelectCard;
