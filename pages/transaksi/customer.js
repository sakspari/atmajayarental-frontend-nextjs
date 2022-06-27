import React, {useEffect, useState} from 'react';
import Layout from "../../components/Layout";
import {useRouter} from "next/router";
import {useDispatch, useSelector} from "react-redux";
import {
    deleteTransaksi,
    getAvailableDriver,
    getTransaksi,
    getTransaksiCustomer, resetMessage,
    updateTransaksi
} from "../../util/store/actions/transaksi";
import Datatable from "../../components/Datatable";
import {deleteDriver, getDriver} from "../../util/store/actions/driver";
import {AiOutlineEdit} from "@react-icons/all-files/ai/AiOutlineEdit";
import {AiOutlineDelete} from "@react-icons/all-files/ai/AiOutlineDelete";
import TransactionTable from "../../components/Datatable/TransactionTable";
import {Alert, Button, TableCell, TableRow, TextField} from "@mui/material";
import PaymentDialog from "../../components/Dialog/PaymentDialog";
import ConfirmDialog from "../../components/Dialog/ConfirmDialog";
import {FaStar} from "@react-icons/all-files/fa/FaStar";
import Avatar from "../../components/Avatar";
import {setSnackbar} from "../../util/store/actions/snackbars";
import Snackbar from "@material-ui/core/Snackbar";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const TransaksiCustomer = () => {
    const router = useRouter()
    const dispatch = useDispatch()

    const {
        available_driver,
        proceedCar,
        savedTransaction,
        customer_transaction,
        isLoading,
        message,
        errors
    } = useSelector(state => state.transaction)
    const {currentUser, userType} = useSelector(state => state.auth)

    const [searchKey, setSearchKey] = useState("")
    const [openDialogPayment, setOpenDialogPayment] = useState(false)
    const [openDialogRating, setOpenDialogRating] = useState(false)
    const [editTransaction, setEditTransaction] = useState(null)
    const [currentValue, setCurrentValue] = useState(0);
    const [currentReview, setCurrentReview] = useState("");
    const [hoverValue, setHoverValue] = useState(undefined);
    const stars = Array(5).fill(0)
    const colors = {
        orange: "#FFBA5A",
        grey: "#a9a9a9"

    };

    const positiveButton = (record) => {
        if (record.status_transaksi.includes("2") && userType === "CUSTOMER") {

            setOpenDialogPayment(true)
            setEditTransaction(record)

            console.log(record)

        }
        if (record.status_transaksi.includes("5")) {
            //generate Pdf
            generatePdf(record.id_transaksi)
        }
        dispatch(getTransaksiCustomer(currentUser.id))
        dispatch(getTransaksi())
    }

    const onDeleteTransaction = (transaction) => {

        dispatch(deleteTransaksi(transaction))
        dispatch(getTransaksiCustomer(currentUser.id))
    }

    const negativeButton = (record) => {
        console.log(record)
        if (record.status_transaksi.includes("5") && userType === "CUSTOMER") {
            if (record.id_driver !== null)
                setOpenDialogRating(true)
            if (record.rating_driver !== null)
                setCurrentValue(record.rating_driver)
            else
                setCurrentValue(0)
            if (record.review_driver !== null)
                setCurrentReview(record.review_driver)
            else
                setCurrentReview("")
            setEditTransaction(record)

        }
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


    const transactionProcessAction = (transaction) => {
        return (
            <TableRow>
                {
                    (transaction.status_transaksi.includes("0") && userType === "CS" ||
                        transaction.status_transaksi.includes("1") && userType === "CS" ||
                        transaction.status_transaksi.includes("2") && userType === "CUSTOMER" ||
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
                                {transaction.status_transaksi === "2" && userType === "CUSTOMER" && "Buat Pembayaran"}
                                {transaction.status_transaksi === "5" && "Generate Nota (pdf)"}
                            </Button>

                            {
                                transaction.status_transaksi.includes("5") && userType === "CUSTOMER" &&
                                transaction.id_driver !== null && (
                                    <span className="ml-4"></span>
                                )}

                            {
                                transaction.status_transaksi.includes("5") && userType === "CUSTOMER" &&
                                transaction.id_driver !== null &&
                                (

                                    <Button
                                        variant="contained"
                                        color="secondary"
                                        onClick={() => {
                                            negativeButton(transaction)
                                        }}
                                    >
                                        {transaction.status_transaksi === "5" && userType === "CUSTOMER" && "Review Driver"}
                                    </Button>
                                )}
                        </TableCell>
                    )}
            </TableRow>
        )
    }

    //rating star
    const reviewDriverBody = () => {
        return (
            <div className="flex flex-col items-center justify-center space-y-4">
                <Avatar
                    isEditable={false}
                    source={editTransaction !== null ? editTransaction.foto_driver : "#"}
                />
                <span>{editTransaction !== null ? editTransaction.nama_driver : "#"}</span>
                <div className="flex">
                    {stars.map((_, index) => {
                        return (
                            <FaStar
                                key={index}
                                size={24}
                                onClick={() => setCurrentValue(index + 1)}
                                onMouseOver={() => setHoverValue(index + 1)}
                                onMouseLeave={() => {
                                    setHoverValue(undefined)
                                }}
                                color={(hoverValue || currentValue) > index ? colors.orange : colors.grey}
                                style={{
                                    marginRight: 10,
                                    cursor: "pointer"
                                }}
                            />
                        )
                    })}
                </div>

                <TextField
                    type="text"
                    value={currentReview}
                    multiline={true}
                    onChange={(e) => {
                        setCurrentReview(e.target.value)
                    }}
                />

            </div>
        )
    }

    const column = [
        {heading: '', value: 'expand'},
        {heading: 'NO', value: 'no'},
        {heading: 'ID', value: 'id_transaksi'},
        // {heading: 'NAMA', value: 'name'},
        //TODO: Nama Mobil
        {heading: 'MOBIL', value: 'nama_mobil'},
        {heading: 'CS', value: 'nama_pegawai'},
        {heading: 'Status', value: 'status_transaksi'},

    ]

    const handleDelete = (record) => {
        console.log('Info: Come from handleDelete');

        console.log(record);
    };

    const handleEdit = (record) => {
        console.log('Info: Come from handleEdit');
        // setEditDriver(record)
        // setIsOpenModal(true)
    };

    const updateReview = () => {
        console.log("updatereview!")
        dispatch(updateTransaksi({
            ...editTransaction,
            rating_driver: currentValue.toPrecision(2),
            review_driver: currentReview
        }))

        dispatch(getTransaksiCustomer(currentUser.id))
    }

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
            return customer_transaction
        else
            return customer_transaction.filter(row =>
                row.id.toString().toLowerCase().includes(searchKey.toLowerCase()) ||
                row.name.toLowerCase().includes(searchKey.toLowerCase())
            )
    }

    const handleSavePayment = (transaction) => {
        console.log(transaction)
        setEditTransaction(transaction)
        dispatch(updateTransaksi(transaction))
        setOpenDialogPayment(false)
        dispatch(getTransaksiCustomer(currentUser.id))
    }

    const handleClose = () => {
        console.log("handle close")
        setOpenDialogPayment(false)
    }

    useEffect(() => { //ambil data untuk list mobil
        dispatch(getTransaksiCustomer(currentUser.id))
    }, [])

    const [isOpenSnackbar, setIsOpenSnackbar] = useState(false)
    const [snackbarType, setSnackbarType] = useState("")
    const [snackbarMsg, setSnackbarMsg] = useState("")

    const closeSnackbar = () => {
        setIsOpenSnackbar(false)
    }

    useEffect(() => { //ambil data untuk list pegawai
        if (message !== null) {
            console.log("snackMessagee" + message)
            setSnackbarMsg(message.message)
            setSnackbarType("success")
            setIsOpenSnackbar(true)
            // dispatch(setSnackbar({
            //     'snackbarOpen': true,
            //     'snackbarType': "success",
            //     'snackbarMessage': message.message,
            // }))
        } else if (errors !== null) {
            setSnackbarMsg(errors.message)
            setSnackbarType("error")
            setIsOpenSnackbar(true)
            // dispatch(setSnackbar({
            //     'snackbarOpen': true,
            //     'snackbarType': "error",
            //     'snackbarMessage': errors.message,
            // }))
        }
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

            {openDialogPayment && editTransaction !== null && (
                <PaymentDialog
                    open={openDialogPayment}
                    handleClose={handleClose}
                    handleSave={handleSavePayment}
                    transaction={editTransaction}
                />
            )}

            {openDialogRating && (
                <ConfirmDialog
                    open={openDialogRating}
                    handleClose={() => {
                        setOpenDialogRating(false)
                    }}
                    handleOke={() => {
                        updateReview()
                        setOpenDialogRating(false)
                    }}
                    title="Review Driver"
                    positiveButton={"simpan"}
                    body={reviewDriverBody()}
                />
            )}

            {customer_transaction !== null && (
                <TransactionTable
                    data={filteredCustomerTransaksi()}
                    actions={transaksiActions}
                    transactionAction={transactionProcessAction}
                    column={column}/>
            )}
        </Layout>
    );
};

export default TransaksiCustomer;
