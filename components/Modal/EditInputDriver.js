import React, {Fragment, useEffect, useState} from 'react';
import {Dialog, Transition} from "@headlessui/react";
import InputField from "../Input/InputField";
import TextArea from "../Input/TextArea";
import Button from "../Button";
import {useDispatch} from "react-redux";
import {createDriver, getDriver, updateDriver} from "../../util/store/actions/driver";
import {base_public_url} from "../../util/store/sagas/base_public_url";
import {MdEdit} from "@react-icons/all-files/md/MdEdit";
import RadioGroup from "../Input/RadioGroup";
import FileInput from "../Input/FileInput";
import CheckBoxGroup from "../Input/CheckBoxGroup";
import {calculateYear} from "../../util/converter/date_converter";

const EditInputDriver = ({editDriver, show, setShowModal}) => {

    const dispatch = useDispatch()
    const [mode, setMode] = useState("add");

    //save & edit state handle
    const [name, setName] = useState("");
    const [picture, setPicture] = useState(null);
    const [address, setAddress] = useState("");
    const [birthdate, setBirthdate] = useState("");
    const [gender, setGender] = useState(null);
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

    const validate = () => {
        const errors = {}
        if (name === "")
            errors.name = "name tidak boleh kosong!"
        if (gender === null)
            errors.gender = "gender tidak boleh kosong!"
        if (birthdate === "")
            errors.birthdate = "tanggal lahir tidak boleh kosong!"
        if (calculateYear(birthdate) < 18)
            errors.birthdate = "umur tidak boleh kurang dari 18 tahun!"
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
        if (editDriver === null) {
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
        }

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
            console.log("there are some errors!")
        } else {
            clearErrorField()
            onModalSave()
        }
    }

    const updateDriverUI = () => {
        let driver = {
            ...editDriver,
            'name': name,
            'address': address,
            'birthdate': birthdate,
            'gender': gender,
            'email': email,
            'phone': phone,
            'language': language,
            'price': price,
            'status': status
        }
        if (picture !== null)
            driver = {
                ...driver,
                'picture': picture,
            }
        if (sim !== null)
            driver = {
                ...driver,
                'file_sim': sim,
            }
        if (suratBebasNapza !== null)
            driver = {
                ...driver,
                'file_bebas_napza': suratBebasNapza,
            }
        if (skJiwa !== null)
            driver = {
                ...driver,
                'file_sk_jiwa': skJiwa
            }
        if (skJasmani !== null)
            driver = {
                ...driver,
                'file_sk_jasmani': skJasmani
            }
        if (skck !== null)
            driver = {
                ...driver,
                'file_skck': skck
            }
        // console.log("DRIVERRR:::")
        // console.log(driver)
        // console.log(picture)

        dispatch(updateDriver(driver))
    }

    const onModalSave = () => {
        switch (mode) {
            case "add": {
                createDriverUI()
                // getAllDriver()
                closeDialog()
            }
                break
            case "edit": {
                updateDriverUI()
                closeDialog()
            }
                break
            default: {
                closeDialog()
            }
        }

    }

    const clearField = () => {
        setName("")
        setPicture(null)
        setAddress("")
        setBirthdate("")
        setGender(null)
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
        // getAllDriver()
        setShowModal(false)
        clearField()
        dispatch(getDriver())
    }

    const [imgSource, setSource] = useState("https://www.weact.org/wp-content/uploads/2016/10/Blank-profile.png")

    const pickImage = () => {

        let input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        input.onchange = (e) => {
            // you can use this method to get file and perform respective operations
            let file = e.target.files[0]
            setPicture(e.target.files[0])
            setSource(URL.createObjectURL(file))
        };
        input.click()

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

    useEffect(() => {
        getAllDriver()
        console.log(editDriver)
        if (editDriver !== null) {
            setMode("edit")
            setName(editDriver.name)
            setAddress(editDriver.address)
            setBirthdate(editDriver.birthdate)
            setGender(editDriver.gender)
            setEmail(editDriver.email)
            setPhone(editDriver.phone)
            setLanguage(editDriver.language)
            setPrice(editDriver.price)
            setSim(editDriver.file_sim)
            setSuratBebasNapza(editDriver.file_bebas_napza)
            setSkJiwa(editDriver.file_sk_jiwa)
            setSkJasmani(editDriver.file_sk_jasmani)
            setSkck(editDriver.file_skck)
            setStatus(editDriver.status)
            if (editDriver.picture !== null && editDriver !== "")
                setSource(base_public_url + editDriver.picture)
        }
    }, []);

    const handleBahasaChange = (lang, target) => {
        if (lang !== "") {
            setLanguage(language + lang)
            console.log(language+lang)
        }
        else {
            setLanguage(language.replace(target, lang))

            console.log(language.replace(target, lang))
        }
    }

    return (
        <div>
            <Transition appear show={show} as={Fragment}>
                <Dialog
                    as="div"
                    className="fixed inset-0 z-10 overflow-y-auto"
                    onClose={() => {
                        setShowModal(false)
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
                                        Tambah Driver Baru
                                    </span>
                                    ) : (
                                        <span>
                                        Edit Driver
                                        <span className="text-indigo-600">
                                            {` ${editDriver.id}`}
                                        </span>
                                    </span>
                                    )}
                                </Dialog.Title>
                                <div className="mt-2">
                                    <div className="bg-white  rounded-lg sm:px-10">

                                        <div className="flex items-center justify-center">

                                            <div>
                                                <div className="relative inline-block">
                                                    {editDriver !== null && editDriver.picture !== null ? (
                                                        <img
                                                            className="w-28 h-28 rounded-full border-2 border-indigo-700 object-cover"
                                                            alt="profile picture"
                                                            src={imgSource}
                                                        />
                                                    ) : (
                                                        <img
                                                            className="w-28 h-28 rounded-full border-2 border-indigo-700 object-cover"
                                                            alt="profile picture"
                                                            src={imgSource}
                                                        />
                                                    )}

                                                    {/*<div className="absolute inset-0 bg-indigo-300 flex items-center justify-center">*/}
                                                    <button
                                                        onClick={pickImage}
                                                        className="w-7 h-7 rounded-full bg-indigo-700 border-2 border-white absolute bottom-0 right-0 flex items-center justify-center"
                                                    >
                                                        <MdEdit color="white"/>
                                                    </button>
                                                    {/*</div>*/}
                                                </div>
                                            </div>
                                        </div>

                                        <form className="mb-0 space-y-4 w-full" onSubmit={handleSubmit}>

                                            <InputField type="text" lable="Name" value={name}
                                                        errorMsg={nameError} onChange={(e) => {
                                                setName(e.target.value)
                                            }}/>

                                            <RadioGroup
                                                label="Gender"
                                                value={gender}
                                                options={[
                                                    {
                                                        value: 1,
                                                        label: "Pria"
                                                    },
                                                    {
                                                        value: 0,
                                                        label: "Wanita"
                                                    }

                                                ]}
                                                errorMsg={genderError}
                                                onChange={(e) => {
                                                    setGender(e.target.value)
                                                }}
                                            />

                                            <CheckBoxGroup
                                                label="Bahasa"
                                                value={language}
                                                options={[
                                                    {
                                                        value: "id",
                                                        label: "Bahasa Indonesia"
                                                    },
                                                    {
                                                        value: "en",
                                                        label: "English"
                                                    }

                                                ]}
                                                errorMsg={languageError}
                                                onChange={handleBahasaChange}
                                            />

                                            <InputField type="date" lable="Birthdate" value={birthdate}
                                                        errorMsg={birthdateError} onChange={(e) => {
                                                setBirthdate(e.target.value)
                                            }}/>

                                            <InputField type="email" lable="Email address" value={email}
                                                        errorMsg={emailError} onChange={(e) => {
                                                setEmail(e.target.value)
                                            }}/>

                                            <InputField type="number" lable="Nomor Telepon" value={phone}
                                                        errorMsg={phoneError} onChange={(e) => {
                                                setPhone(e.target.value)
                                            }}/>

                                            <TextArea lable="Address" value={address} errorMsg={addressError}
                                                      onChange={(e) => {
                                                          setAddress(e.target.value)
                                                      }}/>

                                            <InputField type="number" lable="Tarif (IDR)" value={price}
                                                        errorMsg={priceError} onChange={(e) => {
                                                setPrice(e.target.value)
                                            }}/>

                                            <FileInput type="file" lable="Scan SIM" errorMsg={simError}
                                                       acceptType={"image/*"}
                                                       onChange={(e) => {
                                                           setSim(e.target.files[0])
                                                       }}/>

                                            {editDriver !== null && (
                                                <div>
                                                    <img
                                                        className="w-full h-32 object-center border-2 border-indigo-700 object-cover"
                                                        alt="profile picture"
                                                        src={base_public_url + editDriver.file_sim}
                                                    />
                                                    <span>
                                                        see more
                                                        <a
                                                            className="text-indigo-500 font-semibold"
                                                            href={base_public_url + editDriver.file_sim}
                                                            target='_blank'
                                                            rel="noopener noreferrer">
                                                            {` here`}
                                                        </a>
                                                    </span>
                                                </div>
                                            )}

                                            <FileInput type="file" lable="Surat Keterangan Bebas Napza"
                                                       errorMsg={suratBebasNapzaError} acceptType={".pdf,.doc,.docx"}
                                                       onChange={(e) => {
                                                           setSuratBebasNapza(e.target.files[0])
                                                       }}/>

                                            {editDriver !== null && (
                                                <div>
                                                    <span>
                                                        file
                                                        <a
                                                            className="text-indigo-500 font-semibold"
                                                            href={base_public_url + editDriver.file_bebas_napza}
                                                            target='_blank'
                                                            rel="noopener noreferrer">
                                                            {` surat bebas napza`}
                                                        </a>
                                                    </span>
                                                </div>
                                            )}

                                            <FileInput type="file" lable="Surat Kesehatan Jiwa" errorMsg={skJiwaError}
                                                       acceptType={".pdf,.doc,.docx"}
                                                       onChange={(e) => {
                                                           setSkJiwa(e.target.files[0])
                                                       }}/>

                                            {editDriver !== null && (
                                                <div>
                                                    <span>
                                                        file
                                                        <a
                                                            className="text-indigo-500 font-semibold"
                                                            href={base_public_url + editDriver.file_sk_jiwa}
                                                            target='_blank'
                                                            rel="noopener noreferrer">
                                                            {` surat kesehatan jiwa`}
                                                        </a>
                                                    </span>
                                                </div>
                                            )}

                                            <FileInput type="file" lable="Surat Kesehatan Jasmani"
                                                       errorMsg={skJasmaniError} acceptType={".pdf,.doc,.docx"}
                                                       onChange={(e) => {
                                                           setSkJasmani(e.target.files[0])
                                                       }}/>

                                            {editDriver !== null && (
                                                <div>
                                                    <span>
                                                        file
                                                        <a
                                                            className="text-indigo-500 font-semibold"
                                                            href={base_public_url + editDriver.file_sk_jasmani}
                                                            target='_blank'
                                                            rel="noopener noreferrer">
                                                            {` surat kesehatan jasmani`}
                                                        </a>
                                                    </span>
                                                </div>
                                            )}

                                            <FileInput type="file" lable="SKCK" errorMsg={skckError}
                                                       acceptType={".pdf,.doc,.docx"}
                                                       onChange={(e) => {
                                                           setSkck(e.target.files[0])
                                                       }}/>

                                            {editDriver !== null && (
                                                <div>
                                                    <span>
                                                        file
                                                        <a
                                                            className="text-indigo-500 font-semibold"
                                                            href={base_public_url + editDriver.file_skck}
                                                            target='_blank'
                                                            rel="noopener noreferrer">
                                                            {` skck`}
                                                        </a>
                                                    </span>
                                                </div>
                                            )}

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

export default EditInputDriver;
