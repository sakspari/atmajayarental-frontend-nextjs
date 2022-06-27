import React, {useEffect, useState} from 'react';
import Layout from "../../components/Layout";
import JadwalTable from "../../components/JadwalTable";
import EditInputJadwal from "../../components/Modal/EditInputJadwal";
import {useDispatch, useSelector} from "react-redux";
import {getPegawai, resetMessage} from "../../util/store/actions/pegawai";
import {getRoles} from "../../util/store/actions/role";
import {
    createDetailJadwal,
    deleteDetailJadwal,
    getDetailJadwal,
    updateDetailJadwal
} from "../../util/store/actions/detailJadwal";
import {getJadwal} from "../../util/store/actions/jadwal";
import {Button, TextField} from "@mui/material";
import Snackbar from "../../components/Snackbar";
import {setSnackbar} from "../../util/store/actions/snackbars";

const Index = () => {

    const dispatch = useDispatch()

    const [showModal, setShowModal] = useState(false)
    const [detailJadwal, setDetailJadwal] = useState(null)
    const {all_pegawai} = useSelector(state => state.pegawai)
    const {detailJadwalList, isLoading, message, errors} = useSelector(state => state.detailJadwal)
    const {jadwals} = useSelector(state => state.jadwal)

    const [mode, setMode] = useState("add")
    const [searchKey, setSearchKey] = useState("")
    const [enableCS, setEnableCS] = useState(false)
    const [enableAdmin, setEnableAdmin] = useState(false)
    const [roleFilter, setRoleFilter] = useState("")

    const [isOpenSnackbar, setIsOpenSnackbar] = useState(false)
    const [snackbarType, setSnackbarType] = useState("")
    const [snackbarMsg, setSnackbarMsg] = useState("")

    const closeSnackbar = () => {
        setIsOpenSnackbar(false)
        // clearField()
        // dispatch(resetMessage())
    }


    const onItemClicked = (item, roleId) => {
        console.log(item)
        if(item.id_pegawai !== "" && item.id_pegawai!== null  && item.id_pegawai!== undefined)
            setMode("edit")
        else
            setMode("add")

        setRoleFilter(roleId)
        setDetailJadwal({
            ...item,
            id_jadwal: jadwals.find((j) => j.hari === item.hari && j.sesi.toString() === item.sesi.toString()).id
        })
        setShowModal(true)
    }


    const onPegawaiSelect = (e) => {
        setDetailJadwal({
            ...detailJadwal,
            id_pegawai: e.target.value
        })
        console.log(detailJadwal)
    }

    const filteredPegawaiByRole = () => {
            return all_pegawai.filter(row =>
                row.role_id.toString().toLowerCase().includes(roleFilter.toLowerCase())
            )
    }

    const filteredJadwal = () => {
        if (searchKey === "")
            return detailJadwalList
        else
            return detailJadwalList.filter(row =>
                row.id_pegawai.toString().toLowerCase().includes(searchKey.toLowerCase()) ||
                row.nama_pegawai.toLowerCase().includes(searchKey.toLowerCase())
            )
    }


    const createJadwal = () => {
        if (mode==="edit" && detailJadwal.id_pegawai === "")
            dispatch(deleteDetailJadwal(detailJadwal))
        else if(mode==="edit" && detailJadwal.id_pegawai !== undefined)
            dispatch(updateDetailJadwal(detailJadwal))
        else if(mode==="add" && detailJadwal.id_pegawai !== undefined)
            dispatch(createDetailJadwal(detailJadwal))
        dispatch(getDetailJadwal())
    }

    useEffect(() => { //ambil data untuk list pegawai
        dispatch(getPegawai())
        dispatch(getDetailJadwal())
        dispatch(getJadwal())
        // console.log(all_pegawai)
        // dispatch(getRoles())
    }, [])

    useEffect(() => { //ambil data untuk list pegawai
        if (message !== null) {
            setIsOpenSnackbar(true)
            dispatch(setSnackbar({
                'snackbarOpen': true,
                'snackbarType': "success",
                'snackbarMessage': message.message,
            }))
        }
        else if (errors !== null) {
            setIsOpenSnackbar(true)
            dispatch(setSnackbar({
                'snackbarOpen': true,
                'snackbarType': "error",
                'snackbarMessage': errors.message,
            }))
        }
    }, [isLoading])

    return (
        <Layout>

            {detailJadwal !== null && roleFilter !== "" && showModal && (
                <EditInputJadwal detailJadwal={detailJadwal} show={showModal} setShowModal={setShowModal}
                                 listPegawai={filteredPegawaiByRole()}
                                 onPegawaiChange={onPegawaiSelect}
                                 onSave={createJadwal}
                />
            )}

            <div className="flex justify-between items-center">
                <div className="py-4 w-fit">
                    <h1 className="md:text-5xl font-medium text-xl">Pengelolaan Jadwal Pegawai</h1>
                </div>

                <div className="flex items-center justify-center">

                    <TextField
                        value={searchKey}
                        label="filter id / nama pegawai"
                        variant="standard"
                        onChange={(e) => {
                            setSearchKey(e.target.value)
                            // handleSearch(e)
                        }}
                    />
                </div>

            </div>

            <div className="py-4 w-full flex justify-between">
                <h1 className="md:text-3xl font-medium text-xl text-indigo-800">Jadwal Customer Service</h1>
            </div>
            <JadwalTable onItemClicked={onItemClicked} detailJadwalList={filteredJadwal()} roleIdFilter="CS" isEditable={true}/>
            <div className="py-4 w-full flex justify-between">
                <h1 className="md:text-3xl font-medium text-xl text-indigo-800">Jadwal Admin</h1>
            </div>

            <JadwalTable onItemClicked={onItemClicked} detailJadwalList={filteredJadwal()} roleIdFilter="ADM" isEditable={true}/>

            {isOpenSnackbar && (
                <Snackbar message={snackbarMsg} type={snackbarType} action={() => {
                    closeSnackbar()
                }}/>
            )}

        </Layout>
    );
};

export default Index;