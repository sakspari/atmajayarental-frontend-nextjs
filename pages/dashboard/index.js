import React, {useEffect, useState} from 'react';
import Layout from "../../components/Layout";
import {useSelector} from "react-redux";
import {IoIosPeople} from "@react-icons/all-files/io/IoIosPeople";
import {IoIosPerson} from "@react-icons/all-files/io/IoIosPerson";
import {AiFillCar} from "@react-icons/all-files/ai/AiFillCar";
import {FaPeopleCarry} from "@react-icons/all-files/fa/FaPeopleCarry";
import {AiOutlineSchedule} from "@react-icons/all-files/ai/AiOutlineSchedule";
import {TiTicket} from "@react-icons/all-files/ti/TiTicket";
import {AiOutlineHistory} from "@react-icons/all-files/ai/AiOutlineHistory";
import {BiCar} from "@react-icons/all-files/bi/BiCar";
import {GiReceiveMoney} from "@react-icons/all-files/gi/GiReceiveMoney";
import {GoVerified} from "@react-icons/all-files/go/GoVerified";
import Avatar from "../../components/Avatar";
import CardButton from "../../components/Button/CardButton";
import {BsPeople} from "@react-icons/all-files/bs/BsPeople";
import {useRouter} from "next/router";

const Index = () => {
    const {currentUser, userType} = useSelector(state => state.auth)
    console.log(currentUser)
    const [username, setUsername] = useState("")
    const router = useRouter()

    useEffect(() => {
        if (currentUser !== null)
            setUsername(currentUser.name)
    })

    return (
        <Layout>
            <div className={'flex justify-center items-center pt-12 space-x-8'}>
                {currentUser !== null && (
                    <Avatar
                        source={currentUser.picture}
                        isEditable={false}
                    />
                )}
                <div>
                    <h1 className="text-4xl font-bold text-indigo-700">
                        {`Selamat Datang ${username}!`}
                    </h1>
                    <span className={'italic'}>
                        {`Saat ini anada masuk sebagai - ${userType}`}
                    </span>
                </div>
            </div>

            {userType === "ADMIN" && (
                <div className="max-w-screen-lg flex items-center justify-center space-x-12 mx-auto mt-12">

                    <CardButton
                        action={() => {
                            router.push('/pegawai')
                        }}
                        text={'Data Pegawai'}
                        icon={<IoIosPeople/>}
                    />

                    <CardButton
                        action={() => {
                            router.push('/driver')
                        }}
                        text={'Data Driver'}
                        icon={<IoIosPerson/>}
                    />

                    <CardButton
                        action={() => {
                            router.push('/car')
                        }}
                        text={'Data Aset'}
                        icon={<AiFillCar/>}
                    />

                    <CardButton
                        action={() => {
                            router.push('/mitra')
                        }}
                        text={'Data Mitra'}
                        icon={<FaPeopleCarry/>}
                    />
                </div>
            )}

            {userType === "MANAGER" && (
                <div className="max-w-screen-lg flex items-center justify-center space-x-12 mx-auto mt-12">

                    <CardButton
                        action={() => {
                            router.push('/jadwal-shift')
                        }}
                        text={'Jadwal Pegawai'}
                        icon={<AiOutlineSchedule/>}
                    />

                    <CardButton
                        action={() => {
                            router.push('/promo')
                        }}
                        text={'Data Promo'}
                        icon={<TiTicket/>}
                    />

                </div>
            )}

            {userType === "CS" && (
                <div className="max-w-screen-lg flex items-center justify-center space-x-12 mx-auto mt-12">

                    <CardButton
                        action={() => {
                            router.push('/transaksi/verify')
                        }}
                        text={'Verifikasi Transaksi'}
                        icon={<GoVerified/>}
                    />

                    <CardButton
                        action={() => {
                            router.push('/customer/verifikasi-pendaftaran')
                        }}
                        text={'Verifikasi Data Customer'}
                        icon={<BsPeople/>}
                    />

                </div>
            )}

            {userType === "CUSTOMER" && (
                <div className="max-w-screen-lg flex items-center justify-center space-x-12 mx-auto mt-12">

                    <CardButton
                        action={() => {
                            router.push('/transaksi')
                        }}
                        text={'Booking Mobil'}
                        icon={<BiCar/>}
                    />

                    <CardButton
                        action={() => {
                            router.push('/transaksi/customer')
                        }}
                        text={'Riwayat Transaksi'}
                        icon={<AiOutlineHistory/>}
                    />

                </div>
            )}

        </Layout>
    );
};

export default Index;