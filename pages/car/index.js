import React, {useEffect, useState} from 'react';
import Layout from "../../components/Layout";
import {useDispatch, useSelector} from "react-redux";
import {createMobil, deleteMobil, getMobil, resetMessage, updateMobil} from "../../util/store/actions/mobil";
import {AiOutlineEdit} from "@react-icons/all-files/ai/AiOutlineEdit";
import {AiOutlineDelete} from "@react-icons/all-files/ai/AiOutlineDelete";
import Snackbar from "../../components/Snackbar";
import {getMitra} from "../../util/store/actions/mitra";
import Datatable from "../../components/Datatable";
import EditInputMobil from "../../components/Modal/EditInputMobil";
import {setSnackbar} from "../../util/store/actions/snackbars";
import CustomSnackbars from "../../components/Snackbar";
import {useRouter} from "next/router";
import {getDaysToToday} from "../../util/converter/date_converter";
import Loading from "../../components/Loading";
import {Button, TextField} from "@mui/material";

const Index = () => {
    // const listPegawai = useSelector(state => state.pegawai.all_pegawai)
    const {message, errors, all_mobil, isLoading} = useSelector(state => state.mobil)
    // const {roles} = useSelector(state => state.roles)
    // const {currentUser} = useSelector(state => state.auth)
    // const errors = useSelector(state => state.pegawai.errors)
    const [listPegawai, setListPegawai] = useState([])

    const dispatch = useDispatch()
    const router = useRouter()

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

    const [isOpenModal, setIsOpenModal] = useState(false)
    const [isOpenSnackbar, setIsOpenSnackbar] = useState(false)
    const [snackbarType, setSnackbarType] = useState("")
    const [snackbarMsg, setSnackbarMsg] = useState("")

    const [searchKey, setSearchKey] = useState("")


    const [mode, setMode] = useState("show_all")
    const [editCar, setEditCar] = useState("")


    const handleDelete = (record) => {
        console.log('Info: Come from handleDelete');
        deleteMobilUI(record)
        console.log(record);
    };

    const handleEdit = (record) => {
        console.log('Info: Come from handleEdit');
        setEditCar(record)
        setIsOpenModal(true)
    };

    const mobilActions = (record) => {
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

    const filteredMobil = () => {
        if (searchKey === "")
            return all_mobil
        else
            return all_mobil.filter(row =>
                row.id_mobil.toString().toLowerCase().includes(searchKey.toLowerCase()) ||
                row.nama_mobil.toLowerCase().includes(searchKey.toLowerCase()) ||
                row.plat_mobil.toLowerCase().includes(searchKey.toLowerCase()) ||
                row.tipe_mobil.toLowerCase().includes(searchKey.toLowerCase())
            )
    }

    const timeOutAsset = () => {
        return all_mobil.filter(row =>
            row.id_mitra !== null && getDaysToToday(row.periode_selesai) < 31 && getDaysToToday(row.periode_selesai) > -1
        )
    }

    const column = [
        {heading: 'NO', value: 'no'},
        {heading: 'ID', value: 'id_mobil'},
        {heading: 'PLAT', value: 'plat_mobil'},
        {heading: 'NAMA', value: 'nama_mobil'},
        {heading: 'TIPE', value: 'tipe_mobil'},
        {heading: 'BAHAN BAKAR', value: 'jenis_bahan_bakar'},
        {heading: 'WARNA', value: 'warna_mobil'},
        {heading: 'TARIF (IDR per hari)', value: 'harga_sewa'},
        {heading: 'AKSI', value: 'aksi'},
    ]

    const contractColumn = [
        {heading: 'NO', value: 'no'},
        {heading: 'ID', value: 'id_mobil'},
        {heading: 'PLAT', value: 'plat_mobil'},
        {heading: 'NAMA', value: 'nama_mobil'},
        {heading: 'TIPE', value: 'tipe_mobil'},
        {heading: 'WARNA', value: 'warna_mobil'},
        {heading: 'BERAKHIR DALAM', value: 'periode_selesai'},
        {heading: 'AKSI', value: 'aksi'},
    ]

    const getAllMobil = () => {
        dispatch(getMobil())
    }

    const deleteMobilUI = (mobil) => {
        dispatch(deleteMobil(mobil))
        dispatch(getMobil())
    }


    const closeSnackbar = () => {
        setIsOpenSnackbar(false)
        dispatch(resetMessage())
    }


    useEffect(() => { //ambil data untuk list mobil
        getAllMobil()
        dispatch(getMitra())
        // // dispatch(getRoles())
        // if (errors == null)
        //     setSnackbarMsg(message)
        // else
        //     setSnackbarMsg(errors)

    }, [])

    useEffect(() => {
        if (message !== null) {
            dispatch(setSnackbar({
                'snackbarOpen': true,
                'snackbarType': "success",
                'snackbarMessage': message.message,
            }))
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
        <Layout>
            <CustomSnackbars/>
            <div className="py-4 flex justify-between content-center">
                <h1 className="md:text-5xl font-medium text-xl">Pengelolaan Asset</h1>

                <div className="flex items-center justify-center">

                    <TextField
                        value={searchKey}
                        label="search pegawai"
                        variant="standard"
                        onChange={(e) => {
                            setSearchKey(e.target.value)
                            // handleSearch(e)
                        }}
                    />

                    <div className="ml-4">
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={
                                () => {
                                    setEditCar(null)
                                    setIsOpenModal(true)
                                }
                            }
                        >
                            + Asset
                        </Button>
                    </div>
                </div>

            </div>
            <div className="flex justify-end items-center">

                <span className="font-semibold mr-4 text-lg">Menampilkan</span>

                <select
                    className="rounded-lg bg-indigo-100"
                    onChange={(e) => {
                        setMode(e.target.value)
                        console.log(e.target.value)
                    }}
                    value={mode}>
                    <option
                        value="show_all"
                        label="semua asset"/>

                    <option
                        value="timeout_contract"
                        label="masa kontrak hampir selesai"/>

                </select>
            </div>

            <Loading isLoading={isLoading}/>

            <div className="min-w-full overflow-auto shadow p-4 pb-12">


                {all_mobil !== null && mode === "show_all" && (
                    <Datatable data={filteredMobil()} column={column} actions={mobilActions}/>
                )}

                {all_mobil !== null && mode === "timeout_contract" && (
                    <Datatable data={timeOutAsset()} column={contractColumn} actions={mobilActions}/>
                )}

                {isOpenModal && (
                    <EditInputMobil editMobil={editCar} show={isOpenModal} setShowModal={setIsOpenModal}/>
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
