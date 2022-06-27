import React, {useEffect, useState} from 'react';
import Layout from "../../components/Layout";
import {useDispatch, useSelector} from "react-redux";
import {resetMessage} from "../../util/store/actions/pegawai";
import Snackbar from "../../components/Snackbar";
import CustomSnackbars from "../../components/Snackbar";
import {AiOutlineEdit} from "@react-icons/all-files/ai/AiOutlineEdit";
import {AiOutlineDelete} from "@react-icons/all-files/ai/AiOutlineDelete";
import {createDriver, deleteDriver, getDriver} from "../../util/store/actions/driver";
import Datatable from "../../components/Datatable";
import EditInputDriver from "../../components/Modal/EditInputDriver";
import {setSnackbar} from "../../util/store/actions/snackbars";
import Loading from "../../components/Loading";
import {Alert, Button, TextField} from "@mui/material";

const Index = () => {
    // const listPegawai = useSelector(state => state.pegawai.all_pegawai)
    const {message, errors, all_driver, isLoading} = useSelector(state => state.driver)
    const {roles} = useSelector(state => state.roles)
    const {currentUser} = useSelector(state => state.auth)
    // const errors = useSelector(state => state.pegawai.errors)
    const [listDriver, setListDriver] = useState([])
    const [editDriver, setEditDriver] = useState("")

    const dispatch = useDispatch()

    //save & edit state handle
    const [name, setName] = useState("");
    const [picture, setPicture] = useState(null);
    const [address, setAddress] = useState("");
    const [birthdate, setBirthdate] = useState("");
    const [gender, setGender] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [language, setLanguage] = useState("");
    const [price, setPrice] = useState("");
    const [sim, setSim] = useState(null);
    const [suratBebasNapza, setSuratBebasNapza] = useState(null);
    const [skJiwa, setSkJiwa] = useState(null);
    const [skJasmani, setSkJasmani] = useState(null);
    const [skck, setSkck] = useState(null);
    const [status, setStatus] = useState(1);

    //state for error msg
    const [nameError, setNameError] = useState("");
    const [pictureError, setPictureError] = useState("");
    const [addressError, setAddressError] = useState("");
    const [birthdateError, setBirthdateError] = useState("");
    const [genderError, setGenderError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [phoneError, setPhoneError] = useState("");
    const [languageError, setLanguageError] = useState("");
    const [priceError, setPriceError] = useState("");
    const [simError, setSimError] = useState("");
    const [suratBebasNapzaError, setSuratBebasNapzaError] = useState("");
    const [skJiwaError, setSkJiwaError] = useState("");
    const [skJasmaniError, setSkJasmaniError] = useState("");
    const [skckError, setSkckError] = useState("");
    const [statusError, setStatusError] = useState("");

    const createDriverUI = () => {
        dispatch(createDriver({
            'name': name,
            'picture': picture,
            'address': address,
            'birthdate': birthdate,
            'gender': gender,
            'email': email,
            'phone': phone,
            'language': language,
            'price': price,
            'file_sim': sim,
            'file_bebas_napza': suratBebasNapza,
            'file_sk_jiwa': skJiwa,
            'file_sk_jasmani': skJasmani,
            'file_skck': skck,
            'status': status,
        }))
    }


    const [isOpenModal, setIsOpenModal] = useState(false)
    const [isOpenSnackbar, setIsOpenSnackbar] = useState(false)
    const [snackbarType, setSnackbarType] = useState("")
    const [snackbarMsg, setSnackbarMsg] = useState("")

    const [searchKey, setSearchKey] = useState("")

    const [mode, setMode] = useState("add")
    const [editPegawai, setEditPegawai] = useState("")


    const onDateChange = (e) => {
        setBirthdate(e.target.value)
    }

    const validate = () => {
        const errors = {}
        if (name === "")
            errors.name = "name tidak boleh kosong!"
        if (gender === "")
            errors.gender = "gender tidak boleh kosong!"
        if (birthdate === "")
            errors.birthdate = "tanggal lahir tidak boleh kosong!"
        if (email === "")
            errors.email = "email tidak boleh kosong!"
        if (address === "")
            errors.address = "alamat tidak boleh kosong!"
        if (phone === "")
            errors.phone = "nomor telepon tidak boleh kosong!"
        if (language === "")
            errors.language = "Pilihlah minimal satu bahasa!"
        if (price === "")
            errors.price = "Tarif wajib diisi!"
        if (sim === null)
            errors.sim = "Wajib upload sim!"
        if (suratBebasNapza === null)
            errors.suratBebasNapza = "Wajib upload surat keterangan bebas napza!"
        if (skJiwa === null)
            errors.skJiwa = "Wajib upload surat kesehatan jiwa!"
        if (skJasmani === null)
            errors.skJasmani = "Wajib upload surat kesehatan jasmani!"
        if (skck === null)
            errors.skck = "Wajib upload SKCK!"

        return Object.keys(errors).length === 0 ? null : errors;
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const errors = validate();
        if (errors) {
            setNameError(errors.name)
            setPictureError(errors.picture)
            setAddressError(errors.address)
            setBirthdateError(errors.birthdate)
            setGenderError(errors.gender)
            setEmailError(errors.email)
            setPhoneError(errors.phone)
            setLanguageError(errors.language)
            setPriceError(errors.price)
            setSimError(errors.sim)
            setSuratBebasNapzaError(errors.suratBebasNapza)
            setSkJiwaError(errors.skJiwa)
            setSkJasmaniError(errors.skJasmani)
            setSkckError(errors.skck)
        } else {
            clearErrorField()
            onModalSave()
        }
    }

    const onModalSave = () => {
        switch (mode) {
            case "add": {
                // createPegawaiUI()
                // getAllPegawai()
                closeDialog()
            }
                break
            case "edit": {
                // updatePegawaiUI()
                closeDialog()
            }
                break
            default: {
                closeDialog()
            }
        }

    }

    //end of modal dialog data

    const clearErrorField = () => {
        setNameError("")
        setPictureError("")
        setAddressError("")
        setBirthdateError("")
        setGenderError("")
        setEmailError("")
        setPhoneError("")
        setLanguageError("")
        setPriceError("")
        setSimError("")
        setSuratBebasNapzaError("")
        setSkJiwaError("")
        setSkJasmaniError("")
        setSkckError("")
    }


    const getAllDriver = () => {
        dispatch(getDriver())
    }


    // const updateDriverUI = () => {
    //
    //     dispatch(updateDriver(
    //         {
    //             ...editDriver,
    //             'name': name,
    //             'picture': picture, //check picture
    //             'birthdate': birthdate,
    //             'gender': gender,
    //             'address': address,
    //             'phone': phonenumber,
    //             'email': email,
    //         }
    //     ))
    // }


    const handleDelete = (record) => {
        console.log('Info: Come from handleDelete');
        dispatch(deleteDriver(record))
        dispatch(getDriver())
        console.log(record);
    };

    const handleEdit = (record) => {
        console.log('Info: Come from handleEdit');
        setEditDriver(record)
        setIsOpenModal(true)
    };

    const driverActions = (record) => {
        return (
            <div>
                <button
                    className="mx-1 text-green-700 disabled:text-gray-500 hover:bg-green-300 hover:text-black disabled:bg-gray-100 bg-green-100 p-1 rounded-md"
                    onClick={() => handleEdit(record)}
                >
                    <AiOutlineEdit/>
                </button>
                <button
                    className="mx-2 text-red-500 disabled:text-gray-500 hover:bg-red-300 hover:text-black disabled:bg-gray-100 bg-red-100 p-1 rounded-md"
                    onClick={() => handleDelete(record)}
                >
                    <AiOutlineDelete/>
                </button>
            </div>
        )
    }


    const filteredDriver = () => {
        if (searchKey === "")
            return all_driver
        else
            return all_driver.filter(row =>
                row.id.toString().toLowerCase().includes(searchKey.toLowerCase()) ||
                row.name.toLowerCase().includes(searchKey.toLowerCase())
            )
    }


    const column = [
        {heading: 'NO', value: 'no'},
        {heading: 'ID', value: 'id'},
        {heading: 'NAMA', value: 'name'},
        {heading: 'GENDER', value: 'gender'},
        {heading: 'STATUS', value: 'status'},
        {heading: 'EMAIL', value: 'email'},
        {heading: 'TELEPON', value: 'phone'},
        {heading: 'AKSI', value: 'aksi'},
    ]

    const clearField = () => {
        setName("")
        setPicture(null)
        setAddress("")
        setBirthdate("")
        setGender("")
        setEmail("")
        setPhone("")
        setLanguage("")
        setPrice("")
        setSim(null)
        setSuratBebasNapza(null)
        setSkJiwa(null)
        setSkJasmani(null)
        setSkck(null)
        setStatus(1)

        clearErrorField()
    }

    const closeDialog = () => {
        getAllDriver()
        setIsOpenModal(false)
        clearField()
    }

    const closeSnackbar = () => {
        setIsOpenSnackbar(false)
        clearField()
        dispatch(resetMessage())
    }


    useEffect(() => { //ambil data untuk list driver
        getAllDriver()
    }, [])


    useEffect(() => {
        if (message !== null) {

            // setSnackbarMsg(message.message)
            // setSnackbarType("success")
            // setIsOpenSnackbar(true)

            dispatch(setSnackbar({
                'snackbarOpen': true,
                'snackbarType': "success",
                'snackbarMessage': message.message,
            }))
        }
        if (errors !== null) {
            let msg = JSON.stringify(errors.message)
            msg = msg.replace("{","")
            msg = msg.replace("}","")
            msg = msg.replace("[","")
            msg = msg.replace("]","")
            msg = msg.replace('"',"")
            msg = msg.replace('"',"")

            // setSnackbarMsg(msg)
            // setSnackbarType("error")
            // setIsOpenSnackbar(true)

            dispatch(setSnackbar({
                'snackbarOpen': true,
                'snackbarType': "error",
                'snackbarMessage': msg,
            }))

            // dispatch(resetErrors())
        }
        dispatch(resetMessage())
    }, [isLoading])

    return (
        <Layout>
            {/*<CustomSnackbars/>*/}

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

            <div className="py-4 flex justify-between content-center">
                <h1 className="md:text-5xl font-medium text-xl">Pengelolaan Driver</h1>
                <div className="flex w-fit">

                    <div className="mr-4">
                        <TextField type="text"
                               value={searchKey}
                                   label="search driver"
                               onChange={(e) => {
                                   setSearchKey(e.target.value)
                               }}
                               variant="standard"
                       />
                    </div>

                    <div className="ml-4">
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={
                                () => {
                                    setEditDriver(null)
                                    setIsOpenModal(true)
                                }
                            }
                        >
                            + driver
                        </Button>
                    </div>

                </div>
            </div>

            <Loading isLoading={isLoading}/>

            <div className="min-w-full overflow-auto shadow p-4 pb-12">
                {all_driver !== null ? (

                    <Datatable data={filteredDriver()} actions={driverActions} column={column}/>

                ) : (<div>
                    empty...
                </div>)}

                {isOpenModal && (
                    <EditInputDriver editDriver={editDriver} setShowModal={setIsOpenModal} show={isOpenModal}/>
                )}

            </div>

            {/*{isOpenSnackbar && (*/}
            {/*    <Snackbar message={snackbarMsg} type={snackbarType} action={() => {*/}
            {/*        closeSnackbar()*/}
            {/*    }}/>*/}
            {/*)}*/}


        </Layout>
    );
};

export default Index;

