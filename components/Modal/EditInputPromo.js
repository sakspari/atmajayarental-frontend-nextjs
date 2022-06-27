import React, {Fragment, useEffect, useState} from 'react';
import {Dialog, Transition} from "@headlessui/react";
import InputField from "../Input/InputField";
import TextArea from "../Input/TextArea";
import Button from "../Button";
import {createPromo, getPromo, updatePromo} from "../../util/store/actions/promo";
import {useDispatch} from "react-redux";

const EditInputPromo = ({editPromo, show, setShowModal}) => {

    const [mode, setMode] = useState("add")
    const dispatch = useDispatch()

    const [kodePromo, setKodePromo] = useState("")
    const [statusPromo, setStatusPromo] = useState(1)
    const [jenisPromo, setJenisPromo] = useState("")
    const [deskripsiPromo, setDeskripsiPromo] = useState("")
    const [persenDiskon, setPersenDiskon] = useState("")

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
        // if (statusPromo === "")
        //     errors.status_promo = "address tidak boleh kosong!"

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

    const createPromoUI = () => {
        dispatch(createPromo({
            'kode_promo': kodePromo,
            'jenis_promo': jenisPromo,
            'deskripsi_promo': deskripsiPromo,
            'persen_diskon': persenDiskon,
            'status_promo': statusPromo,
        }))
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

    const closeDialog = () => {
        setShowModal(false)
        dispatch(getPromo())
    }

    useEffect(()=>{
        if(editPromo!==null){
            setMode("edit")
            setKodePromo(editPromo.kode_promo)
            setStatusPromo(editPromo.status_promo)
            setJenisPromo(editPromo.jenis_promo)
            setDeskripsiPromo(editPromo.deskripsi_promo)
            setPersenDiskon(editPromo.persen_diskon)
        }
    },[])

    return (
        <div>
            <Transition appear show={show} as={Fragment}>
                <Dialog
                    as="div"
                    className="fixed inset-0 z-10 overflow-y-auto"
                    onClose={() => {
                        closeDialog()
                    }}
                >
                    <div className="min-h-screen px-4 text-center bg-gray-900 bg-opacity-50">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <Dialog.Overlay className="fixed inset-0"/>
                        </Transition.Child>

                        {/* This element is to trick the browser into centering the modal contents. */}
                        <span
                            className="inline-block h-screen align-middle"
                            aria-hidden="true"
                        >&#8203;
                                </span>
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <div
                                className="inline-block w-full max-w-md my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                                <Dialog.Title
                                    as="h3"
                                    className="text-3xl font-medium py-4 text-gray-900 text-center"
                                >
                                    {mode === "add" ? (
                                        <span>
                                                    Tambah Promo Baru
                                                </span>
                                    ) : (
                                        <span>
                                                    Edit Promo
                                                    <span className="text-indigo-600">
                                                        {` ${editPromo.kode_promo}`}
                                                    </span>
                                                </span>
                                    )}
                                </Dialog.Title>
                                <div className="mt-2">
                                    <div className="bg-white  rounded-lg sm:px-10">
                                        <form className="mb-0 space-y-4 w-full" onSubmit={handleSubmit}>

                                            <InputField type="text" lable="Kode Promo" value={kodePromo}
                                                        disable={mode === "edit"}
                                                        errorMsg={kodeError} onChange={(e) => {
                                                setKodePromo(e.target.value)
                                            }}/>

                                            <div>
                                                <label htmlFor="input-field"
                                                       className="block text-sm font font-medium text-gray-700">
                                                    Status Promo
                                                </label>
                                                <div className="mt-1">
                                                    <select className="w-full border-gray-300 rounded-md shadow-sm appearance-none
                                                                                focus:border-indigo-500 focus:ring-indigo-500"
                                                            value={statusPromo}
                                                            onChange={(e) => {
                                                                setStatusPromo(e.target.value)
                                                            }}
                                                    >
                                                        <option
                                                            value="">
                                                            Select status...
                                                        </option>

                                                        <option
                                                            value={1}

                                                        >
                                                            Aktif
                                                        </option>

                                                        <option
                                                            value={0}

                                                        >
                                                            Expired
                                                        </option>
                                                    </select>
                                                </div>
                                                <div className="text-red-500 text-sm">{statusError}</div>
                                            </div>

                                            <InputField type="text" lable="Jenis Promo" value={jenisPromo}
                                                        errorMsg={jenisError} onChange={(e) => {
                                                setJenisPromo(e.target.value)
                                            }}/>


                                            <InputField type="number" lable="Persen Diskon (%)"
                                                        value={persenDiskon}
                                                        errorMsg={persenError} onChange={(e) => {
                                                setPersenDiskon(e.target.value)
                                            }}/>

                                            <TextArea lable="Deskripsi" value={deskripsiPromo}
                                                      errorMsg={deskripsiError}
                                                      onChange={(e) => {
                                                          setDeskripsiPromo(e.target.value)
                                                      }}/>
                                            <div className="pt-8 flex justify-between">
                                                <div className="w-full pr-4">
                                                    <Button text="Save" variant="primary"
                                                            action={handleSubmit}/>
                                                </div>
                                                <div className="w-full pl-4">
                                                    <Button text="Cancel" variant="warning" action={
                                                        closeDialog
                                                    }/>
                                                </div>
                                            </div>

                                        </form>
                                    </div>
                                </div>

                                <div className="mt-4">
                                    {/*tempat button*/}
                                </div>
                            </div>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition>
        </div>
    );
};

export default EditInputPromo;