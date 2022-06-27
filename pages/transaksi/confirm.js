import React, {useEffect, useState} from 'react';
import Layout from "../../components/Layout";
import {Alert, Button, Checkbox, FormControlLabel} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {useRouter} from "next/router";
import {base_public_url} from "../../util/store/sagas/base_public_url";
import {MdPeopleOutline} from "@react-icons/all-files/md/MdPeopleOutline";
import {VscGear} from "@react-icons/all-files/vsc/VscGear";
import {RiOilLine} from "@react-icons/all-files/ri/RiOilLine";
import {IoBagAddOutline} from "@react-icons/all-files/io5/IoBagAddOutline";
import {VscFileMedia} from "@react-icons/all-files/vsc/VscFileMedia";
import {MdAttachMoney} from "@react-icons/all-files/md/MdAttachMoney";
import {BsCalendar} from "@react-icons/all-files/bs/BsCalendar";
import {calculateEstimatedTime, convertDate, convertDateTime} from "../../util/converter/date_converter";
import {BsClock} from "@react-icons/all-files/bs/BsClock";
import {createTransaksi, getAvailableDriver} from "../../util/store/actions/transaksi";
import DriverSelectCard from "../../components/DriverSelectCard";
import {BsPerson} from "@react-icons/all-files/bs/BsPerson";
import {WarningOutlined} from "@mui/icons-material";
import {IoWarningOutline} from "@react-icons/all-files/io5/IoWarningOutline";
import Snackbar from "../../components/Snackbar";
import {resetMessage} from "../../util/store/actions/promo";
import {setSnackbar} from "../../util/store/actions/snackbars";

const ConfirmTransaction = () => {

    const router = useRouter()
    const dispatch = useDispatch()

    const {
        available_driver,
        proceedCar,
        savedTransaction,
        isLoading,
        message,
        errors
    } = useSelector(state => state.transaction)

    const [includeDriver, setIncludeDriver] = useState(false)
    const [selectedDriver, setSelectedDriver] = useState(null)

    const [isOpenSnackbar, setIsOpenSnackbar] = useState(false)
    const [snackbarType, setSnackbarType] = useState("")
    const [snackbarMsg, setSnackbarMsg] = useState(null)

    const onDriverSelect = (driver) => {
        console.log(driver)
        setSelectedDriver(driver)
    }

    const handleSubmit = () => {
        if (includeDriver && selectedDriver !== null) {
            createTransaction()
            // handlePopBack()
        } else if (!includeDriver) {
            createTransaction()
            // handlePopBack()
        }
        setTimeout(() => {
                if (!isLoading)
                    handlePopBack()
            }
            , 2000)
    }

    const closeSnackbar = () => {
        setIsOpenSnackbar(false)
        // clearField()
        // dispatch(resetMessage())
    }

    const handlePopBack = () => {
        setIncludeDriver(false)
        setSelectedDriver(null)
        router.back()
    }

    console.log(proceedCar)

    const createTransaction = () => {
        const estimatedTime = calculateEstimatedTime(savedTransaction.waktu_mulai, savedTransaction.waktu_selesai) < 1 ? 1 : calculateEstimatedTime(savedTransaction.waktu_mulai, savedTransaction.waktu_selesai)
        const subTotalMobil = estimatedTime * proceedCar.harga_sewa
        const subTotalDriver = selectedDriver !== null ? estimatedTime * selectedDriver.price : 0
        dispatch(createTransaksi({
            ...savedTransaction,
            id_driver: selectedDriver !== null ? selectedDriver.id : null,
            subtotal_mobil: subTotalMobil,
            subtotal_driver: subTotalDriver
        }))
    }


    useEffect(() => { //ambil data untuk list mobil
        dispatch(getAvailableDriver({
            waktu_mulai: savedTransaction.waktu_mulai,
            waktu_selesai: savedTransaction.waktu_selesai
        }))

    }, [])


    useEffect(() => { //ambil data untuk list pegawai
        if (message !== null && message.message !== "") {
            setSnackbarMsg(message.message)
            setSnackbarType("success")
            setIsOpenSnackbar(true)
            dispatch(setSnackbar({
                'snackbarOpen': true,
                'snackbarType': "success",
                'snackbarMessage': message.message,
            }))
        } else if (errors !== null && errors.message !== "") {
            setSnackbarMsg(errors.message)
            setSnackbarType("error")
            setIsOpenSnackbar(true)
            dispatch(setSnackbar({
                'snackbarOpen': true,
                'snackbarType': "error",
                'snackbarMessage': errors.message,
            }))
        }
    }, [isLoading])

    return (
        <Layout>
            <Button
                color="primary"
                variant="contained"
                onClick={() => {
                    handlePopBack()
                }}
            >
                kembali
            </Button>

            <Snackbar
                open={isOpenSnackbar}
                anchorOrigin={{vertical: "top", horizontal: "center"}}
                autoHideDuration={2000}
                onClose={() => {
                    setIsOpenSnackbar(false)
                    setSnackbarMsg("")
                    dispatch(resetMessage())
                }}
            >
                <Alert severity={snackbarType} sx={{width: '100%'}} onClose={() => {
                    setIsOpenSnackbar(false)
                    setSnackbarMsg("")
                    dispatch(resetMessage())
                }}>
                    {snackbarMsg}
                </Alert>
            </Snackbar>

            <div className="flex flex-col mt-6">
                {proceedCar !== null && (
                    <div className="flex items-center justify-start space-y-4 space-x-8">
                        <div className="flex items-center justify-start space-x-8">
                            <img className="h-64" src={`${base_public_url}${proceedCar.foto_mobil}`}/>
                            <div className="flex flex-col">
                                {/*<span className="text-indigo-700">{car.id_mobil}</span>*/}
                                <span
                                    className="text-4xl font-bold pb-4 pt-2 rounded-b-3xl">{proceedCar.nama_mobil}
                        </span>

                                <span className="flex items-center justify-start">
                            <MdPeopleOutline color="blue" size={'1.25rem'} className="font-bold mr-2"/>
                                    {`kapasitas ${proceedCar.kapasitas_penumpang} orang`}
                        </span>
                                <span className="flex items-center justify-start">
                            <VscGear color="blue" size={'1.25rem'} className="font-bold mr-2"/>
                                    {`transmisi ${proceedCar.jenis_transmisi}`}
                        </span>
                                <span className="flex items-center justify-start">
                            <RiOilLine color="blue" size={'1.25rem'} className="font-bold mr-2"/>
                                    {`${proceedCar.jenis_bahan_bakar} | ${proceedCar.volume_bahan_bakar} L`}
                        </span>
                                <span className="flex items-center justify-start">
                            <IoBagAddOutline color="blue" size={'1.25rem'} className="font-bold mr-2"/>
                                    {`${proceedCar.volume_bagasi} L (bagasi)`}
                        </span>
                                <span className="flex items-center justify-start">
                            <VscFileMedia color="blue" size={'1.25rem'} className="font-bold mr-2"/>
                                    {`fasilitas: ${proceedCar.fasilitas_mobil}`}
                        </span>
                                <span className="flex items-center font-bold justify-start">
                            <MdAttachMoney color="blue" size={'1.25rem'} className="font-bold mr-2"/>
                                    {`IDR ${(proceedCar.harga_sewa) / 1000}K / Hari`}
                        </span>
                            </div>
                        </div>

                        <div>
                        <span className="flex items-center justify-start">
                            <BsCalendar color="blue" size={'1.25rem'} className="mr-2"/>
                            {`Dari ${convertDateTime(savedTransaction.waktu_mulai)} s.d. ${convertDateTime(savedTransaction.waktu_selesai)}`}
                        </span>
                            <span className="flex items-center justify-start">
                            <BsClock color="blue" size={'1.25rem'} className="mr-2"/>
                                {`Estimasi peminjaman ${calculateEstimatedTime(savedTransaction.waktu_mulai, savedTransaction.waktu_selesai) < 1 ? "1" : calculateEstimatedTime(savedTransaction.waktu_mulai, savedTransaction.waktu_selesai)} hari`}
                        </span>
                            <span className="flex items-center justify-start">
                            <MdAttachMoney color="blue" size={'1.25rem'} className="mr-2"/>
                                {`Estimasi biaya mobil: IDR ${calculateEstimatedTime(savedTransaction.waktu_mulai, savedTransaction.waktu_selesai) < 1 ? 1 * proceedCar.harga_sewa / 1000 :
                                    calculateEstimatedTime(savedTransaction.waktu_mulai, savedTransaction.waktu_selesai) * proceedCar.harga_sewa / 1000}K`}
                        </span>
                            {includeDriver && selectedDriver !== null && (
                                <span className="flex items-center justify-start">
                            <BsPerson color="blue" size={'1.25rem'} className="mr-2"/>
                                    {`driver: ${selectedDriver.name}`}
                        </span>
                            )}
                            {includeDriver && selectedDriver !== null && (
                                <span className="flex items-center justify-start">
                            <MdAttachMoney color="blue" size={'1.25rem'} className="mr-2"/>
                                    {`Estimasi biaya driver: IDR ${calculateEstimatedTime(savedTransaction.waktu_mulai, savedTransaction.waktu_selesai) < 1 ? 1 * selectedDriver.price / 1000 :
                                        calculateEstimatedTime(savedTransaction.waktu_mulai, savedTransaction.waktu_selesai) * selectedDriver.price / 1000}K`}
                        </span>
                            )}


                            {/*TODO: hitung prakiraan estimasi total biaya*/}

                            <FormControlLabel control={<Checkbox
                                value={includeDriver}
                                onChange={(e) => {
                                    if (e.target.checked)
                                        setIncludeDriver(true)
                                    else {
                                        setIncludeDriver(false)
                                        setSelectedDriver(null)
                                    }
                                }}
                            />} label="Include Driver"/>

                            {includeDriver && selectedDriver == null && (
                                <span className="flex items-center justify-start text-red-500">
                                <IoWarningOutline size={'1.25rem'} className="mr-2"/>
                                    {`Opps! silahkan pilih salah satu driver!`}
                                </span>
                            )}
                        </div>

                    </div>
                )}
                {includeDriver && (
                    <div>
                        <div className="flex flex-col mt-8 relative">
                        <span
                            className="w-full text-xl font-semibold text-center">
                            {`Driver yang tersedia pada ${convertDateTime(savedTransaction.waktu_mulai)} s.d. ${convertDateTime(savedTransaction.waktu_selesai)}`}
                        </span>
                            <div
                                className="flex items-center space-x-4 space-y-4 justify-start overscroll-x-auto py-8 w-full overflow-x-scroll absolute top-0 left-0">
                                {available_driver.map((item, index) =>
                                    <DriverSelectCard key={index} driver={item} onSelect={onDriverSelect}/>
                                )}
                            </div>
                            {available_driver.length === 0 && (
                                <span className="w-full text-center">Oops! semua driver sepertinya sedang sibuk</span>
                            )}
                        </div>

                    </div>
                )}
                <div
                    className={`flex w-full items-center justify-center ${includeDriver ? "mt-80" : "mt-4"} py-8 block`}>
                    <Button
                        variant="contained"
                        onClick={handleSubmit}
                    >
                        Proses Transaksi
                    </Button>
                </div>
            </div>

            {/*{isOpenSnackbar && (*/}
            {/*    <Snackbar message={snackbarMsg} type={snackbarType} action={() => {*/}
            {/*        closeSnackbar()*/}
            {/*    }}/>*/}
            {/*)}*/}

        </Layout>
    );
};

export default ConfirmTransaction;
