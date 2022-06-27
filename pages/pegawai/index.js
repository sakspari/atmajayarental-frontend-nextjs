import React, {useEffect, useState} from 'react';
import Layout from "../../components/Layout";
import {useDispatch, useSelector} from "react-redux";
import {deletePegawai, getPegawai, resetMessage} from "../../util/store/actions/pegawai";
import Snackbar from "../../components/Snackbar";
import CustomSnackbars from "../../components/Snackbar";
import {AiOutlineEdit} from "@react-icons/all-files/ai/AiOutlineEdit";
import {getRoles} from "../../util/store/actions/role";
import {AiOutlineDelete} from "@react-icons/all-files/ai/AiOutlineDelete";
import Datatable from "../../components/Datatable";
import EditInputPegawai from "../../components/Modal/EditInputPegawai";
import {setSnackbar} from "../../util/store/actions/snackbars";
import {resetErrors} from "../../util/store/actions/auth";
import {Button, TextField} from "@mui/material";
import Loading from "../../components/Loading";
// import {Button} from "@material-ui/core";

const Index = () => {
    // const listPegawai = useSelector(state => state.pegawai.all_pegawai)
    const {message, errors, all_pegawai, isLoading} = useSelector(state => state.pegawai)
    const {currentUser} = useSelector(state => state.auth)
    // const errors = useSelector(state => state.pegawai.errors)
    const dispatch = useDispatch()

    const [isOpenModal, setIsOpenModal] = useState(false)
    const [isOpenSnackbar, setIsOpenSnackbar] = useState(false)
    const [snackbarType, setSnackbarType] = useState("")
    const [snackbarMsg, setSnackbarMsg] = useState("")

    const [searchKey, setSearchKey] = useState("")


    const [editPegawai, setEditPegawai] = useState("")

    const handleDelete = (record) => {
        console.log('Info: Come from handleDelete');
        deletePegawaiUI(record)
        console.log(record);
    };

    const handleEdit = (record) => {
        console.log('Info: Come from handleEdit');
        setEditPegawai(record)
        setIsOpenModal(true)
    };


    useEffect(() => {
        if (message !== null) {
            dispatch(setSnackbar({
                'snackbarOpen': true,
                'snackbarType': "success",
                'snackbarMessage': message.message,
            }))
            setSnackbarType("success")
            setIsOpenSnackbar(true)
            setSnackbarMsg(message.message)
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
            setSnackbarType("error")
            setIsOpenSnackbar(true)
            setSnackbarMsg(msg)

            dispatch(resetErrors())
        }
        dispatch(resetMessage())
    }, [isLoading])

    const pegawaiActions = (record) => {
        return (
            <div>
                {/*<CustomSnackbars/>*/}
                {currentUser !== null && (
                    <div>
                        <button
                            disabled={record.id === currentUser.id}
                            className="mx-1 text-green-700 disabled:text-gray-500 hover:bg-green-300 hover:text-black disabled:bg-gray-100 bg-green-100 p-1 rounded-md"
                            onClick={() => handleEdit(record)}
                        >
                            <AiOutlineEdit/>
                        </button>
                        <button
                            disabled={record.id === currentUser.id}
                            className="mx-2 text-red-500 disabled:text-gray-500 hover:bg-red-300 hover:text-black disabled:bg-gray-100 bg-red-100 p-1 rounded-md"
                            onClick={() => handleDelete(record)}
                        >
                            <AiOutlineDelete/>
                        </button>
                    </div>
                )}
            </div>
        )
    }


    const getAllPegawai = () => {
        dispatch(getPegawai())
    }


    const deletePegawaiUI = (pegawai) => {
        dispatch(deletePegawai(pegawai))
        getAllPegawai()
    }

    const filteredPegawai = () => {
        if (searchKey === "")
            return all_pegawai
        else
            return all_pegawai.filter(row =>
                row.id.toString().toLowerCase().includes(searchKey.toLowerCase()) ||
                row.name.toLowerCase().includes(searchKey.toLowerCase())
            )
    }

    const closeSnackbar = () => {
        setIsOpenSnackbar(false)
        dispatch(resetMessage())
    }


    useEffect(() => { //ambil data untuk list pegawai
        getAllPegawai()
        dispatch(getRoles())
    }, [])

    const column = [
        {heading: 'NO', value: 'no'},
        {heading: 'ID', value: 'id'},
        {heading: 'NAMA', value: 'name'},
        {heading: 'JABATAN', value: 'role_name'},
        {heading: 'GENDER', value: 'gender'},
        {heading: 'TANGGAL LAHIR', value: 'birthdate'},
        {heading: 'EMAIL', value: 'email'},
        {heading: 'TELEPON', value: 'phone'},
        {heading: 'AKSI', value: 'aksi'},
    ]

    return (
        <Layout>
            <CustomSnackbars/>

            <div className="flex justify-between items-center">
                <div className="py-4 w-fit">
                    <h1 className="md:text-5xl font-medium text-xl">Pengelolaan Pegawai</h1>
                </div>

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
                                    setEditPegawai(null)
                                    setIsOpenModal(true)
                                }
                            }
                        >
                            + pegawai
                        </Button>
                    </div>
                </div>

            </div>

            <Loading isLoading={isLoading}/>

            <div className="min-w-full overflow-auto shadow p-4 pb-12">
                {all_pegawai !== null ? (

                    <Datatable data={filteredPegawai()} column={column} actions={pegawaiActions}/>

                ) : (<div>
                    empty...
                </div>)}

                {isOpenModal && (
                    <EditInputPegawai editPegawai={editPegawai} show={isOpenModal} setShowModal={setIsOpenModal}/>
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

