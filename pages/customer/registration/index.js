import React, {useEffect, useState} from 'react';
import InputField from "../../../components/Input/InputField";
import TextArea from "../../../components/Input/TextArea";
import RadioGroup from "../../../components/Input/RadioGroup";
import {calculateYear} from "../../../util/converter/date_converter";
import transaportImg from "/assets/drawkit-transport-scene-3.svg";
import FileInput from "../../../components/Input/FileInput";
import {useDispatch, useSelector} from "react-redux";
import Avatar from "../../../components/Avatar";
import {createCustomer, resetMessage} from "../../../util/store/actions/customer";
import {setSnackbar} from "../../../util/store/actions/snackbars";
import CustomSnackbars from "../../../components/Snackbar";
import Image from "next/image";
import {Button} from "@mui/material";

const Index = () => {

    const dispatch = useDispatch()
    const {isLoading, message, errors} = useSelector(state => state.customer)

    const [firstname, setFirstname] = useState("")
    const [lastname, setLastname] = useState("")
    const [gender, setGender] = useState(null)
    const [birthdate, setBirthdate] = useState("")
    const [email, setEmail] = useState("")
    const [address, setAddress] = useState("")
    const [phonenumber, setPhonenumber] = useState("")
    const [pictureProfile, setPictureProfile] = useState(null)
    const [idCard, setIdCard] = useState(null)
    const [sim, setSim] = useState(null)
    const [source, setSource] = useState(null)

    // error state
    const [fnError, setFnError] = useState("")
    const [lnError, setLnError] = useState("")
    const [genderError, setGenderError] = useState("")
    const [birthdateError, setBirthdateError] = useState("")
    const [emailError, setEmailError] = useState("")
    const [addressError, setAddressError] = useState("")
    const [phoneError, setPhoneError] = useState("")
    const [idCardError, setIdCardError] = useState("")
    const [simError, setSimError] = useState("")

    const clearInputField = () => {
        setFirstname("")
        setLastname("")
        setGender(null)
        setBirthdate("")
        setEmail("")
        setAddress("")
        setPhonenumber("")
        setPictureProfile(null)
        setIdCard(null)
        setSim(null)
        setSource(null)
    }

    const clearErrorField = () => {
        setFnError("")
        setLnError("")
        setGenderError("")
        setBirthdateError("")
        setEmailError("")
        setAddressError("")
        setPhoneError("")
        setIdCardError("")
        setSimError("")
    }


    const onDateChange = (e) => {
        setBirthdate(e.target.value)
    }

    const onIdCardChange = (e) => {
        setIdCard(e.target.files[0])
    }

    const onSimCardChange = (e) => {
        setSim(e.target.files[0])
    }

    const validate = () => {
        const errorsField = {}
        if (firstname === "")
            errorsField.firstname = "nama depan tidak boleh kosong!"
        if (gender === null)
            errorsField.gender = "gender wajib dipilih!"
        if (birthdate === "")
            errorsField.birthdate = "tanggal lahir tidak boleh kosong!"
        else if (calculateYear(birthdate) < 17)
            errorsField.birthdate = "Belum cukup umur! (min. 17 tahun)"
        if (email === "")
            errorsField.email = "email tidak boleh kosong!"
        if (address === "")
            errorsField.address = "alamat tidak boleh kosong!"
        if (phonenumber === "")
            errorsField.phonenumber = "nomor telepon tidak boleh kosong!"
        if (idCard === null)
            errorsField.idCard = "kartu identitas tidak boleh kosong!"


        return Object.keys(errorsField).length === 0 ? null : errorsField;
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const errorsField = validate();
        if (errorsField) {
            setFnError(errorsField.firstname)
            setGenderError(errorsField.gender)
            setBirthdateError(errorsField.birthdate)
            setEmailError(errorsField.email)
            setAddressError(errorsField.address)
            setPhoneError(errorsField.phonenumber)
            setIdCardError(errorsField.idCard)
        } else {
            setFnError("")
            setGenderError("")
            setBirthdateError("")
            setEmailError("")
            setAddressError("")
            setPhoneError("")
            setIdCardError("")
            registerCustomer()
        }
    }

    const registerCustomer = () => {
        let customer = {
            'name': lastname !== "" ? (firstname + ' ' + lastname) : firstname,
            'address': address,
            'birthdate': birthdate,
            'gender': gender,
            'email': email,
            'phone': phonenumber,
            'idcard': idCard
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
        dispatch(createCustomer(customer))
    }

    useEffect(() => {
        if (message !== null) {
            dispatch(setSnackbar({
                'snackbarOpen': true,
                'snackbarType': "success",
                'snackbarMessage': message.message,
            }))
            clearInputField()
            clearErrorField()
        }
        if (errors !== null) {

            let msg = JSON.stringify(errors.message)
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
        dispatch(resetMessage())
    }, [isLoading])

    return (
        <div className="bg-indigo-200">
            <CustomSnackbars/>
            <div className="w-full bg-indigo-700 flex items-center justify-center h-20">
                <span className="text-white font-bold text-2xl">Atma Jaya Rental</span>
            </div>
            <div className="flex flex-row-reverse justify-start items-start pb-20">
                <div className={"hidden lg:flex flex-col items-center justify-center mr-20 mt-30"}>
                    <Image
                        src={transaportImg}
                        alt={""}
                        width={800}
                        height={600}
                    />
                    <div className="pt-1w-full flex items-center justify-center bg-indigo-50 py-2 px-4 rounded-full">
                        <span className="w-full text-center">
                            sudah menjadi customer?
                            <a
                                className="pl-1 font-bold text-indigo-700"
                                href={'/'}
                            >
                                Login
                            </a>
                        </span>
                    </div>
                </div>
                <div className="flex-1 mt-8 sm:mx-auto sm:w-full sm:max-w-lg">

                    <div className="bg-white py-8 px-6 shadow shadow-2xl rounded-lg sm:px-10">
                        <form className="mb-0 space-y-4" onSubmit={(e) => {
                            e.preventDefault()
                        }}>
                            <header className="text-center font-bold text-2xl mb-4">Pendaftaran Customer Baru</header>

                            <div className="flex items-center justify-center">
                                <Avatar onPictureChange={(e) => {
                                    setPictureProfile(e.target.files[0])
                                }} source={source}/>
                            </div>

                            <div className="w-full flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-2">

                                <InputField type="text" lable="Nama Depan" value={firstname} errorMsg={fnError}
                                            onChange={(e) => {
                                                setFirstname(e.target.value)
                                            }}/>
                                <InputField type="text" lable="Nama Belakang" value={lastname} errorMsg={lnError}
                                            onChange={(e) => {
                                                setLastname(e.target.value)
                                            }}/>

                            </div>


                            <InputField type="date" lable="Tanggal Lahir" value={birthdate} errorMsg={birthdateError}
                                        onChange={onDateChange}/>

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

                            <InputField type="email" lable="Alamat Email" value={email} errorMsg={emailError}
                                        onChange={(e) => {
                                            setEmail(e.target.value)
                                        }}/>
                            <InputField type="number" lable="Nomor Telepon" value={phonenumber} errorMsg={phoneError}
                                        onChange={(e) => {
                                            setPhonenumber(e.target.value)
                                        }}/>

                            <TextArea lable="Alamat Tinggal" value={address} errorMsg={addressError} onChange={(e) => {
                                setAddress(e.target.value)
                            }}/>

                            <FileInput type="file" lable="Scan Kartu Identitas" errorMsg={idCardError}
                                       acceptType={"image/*"}
                                       onChange={(e) => {
                                           setIdCard(e.target.files[0])
                                       }}/>

                            <FileInput type="file" lable="Scan SIM" errorMsg={simError} acceptType={"image/*"}
                                       onChange={(e) => {
                                           setSim(e.target.files[0])
                                       }}/>

                            <div className={'pt-4 w-full flex items-end justify-center'}>
                                {/*<Button text="Sign Up" action={handleSubmit}/>*/}
                                <Button
                                    onClick={handleSubmit}
                                    variant={'contained'}
                                    disabled={isLoading}
                                >
                                    {isLoading?'Memuat...':'Daftar'}
                                </Button>
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Index;