import React, {useEffect, useState} from 'react';
import Layout from "../../components/Layout";
import {useRouter} from "next/router";
import {useDispatch, useSelector} from "react-redux";
import {deleteTransaksi, getTransaksi, resetMessage, updateTransaksi} from "../../util/store/actions/transaksi";
import {AiOutlineEdit} from "@react-icons/all-files/ai/AiOutlineEdit";
import {AiOutlineDelete} from "@react-icons/all-files/ai/AiOutlineDelete";
import TransactionTable from "../../components/Datatable/TransactionTable";
import {Button, TableCell, TableRow, TextField} from "@mui/material";
import ConfirmDialog from "../../components/Dialog/ConfirmDialog";
import DateTimeDialog from "../../components/Dialog/DateTimeDialog";
import {calculateDiffHour, calculateEstimatedTime} from "../../util/converter/date_converter";
import {setSnackbar} from "../../util/store/actions/snackbars";
import Snackbar from "../../components/Snackbar";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const VerifikasiTransaksi = () => {
    const router = useRouter()
    const dispatch = useDispatch()

    const {
        available_driver,
        proceedCar,
        savedTransaction,
        all_transaction,
        isLoading,
        errors,
        message
    } = useSelector(state => state.transaction)
    const {currentUser, userType} = useSelector(state => state.auth)

    const [searchKey, setSearchKey] = useState("")
    const [openDialog, setOpenDialog] = useState(false)
    const [openDatetimeDialog, setOpenDatetimeDialog] = useState(false)
    const [editDeleteTransaction, setEditDeleteTransaction] = useState(null)
    const [dialogTitle, setDialogTitle] = useState("")
    const [dialogBody, setDialogBody] = useState("")
    const [waktuKembali, setWaktuKembali] = useState(new Date())

    const [isOpenSnackbar, setIsOpenSnackbar] = useState(false)
    const [snackbarType, setSnackbarType] = useState("")
    const [snackbarMsg, setSnackbarMsg] = useState("")

    const closeSnackbar = () => {
        setIsOpenSnackbar(false)
        // clearField()
        dispatch(resetMessage())
    }

    const column = [
        {heading: '', value: 'expand'},
        // {heading: 'NO', value: 'no'},
        {heading: 'ID', value: 'id_transaksi'},
        {heading: 'MOBIL', value: 'nama_mobil'},
        {heading: 'CUSTOMER', value: 'nama_customer'},
        {heading: 'Driver', value: 'nama_driver'},
        //TODO: Nama Mobil
        {heading: 'Status', value: 'status_transaksi'},
        // {heading: 'EMAIL', value: 'email'},
        // {heading: 'TELEPON', value: 'phone'},
        // {heading: 'AKSI', value: 'aksi'},
    ]

    //acrion button
    const positiveButton = (record) => {
        console.log(record)
        if (record.status_transaksi.includes("0") && userType === "CS") {
            //verif transaksi
            dispatch(updateTransaksi({
                ...record,
                status_transaksi: "1",
                id_pegawai: currentUser.id
            }))
        }
        if (record.status_transaksi.includes("1") && userType === "CS") {
            //kembali mobil
            setDialogTitle("Konfirmasi Pengembaliann")
            setOpenDatetimeDialog(true)
            setEditDeleteTransaction(record)

        }
        if (record.status_transaksi.includes("2") && userType === "CS") {
            //kembali mobil
            setDialogTitle("Konfirmasi Pengembaliann")
            setOpenDatetimeDialog(true)
            setEditDeleteTransaction(record)
            if (record.waktu_pengembalian !== null)
                setWaktuKembali(record.waktu_pengembalian)

        }
        if (record.status_transaksi.includes("3") && userType === "CS") {
            //verif pembayaran
            dispatch(updateTransaksi({
                ...record,
                status_transaksi: "5",
                id_pegawai: currentUser.id
            }))
        }
        if (record.status_transaksi.includes("5")) {
            //generate Pdf
            generatePdf(record.id_transaksi)
        }
        dispatch(getTransaksi())
    }

    const generatePdf = (idTransaksi) => {
        var pdf = new jsPDF('portrait', 'px', false)
        // autoTable(pdf, {html: "#test"})
        autoTable(
            pdf, {
                // useCss: true,
                theme: 'plain',
                headStyles: {
                    fillColor: [255, 255, 255],
                    textColor: [0, 0, 0],
                    halign: 'center',
                    // fontSize: 20,
                    lineWidth: 0
                },
                bodyStyles: {fillColor: [255, 255, 255]},
                styles: {lineWidth: [0, 0, 0, 0.25]},
                // styles: {fillColor: [255, 255, 255]},
                // columnStyles: {},
                // columnStyles: { 0: { lineColor: [255, 0, 0] } }, // Cells in first column style,
                margin: {top: 10},
                html: "#generateInv"
            }
        )
        pdf.save("Invioce-" + idTransaksi.toLowerCase())
    }

    const filteredTransaksi = () => {
        if (searchKey === "")
            return all_transaction
        else
            return all_transaction.filter(row =>
                row.id_transaksi.toString().toLowerCase().includes(searchKey.toLowerCase())
            )
    }

    const onDeleteTransaction = (transaction) => {

        dispatch(deleteTransaksi(transaction))
        dispatch(getTransaksi())
    }

    const onWaktuKembaliChange = (e) => {
        setWaktuKembali(e.target.value)
    }

    const negativeButton = (record) => {
        console.log(record)
        if (record.status_transaksi.includes("0") && userType === "CS") {
            //verif transaksi
            // onDeleteTransaction(record)
            setDialogTitle("Delete Confirmation")
            setDialogBody("Anda yakin menghapus data transaksi dari " + record.id_transaksi)
            setEditDeleteTransaction(record)
            setOpenDialog(true)
        }
    }

    const hitungDenda = (waktuPengembalian) => {
        let result = 0;
        const durasiTarget = calculateEstimatedTime(editDeleteTransaction.waktu_mulai, editDeleteTransaction.waktu_selesai)
        const durasiSebenarnya = calculateEstimatedTime(editDeleteTransaction.waktu_mulai, waktuPengembalian)
        const diffSelesaiKembali = calculateEstimatedTime(editDeleteTransaction.waktu_selesai, waktuPengembalian)

        if (durasiTarget < durasiSebenarnya) {
            result = result + diffSelesaiKembali * editDeleteTransaction.harga_satuan_mobil
            if (editDeleteTransaction.id_driver !== null)
                result = result + diffSelesaiKembali * editDeleteTransaction.harga_satuan_driver
        } else if (calculateDiffHour(editDeleteTransaction.waktu_selesai, waktuPengembalian) > 3.0) {
            result = result + editDeleteTransaction.harga_satuan_mobil
            if (editDeleteTransaction.id_driver !== null)
                result = result + editDeleteTransaction.harga_satuan_driver
        }

        return result;
    }

    const hitungTotal = (waktuPengembalian) => {
        let result = 0;
        const durasiTarget = calculateEstimatedTime(editDeleteTransaction.waktu_mulai, editDeleteTransaction.waktu_selesai)
        result = durasiTarget * editDeleteTransaction.harga_satuan_mobil
        if (editDeleteTransaction.id_driver !== null)
            result = result + durasiTarget * editDeleteTransaction.harga_satuan_driver
        result = result + hitungDenda(waktuPengembalian)
        return result;
    }


    const transactionProcessAction = (transaction) => {
        return (
            <TableRow>
                {
                    (transaction.status_transaksi.includes("0") && userType === "CS" ||
                        transaction.status_transaksi.includes("1") && userType === "CS" ||
                        transaction.status_transaksi.includes("2") ||
                        transaction.status_transaksi.includes("5") ||
                        transaction.status_transaksi.includes("3") && userType === "CS") &&
                    (
                        <TableCell colSpan={4} align={'right'}>

                            <Button
                                variant="contained"
                                color="primary"
                                onClick={() => {
                                    positiveButton(transaction)
                                }}
                            >
                                {transaction.status_transaksi === "0" && userType === "CS" && "Verifikasi Peminjaman"}
                                {transaction.status_transaksi === "1" && userType === "CS" && "Pengembalian Mobil"}
                                {transaction.status_transaksi === "3" && userType === "CS" && "Verifikasi Pembayaran"}
                                {transaction.status_transaksi === "2" && userType === "CS" && "Ubah Tanggal Pengembalian"}
                                {transaction.status_transaksi === "5" && "Cetak Nota (pdf)"}
                            </Button>

                            {
                                transaction.status_transaksi.includes("0") && userType === "CS" && (
                                    <span className="ml-4"></span>
                                )}

                            {
                                transaction.status_transaksi.includes("0") && userType === "CS" &&
                                (

                                    <Button
                                        variant="contained"
                                        color="secondary"
                                        onClick={() => {
                                            negativeButton(transaction)
                                        }}
                                    >
                                        {transaction.status_transaksi === "0" && userType === "CS" && "Transaksi Invalid"}
                                        {/*{transaction.status_transaksi === "1" && userType === "CS" && "Pengembalian Mobil"}*/}
                                        {/*{transaction.status_transaksi === "3" && userType === "CS" && "Verifikasi Pembayaran"}*/}
                                        {/*{transaction.status_transaksi === "2" && userType === "CUSTOMER" && "Upload Bukti Pembayaran"}*/}
                                    </Button>
                                )}
                        </TableCell>
                    )}
            </TableRow>
        )
    }

    const handleDelete = (record) => {
        console.log('Info: Come from handleDelete');

        console.log(record);
    };

    const handleEdit = (record) => {
        console.log('Info: Come from handleEdit');
        // setEditDriver(record)
        // setIsOpenModal(true)
    };

    const transaksiActions = (record) => {
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

    const filteredCustomerTransaksi = () => {
        if (searchKey === "")
            return all_transaction
        else
            return all_transaction.filter(row =>
                row.id_transaksi.toString().toLowerCase().includes(searchKey.toLowerCase()) ||
                row.name.toLowerCase().includes(searchKey.toLowerCase() ||
                    row.nama_customer.toLowerCase().includes(searchKey.toLowerCase()
                    )
                )
            )
    }

    useEffect(() => { //ambil data untuk list mobil
        dispatch(getTransaksi())
    }, [])

    useEffect(() => { //ambil data untuk list pegawai
        if (message !== null) {
            setIsOpenSnackbar(true)
            dispatch(setSnackbar({
                'snackbarOpen': true,
                'snackbarType': "success",
                'snackbarMessage': message.message,
            }))
        } else if (errors !== null) {
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

            {openDialog && (
                <ConfirmDialog open={openDialog} title={dialogTitle} body={dialogBody} handleClose={() => {
                    setDialogTitle("")
                    setDialogBody("")
                    setOpenDialog(false)
                }}
                               handleOke={() => {
                                   // dispatch(deleteTransaksi(editDeleteTransaction))
                                   onDeleteTransaction(editDeleteTransaction)
                                   dispatch(getTransaksi())
                                   setDialogTitle("")
                                   setDialogBody("")
                                   setOpenDialog(false)
                               }}
                />
            )}
            {openDatetimeDialog && (
                <DateTimeDialog open={openDatetimeDialog}
                                title={dialogTitle}
                                dateTimeValue={waktuKembali}
                                onDateTimeChange={onWaktuKembaliChange}
                                handleClose={() => {
                                    setDialogTitle("")
                                    setDialogBody("")
                                    setOpenDatetimeDialog(false)
                                }}
                                handleSave={() => {
                                    // dispatch(deleteTransaksi(editDeleteTransaction))
                                    dispatch(updateTransaksi({
                                        ...editDeleteTransaction,
                                        status_transaksi: "2",
                                        id_pegawai: currentUser.id,
                                        waktu_pengembalian: waktuKembali,
                                        total_denda: hitungDenda(waktuKembali),
                                        grand_total: hitungTotal(waktuKembali)
                                    }))
                                    dispatch(getTransaksi())
                                    setWaktuKembali(new Date())
                                    setDialogTitle("")
                                    setOpenDatetimeDialog(false)
                                }}
                />
            )}

            <div className="py-4 flex justify-between content-center">
                <h1 className="md:text-5xl font-medium text-xl">Verifikasi Transaksi</h1>
                <div className="flex w-fit">

                    <div className="mr-4">
                        <TextField
                            value={searchKey}
                            label="search transaksi"
                            variant="standard"
                            onChange={(e) => {
                                setSearchKey(e.target.value)
                                // handleSearch(e)
                            }}
                        />
                    </div>
                </div>
            </div>

            <div className="h-12">

            </div>

            {all_transaction !== null && (
                <TransactionTable
                    data={filteredTransaksi()}
                    actions={transaksiActions}
                    transactionAction={transactionProcessAction}
                    column={column}/>
            )}

            {isOpenSnackbar && (
                <Snackbar message={snackbarMsg} type={snackbarType} action={() => {
                    closeSnackbar()
                }}/>
            )}
        </Layout>
    );
};

export default VerifikasiTransaksi;
