import React, {useEffect, useState} from 'react';
import Layout from "../../../components/Layout";
import Loading from "../../../components/Loading";
import Datatable from "../../../components/Datatable";
import {useDispatch, useSelector} from "react-redux";
import {getCustomer, resetMessage, verifyCustomer} from "../../../util/store/actions/customer";
import {Button, TextField} from "@mui/material";
import ConfirmDialog from "../../../components/Dialog/ConfirmDialog";
import {convertDate, convertDateTime} from "../../../util/converter/date_converter";
import Avatar from "../../../components/Avatar";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import {base_public_url} from "../../../util/store/sagas/base_public_url";
import {setSnackbar} from "../../../util/store/actions/snackbars";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";

const Index = () => {

    const {message, errors, customer, isLoading} = useSelector(state => state.customer)
    const dispatch = useDispatch()

    const [vCustomer, setVCustomer] = useState(null)
    const [isOpenVerif, setIsOpenVerif] = useState(false)

    const handleDialogCustomer = (record) => {
        console.log(record)
        setVCustomer(record)
        setIsOpenVerif(true)

    }

    const verifCustomerAction = (record) => {
        return (
            <div>
                <Button onClick={() => {
                    handleDialogCustomer(record)
                }} variant={'contained'}>
                    Proses
                </Button>
            </div>
        )
    }

    const detailCustomer = () => {
        return (
            <div className='flex flex-col space-y-2'>
                <div className={'w-full flex items-center justify-center'}>
                    <Avatar isEditable={false} source={vCustomer.picture}/>
                </div>
                <span className={'font-semibold text-indigo-700'}>ID - {vCustomer.id}</span>
                <span className={'text-indigo-700'}>Nama: {vCustomer.name}</span>
                <span className={'text-indigo-700'}>Tanggal Lahir: {convertDate(vCustomer.birthdate)}</span>
                <span className={'text-indigo-700'}>Gender: {vCustomer.gender == 1 ? 'Pria' : 'Wanita'}</span>
                <span className={'text-indigo-700'}>Email: {vCustomer.email}</span>
                <span className={'text-indigo-700'}>Telepon: {vCustomer.phone}</span>
                <p aria-multiline={true} className={'text-indigo-700'}>Alamat: {vCustomer.address}</p>
                <div className="w-full flex items-center justify-start w-full">
                    <TableRow className="" colSpan={4}>
                        <TableCell colSpan={2}>
                            kartu identitas customer
                            <img
                                className="h-48"
                                src={`${base_public_url}${vCustomer.idcard}`}
                                alt="foto id card"/>
                        </TableCell>
                        {vCustomer.sim !== null &&
                            (
                                <TableCell colSpan={2}>
                                    sim customer
                                    <img
                                        className="h-48"
                                        src={`${base_public_url}${vCustomer.sim}`}
                                        alt="foto sim"/>
                                </TableCell>
                            )}
                    </TableRow>
                </div>
            </div>
        )
    }

    const column = [
        {heading: 'NO', value: 'no'},
        {heading: 'ID', value: 'id'},
        {heading: 'NAMA', value: 'name'},
        {heading: 'GENDER', value: 'gender'},
        {heading: 'STATUS', value: 'verified'},
        {heading: 'EMAIL', value: 'email'},
        {heading: 'TELEPON', value: 'phone'},
        {heading: 'AKSI', value: 'aksi'},
    ]

    useEffect(() => { //ambil data untuk list driver
        dispatch(getCustomer())
    }, [])

    const [isOpenSnackbar, setIsOpenSnackbar] = useState(false)
    const [snackbarType, setSnackbarType] = useState("")
    const [snackbarMsg, setSnackbarMsg] = useState("")
    const [searchKey, setSearchKey] = useState("")

    const filteredCustomer = () => {
        if (searchKey === "")
            return customer
        else
            return customer.filter(row =>
                row.id.toString().toLowerCase().includes(searchKey.toLowerCase()) ||
                row.name.toLowerCase().includes(searchKey.toLowerCase())
            )
    }

    useEffect(() => { //ambil data untuk list driver
        if (message !== null) {
            setIsOpenSnackbar(true)
            setSnackbarType('success')
            setSnackbarMsg(message.message)
            dispatch(setSnackbar({
                'snackbarOpen': true,
                'snackbarType': "success",
                'snackbarMessage': message.message,
            }))
        } else if (errors !== null) {
            setIsOpenSnackbar(true)
            setSnackbarType('error')
            setSnackbarMsg(errors.message)
            dispatch(setSnackbar({
                'snackbarOpen': true,
                'snackbarType': "error",
                'snackbarMessage': errors.message,
            }))
        }
        dispatch(resetMessage())
    }, [isLoading])

    return (
        <Layout>

            <Snackbar
                open={isOpenSnackbar}
                anchorOrigin={{vertical: "top", horizontal: "center"}}
                autoHideDuration={2000}
                onClose={() => {
                    setIsOpenSnackbar(false)
                    setSnackbarMsg("")
                    dispatch(resetMessage())
                }}
            >
                <Alert severity={snackbarType} sx={{width: '100%'}} onClose={() => {
                    setIsOpenSnackbar(false)
                    setSnackbarMsg("")
                    dispatch(resetMessage())
                }}>
                    {snackbarMsg}
                </Alert>
            </Snackbar>

            {vCustomer !== null && (
                <ConfirmDialog
                    title={"Verifikasi Pendaftaran Customer"}
                    open={isOpenVerif}
                    handleOke={() => {
                        dispatch(verifyCustomer(vCustomer))
                        setIsOpenVerif(false)
                        dispatch(getCustomer())
                    }}
                    handleClose={() => {
                        setIsOpenVerif(false)
                    }}
                    positiveButton={vCustomer.verified == 0 ? 'Verifikasi' : 'Sudah Verifikasi'}
                    positiveVariant={'contained'}
                    positiveDisable={vCustomer.verified == 1}
                    body={detailCustomer()}
                />
            )}

            <div className="py-4 flex justify-between content-center">
                <h1 className="md:text-5xl font-medium text-xl">Verifikasi Pendaftaran Customer</h1>
                <div className="flex w-fit">

                    <div className="mr-4">
                        <TextField type="text"
                                   value={searchKey}
                                   label="search customer"
                                   onChange={(e) => {
                                       setSearchKey(e.target.value)
                                   }}
                                   variant="standard"
                        />
                    </div>
                </div>
            </div>

            <Loading isLoading={isLoading}/>

            <div className="min-w-full overflow-auto shadow p-4 pb-12">
                {customer !== null ? (

                    <Datatable data={filteredCustomer()} column={column} actions={verifCustomerAction}/>

                ) : (<div>
                    empty...
                </div>)}

                {/*{isOpenModal && (*/}
                {/*    <EditInputDriver editDriver={editDriver} setShowModal={setIsOpenModal} show={isOpenModal}/>*/}
                {/*)}*/}

            </div>
        </Layout>
    );
};

export default Index;