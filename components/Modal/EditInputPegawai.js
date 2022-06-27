import {Dialog, Transition} from '@headlessui/react'
import React, {Fragment, useEffect, useState} from 'react'
import {useDispatch, useSelector} from "react-redux";
import {createPegawai, getPegawai, resetMessage, updatePegawai} from "../../util/store/actions/pegawai";
import {getRoles} from "../../util/store/actions/role";
import {MdEdit} from "@react-icons/all-files/md/MdEdit";
import {base_public_url} from "../../util/store/sagas/base_public_url";
import {calculateYear} from "../../util/converter/date_converter";
import {
    Button,
    Card,
    FormControl,
    FormControlLabel,
    FormHelperText,
    FormLabel,
    Radio,
    RadioGroup,
    TextareaAutosize,
    TextField
} from "@mui/material";
import SaveIcon from '@mui/icons-material/Save';
import {CancelOutlined} from "@mui/icons-material";
import Car from "../../pages/car";

const EditInputPegawai = ({editPegawai, show, setShowModal}) => {
    const {roles} = useSelector(state => state.roles)
    const {errors, isLoading} = useSelector(state => state.pegawai)
    const dispatch = useDispatch()

    const createPegawaiUI = () => {
        dispatch(createPegawai({
            'role_id': roleId,
            'name': name,
            'picture': picture,
            'birthdate': birthdate,
            'gender': gender,
            'address': address,
            'phone': phonenumber,
            'email': email
        }))
        // dispatch(getPegawai())
    }

    const [isOpenSnackbar, setIsOpenSnackbar] = useState(true)
    const [snackbarType, setSnackbarType] = useState("")
    const [snackbarMsg, setSnackbarMsg] = useState("")


    //modal dialog data
    const [name, setName] = useState("")
    const [lastname, setLastname] = useState("")
    const [gender, setGender] = useState(null)
    const [birthdate, setBirthdate] = useState("")
    const [email, setEmail] = useState("")
    const [address, setAddress] = useState("")
    const [phonenumber, setPhonenumber] = useState("")

    const [roleId, setRoleId] = useState("")
    const [picture, setPicture] = useState(null)
    const [pictureUrl, setPictureUrl] = useState("")
    const [isDateFocus, setIsDateFocus] = useState(false)

    const [mode, setMode] = useState("add")

    // error state
    const [fnError, setFnError] = useState("")
    const [genderError, setGenderError] = useState("")
    const [birthdateError, setBirthdateError] = useState("")
    const [emailError, setEmailError] = useState("")
    const [addressError, setAddressError] = useState("")
    const [phoneError, setPhoneError] = useState("")
    const [roleError, setRoleError] = useState("")


    const validate = () => {
        const errorField = {}
        if (name === "")
            errorField.name = "nama tidak boleh kosong!"
        if (gender === null)
            errorField.gender = "gender tidak boleh kosong!"
        if (birthdate === "")
            errorField.birthdate = "tanggal lahir tidak boleh kosong!"
        if (email === "")
            errorField.email = "email tidak boleh kosong!"
        if (address === "")
            errorField.address = "alamat tidak boleh kosong!"
        if (phonenumber === "")
            errorField.phonenumber = "nomor telepon tidak boleh kosong!"
        if (roleId === "")
            errorField.roleId = "jabatan wajib dipilih!"
        if (calculateYear(birthdate) < 18)
            errorField.birthdate = "umur tidak boleh kurang dari 18 tahun!"

        return Object.keys(errorField).length === 0 ? null : errorField;
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const errorField = validate();
        if (errorField) {
            setFnError(errorField.name)
            setGenderError(errorField.gender)
            setBirthdateError(errorField.birthdate)
            setEmailError(errorField.email)
            setAddressError(errorField.address)
            setPhoneError(errorField.phonenumber)
            setRoleError(errorField.roleId)
        } else {
            clearErrorField()
            onModalSave()
        }
    }

    const onModalSave = () => {
        switch (mode) {
            case "add": {
                createPegawaiUI()
                closeDialog()
            }
                break
            case "edit": {
                updatePegawaiUI()
                closeDialog()
            }
                break
            default: {
                closeDialog()
            }
        }

    }


    const [imgSource, setSource] = useState("https://www.weact.org/wp-content/uploads/2016/10/Blank-profile.png")

    const pickImage = () => {

        let input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        input.onchange = (e) => {
            // you can use this method to get file and perform respective operations
            let file = e.target.files[0]
            setPicture(file)
            setSource(URL.createObjectURL(file))
        };
        input.click()
    }

    //end of modal dialog data

    const clearErrorField = () => {
        setFnError("")
        setGenderError("")
        setBirthdateError("")
        setEmailError("")
        setAddressError("")
        setPhoneError("")
        setRoleError("")
    }


    const updatePegawaiUI = () => {

        dispatch(updatePegawai(
            {
                ...editPegawai,
                'name': name,
                'picture': picture, //check picture
                'birthdate': birthdate,
                'gender': gender,
                'address': address,
                'phone': phonenumber,
                'email': email,
            }
        ))
    }


    const clearField = () => {
        setName("")
        setLastname("")
        setRoleId("")
        setPicture(null)
        setBirthdate("")
        setGender(null)
        setAddress("")
        setPhonenumber("")
        setEmail("")

        clearErrorField()
    }

    const closeDialog = () => {
        setShowModal(false)
        dispatch(getPegawai())
        clearField()
    }

    const closeSnackbar = () => {
        setIsOpenSnackbar(false)
        clearField()
        dispatch(resetMessage())
    }


    useEffect(() => { //ambil data untuk list pegawai
        dispatch(getRoles())
        // if (errors == null)
        //     setSnackbarMsg(message)
        // else
        //     setSnackbarMsg(errors)
        if (editPegawai !== null) {
            setMode("edit")
            setName(editPegawai.name)
            setEmail(editPegawai.email)
            setRoleId(editPegawai.role_id)
            setGender(editPegawai.gender)
            setPhonenumber(editPegawai.phone)
            setBirthdate(editPegawai.birthdate)
            setAddress(editPegawai.address)
            setPictureUrl(editPegawai.picture)
            setSource(base_public_url + editPegawai.picture)

            // setEditPegawai(editPegawai)
        }

    }, [])

    // useEffect(() => {
    //     dispatch(getPegawai())
    // }, [isLoading]);


    return (
        <Card>
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
                            <Card
                                className="inline-block w-full max-w-md my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded">
                                <Dialog.Title
                                    as="h3"
                                    className="text-3xl font-medium py-4 text-gray-900 text-center"
                                >
                                    {mode === "add" ? (
                                        <span>
                                                    Tambah Pegawai Baru
                                                </span>
                                    ) : (
                                        <span>
                                            Edit Pegawai
                                            <span className="text-indigo-600">
                                                {` ${editPegawai.id}`}
                                            </span>
                                        </span>
                                    )}
                                </Dialog.Title>
                                <div className="mt-2">
                                    <div className="bg-white sm:px-10">

                                        <div className="flex items-center justify-center">

                                            <div>
                                                <div className="relative inline-block">
                                                    {editPegawai !== null && editPegawai.picture !== null ? (
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

                                            {/*<InputField type="text" lable="Name" value={name}*/}
                                            {/*            errorMsg={fnError} onChange={(e) => {*/}
                                            {/*    setName(e.target.value)*/}
                                            {/*}}/>*/}

                                            <TextField
                                                className="w-full"
                                                variant="standard"
                                                type="text"
                                                label="Nama"
                                                error={fnError !== ""}
                                                helperText={fnError}
                                                value={name}
                                                onChange={(e) => {
                                                    setName(e.target.value)
                                                }}
                                            />
                                            {roles !== null && (

                                                <TextField
                                                    className="w-full"
                                                    select
                                                    label="Jabatan"
                                                    value={roleId}
                                                    onChange={(e) => {
                                                        setRoleId(e.target.value)
                                                    }}
                                                    SelectProps={{
                                                        native: true,
                                                    }}
                                                    error={roleError !== ""}
                                                    helperText={roleError}
                                                    variant="standard"
                                                >
                                                    <option
                                                        value="">

                                                    </option>
                                                    {roles.map((option) => (
                                                        <option key={option.role_id} value={option.role_id}>
                                                            {option.role_name}
                                                        </option>
                                                    ))}
                                                </TextField>

                                            )}

                                            <FormControl sx={{m: 3}} error={genderError !== "" && genderError !== null}
                                                         variant="standard">
                                                <FormLabel>Gender</FormLabel>
                                                <RadioGroup
                                                    name="gender"
                                                    value={gender}
                                                    onChange={(e) => {
                                                        setGender(e.target.value)
                                                    }}
                                                >
                                                    <FormControlLabel value={1} control={<Radio/>} label="Pria"/>
                                                    <FormControlLabel value={0} control={<Radio/>} label="Wanita"/>
                                                </RadioGroup>
                                                <FormHelperText>{genderError}</FormHelperText>
                                            </FormControl>

                                            <TextField
                                                className="w-full"
                                                variant="standard"
                                                type={isDateFocus ? "date" : "text"}
                                                onFocus={() => {
                                                    setIsDateFocus(true)
                                                }}
                                                onBlur={() => {
                                                    setIsDateFocus(false)
                                                }}
                                                label="Tanggal Lahir Pegawai"
                                                error={birthdateError !== ""}
                                                helperText={birthdateError}
                                                value={birthdate}
                                                onChange={(e) => {
                                                    setBirthdate(e.target.value)
                                                }}
                                            />

                                            <TextField
                                                className="w-full"
                                                variant="standard"
                                                type="email"
                                                label="Email"
                                                error={emailError !== ""}
                                                helperText={emailError}
                                                value={email}
                                                onChange={(e) => {
                                                    setEmail(e.target.value)
                                                }}
                                            />

                                            <TextField
                                                className="w-full"
                                                variant="standard"
                                                type="text"
                                                label="Nomor Telepon/HP"
                                                error={phoneError !== ""}
                                                helperText={phoneError}
                                                value={phonenumber}
                                                onChange={(e) => {
                                                    setPhonenumber(e.target.value)
                                                }}
                                            />

                                            <FormControl className="w-full"
                                                         error={addressError !== "" && addressError !== null}
                                                         variant="standard">
                                                <FormLabel>Alamat</FormLabel>
                                                <TextareaAutosize
                                                    className="w-full"
                                                    variant="standard"
                                                    minRows={4}
                                                    error={addressError !== ""}
                                                    helperText={addressError}
                                                    value={address}
                                                    onChange={(e) => {
                                                        setAddress(e.target.value)
                                                    }}
                                                />
                                                <FormHelperText>{genderError}</FormHelperText>
                                            </FormControl>

                                            <div className="pt-8 flex justify-between">
                                                <div className="w-full pr-4">
                                                    <Button
                                                        className="w-full"
                                                        variant="contained" endIcon={<SaveIcon/>}
                                                        onClick={handleSubmit}
                                                    >
                                                        Save
                                                    </Button>
                                                </div>
                                                <div className="w-full pl-4">
                                                    {/*<Button text="Cancel" variant="warning" action={*/}
                                                    {/*      closeDialog*/}
                                                    {/* }/>*/}
                                                    <Button
                                                        className="w-full"
                                                        variant="contained" color="error" endIcon={<CancelOutlined/>}
                                                        onClick={closeDialog}
                                                    >
                                                        Cancel
                                                    </Button>
                                                </div>
                                            </div>

                                        </form>
                                    </div>
                                </div>

                                <div className="mt-4">
                                    {/*tempat button*/}
                                </div>
                            </Card>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition>
        </Card>
    )
}

export default EditInputPegawai