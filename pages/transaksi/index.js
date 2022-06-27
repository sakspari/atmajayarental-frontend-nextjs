import React, {useEffect, useState} from 'react';
import Layout from "../../components/Layout";
import CarCard from "../../components/CarCard";
import {useDispatch, useSelector} from "react-redux";
import {getMobil} from "../../util/store/actions/mobil";
import {
    createSavedTransaksi,
    createTransaksi,
    getAvailableCar,
    resetAvailableCar, setProceedCar
} from "../../util/store/actions/transaksi";
// import {Button, TextField} from "@material-ui/core";
import {Button, TextField} from "@mui/material";
import Snackbar from "@material-ui/core/Snackbar";
import {Alert} from "@mui/material";
import {calculateYear} from "../../util/converter/date_converter";
import Loading from "../../components/Loading";
import {useRouter} from "next/router";
import {setSnackbar} from "../../util/store/actions/snackbars";
import {resetMessage} from "../../util/store/actions/promo";

const Index = () => {
    const {all_mobil} = useSelector(state => state.mobil)
    const {available_car, message, errors, isLoading} = useSelector(state => state.transaction)
    const {currentUser} = useSelector(state => state.auth)

    const dispatch = useDispatch()
    const router = useRouter()

    const [carToShow, setCarToShow] = useState("all")

    const [searchKey, setSearchKey] = useState("")
    const [waktuMulai, setWaktuMulai] = useState("")
    const [waktuSelesai, setWaktuSelesai] = useState("")
    const [isWaktuMualiFocus, setIsWaktuMualiFocus] = useState(false)
    const [isWaktuSelesaiFocus, setIsWaktuSelesaiFocus] = useState(false)

    //error handling
    const [waktuMulaiError, setWaktuMulaiError] = useState("")
    const [waktuSelesaiError, setWaktuSelesaiError] = useState("")

    //snackbars components
    const [sncMessage, setSncMessage] = useState("")
    const [isOpenSnc, setIsopenSnc] = useState(false)
    const [sncType, setSncType] = useState("success")

    //snackbars
    const [isOpenSnackbar, setIsOpenSnackbar] = useState(false)
    const [snackbarType, setSnackbarType] = useState("")
    const [snackbarMsg, setSnackbarMsg] = useState("")

    const closeSnackbar = () => {
        setIsOpenSnackbar(false)
    }

    const validate = () => {
        const errorField = {}
        if (waktuMulai === "")
            errorField.waktu_mulai = "waktu mulai tidak boleh kosong!"
        if (waktuSelesai === "")
            errorField.waktu_selesai = "waktu selesai tidak boleh kosong!"
        if (new Date(waktuMulai) > new Date(waktuSelesai))
            errorField.waktu_selesai = "waktu selesai tidak boleh lebih kecil dari waktu mulai!"
        if (new Date(waktuMulai) < new Date())
            errorField.waktu_mulai = "waktu mulai tidak valid!"


        return Object.keys(errorField).length === 0 ? null : errorField;
    }

    const validateInputs = () => {
        const errorField = validate();
        if (errorField) {
            setWaktuMulaiError(errorField.waktu_mulai)
            setWaktuSelesaiError(errorField.waktu_selesai)
            return false
        } else {
            setWaktuMulaiError("")
            setWaktuSelesaiError("")
            return true
        }
    }

    const getAllMobil = () => {
        dispatch(getMobil())
    }

    const createEditableTransaction = (mobil) => {
        dispatch(createSavedTransaksi({
            id_mobil: mobil.id_mobil,
            id_customer: currentUser.id,
            waktu_mulai: waktuMulai,
            waktu_selesai: waktuSelesai,
            status_transaksi: "0",
        }))
    }

    const checkAvailabilityOfCar = () => {
        dispatch(getAvailableCar({
            waktu_mulai: waktuMulai,
            waktu_selesai: waktuSelesai
        }))
        // setCarToShow("available")
    }

    const filteredMobil = () => {
        if (searchKey === "" && carToShow === "all")
            return all_mobil
        if (searchKey === "" && carToShow === "available")
            return available_car
        else if (searchKey !== "" && carToShow === "available")
            return available_car.filter(row =>
                row.id_mobil.toString().toLowerCase().includes(searchKey.toLowerCase()) ||
                row.nama_mobil.toLowerCase().includes(searchKey.toLowerCase()) ||
                row.plat_mobil.toLowerCase().includes(searchKey.toLowerCase()) ||
                row.tipe_mobil.toLowerCase().includes(searchKey.toLowerCase())
            )
        else
            return all_mobil.filter(row =>
                row.id_mobil.toString().toLowerCase().includes(searchKey.toLowerCase()) ||
                row.nama_mobil.toLowerCase().includes(searchKey.toLowerCase()) ||
                row.plat_mobil.toLowerCase().includes(searchKey.toLowerCase()) ||
                row.tipe_mobil.toLowerCase().includes(searchKey.toLowerCase())
            )
    }

    //cek ketersediaan mobil di tanggal tertentu
    const onCheckbuttonClicked = () => {
        if (validateInputs()) {
            console.log("validate pass")
            checkAvailabilityOfCar()
            setCarToShow("available")
        } else {
            console.log("validate fail")
            console.log(new Date().toString())
        }
        // createTransaction()
    }

    const onBtnPesanClicked = (item) => {
        if (waktuMulai === "" || waktuSelesai === "") {
            setSncMessage("waktu mulai dan waktu selesai wajib dipilih!")
            setSncType("warning")
            setIsopenSnc(true)
        }
        if (validateInputs()) {
            if (available_car.length !== 0) {
                createEditableTransaction(item)
                dispatch(setProceedCar(item))
                router.push('transaksi/confirm')
            } else if (available_car.length === 0) {
                setSncMessage("Mohon cek ketersediaan mobil terlebih dahulu!")
                setSncType("warning")
                setIsopenSnc(true)
            }

        }

        console.log(item)
    }

    const onBtnDetailClicked = (item) => {
        console.log(item)
    }

    useEffect(() => { //ambil data untuk list mobil
        getAllMobil()

    }, [])

    useEffect(() => { //ambil data untuk list pegawai
        if (message !== null) {
            setIsOpenSnackbar(true)
            dispatch(setSnackbar({
                'snackbarOpen': true,
                'snackbarType': "success",
                'snackbarMessage': message.message,
            }))
        } else if (errors !== null) {
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

            <Snackbar
                open={isOpenSnc}
                anchorOrigin={{vertical: "top", horizontal: "center"}}
                autoHideDuration={2000}
                onClose={() => {
                    setIsopenSnc(false)
                    setSncMessage("")
                }}
            >
                <Alert severity={sncType} sx={{width: '100%'}} onClose={() => {
                    setIsopenSnc(false)
                    setSncMessage("")
                }}>
                    {sncMessage}
                </Alert>
            </Snackbar>


            <div className="w-full flex items-center py-12">
                <TextField
                    className="md:w-96"
                    label="search car"
                    size="medium"
                    variant="standard"
                    value={searchKey}
                    onChange={(e) => {
                        setSearchKey(e.target.value)
                    }}
                />

                <div className="w-full flex items-center space-x-8 justify-end">
                    <TextField
                        variant="standard"
                        type={isWaktuMualiFocus ? "datetime-local" : "text"}
                        onFocus={() => {
                            setIsWaktuMualiFocus(true)
                        }}
                        onBlur={() => {
                            setIsWaktuMualiFocus(false)
                        }}
                        label="Waktu Mulai"
                        error={waktuMulaiError !== ""}
                        helperText={waktuMulaiError}
                        value={waktuMulai}
                        onChange={(e) => {
                            setWaktuMulai(e.target.value)
                        }}
                    />
                    <TextField
                        variant="standard"
                        type={isWaktuSelesaiFocus ? "datetime-local" : "text"}
                        onFocus={() => {
                            setIsWaktuSelesaiFocus(true)
                        }}
                        onBlur={() => {
                            setIsWaktuSelesaiFocus(false)
                        }}
                        label="Waktu Selesai"
                        error={waktuSelesaiError !== ""}
                        helperText={waktuSelesaiError}
                        value={waktuSelesai}
                        onChange={(e) => {
                            setWaktuSelesai(e.target.value)
                            // console.log((e.target.value).toString().replace("T"," "))
                            // console.log("ini time dari date brahh"+new Date(e.target.value))
                        }}
                    />

                    <Button
                        onClick={onCheckbuttonClicked}
                        variant="contained"
                        color="primary"
                    >
                        Cek Ketersediaan
                    </Button>

                    <Button
                        onClick={() => {
                            setCarToShow("all")
                            setWaktuMulai("")
                            setWaktuSelesai("")
                            dispatch(resetAvailableCar())
                            dispatch(setProceedCar(null))
                        }}
                        variant="contained"
                        color="primary"
                    >
                        All Mobil
                    </Button>
                </div>
            </div>

            <Loading isLoading={isLoading}/>

            {filteredMobil() !== null && filteredMobil() !== undefined && (
                <div className="flex flex-wrap items-center justify-center space-x-12 space-y-12">
                    <div className={'h-12'}></div>
                    {filteredMobil().map(mobil =>
                        <CarCard key={mobil.id_mobil} car={mobil} onBtnPesanClicked={onBtnPesanClicked}
                                 onBtnDetailClicked={onBtnDetailClicked}/>
                    )}
                </div>
            )}

            {/*{isOpenSnackbar && (*/}
            {/*    <Snackbar message={snackbarMsg} type={snackbarType} action={() => {*/}
            {/*        closeSnackbar()*/}
            {/*    }}/>*/}
            {/*)}*/}

        </Layout>
    );
};

export default Index;