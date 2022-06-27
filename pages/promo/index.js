import React, {Fragment, useEffect, useState} from 'react';
import Layout from "../../components/Layout";
import {useDispatch, useSelector} from "react-redux";
import {Dialog, Transition} from "@headlessui/react";
import InputField from "../../components/Input/InputField";
import TextArea from "../../components/Input/TextArea";
import Snackbar from "../../components/Snackbar";
import {createPromo, deletePromo, getPromo, resetMessage, updatePromo} from "../../util/store/actions/promo";
import {AiOutlineDelete} from "@react-icons/all-files/ai/AiOutlineDelete";
import {AiOutlineEdit} from "@react-icons/all-files/ai/AiOutlineEdit";
import Datatable from "../../components/Datatable";
import EditInputPromo from "../../components/Modal/EditInputPromo";
import {setSnackbar} from "../../util/store/actions/snackbars";
import CustomSnackbars from "../../components/Snackbar";
import {Button, TextField} from "@mui/material";

const Index = () => {
    // const listPegawai = useSelector(state => state.pegawai.all_pegawai)
    const {promos, errors, message, isLoading} = useSelector(state => state.promo)
    const {roles} = useSelector(state => state.roles)
    // const [message, setMessage] = useState("")
    // const {currentUser} = useSelector(state => state.auth)
    // const errors = useSelector(state => state.pegawai.errors)
    const dispatch = useDispatch()

    const column = [
        {heading: 'NO', value: 'no'},
        {heading: 'KODE', value: 'kode_promo'},
        {heading: 'STATUS', value: 'status_promo'},
        {heading: 'JENIS', value: 'jenis_promo'},
        {heading: 'DISKON (%)', value: 'persen_diskon'},
        {heading: 'AKSI', value: 'aksi'},
    ]

    const filteredPromo = () => {
        if (searchKey === "")
            return promos
        else
            return promos.filter(row =>
                row.kode_promo.toString().toLowerCase().includes(searchKey.toLowerCase()) ||
                row.jenis_promo.toLowerCase().includes(searchKey.toLowerCase())
            )
    }

    const handleDelete = (record) => {
        console.log('Info: Come from handleDelete');
        deletePromoUI(record)
        console.log(record);
    };

    const handleEdit = (record) => {
        console.log('Info: Come from handleEdit');
        setEditPromo(record)
        setIsOpenModal(true)
    };


    const promoActions = (record) => {
        return (
            <div>
                {/*<CustomSnackbars/>*/}
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
            </div>
        )
    }

    const createPromoUI = () => {
        dispatch(createPromo({
            'kode_promo': kodePromo,
            'jenis_promo': jenisPromo,
            'deskripsi_promo': deskripsiPromo,
            'persen_diskon': persenDiskon,
            'status_promo': statusPromo,
        }))
    }

    const [isOpenModal, setIsOpenModal] = useState(false)
    const [isOpenSnackbar, setIsOpenSnackbar] = useState(false)
    const [snackbarType, setSnackbarType] = useState("")
    const [snackbarMsg, setSnackbarMsg] = useState("")

    const [searchKey, setSearchKey] = useState("")

    //modal dialog data
    const [kodePromo, setKodePromo] = useState("")
    const [statusPromo, setStatusPromo] = useState(1)
    const [jenisPromo, setJenisPromo] = useState("")
    const [deskripsiPromo, setDeskripsiPromo] = useState("")
    const [persenDiskon, setPersenDiskon] = useState("")


    const [mode, setMode] = useState("add")
    const [editPromo, setEditPromo] = useState(null)

    // error state
    const [kodeError, setKodeError] = useState("")
    const [jenisError, setJenisError] = useState("")
    const [deskripsiError, setDeskripsiError] = useState("")
    const [persenError, setPersenError] = useState("")
    const [statusError, setStatusError] = useState("")


    const validate = () => {
        const errors = {}
        if (kodePromo === "")
            errors.kode_promo = "kode promo wajib diisi!"
        if (jenisPromo === "")
            errors.jenis_promo = "Jenis tidak boleh kosong!"
        if (deskripsiPromo === "")
            errors.deskripsi_promo = "birthdate tidak boleh kosong!"
        if (persenDiskon === "")
            errors.persen_diskon = "Persen diskon wajib diisi!"

        return Object.keys(errors).length === 0 ? null : errors;
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const errors = validate();
        if (errors) {
            setKodeError(errors.kode_promo)
            setStatusError(errors.status_promo)
            setJenisError(errors.jenis_promo)
            setDeskripsiError(errors.deskripsi_promo)
            setPersenError(errors.persen_diskon)

        } else {
            clearErrorField()
            onModalSave()
        }
    }

    const onModalSave = () => {
        switch (mode) {
            case "add": {
                createPromoUI()
                // getAllPegawai()
                closeDialog()
            }
                break
            case "edit": {
                updatePromoUI()
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
        setKodeError("")
        setStatusError("")
        setJenisError("")
        setDeskripsiError("")
        setPersenError("")
    }


    const getAllPromo = () => {
        dispatch(getPromo())
        // setListPegawai(all_pegawai)
    }

    const deletePromoUI = (promo) => {
        dispatch(deletePromo(promo))
        dispatch(getPromo())
    }

    const updatePromoUI = () => {

        dispatch(updatePromo(
            {
                ...editPromo,
                'jenis_promo': jenisPromo,
                'deskripsi_promo': deskripsiPromo,
                'persen_diskon': persenDiskon,
                'status_promo': statusPromo,
            }
        ))
    }

    useEffect(() => {
        if (message !== null && message !== "") {
            console.log("PROMO ACTION")
            console.log(message)
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

            dispatch(setSnackbar({
                'snackbarOpen': true,
                'snackbarType': "error",
                'snackbarMessage': msg,
            }))

            // dispatch(resetErrors())
        }
        dispatch(resetMessage())
    }, [promos])


    const clearField = () => {
        setKodePromo("")
        setStatusPromo(1)
        setJenisPromo("")
        setDeskripsiPromo("")
        setPersenDiskon("")

        clearErrorField()
    }

    const closeDialog = () => {
        getAllPromo()
        setIsOpenModal(false)
        clearField()
    }

    const closeSnackbar = () => {
        setIsOpenSnackbar(false)
        clearField()
        dispatch(resetMessage())
    }


    useEffect(() => {
        getAllPromo()

    }, [])

    return (
        <Layout>
            <CustomSnackbars/>
            <div className="py-4 flex justify-between content-center">
                <h1 className="md:text-5xl font-medium text-xl">Pengelolaan Promo</h1>
                <div className="flex w-fit">

                    <div className="mr-4">
                        <TextField type="text"
                               value={searchKey}
                               onChange={(e) => {
                                   setSearchKey(e.target.value)
                               }}
                               label="Search Promo"
                               variant="standard"
                               />
                    </div>

                    <div className="ml-4">
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={
                                () => {
                                    setEditPromo(null)
                                    setIsOpenModal(true)
                                }
                            }
                        >
                            + promo
                        </Button>
                    </div>

                </div>
            </div>

            <div className="min-w-full overflow-auto shadow p-4 pb-12">
                {promos !== null && (
                    <div>
                        {promos.length > 0 && (
                            <Datatable data={filteredPromo()} actions={promoActions} column={column}/>
                        )}
                    </div>
                )}

                {isOpenModal && (
                    <EditInputPromo show={isOpenModal} setShowModal={setIsOpenModal} editPromo={editPromo}/>
                )}
            </div>

            {isOpenSnackbar && (
                <Snackbar message={snackbarMsg} type={snackbarType} action={() => {
                    closeSnackbar()
                }}/>
            )}


        </Layout>
    );
};

export default Index;