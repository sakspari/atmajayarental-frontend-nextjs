import React, {useEffect, useState} from 'react';
import Layout from "../../components/Layout";
import Button from "../../components/Button";
import {useRouter} from "next/router";
import CustomSnackbars from "../../components/Snackbar";
import Avatar from "../../components/Avatar";
import InputField from "../../components/Input/InputField";
import TextArea from "../../components/Input/TextArea";
import RadioGroup from "../../components/Input/RadioGroup";
import FileInput from "../../components/Input/FileInput";
import {useDispatch, useSelector} from "react-redux";
import {calculateYear, convertDate, dateToPassword} from "../../util/converter/date_converter";
import {resetMessage as resetMsgCustomer, updateCustomer} from "../../util/store/actions/customer";
import {setSnackbar} from "../../util/store/actions/snackbars";
import CheckBoxGroup from "../../components/Input/CheckBoxGroup";
import {logout} from "../../util/store/actions/auth";
import {resetMessage as resetMsgPegawai, updatePegawai} from "../../util/store/actions/pegawai";
import IconButton from "@mui/material/IconButton";
import {PencilIcon} from "@heroicons/react/outline";
import {BiPencil} from "@react-icons/all-files/bi/BiPencil";
import {BiCrosshair} from "@react-icons/all-files/bi/BiCrosshair";
import {FaCross} from "@react-icons/all-files/fa/FaCross";
import {MdCancel} from "@react-icons/all-files/md/MdCancel";
import {CancelOutlined} from "@mui/icons-material";
import {InputAdornment} from "@material-ui/core";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";
import {OutlinedInput} from "@mui/material";

const Update = () => {
    const router = useRouter()
    const dispatch = useDispatch()
    const [isUpdate, setIsupdate] = useState(false)
    const [showPassword, setShowPassword] = useState(false)

    const {isLoading, message, errors} = useSelector(state => state.customer)
    const isLoadingCustomer = useSelector(state => state.customer.isLoading)
    const messageCustomer = useSelector(state => state.customer.message)
    const errorsCustomer = useSelector(state => state.customer.errors)
    const isLoadingPegawai = useSelector(state => state.pegawai.isLoading)
    const messagePegawai = useSelector(state => state.pegawai.message)
    const errorsPegawai = useSelector(state => state.pegawai.errors)
    // const {isLoading, message, errors} = useSelector(state => state.pegawai)
    const {currentUser, userType} = useSelector(state => state.auth)

    const [updateAuth, setUpdateAuth] = useState("")

    const [name, setName] = useState("")
    const [gender, setGender] = useState(null)
    const [birthdate, setBirthdate] = useState("")
    const [email, setEmail] = useState("")
    const [address, setAddress] = useState("")
    const [phonenumber, setPhonenumber] = useState("")
    const [pictureProfile, setPictureProfile] = useState(null)
    const [idCard, setIdCard] = useState(null)
    const [sim, setSim] = useState(null)
    const [source, setSource] = useState(null)
    const [oldPassword, setOldPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    // error state
    const [nameError, setNameError] = useState("")
    const [genderError, setGenderError] = useState("")
    const [birthdateError, setBirthdateError] = useState("")
    const [emailError, setEmailError] = useState("")
    const [addressError, setAddressError] = useState("")
    const [phoneError, setPhoneError] = useState("")
    const [idCardError, setIdCardError] = useState("")
    const [simError, setSimError] = useState("")
    const [oldPasswordError, setOldPasswordError] = useState("")
    const [newPasswordError, setNewPasswordError] = useState("")
    const [confirmPasswordError, setConfirmPasswordError] = useState("")


    const clearInputField = () => {
        setName("")
        setGender(null)
        setBirthdate("")
        setEmail("")
        setAddress("")
        setPhonenumber("")
        setPictureProfile(null)
        setIdCard(null)
        setSim(null)
        setSource(null)
        setOldPassword("")
        setNewPassword("")
        setConfirmPassword("")
    }

    const clearErrorField = () => {
        setNameError("")
        setGenderError("")
        setBirthdateError("")
        setEmailError("")
        setAddressError("")
        setPhoneError("")
        setIdCardError("")
        setSimError("")
        setOldPasswordError("")
        setNewPasswordError("")
        setConfirmPasswordError("")
    }


    const onDateChange = (e) => {
        setBirthdate(e.target.value)
        console.log(convertDate(e.target.value))
        console.log(dateToPassword(e.target.value))
    }

    const onIdCardChange = (e) => {
        setIdCard(e.target.files[0])
    }

    const onSimCardChange = (e) => {
        setSim(e.target.files[0])
    }

    const logoutUser = () => {
        dispatch(logout())
        router.push('../')
    }

    const validate = () => {
        const errorsField = {}
        if (name === "")
            errorsField.name = "Nama tidak boleh kosong!"
        if (gender === "")
            errorsField.gender = "gender tidak boleh kosong!"
        if (birthdate === "")
            errorsField.birthdate = "birthdate tidak boleh kosong!"
        else if (calculateYear(birthdate) < 18 && userType !== "CUSTOMER")
            errorsField.birthdate = "Belum cukup umur! (min. 18 tahun)"
        if (email === "")
            errorsField.email = "email tidak boleh kosong!"
        if (address === "")
            errorsField.address = "address tidak boleh kosong!"
        if (phonenumber === "")
            errorsField.phonenumber = "nomor telepon tidak boleh kosong!"
        // if (idCard === null)
        //     errorsField.idCard = "kartu identitas tidak boleh kosong!"
        if (updateAuth === "yes") {
            if (oldPassword === "")
                errorsField.oldPassword = "password lama wajib diisi"
            if (newPassword === "")
                errorsField.newPassword = "password baru tidak boleh kosong"
            else if (newPassword.length < 6)
                errorsField.newPassword = "panjang password minimal 6 karakter!"
            if (newPassword !== confirmPassword)
                errorsField.confirmPassword = "konfirmasi password baru tidak sesuai!"
        }


        return Object.keys(errorsField).length === 0 ? null : errorsField;
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const errorsField = validate();
        if (errorsField) {
            setNameError(errorsField.name)
            setGenderError(errorsField.gender)
            setBirthdateError(errorsField.birthdate)
            setEmailError(errorsField.email)
            setAddressError(errorsField.address)
            setPhoneError(errorsField.phonenumber)
            setIdCardError(errorsField.idCard)
            setOldPasswordError(errorsField.oldPassword)
            setNewPasswordError(errorsField.newPassword)
            setConfirmPasswordError(errorsField.confirmPassword)
        } else {
            if (userType === "CUSTOMER")
                updateCustomerUI()
            else
                updatePegawaiUI()
            setNameError("")
            setGenderError("")
            setBirthdateError("")
            setEmailError("")
            setAddressError("")
            setPhoneError("")
            setIdCardError("")
            setOldPasswordError("")
            setNewPasswordError("")
            setConfirmPasswordError("")
        }
    }

    const updatePegawaiUI = () => {
        let pegawai = {
            ...currentUser,
            'name': name,
            'birthdate': birthdate,
            'gender': gender,
            'address': address,
            'phone': phonenumber,
            'email': email,
        }

        if (pictureProfile !== null)
            pegawai = {
                ...pegawai,
                'picture': pictureProfile
            }

        if (updateAuth === "yes" && oldPassword !== "" && newPassword !== "")
            pegawai = {
                ...pegawai,
                'old_password': oldPassword,
                'password': newPassword,
            }

        dispatch(updatePegawai(
            pegawai
        ))
    }

    const updateCustomerUI = () => {
        let customer = {
            ...currentUser,
            'name': name,
            'address': address,
            'birthdate': birthdate,
            'gender': gender,
            'email': email,
            'phone': phonenumber,

        }

        if (pictureProfile !== null)
            customer = {
                ...customer,
                'picture': pictureProfile
            }

        if (sim !== null)
            customer = {
                ...customer,
                'sim': sim
            }

        if (idCard !== null)
            customer = {
                ...customer,
                'idcard': idCard
            }

        if (updateAuth === "yes" && oldPassword !== "" && newPassword !== "")
            customer = {
                ...customer,
                'old_password': oldPassword,
                'password': newPassword,
            }
        dispatch(updateCustomer(customer))
    }

    useEffect(() => {
        if (messageCustomer !== null) {
            dispatch(setSnackbar({
                'snackbarOpen': true,
                'snackbarType': "success",
                'snackbarMessage': messageCustomer.message,
            }))
            clearInputField()
            clearErrorField()
            // dispatch(getUserLogin(currentUser))
            // setTimeout(logoutUser(), 2000)
        }
        if (errorsCustomer !== null) {

            let msg = JSON.stringify(errorsCustomer.message)
            msg = msg.replace("{", "")
            msg = msg.replace("}", "")
            msg = msg.replace("[", "")
            msg = msg.replace("]", "")
            msg = msg.replace('"', "")
            msg = msg.replace('"', "")

            dispatch(setSnackbar({
                'snackbarOpen': true,
                'snackbarType': "error",
                'snackbarMessage': msg,
            }))

            // dispatch(resetErrors())
        }

        dispatch(resetMsgCustomer())
    }, [isLoadingCustomer])

    const [imgSource, setImgSource] = useState("https://www.weact.org/wp-content/uploads/2016/10/Blank-profile.png")

    const pickImage = () => {

        let input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        input.onchange = (e) => {
            // you can use this method to get file and perform respective operations
            let file = e.target.files[0]
            setPicture(file)
            setImgSource(URL.createObjectURL(file))
        };
        input.click()
    }

    useEffect(() => {
        if (messagePegawai !== null) {
            dispatch(setSnackbar({
                'snackbarOpen': true,
                'snackbarType': "success",
                'snackbarMessage': messagePegawai.message,
            }))
            clearInputField()
            clearErrorField()
            // dispatch(getUserLogin(currentUser))
            // setTimeout(logoutUser(), 2000)
        }
        if (errorsPegawai !== null) {

            let msg = JSON.stringify(errorsPegawai.message)
            msg = msg.replace("{", "")
            msg = msg.replace("}", "")
            msg = msg.replace("[", "")
            msg = msg.replace("]", "")
            msg = msg.replace('"', "")
            msg = msg.replace('"', "")

            dispatch(setSnackbar({
                'snackbarOpen': true,
                'snackbarType': "error",
                'snackbarMessage': msg,
            }))

            // dispatch(resetErrors())
        }

        dispatch(resetMsgPegawai())
    }, [isLoadingPegawai])


    useEffect(() => {
        if (currentUser !== null) {
            setName(currentUser.name)
            setGender(currentUser.gender)
            setBirthdate(currentUser.birthdate)
            setEmail(currentUser.email)
            setAddress(currentUser.address)
            setPhonenumber(currentUser.phone)
            setPictureProfile(currentUser.profile)
            // setIdCard(null)
            // setSim(null)
            setSource(currentUser.picture)
            console.log(currentUser.picture)
        }
    }, [currentUser])

    return (
        <Layout>
            <CustomSnackbars/>
            {/*<Button text="< Kembali" action={*/}
            {/*    () => {*/}
            {/*        router.push('/profile')*/}
            {/*    }*/}
            {/*}/>*/}
            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-lg bg-indigo">
                <CustomSnackbars/>
                <div className="bg-white py-8 px-6 shadow-2xl rounded-lg sm:px-10">
                    <form className="mb-0 space-y-4 " onSubmit={(e) => {
                        e.preventDefault()
                    }}>
                        <header className="text-center font-bold text-2xl mb-4">
                            {`${isUpdate ? "Update " : ""}Profile`}
                            <IconButton onClick={() => {
                                if (isUpdate) {
                                    router.push('/dashboard')
                                }
                                setIsupdate(!isUpdate)
                            }}>
                                {!isUpdate ? <BiPencil color={'green'} className={'ml-2'}/> :
                                    <CancelOutlined color='error' className={'ml-2'}/>}
                            </IconButton>
                        </header>

                        <div className="flex flex-col items-center justify-center">
                            <Avatar onPictureChange={(e) => {
                                setPictureProfile(e.target.files[0])
                            }} source={source}
                                    isEditable={isUpdate}
                            />

                            {currentUser !== null && (
                                <span className="font-semibold text-indigo-500">{currentUser.id}</span>
                            )}
                        </div>
                        <InputField type="text" lable="Name" value={name} errorMsg={nameError}
                                    disable={!isUpdate}
                                    onChange={(e) => {
                                        setName(e.target.value)
                                    }}/>


                        <InputField type="date" lable="Birthdate" value={birthdate} errorMsg={birthdateError}
                                    disable={!isUpdate}
                                    onChange={onDateChange}/>

                        <RadioGroup
                            label="Gender"
                            disable={!isUpdate}
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


                        <InputField type="number" lable="Nomor Telepon" value={phonenumber} errorMsg={phoneError}
                                    disable={!isUpdate}
                                    onChange={(e) => {
                                        setPhonenumber(e.target.value)
                                    }}/>

                        <TextArea lable="Address"
                                  value={address}
                                  disable={!isUpdate}
                                  errorMsg={addressError}
                                  onChange={(e) => {
                                      setAddress(e.target.value)
                                  }}/>

                        {userType === "CUSTOMER" && (
                            <div className="flex space-y-4 flex-col">
                                <FileInput type="file" lable="Scan Kartu Identitas" errorMsg={idCardError}
                                           acceptType={"image/*"}
                                           disable={!isUpdate}
                                           onChange={(e) => {
                                               setIdCard(e.target.files[0])
                                           }}/>

                                <FileInput type="file" lable="Scan SIM" errorMsg={simError} acceptType={"image/*"}
                                           disable={!isUpdate}
                                           onChange={(e) => {
                                               setSim(e.target.files[0])
                                           }}/>
                            </div>
                        )}

                        <CheckBoxGroup
                            label="Update Email or Password?"
                            value={updateAuth}
                            options={[
                                {
                                    value: "yes",
                                    label: "yes"
                                },
                            ]}
                            // errorMsg={languageError}
                            onChange={(e) => {
                                setUpdateAuth(e)
                            }}
                        />

                        {updateAuth === "yes" && (
                            <div className="flex space-y-1 flex-col">
                                <InputField type="email" lable="Email address" value={email} errorMsg={emailError}
                                            disable={!isUpdate}
                                            onChange={(e) => {
                                                setEmail(e.target.value)
                                            }}/>

                                <div className={'h-2'}/>
                                <label htmlFor="input-field" className="block text-sm font font-medium text-gray-700 ">
                                    Pasword lama
                                </label>
                                <OutlinedInput
                                    className="w-full"
                                    value={oldPassword}
                                    disabled={!isUpdate}
                                    onChange={(e) => setOldPassword(e.target.value)}
                                    label="current password"
                                    variant="outlined"
                                    size={'small'}
                                    type={showPassword ? 'text' : 'password'}
                                    required
                                    error={oldPasswordError !== ""}
                                    helperText={oldPasswordError}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={() => {
                                                    setShowPassword(!showPassword)
                                                }}
                                                onMouseDown={(e) => {
                                                    e.preventDefault()
                                                }}
                                                edge="end"
                                            >
                                                {showPassword ? <VisibilityOff/> : <Visibility/>}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                />

                                <div className={'h-2'}/>
                                <label htmlFor="input-field" className="block text-sm font font-medium text-gray-700 ">
                                    Pasword baru
                                </label>
                                <OutlinedInput
                                    className="w-full"
                                    value={newPassword}
                                    disabled={!isUpdate}
                                    size={'small'}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    label="new password"
                                    variant="outlined"
                                    type={showPassword ? 'text' : 'password'}
                                    required
                                    error={newPasswordError !== ""}
                                    helperText={newPasswordError}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={() => {
                                                    setShowPassword(!showPassword)
                                                }}
                                                onMouseDown={(e) => {
                                                    e.preventDefault()
                                                }}
                                                edge="end"
                                            >
                                                {showPassword ? <VisibilityOff/> : <Visibility/>}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                />

                                <div className={'h-2'}/>
                                <label htmlFor="input-field" className="block text-sm font font-medium text-gray-700 ">
                                    Konfirmasi password
                                </label>
                                <OutlinedInput
                                    className="w-full"
                                    value={confirmPassword}
                                    size={'small'}
                                    disabled={!isUpdate}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    label="confirm new password"
                                    variant="outlined"
                                    type={showPassword ? 'text' : 'password'}
                                    required
                                    error={confirmPasswordError !== ""}
                                    helperText={confirmPasswordError}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={() => {
                                                    setShowPassword(!showPassword)
                                                }}
                                                onMouseDown={(e) => {
                                                    e.preventDefault()
                                                }}
                                                edge="end"
                                            >
                                                {showPassword ? <VisibilityOff/> : <Visibility/>}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                />

                            </div>
                        )}

                        {isUpdate && (
                            <div className={'w-full flex items-center justify-center'}>
                                <Button text="Save" action={handleSubmit}/>
                            </div>
                        )}

                    </form>
                </div>
            </div>
        </Layout>
    );
};

export default Update;