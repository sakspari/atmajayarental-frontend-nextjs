import React from 'react';
import {base_public_url} from "../../util/store/sagas/base_public_url";
import {Button, Card, CardMedia} from "@material-ui/core";
import {BiSend} from "@react-icons/all-files/bi/BiSend";
import {BiDetail} from "@react-icons/all-files/bi/BiDetail";
import {IoBagAddOutline} from "@react-icons/all-files/io5/IoBagAddOutline";
import {RiOilLine} from "@react-icons/all-files/ri/RiOilLine";
import {MdAttachMoney} from "@react-icons/all-files/md/MdAttachMoney";
import {VscFileMedia} from "@react-icons/all-files/vsc/VscFileMedia";
import {VscGear} from "@react-icons/all-files/vsc/VscGear";
import {MdPeopleOutline} from "@react-icons/all-files/md/MdPeopleOutline";
import {IoCarOutline} from "@react-icons/all-files/io5/IoCarOutline";

const CarCard = ({car, onBookingAction, onBtnDetailClicked, onBtnPesanClicked}) => {
    return (
        <Card
            className="rounded-xl p-4 w-fit"
            raised={true}
        >
            {car !== undefined && car !== null && (
                <div>

                    <CardMedia className="h-48 w-96" image={`${base_public_url}${car.foto_mobil}`}/>

                    <div className="flex flex-col">
                        {/*<span className="text-indigo-700">{car.id_mobil}</span>*/}
                        <span
                            className="text-3xl font-medium text-center  pb-4 pt-2 rounded-b-3xl">{car.nama_mobil}
                        </span>

                        <span className="flex items-center justify-start">
                            <IoCarOutline color="blue" size={'1.25rem'} className="font-bold mr-2"/>
                            {`Nopol ${car.plat_mobil}`}
                        </span>

                        <span className="flex items-center justify-start">
                            <MdPeopleOutline color="blue" size={'1.25rem'} className="font-bold mr-2"/>
                            {`kapasitas ${car.kapasitas_penumpang} orang`}
                        </span>
                        <span className="flex items-center justify-start">
                            <VscGear color="blue" size={'1.25rem'} className="font-bold mr-2"/>
                            {`transmisi ${car.jenis_transmisi}`}
                        </span>
                        <span className="flex items-center justify-start">
                            <RiOilLine color="blue" size={'1.25rem'} className="font-bold mr-2"/>
                            {`${car.jenis_bahan_bakar} | ${car.volume_bahan_bakar} L`}
                        </span>
                        <span className="flex items-center justify-start">
                            <IoBagAddOutline color="blue" size={'1.25rem'} className="font-bold mr-2"/>
                            {`${car.volume_bagasi} L (bagasi)`}
                        </span>
                        <span className="flex items-center justify-start">
                            <VscFileMedia color="blue" size={'1.25rem'} className="font-bold mr-2"/>
                            {`fasilitas: ${car.fasilitas_mobil}`}
                        </span>
                        <span className="flex items-center font-bold justify-start">
                            <MdAttachMoney color="blue" size={'1.25rem'} className="font-bold mr-2"/>
                            {`IDR ${(car.harga_sewa) / 1000}K / Hari`}
                        </span>
                    </div>

                    <div className="w-full flex items-center justify-between mt-8">
                        <Button
                            variant="contained"
                            color="secondary"
                            endIcon={<BiSend/>}
                            size="medium"
                            onClick={()=>{
                                onBtnPesanClicked(car)
                            }}
                        >
                            Pesan sekarang
                        </Button>

                        {/*<div className="w-8"/>*/}

                        {/*<Button*/}
                        {/*    variant="contained"*/}
                        {/*    endIcon={<BiDetail/>}*/}
                        {/*    size="medium"*/}
                        {/*    onClick={()=>{*/}
                        {/*        onBtnDetailClicked(car)*/}
                        {/*    }}*/}
                        {/*>*/}
                        {/*    detail*/}
                        {/*</Button>*/}

                        {/*<Button text="pesan sekarang" variant="primary-rounded"/>*/}
                        {/*<div className="w-8"/>*/}
                        {/*<Button text="detail" variant="secondary-rounded"/>*/}
                    </div>
                </div>
            )}
        </Card>
    )

};

export default CarCard;