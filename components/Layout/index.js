import React, {useState} from 'react';
import Topbar from "../Topbar";
import Sidebar from "../Sidebar";
import SidebarMenu from "../Sidebar/SidebarMenu";
import {IoIosPeople} from "@react-icons/all-files/io/IoIosPeople";
import {useDispatch, useSelector} from "react-redux";
import {IoIosPerson} from "@react-icons/all-files/io/IoIosPerson";
import {FaPeopleCarry} from "@react-icons/all-files/fa/FaPeopleCarry";
import {AiOutlineSchedule} from "@react-icons/all-files/ai/AiOutlineSchedule";
import {TiTicket} from "@react-icons/all-files/ti/TiTicket";
import {GoVerified} from "@react-icons/all-files/go/GoVerified";
import {GiReceiveMoney} from "@react-icons/all-files/gi/GiReceiveMoney";
import {BiCar} from "@react-icons/all-files/bi/BiCar";
import {GiMoneyStack} from "@react-icons/all-files/gi/GiMoneyStack";
import {AiOutlineHistory} from "@react-icons/all-files/ai/AiOutlineHistory";
import {base_public_url} from "../../util/store/sagas/base_public_url";
import {People} from "@mui/icons-material";

const Index = (props) => {

    const {userType} = useSelector(state => state.auth)
    const {currentUser} = useSelector(state => state.auth)
    const [showSidebar, setShowSidebar] = useState(true)

    return (
        <div>
            {currentUser !== null && (
                <Topbar username={currentUser.name} profilepic={base_public_url + currentUser.picture}
                        sideBarTrigger={() => setShowSidebar(!showSidebar)}/>
            )}

            <div className="relative min-h-screen flex">

                <Sidebar
                    isShow={showSidebar}
                >
                    {userType === "ADMIN" ? (
                        <div>
                            <SidebarMenu name="Pegawai" route="/pegawai">
                                <IoIosPeople/>
                            </SidebarMenu>
                            <SidebarMenu name="Driver" route="/driver">
                                <IoIosPerson/>
                            </SidebarMenu>
                            <SidebarMenu name="Asset" route="/car">
                                <BiCar/>
                            </SidebarMenu>
                            <SidebarMenu name="Mitra" route="/mitra">
                                <FaPeopleCarry/>
                            </SidebarMenu>
                        </div>
                    ) : (
                        <div/>
                    )}
                    {userType === "MANAGER" ? (
                        <div>
                            <SidebarMenu name="Jadwal Shift" route="/jadwal-shift">
                                <AiOutlineSchedule/>
                            </SidebarMenu>
                            <SidebarMenu name="Promo" route="/promo">
                                <TiTicket/>
                            </SidebarMenu>
                        </div>
                    ) : (
                        <div/>
                    )}
                    {userType === "CS" ? (
                        <div>
                            <SidebarMenu name="Verifikasi Transaksi" route="/transaksi/verify">
                                <GoVerified/>
                            </SidebarMenu>
                            <SidebarMenu name="Verifikasi Data Customer" route="/customer/verifikasi-pendaftaran">
                                <People size={20}/>
                            </SidebarMenu>
                        </div>
                    ) : (
                        <div/>
                    )}
                    {userType === "CUSTOMER" ? (
                        <div>
                            <SidebarMenu name="Booking Mobil" route="/transaksi">
                                <BiCar/>
                            </SidebarMenu>
                            <SidebarMenu name="Daftar Transaksi" route="/transaksi/customer">
                                <GiMoneyStack/>
                            </SidebarMenu>
                        </div>
                    ) : (
                        <div/>
                    )}

                </Sidebar>

                <div
                    className="bg-white w-full py-8 px-6">
                    {props.children}
                </div>
            </div>
        </div>
    );
};

export default Index;