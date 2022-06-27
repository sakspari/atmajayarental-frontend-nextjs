import React, {Fragment, useEffect, useState} from 'react';
import {Dialog, Transition} from "@headlessui/react";
import InputField from "../Input/InputField";
import TextArea from "../Input/TextArea";
import RadioGroup from "../Input/RadioGroup";
import Button from "../Button";
import {useDispatch, useSelector} from "react-redux";
import {createMobil, getMobil, updateMobil} from "../../util/store/actions/mobil";
import {MdEdit} from "@react-icons/all-files/md/MdEdit";
import {base_public_url} from "../../util/store/sagas/base_public_url";

const EditInputMobil = ({editMobil, show, setShowModal}) => {

    const {all_mitra} = useSelector(state => state.mitra)
    const dispatch = useDispatch()
    const [mode, setMode] = useState("add")

    const [pictureUrl, setPictureUrl] = useState("")

    const [idMitra, setIdMitra] = useState("")
    const [platMobil, setPlatMobil] = useState("")
    const [noStnk, setNoStnk] = useState("")
    const [namaMobil, setNamaMobil] = useState("")
    const [tipeMobil, setTipeMobil] = useState("")
    const [jenisAset, setJenisAset] = useState("")
    const [jenisTransmisi, setJenisTransmisi] = useState("")
    const [jenisBahanBakar, setJenisBahanBakar] = useState("")
    const [volumeBahanBakar, setVolumeBahanBakar] = useState("")
    const [warnaMobil, setWarnaMobil] = useState("")
    const [fasilitasMobil, setFasilitasMobil] = useState("")
    const [volumeBagasi, setVolumeBagasi] = useState("")
    const [kapasitasPenumpang, setKapasitasPenumpang] = useState("")
    const [hargaSewa, setHargaSewa] = useState("")
    const [servisTerakhir, setServisTerakhir] = useState("")
    const [fotoMobil, setFotoMobil] = useState(null)
    const [periodeMulai, setPeriodeMulai] = useState("")
    const [periodeSelesai, setPeriodeSelesai] = useState("")

    const [idMitraError, setIdMitraError] = useState("")
    const [platMobilError, setPlatMobilError] = useState("")
    const [noStnkError, setNoStnkError] = useState("")
    const [namaMobilError, setNamaMobilError] = useState("")
    const [tipeMobilError, setTipeMobilError] = useState("")
    const [jenisAsetError, setJenisAsetError] = useState("")
    const [jenisTransmisiError, setJenisTransmisiError] = useState("")
    const [jenisBahanBakarError, setJenisBahanBakarError] = useState("")
    const [volumeBahanBakarError, setVolumeBahanBakarError] = useState("")
    const [warnaMobilError, setWarnaMobilError] = useState("")
    const [fasilitasMobilError, setFasilitasMobilError] = useState("")
    const [volumeBagasiError, setVolumeBagasiError] = useState("")
    const [kapasitasPenumpangError, setKapasitasPenumpangError] = useState("")
    const [hargaSewaError, setHargaSewaError] = useState("")
    const [servisTerakhirError, setServisTerakhirError] = useState("")
    const [fotoMobilError, setFotoMobilError] = useState(null)
    const [periodeMulaiError, setPeriodeMulaiError] = useState("")
    const [periodeSelesaiError, setPeriodeSelesaiError] = useState("")

    const [imgSource, setSource] = useState("https://www.nicepng.com/png/detail/403-4032657_gray-car-transparent-car-icon-vector.png")


    const createMobilUI = () => {
        dispatch(createMobil({
            'id_mitra': idMitra,
            'plat_mobil': platMobil,
            'no_stnk': noStnk,
            'nama_mobil': namaMobil,
            'tipe_mobil': tipeMobil,
            'jenis_aset': jenisAset,
            'jenis_transmisi': jenisTransmisi,
            'jenis_bahan_bakar': jenisBahanBakar,
            'volume_bahan_bakar': volumeBahanBakar,
            'warna_mobil': warnaMobil,
            'fasilitas_mobil': fasilitasMobil,
            'volume_bagasi': volumeBagasi,
            'kapasitas_penumpang': kapasitasPenumpang,
            'harga_sewa': hargaSewa,
            'servis_terakhir': servisTerakhir,
            'foto_mobil': fotoMobil,
            'periode_mulai': periodeMulai,
            'periode_selesai': periodeSelesai
        }))

    }

    useEffect(() => {
        if (editMobil !== null) {
            setMode("edit")
            setIdMitra(editMobil.id_mitra)
            setPlatMobil(editMobil.plat_mobil)
            setNoStnk(editMobil.no_stnk)
            setNamaMobil(editMobil.nama_mobil)
            setTipeMobil(editMobil.tipe_mobil)
            setJenisAset(editMobil.jenis_aset)
            setJenisTransmisi(editMobil.jenis_transmisi)
            setJenisBahanBakar(editMobil.jenis_bahan_bakar)
            setVolumeBahanBakar(editMobil.volume_bahan_bakar)
            setWarnaMobil(editMobil.warna_mobil)
            setFasilitasMobil(editMobil.fasilitas_mobil)
            setVolumeBagasi(editMobil.volume_bagasi)
            setKapasitasPenumpang(editMobil.kapasitas_penumpang)
            setHargaSewa(editMobil.harga_sewa)
            setServisTerakhir(editMobil.servis_terakhir)
            if (editMobil.foto_mobil !== "" && editMobil.foto_mobil !== null) {
                setPictureUrl(editMobil.foto_mobil)
                setSource(base_public_url+editMobil.foto_mobil)
            }
            setPeriodeMulai(editMobil.periode_mulai)
            setPeriodeSelesai(editMobil.periode_selesai)
        }
    }, []);

    const handleSubmit = (e) => {

        e.preventDefault()
        const errors = validate();
        if (errors) {
            setPlatMobilError(errors.plat_mobil)
            setNoStnkError(errors.no_stnk)
            setNamaMobilError(errors.nama_mobil)
            setTipeMobilError(errors.tipe_mobil)
            setJenisAsetError(errors.jenis_aset)
            setJenisTransmisiError(errors.jenis_transmisi)
            setHargaSewaError(errors.harga_sewa)
        } else {
            clearErrorField()
            onModalSave()
        }
    }

    const onModalSave = () => {
        switch (mode) {
            case "add": {
                createMobilUI()
                // getAllMobil()
                closeDialog()
            }
                break
            case "edit": {
                updateMobilUI()
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
        setPlatMobilError("")
        setNoStnkError("")
        setNamaMobilError("")
        setTipeMobilError("")
        setJenisAsetError("")
        setJenisTransmisiError("")
        setHargaSewaError("")
    }


    const getAllMobil = () => {
        dispatch(getMobil())
    }

    const clearField = () => {
        setIdMitra("")
        setPlatMobil("")
        setNoStnk("")
        setNamaMobil("")
        setTipeMobil("")
        setJenisAset("")
        setJenisTransmisi("")
        setJenisBahanBakar("")
        setVolumeBahanBakar("")
        setWarnaMobil("")
        setFasilitasMobil("")
        setVolumeBagasi("")
        setKapasitasPenumpang("")
        setHargaSewa("")
        setServisTerakhir("")
        setFotoMobil(null)
        setPeriodeMulai("")
        setPeriodeSelesai("")

        clearErrorField()
    }

    const pickImage = () => {

        let input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        input.onchange = (e) => {
            // you can use this method to get file and perform respective operations
            let file = e.target.files[0]
            setFotoMobil(e.target.files[0])
            setSource(URL.createObjectURL(file))
        };
        input.click()

    }

    const validate = () => {
        const errors = {}
        if (platMobil === "")
            errors.plat_mobil = "Plat Mobil tidak boleh kosong!"
        if (noStnk === "")
            errors.no_stnk = "No STNK tidak boleh kosong!"
        if (namaMobil === "")
            errors.nama_mobil = "Nama Mobil tidak boleh kosong!"
        if (tipeMobil === "")
            errors.tipe_mobil = "Tipe Mobil tidak boleh kosong!"
        if (jenisAset === "")
            errors.jenis_aset = "Jenis Asset tidak boleh kosong!"
        if (jenisTransmisi === "")
            errors.jenis_transmisi = "Jenis tansmisi tidak boleh kosong!"
        if (hargaSewa === "")
            errors.harga_sewa = "Harga sewa tidak boleh kosong!"

        return Object.keys(errors).length === 0 ? null : errors;
    }

    const closeDialog = () => {
        setShowModal(false)
        clearField()
        dispatch(getMobil())
    }

    const updateMobilUI = () => {

        dispatch(updateMobil(
            {
                ...editMobil,
                'id_mitra': idMitra,
                'plat_mobil': platMobil,
                'no_stnk': noStnk,
                'nama_mobil': namaMobil,
                'tipe_mobil': tipeMobil,
                'jenis_aset': jenisAset,
                'jenis_transmisi': jenisTransmisi,
                'jenis_bahan_bakar': jenisBahanBakar,
                'volume_bahan_bakar': volumeBahanBakar,
                'warna_mobil': warnaMobil,
                'fasilitas_mobil': fasilitasMobil,
                'volume_bagasi': volumeBagasi,
                'kapasitas_penumpang': kapasitasPenumpang,
                'harga_sewa': hargaSewa,
                'servis_terakhir': servisTerakhir,
                'foto_mobil': fotoMobil,
                'periode_mulai': periodeMulai,
                'periode_selesai': periodeSelesai
            }
        ))
    }


    return (
        <div>
            <Transition appear show={show} as={Fragment}>
                <Dialog
                    as="div"
                    className="fixed inset-0 z-10 overflow-y-auto"
                    onClose={() => {
                        // closeDialog()
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
                                                    Tambah Asset Baru
                                                </span>
                                    ) : (
                                        <span>
                                                    Edit Asset
                                                    <span className="text-indigo-600">
                                                        {` ${editMobil.id_mobil}`}
                                                    </span>
                                                </span>
                                    )}
                                </Dialog.Title>
                                <div className="mt-2">
                                    <div className="bg-white  rounded-lg sm:px-10">

                                        <div className="flex items-center justify-center">
                                            {/*{mode === "edit" && pictureUrl !== "" ? (*/}
                                            {/*    <CarPicture*/}
                                            {/*        source={pictureUrl}*/}
                                            {/*        onPictureChange={(e) => {*/}
                                            {/*            setFotoMobil(e.target.files[0])*/}
                                            {/*        }}/>*/}
                                            {/*) : (*/}
                                            {/*    <CarPicture onPictureChange={(e) => {*/}
                                            {/*        setFotoMobil(e.target.files[0])*/}
                                            {/*    }}/>*/}
                                            {/*)}*/}

                                            <div>
                                                <div className="relative inline-block">
                                                    <img
                                                        className="w-64 h-32 rounded-lg border-2 border-indigo-700 object-cover"
                                                        alt="car picture"
                                                        src={imgSource}
                                                    />

                                                    {/*<div className="absolute inset-0 bg-indigo-300 flex items-center justify-center">*/}
                                                    <button
                                                        onClick={pickImage}
                                                        className="w-7 h-7 rounded-full bg-indigo-700 border-2 border-white absolute -bottom-1 -right-1 flex items-center justify-center"
                                                    >
                                                        <MdEdit color="white"/>
                                                    </button>
                                                    {/*</div>*/}
                                                </div>
                                            </div>
                                        </div>

                                        <form className="mb-0 space-y-4 w-full" onSubmit={handleSubmit}>

                                            <InputField type="text" lable="Plat Mobil" value={platMobil}
                                                        errorMsg={platMobilError} onChange={(e) => {
                                                setPlatMobil(e.target.value)
                                            }}/>

                                            <InputField type="text" lable="Nama Mobil" value={namaMobil}
                                                        errorMsg={namaMobilError} onChange={(e) => {
                                                setNamaMobil(e.target.value)
                                            }}/>

                                            <InputField type="text" lable="No STNK" value={noStnk}
                                                        errorMsg={noStnkError} onChange={(e) => {
                                                setNoStnk(e.target.value)
                                            }}/>

                                            <div>
                                                <label htmlFor="input-field"
                                                       className="block text-sm font font-medium text-gray-700">
                                                    Tipe Mobil
                                                </label>
                                                <div className="mt-1">
                                                    <select className="w-full border-gray-300 rounded-md shadow-sm appearance-none
                                                                                focus:border-indigo-500 focus:ring-indigo-500"
                                                            value={tipeMobil}
                                                            onChange={(e) => {
                                                                setTipeMobil(e.target.value)
                                                            }}
                                                    >
                                                        <option
                                                            value="">
                                                            Pilih Tipe Mobil...
                                                        </option>
                                                        <option
                                                            value="sedan">
                                                            Sedan
                                                        </option>
                                                        <option
                                                            value="suv">
                                                            SUV
                                                        </option>
                                                        <option
                                                            value="city car">
                                                            City Car
                                                        </option>
                                                        <option
                                                            value="mpv">
                                                            MPV
                                                        </option>
                                                    </select>
                                                </div>
                                                <div className="text-red-500 text-sm">{tipeMobilError}</div>
                                            </div>

                                            <div>
                                                <label htmlFor="input-field"
                                                       className="block text-sm font font-medium text-gray-700">
                                                    Jenis Transmisi
                                                </label>
                                                <div className="mt-1">
                                                    <select className="w-full border-gray-300 rounded-md shadow-sm appearance-none
                                                                                focus:border-indigo-500 focus:ring-indigo-500"
                                                            value={jenisTransmisi}
                                                            onChange={(e) => {
                                                                setJenisTransmisi(e.target.value)
                                                            }}
                                                    >
                                                        <option
                                                            value="">
                                                            Pilih Jenis Transmisi...
                                                        </option>
                                                        <option
                                                            value="AT">
                                                            AT
                                                        </option>
                                                        <option
                                                            value="MT">
                                                            MT
                                                        </option>
                                                        <option
                                                            value="CVT">
                                                            CVT
                                                        </option>
                                                        <option
                                                            value="AMT">
                                                            AMT
                                                        </option>
                                                    </select>
                                                </div>
                                                <div
                                                    className="text-red-500 text-sm">{jenisTransmisiError}</div>
                                            </div>

                                            <div>
                                                <label htmlFor="input-field"
                                                       className="block text-sm font font-medium text-gray-700">
                                                    Jenis bahan Bakar
                                                </label>
                                                <div className="mt-1">
                                                    <select className="w-full border-gray-300 rounded-md shadow-sm appearance-none
                                                                                focus:border-indigo-500 focus:ring-indigo-500"
                                                            value={jenisBahanBakar}
                                                            onChange={(e) => {
                                                                setJenisBahanBakar(e.target.value)
                                                            }}
                                                    >
                                                        <option
                                                            value="">
                                                            Pilih Jenis Bahan Bakar...
                                                        </option>
                                                        <option
                                                            value="premium">
                                                            Premium
                                                        </option>
                                                        <option
                                                            value="pertalite">
                                                            Pertalite
                                                        </option>
                                                        <option
                                                            value="pertamax">
                                                            Pertamax
                                                        </option>
                                                        <option
                                                            value="solar">
                                                            Solar
                                                        </option>
                                                    </select>
                                                </div>
                                                <div
                                                    className="text-red-500 text-sm">{jenisBahanBakarError}</div>
                                            </div>

                                            <InputField type="number" lable="Volume Bahan Bakar (L)"
                                                        value={volumeBahanBakar}
                                                        errorMsg={volumeBahanBakarError} onChange={(e) => {
                                                setVolumeBahanBakar(e.target.value)
                                            }}/>

                                            <InputField type="text" lable="Warna Mobil" value={warnaMobil}
                                                        errorMsg={warnaMobilError} onChange={(e) => {
                                                setWarnaMobil(e.target.value)
                                            }}/>

                                            <TextArea lable="Fasilitas" value={fasilitasMobil}
                                                      errorMsg={fasilitasMobilError}
                                                      onChange={(e) => {
                                                          setFasilitasMobil(e.target.value)
                                                      }}/>

                                            <InputField type="number" lable="Kapasitas Penumpang (Orang)"
                                                        value={kapasitasPenumpang}
                                                        errorMsg={kapasitasPenumpangError} onChange={(e) => {
                                                setKapasitasPenumpang(e.target.value)
                                            }}/>

                                            <InputField type="number" lable="Volume Bagasi (L)"
                                                        value={volumeBagasi}
                                                        errorMsg={volumeBagasiError} onChange={(e) => {
                                                setVolumeBagasi(e.target.value)
                                            }}/>

                                            <InputField type="number" lable="Harga Sewa (IDR)" value={hargaSewa}
                                                        errorMsg={hargaSewaError} onChange={(e) => {
                                                setHargaSewa(e.target.value)
                                            }}/>

                                            <InputField type="date" lable="Service Terakhir"
                                                        value={servisTerakhir}
                                                        errorMsg={servisTerakhirError} onChange={(e) => {
                                                setServisTerakhir(e.target.value)
                                            }}/>

                                            <RadioGroup
                                                label="Kepemilikan Aset"
                                                value={jenisAset}
                                                options={[
                                                    {
                                                        value: 1,
                                                        label: "Sewaan"
                                                    },
                                                    {
                                                        value: 0,
                                                        label: "Perusahaan"
                                                    }

                                                ]}
                                                errorMsg={jenisAsetError}
                                                onChange={(e) => {
                                                    setJenisAset(e.target.value)
                                                }}
                                            />

                                            {jenisAset === "1" && (
                                                <div className="mb-0 space-y-4 w-full">

                                                    <div>
                                                        <label htmlFor="input-field"
                                                               className="block text-sm font font-medium text-gray-700">
                                                            Mitra
                                                        </label>
                                                        <div className="mt-1">
                                                            {all_mitra !== null && (
                                                                <select className="w-full border-gray-300 rounded-md shadow-sm appearance-none
                                                                                focus:border-indigo-500 focus:ring-indigo-500"
                                                                        value={idMitra}
                                                                        onChange={(e) => {
                                                                            setIdMitra(e.target.value)
                                                                        }}
                                                                >
                                                                    <option
                                                                        value="">
                                                                        Select Mitra...
                                                                    </option>
                                                                    {all_mitra.map(mitra =>

                                                                        <option key={mitra.id}
                                                                                value={mitra.id}

                                                                        >
                                                                            {mitra.nama_mitra}
                                                                        </option>
                                                                    )}
                                                                </select>
                                                            )}
                                                        </div>
                                                        <div
                                                            className="text-red-500 text-sm">{idMitraError}</div>
                                                    </div>

                                                    <InputField type="date" lable="Periode Mulai"
                                                                value={periodeMulai}
                                                                errorMsg={periodeMulaiError} onChange={(e) => {
                                                        setPeriodeMulai(e.target.value)
                                                    }}/>
                                                    <InputField type="date" lable="Periode Selesai"
                                                                value={periodeSelesai}
                                                                errorMsg={periodeSelesaiError}
                                                                onChange={(e) => {
                                                                    setPeriodeSelesai(e.target.value)
                                                                }}/>
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

export default EditInputMobil;
