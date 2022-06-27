import React, {useEffect, useState} from 'react';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle, FormControl, FormControlLabel, FormHelperText, FormLabel, MenuItem, Radio, RadioGroup,
    Select,
    TextField
} from "@mui/material";
import {calculateEstimatedTime} from "../../util/converter/date_converter";
import {useDispatch, useSelector} from "react-redux";
import {getPromo} from "../../util/store/actions/promo";
import {UploadFile} from "@mui/icons-material";

const PaymentDialog = ({open, handleClose, handleSave, transaction}) => {

    const {promos} = useSelector(state => state.promo)
    const dispatch = useDispatch()

    const [kodePromo, setkodePromo] = useState(null)
    const [usedPromo, setUsedPromo] = useState(null)
    const [buktiPembayaran, setBuktiPembayaran] = useState(null)
    const [metodePembayaran, setMetodePembayaran] = useState(null)
    const [imgSource, setSource] = useState("#")

    const pickImage = () => {

        let input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        input.onchange = (e) => {
            // you can use this method to get file and perform respective operations
            let file = e.target.files[0]
            // onPictureChange(e)
            setBuktiPembayaran(file)
            setSource(URL.createObjectURL(file))
        };
        input.click()

    }

    const hitungDurasi = () => {
        return calculateEstimatedTime(transaction.waktu_mulai, transaction.waktu_selesai)
    }

    const hitungTotalBiaya = () => {
        let result = 0;
        result = hitungDurasi() * transaction.harga_satuan_mobil
        if (transaction.id_driver !== null)
            result = result + (hitungDurasi() * transaction.harga_satuan_driver)

        return result;
    }

    const hitungDiskon = () => {
        let result = 0;

        if (kodePromo !== null)
            result = hitungTotalBiaya() * usedPromo.persen_diskon / 100

        return result;
    }

    const filteredPromo = () => {
        return promos.filter(row =>
            row.status_promo == 1
        )
        // return promos
    }

    const hitungGrandTotal = () => {
        let result = 0;

        if (transaction.total_denda !== null && transaction.total_denda !== 0)
            result = hitungTotalBiaya() + transaction.total_denda
        else if (kodePromo !== null)
            result = hitungTotalBiaya() - hitungDiskon()
        else
            result = hitungTotalBiaya()

        return result;
    }

    useEffect(() => {
        dispatch(getPromo())
    }, [])

    return (
        <div>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title" className="w-full text-center">
                    {`Pembayaran transaksi ${transaction.id_transaksi}`}
                </DialogTitle>
                <DialogContent className="space-y-4">

                    {(transaction.total_denda === null ||
                        transaction.total_denda == 0) && (
                        <div className="space-y-4">

                            {filteredPromo() !== null && filteredPromo().length > 0 && (

                                <div>
                                    <span className="">promo</span>
                                    <Select
                                        className="w-full"
                                        variant="standard"
                                        value={kodePromo}
                                        label="Promo"
                                        onChange={(e) => {
                                            setkodePromo(e.target.value)
                                            setUsedPromo(promos.find(p =>
                                                p.kode_promo === e.target.value))
                                        }}
                                    >
                                        <MenuItem value={null}>
                                            tanpa promo
                                        </MenuItem>
                                        {filteredPromo().map((promo, index) =>
                                            <MenuItem key={index} value={promo.kode_promo}>
                                                {`${promo.kode_promo} - ${promo.persen_diskon}% off`}
                                            </MenuItem>
                                        )}

                                    </Select>
                                </div>
                            )}
                            <TextField
                                className="w-full"
                                value={`IDR ${hitungDiskon()}`}
                                type="text"
                                variant="standard"
                                label="total diskon"
                                disabled={false}
                            />
                        </div>
                    )}

                    <TextField
                        className="w-full"
                        value={`IDR ${hitungGrandTotal()}`}
                        type="text"
                        variant="standard"
                        label="total tagihan"
                        disabled={false}
                    />

                    <FormControl sx={{m: 3}}
                                 variant="standard">
                        <FormLabel>Metode Pembayaran</FormLabel>
                        <RadioGroup
                            name=""
                            value={metodePembayaran}
                            onChange={(e) => {
                                setMetodePembayaran(e.target.value)
                                if (e.target.value == 0) {
                                    setSource("#")
                                    setBuktiPembayaran(null)
                                }

                            }}
                        >
                            <FormControlLabel value={1} control={<Radio/>} label="non-tunai"/>
                            <FormControlLabel value={0} control={<Radio/>} label="tunai"/>
                        </RadioGroup>
                        {/*<FormHelperText>{genderError}</FormHelperText>*/}
                    </FormControl>

                    {metodePembayaran == 1 && (
                        <div>
                            <span>Bukti Pembayaran</span>
                            <img
                                className={"w-full h-96 rounded-lg border-2 border-indigo-700 object-cover"}
                                src={imgSource}
                            />
                            <div className="w-full flex justify-end items-end mt-4">

                                <Button
                                    variant="outlined"
                                    onClick={pickImage}
                                >
                                    upload bukti pembayaran
                                    <UploadFile/>
                                </Button>
                            </div>
                        </div>
                    )}

                    {metodePembayaran == 0 && (
                        <div className="flex flex-col items-center justify-center">
                                <span className="text-red-500">
                                   silahkan menekan simpan
                                </span>
                            <span className="text-red-500">
                                   &
                                </span>
                            <span className="text-red-500">
                                   melanjutkan pembayaran di kasir terima kasih!
                                </span>
                        </div>
                    )}

                </DialogContent>
                <DialogActions>
                    <Button color="error" onClick={handleClose}>Batal</Button>
                    <Button variant="contained" onClick={() => {
                        handleSave({
                            ...transaction,
                            grand_total: hitungGrandTotal(),
                            total_diskon: hitungDiskon(),
                            metode_pembayaran: metodePembayaran,
                            bukti_pembayaran: buktiPembayaran,
                            kode_promo: kodePromo,
                            status_transaksi: "3"
                        })
                    }} autoFocus>
                        simpan
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default PaymentDialog;
