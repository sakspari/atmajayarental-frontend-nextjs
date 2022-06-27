import React, {useEffect, useState} from 'react';
import Layout from "../../components/Layout";
import {useDispatch, useSelector} from "react-redux";
import Snackbar from "../../components/Snackbar";
import {resetMessage} from "../../util/store/actions/mitra";
import {AiOutlineDelete} from "@react-icons/all-files/ai/AiOutlineDelete";
import {AiOutlineEdit} from "@react-icons/all-files/ai/AiOutlineEdit";
import {deleteMitra, getMitra} from "../../util/store/actions/mitra";
import Datatable from "../../components/Datatable";
import EditInputMitra from "../../components/Modal/EditInputMitra";
import {setSnackbar} from "../../util/store/actions/snackbars";
import CustomSnackbars from "../../components/Snackbar";
import Loading from "../../components/Loading";
import {Button, TextField} from "@mui/material";

const Index = () => {
    const {all_mitra, errors, isLoading, message} = useSelector(state => state.mitra)
    // const [message, setMessage] = useState("")
    const dispatch = useDispatch()

    const handleDelete = (record) => {
        console.log('Info: Come from handleDelete');
        deleteMitraUI(record)
        console.log(record);
    };

    const handleEdit = (record) => {
        console.log('Info: Come from handleEdit');
        setEditMitra(record)
        setIsOpenModal(true)
    };

    const mitraActions = (record) => {
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

    const filteredMitra = () => {
        if (searchKey === "")
            return all_mitra
        else
            return all_mitra.filter(row =>
                row.nik_mitra.toString().toLowerCase().includes(searchKey.toLowerCase()) ||
                row.nama_mitra.toLowerCase().includes(searchKey.toLowerCase())
            )
    }

    const column = [
        {heading: 'NO', value: 'no'},
        {heading: 'NIK', value: 'nik_mitra'},
        {heading: 'NAMA', value: 'nama_mitra'},
        {heading: 'TELEPON', value: 'no_telp_mitra'},
        {heading: 'ALAMAT', value: 'alamat_mitra'},
        {heading: 'AKSI', value: 'aksi'},
    ]

    const [isOpenModal, setIsOpenModal] = useState(false)
    const [isOpenSnackbar, setIsOpenSnackbar] = useState(false)
    const [snackbarType, setSnackbarType] = useState("")
    const [snackbarMsg, setSnackbarMsg] = useState("")

    const [searchKey, setSearchKey] = useState("")
    const [editMitra, setEditMitra] = useState("")

    const getAllMitra = () => {
        dispatch(getMitra())
    }

    const deleteMitraUI = (mitra) => {
        dispatch(deleteMitra(mitra))
        getAllMitra()
    }

    const closeSnackbar = () => {
        setIsOpenSnackbar(false)
        dispatch(resetMessage())
    }


    useEffect(() => { //ambil data untuk list mitra
        getAllMitra()

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
            msg = msg.replace("{","")
            msg = msg.replace("}","")
            msg = msg.replace("[","")
            msg = msg.replace("]","")
            msg = msg.replace('"',"")
            msg = msg.replace('"',"")

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
                <h1 className="md:text-5xl font-medium text-xl">Pengelolaan Mitra</h1>
                <div className="flex w-fit">

                    <div className="mr-4">
                        <TextField type="text"
                               value={searchKey}
                               onChange={(e) => {
                                   setSearchKey(e.target.value)
                               }}
                               label="Search Mitra"
                               variant="standard"/>
                    </div>

                    <div className="ml-4">
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={
                                () => {
                                    setEditMitra(null)
                                    setIsOpenModal(true)
                                }
                            }
                        >
                            + mitra
                        </Button>
                    </div>
                </div>
            </div>

            <Loading isLoading={isLoading}/>

            <div className="min-w-full overflow-auto shadow p-4 pb-12">
                {all_mitra !== null ? (
                    <Datatable data={filteredMitra()} column={column} actions={mitraActions}/>
                ) : (<div>
                    empty...
                </div>)}

                {isOpenModal && (
                    <EditInputMitra editMitra={editMitra} show={isOpenModal} setShowModal={setIsOpenModal}/>
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