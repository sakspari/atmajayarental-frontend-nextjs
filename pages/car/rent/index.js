import React, {useState} from 'react';
import Button from "../../../components/Button";
import InputField from "../../../components/Input/InputField";
import TextArea from "../../../components/Input/TextArea";
import RadioInput from "../../../components/Input/RadioInput";
import RadioGroup from "../../../components/Input/RadioGroup";

const Index = () => {
    {/*TODO: Sesuaikan error handling dengan data state*/}
    {/*TODO: Tambah foto untuk bagian brosur mobil nanti*/}

    const [firstname, setFirstname] = useState("")
    const [lastname, setLastname] = useState("")
    const [gender, setGender] = useState("")
    const [birthdate, setBirthdate] = useState("")
    const [email, setEmail] = useState("")
    const [address, setAddress] = useState("")
    const [phonenumber, setPhonenumber] = useState("")

    const [assetType, setAssetType] = useState(null)

    // error state
    const [fnError, setFnError] = useState("")
    const [lnError, setLnError] = useState("")
    const [genderError, setGenderError] = useState("")
    const [birthdateError, setBirthdateError] = useState("")
    const [emailError, setEmailError] = useState("")
    const [addressError, setAddressError] = useState("")
    const [phoneError, setPhoneError] = useState("")

    const validate = () => {
        const errors = {}
        if (firstname === "")
            errors.firstname = "firstname tidak boleh kosong!"
        if (gender === "")
            errors.gender = "gender tidak boleh kosong!"
        if (birthdate === "")
            errors.birthdate = "birthdate tidak boleh kosong!"
        if (email === "")
            errors.email = "email tidak boleh kosong!"
        if (address === "")
            errors.address = "address tidak boleh kosong!"
        if (phonenumber === "")
            errors.phonenumber = "nomor telepon tidak boleh kosong!"

        return Object.keys(errors).length === 0 ? null : errors;
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const errors = validate();
        if (errors) {
            setFnError(errors.firstname)
            setGenderError(errors.gender)
            setBirthdateError(errors.birthdate)
            setEmailError(errors.email)
            setAddressError(errors.address)
            setPhoneError(errors.phonenumber)
        } else {
            setFnError("")
            setGenderError("")
            setBirthdateError("")
            setEmailError("")
            setAddressError("")
            setPhoneError("")
        }
    }

    const action = {
        type: "CUSTOMER_SIGN_UP",
    }

    return (
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-lg">

            <div className="bg-white py-8 px-6 shadow rounded-lg sm:px-10">
                <form className="mb-0 space-y-4" onSubmit={handleSubmit}>
                    <header className="text-center font-bold text-2xl mb-12">Rent Car</header>

                    <InputField type="text" lable="Nama Mobil" value={firstname} errorMsg={fnError} onChange={(e) => {
                        setFirstname(e.target.value)
                    }}/>
                    <InputField type="text" lable="Tipe Mobil" value={lastname} errorMsg={lnError} onChange={(e) => {
                        setLastname(e.target.value)
                    }}/>
                    <RadioGroup label="Jenis Transmisi"
                                options={[
                                    {value: "AT", label: "AT"},
                                    {value: "AMT", label: "AMT"},
                                    {value: "CVT", label: "CVT"},
                                    {value: "DVT", label: "DVT"}
                                ]}
                                errorMsg={genderError}
                                onChange={
                                    (e) => setGender(e.target.value)
                                }/>
                    <InputField type="text" lable="Jenis Bahan Bakar" value={lastname} errorMsg={lnError}
                                onChange={(e) => {
                                    setLastname(e.target.value)
                                }}/>
                    <InputField type="number" lable="Volume Bahan Bakar (L)" value={lastname} errorMsg={lnError}
                                onChange={(e) => {
                                    setLastname(e.target.value)
                                }}/>
                    <InputField type="text" lable="Warna Mobil" value={lastname} errorMsg={lnError} onChange={(e) => {
                        setLastname(e.target.value)
                    }}/>
                    <InputField type="number" lable="Kapasitas Penumpang" value={lastname} errorMsg={lnError}
                                onChange={(e) => {
                                    setLastname(e.target.value)
                                }}/>
                    {/*//TODO: CheckboxGroup untuk fasilitas here!!*/}
                    <InputField type="text" lable="Nomor Polisi" value={lastname} errorMsg={lnError} onChange={(e) => {
                        setLastname(e.target.value)
                    }}/>
                    <InputField type="text" lable="Nomor STNK" value={lastname} errorMsg={lnError} onChange={(e) => {
                        setLastname(e.target.value)
                    }}/>
                    <RadioGroup label="Kategori Aset"
                                options={[
                                    {value: "perusahaan", label: "Perusahaan"},
                                    {value: "sewa", label: "Sewaan"}
                                ]}
                                errorMsg={genderError}
                                onChange={
                                    (e) => setAssetType(e.target.value)
                                }/>
                    {assetType === "sewa" ? (
                        <div className="space-y-4">
                            <InputField type="text" lable="Nama Pemilik" value={lastname} errorMsg={lnError}
                                        onChange={(e) => {
                                            setLastname(e.target.value)
                                        }}/>
                            <InputField type="text" lable="NIK Pemilik" value={lastname} errorMsg={lnError}
                                        onChange={(e) => {
                                            setLastname(e.target.value)
                                        }}/>
                            <TextArea lable="Alamat Pemilik" value={address} errorMsg={addressError} onChange={(e) => {
                                setAddress(e.target.value)
                            }}/>
                            <InputField type="text" lable="No. Telepon Pemilik" value={lastname} errorMsg={lnError}
                                        onChange={(e) => {
                                            setLastname(e.target.value)
                                        }}/>
                            <div className="w-full flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-2 mr-0">

                                <InputField type="date" lable="Periode kontrak mulai" value={firstname} errorMsg={fnError} onChange={(e) => {
                                    setFirstname(e.target.value)
                                }}/>
                                <InputField type="date" lable="Periode kontrak selesai" value={lastname} errorMsg={lnError} onChange={(e) => {
                                    setLastname(e.target.value)
                                }}/>

                            </div>
                            <InputField type="date" lable="Service terakhir" value={lastname} errorMsg={lnError} onChange={(e) => {
                                setLastname(e.target.value)
                            }}/>
                        </div>

                    ) : (
                        <div/>
                    )}


                    <div className="pt-8">
                        <Button text="Sign Up"/>
                    </div>

                </form>
            </div>
        </div>
    );
};

export default Index;