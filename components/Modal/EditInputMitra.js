import React, {Fragment, useEffect, useState} from 'react';
import {Dialog, Transition} from "@headlessui/react";
import InputField from "../Input/InputField";
import TextArea from "../Input/TextArea";
import Button from "../Button";
import {createMitra, getMitra, updateMitra} from "../../util/store/actions/mitra";
import {useDispatch} from "react-redux";

const EditInputMitra = ({ editMitra, show, setShowModal }) => {

    const dispatch = useDispatch()

    //modal dialog data
    const [nikMitra, setNik] = useState("")
    const [namaMitra, setNama] = useState("")
    const [alamatMitra, setAlamat] = useState("")
    const [teleponMitra, setTelepon] = useState("")


    const [mode, setMode] = useState("add")
    // const [editMitra, setEditMitra] = useState("")

    // error state
    const [nikMitraError, setNikError] = useState("")
    const [namaMitraError, setNamaError] = useState("")
    const [alamatMitraError, setAlamatError] = useState("")
    const [teleponMitraError, setTeleponError] = useState("")

    const validate = () => {
        const errors = {}
        if (nikMitra === "")
            errors.nik_mitra = "NIK Mitra wajib diisi!"
        if (namaMitra === "")
            errors.nama_mitra = "Nama Mitra tidak boleh kosong!"
        if (alamatMitra === "")
            errors.alamat_mitra = "Alamat tidak boleh kosong!"
        if (teleponMitra === "")
            errors.no_telp_mitra = "No Telepon mitra wajib diisi!"
        // if (statusPromo === "")
        //     errors.status_promo = "address tidak boleh kosong!"

        return Object.keys(errors).length === 0 ? null : errors;
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const errors = validate();
        if (errors) {
            setNikError(errors.nik_mitra)
            setNamaError(errors.nama_mitra)
            setAlamatError(errors.alamat_mitra)
            setTeleponError(errors.no_telp_mitra)

        } else {
            clearErrorField()
            onModalSave()
        }
    }

    useEffect(()=>{
        if(editMitra!==null){
            setMode("edit")
            setNik(editMitra.nik_mitra)
            setNama(editMitra.nama_mitra)
            setAlamat(editMitra.alamat_mitra)
            setTelepon(editMitra.no_telp_mitra)
        }
    },[])

    const updateMitraUI = () => {

        dispatch(updateMitra(
            {
                ...editMitra,
                'nik_mitra': nikMitra,
                'nama_mitra': namaMitra,
                'alamat_mitra': alamatMitra,
                'no_telp_mitra': teleponMitra,
            }
        ))
    }

    const onModalSave = () => {
        switch (mode) {
            case "add": {
                createMitraUI()
                closeDialog()
            }
                break
            case "edit": {
                updateMitraUI()
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
        setNikError("")
        setNamaError("")
        setAlamatError("")
        setTeleponError("")
    }


    const getAllMitra = () => {
        dispatch(getMitra())
    }

    const clearField = () => {
        setNik("")
        setNama("")
        setAlamat("")
        setTelepon("")

        clearErrorField()
    }

    const createMitraUI = () => {
        dispatch(createMitra({
            'nik_mitra': nikMitra,
            'nama_mitra': namaMitra,
            'alamat_mitra': alamatMitra,
            'no_telp_mitra': teleponMitra,
        }))
    }

    const closeDialog = () => {
        setShowModal(false)
        dispatch(getMitra())
        clearField()
    }

    return (
        <div>
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
                                                    Tambah Mitra Baru
                                                </span>
                                        ) : (
                                            <span>
                                                    Edit Mitra
                                                    <span className="text-indigo-600">
                                                        {` ${editMitra.nama_mitra}`}
                                                    </span>
                                                </span>
                                        )}
                                    </Dialog.Title>
                                    <div className="mt-2">
                                        <div className="bg-white  rounded-lg sm:px-10">
                                            <form className="mb-0 space-y-4 w-full" onSubmit={handleSubmit}>

                                                <InputField type="text" lable="NIK Mitra" value={nikMitra}
                                                    disable={mode === "edit"}
                                                            errorMsg={nikMitraError} onChange={(e) => {
                                                    setNik(e.target.value)
                                                }}/>

                                                <InputField type="text" lable="Nama Mitra" value={namaMitra}
                                                            errorMsg={namaMitraError} onChange={(e) => {
                                                    setNama(e.target.value)
                                                }}/>

                                                <InputField type="number" lable="Telepon"
                                                            value={teleponMitra}
                                                            errorMsg={teleponMitraError} onChange={(e) => {
                                                    setTelepon(e.target.value)
                                                }}/>

                                                <TextArea lable="Alamat" value={alamatMitra}
                                                          errorMsg={alamatMitraError}
                                                          onChange={(e) => {
                                                              setAlamat(e.target.value)
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
        </div>
    );
};

export default EditInputMitra;
