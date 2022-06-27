import React, {useState} from 'react';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import StatusTransaksi from "./StatusTransaksi";
import {base_public_url} from "../../util/store/sagas/base_public_url";
import {calculateEstimatedTime, convertDateTime} from "../../util/converter/date_converter";

const CollapsibleTransactionRow = ({item, column, actions, no, action}) => {
    const [open, setOpen] = useState(false);

    const hitungDurasi = () => {
        return calculateEstimatedTime(item.waktu_mulai, item.waktu_selesai)
    }

    const hitungPrakiraanBiaya = () => {
        let result = 0;
        result = hitungDurasi() * item.harga_satuan_mobil
        if (item.id_driver !== null)
            result = result + (hitungDurasi() * item.harga_satuan_driver)
        return result;
    }


    return (
        <>
            <TableRow sx={{'& > *': {borderBottom: 'unset'}}}>


                {/*<TableCell component="th" scope="row">*/}
                {/*    {data.nama_customer}*/}
                {/*</TableCell>*/}
                {/*<TableCell align="right">{data.calories}</TableCell>*/}
                {/*<TableCell align="right">{data.fat}</TableCell>*/}
                {/*<TableCell align="right">{data.carbs}</TableCell>*/}
                {/*<TableCell align="right">{data.protein}</TableCell>*/}

                {/*    item display   */}

                {column.map((columnItem, index) =>
                    <TableCell
                        // className="py-1.5 mx-0.5"
                        align="center"
                        key={index}
                    >
                        {columnItem.value === 'no' && <div>{no}</div>}
                        {columnItem.value === 'aksi' && (
                            <div>

                                {actions(item)}

                            </div>
                        )}

                        {columnItem.value === 'expand' && (
                            <TableCell>
                                <IconButton
                                    aria-label="expand row"
                                    size="small"
                                    onClick={() => setOpen(!open)}
                                >
                                    {open ? <KeyboardArrowUpIcon/> : <KeyboardArrowDownIcon/>}
                                </IconButton>
                            </TableCell>
                        )}

                        {columnItem.value === 'status_transaksi' && (
                            <StatusTransaksi status={item[`${columnItem.value}`]}/>
                        )}

                        {
                            columnItem.value !== 'status_transaksi' &&
                            // item[`${columnItem.value}`] !== 'aksi' &&
                            (
                                <span> {item[`${columnItem.value}`]} </span>
                            )}
                    </TableCell>
                )}

            </TableRow>

            <TableRow className="bg-sky-50">
                <TableCell style={{paddingBottom: 0, paddingTop: 0}} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{margin: 1}}>

                            <Table size="small" aria-label="purchases" id="generateInv">
                                <TableHead>
                                    <TableRow>
                                        <TableCell colSpan={4} align="center">
                                            <span className="font-bold">
                                                Atma Jaya Rental
                                            </span>
                                        </TableCell>
                                    </TableRow>

                                </TableHead>
                                <TableBody>

                                    <TableRow>
                                        <TableCell colSpan={2} align="left">{item.id_transaksi}</TableCell>
                                        <TableCell colSpan={2} align="right">{item.waktu_transaksi}</TableCell>
                                    </TableRow>

                                    <TableRow>
                                        <TableCell>{`Customer : `}</TableCell>
                                        <TableCell>{`${item.nama_customer}`}</TableCell>
                                    </TableRow>

                                    <TableRow>
                                        <TableCell>{`Id Customer : `}</TableCell>
                                        <TableCell>{`${item.id_customer}`}</TableCell>
                                    </TableRow>

                                    <TableRow>
                                        <TableCell>{`Tanggal Mulai : `}</TableCell>
                                        <TableCell>{`${convertDateTime(item.waktu_mulai)}`}</TableCell>
                                    </TableRow>

                                    <TableRow>
                                        <TableCell>{`Tanggal Selesai : `}</TableCell>
                                        <TableCell>{`${convertDateTime(item.waktu_selesai)}`}</TableCell>
                                    </TableRow>

                                    <TableRow>
                                        <TableCell>{`Tanggal Pengembalian : `}</TableCell>
                                        <TableCell>{item.waktu_pengembalian !== null ? `${convertDateTime(item.waktu_pengembalian)}` : `-`}</TableCell>
                                    </TableRow>

                                    <TableRow colSpan={4} className="font-bold">
                                        <TableCell>
                                                <span className="font-bold">
                                                    Item
                                                </span>
                                        </TableCell>
                                        <TableCell>
                                                <span className="font-bold">
                                                    Satuan
                                                </span>
                                        </TableCell>
                                        <TableCell>
                                                <span className="font-bold">
                                                    Durasi
                                                </span>
                                        </TableCell>
                                        <TableCell>
                                                <span className="font-bold">
                                                    Sub Total
                                                </span>
                                        </TableCell>

                                    </TableRow>

                                    <TableRow>
                                        <TableCell>{`${item.nama_mobil}`}</TableCell>
                                        <TableCell>{`IDR ${item.harga_satuan_mobil}`}</TableCell>
                                        <TableCell>{`${calculateEstimatedTime(item.waktu_mulai, item.waktu_selesai)} hari`}</TableCell>
                                        <TableCell>{`IDR ${item.harga_satuan_mobil * calculateEstimatedTime(item.waktu_mulai, item.waktu_selesai)}`}</TableCell>
                                    </TableRow>

                                    {item.id_driver !== null && (
                                        <TableRow>
                                            <TableCell>{`Driver ${item.nama_driver}`}</TableCell>
                                            <TableCell>{`IDR ${item.harga_satuan_driver}`}</TableCell>
                                            <TableCell>{`${calculateEstimatedTime(item.waktu_mulai, item.waktu_selesai)} hari`}</TableCell>
                                            <TableCell>{`IDR ${item.harga_satuan_driver * calculateEstimatedTime(item.waktu_mulai, item.waktu_selesai)}`}</TableCell>
                                        </TableRow>
                                    )}
                                    <TableRow>
                                        <TableCell colSpan={3}>
                                            <span className="font-semibold">
                                                {`Estimasi total harga`}
                                            </span>
                                        </TableCell>
                                        <TableCell>
                                            <span className="font-semibold">
                                                {`IDR ${hitungPrakiraanBiaya()}`}
                                            </span>
                                        </TableCell>
                                    </TableRow>

                                    <TableRow>
                                        <TableCell
                                            colSpan={4}
                                            sx={{height: "2rem"}}>
                                            {` `}
                                        </TableCell>
                                    </TableRow>
                                    {/* setelah hitung toital transaksi */}
                                    <TableRow>
                                        <TableCell sx={{borderBottom: 'none'}}>
                                            <span className="">
                                                {`Cust`}
                                            </span>
                                        </TableCell>
                                        <TableCell sx={{borderBottom: 'none'}}>
                                            <span className="">
                                                {`CS`}
                                            </span>
                                        </TableCell>
                                        <TableCell>
                                            <span className="">
                                                {`Disc`}
                                            </span>
                                        </TableCell>
                                        <TableCell>
                                            <span className="">
                                                {`IDR ${item.total_diskon !== null ? item.total_diskon : '0'}`}
                                            </span>
                                        </TableCell>
                                    </TableRow>

                                    <TableRow>
                                        <TableCell sx={{borderBottom: 'none'}}>
                                            <span className="">
                                                {``}
                                            </span>
                                        </TableCell>
                                        <TableCell sx={{borderBottom: 'none'}}>
                                            <span className="">
                                                {``}
                                            </span>
                                        </TableCell>
                                        <TableCell>
                                            <span className="">
                                                {`Denda`}
                                            </span>
                                        </TableCell>
                                        <TableCell>
                                            <span className="">
                                                {`IDR ${item.total_denda !== null ? item.total_denda : '0'}`}
                                            </span>
                                        </TableCell>
                                    </TableRow>

                                    <TableRow>
                                        <TableCell sx={{borderBottom: 'none'}}>
                                            <span className="">
                                                {``}
                                            </span>
                                        </TableCell>
                                        <TableCell sx={{borderBottom: 'none'}}>
                                            <span className="">
                                                {``}
                                            </span>
                                        </TableCell>
                                        <TableCell>
                                            <span className="">
                                                {`Total`}
                                            </span>
                                        </TableCell>
                                        <TableCell>
                                            <span className="font-semibold">
                                                {`IDR ${item.grand_total !== null ? item.grand_total : '0'}`}
                                            </span>
                                        </TableCell>
                                    </TableRow>

                                    <TableRow>
                                        <TableCell>
                                            <span className="">
                                                {`${item.nama_customer} `}
                                            </span>
                                        </TableCell>
                                        <TableCell>
                                            <span className="">
                                                {`${item.nama_pegawai}`}
                                            </span>
                                        </TableCell>
                                        <TableCell>
                                            <span className="">
                                                {` `}
                                            </span>
                                        </TableCell>
                                        <TableCell>
                                            <span className="">
                                                {` `}
                                            </span>
                                        </TableCell>
                                    </TableRow>


                                </TableBody>
                            </Table>

                        </Box>

                        <div className="w-full flex justify-end items-end flex-col">
                            <div className="w-full flex items-center justify-start w-full">
                                <TableRow className="" colSpan={4}>
                                    <TableCell colSpan={2}>
                                        kartu identitas customer
                                        <img
                                            className="h-48"
                                            src={`${base_public_url}${item.idcard_customer}`}
                                            alt="foto mobil"/>
                                    </TableCell>
                                    {item.sim_customer !== null &&
                                        item.id_driver === null && (
                                            <TableCell colSpan={2}>
                                                sim customer
                                                <img
                                                    className="h-48"
                                                    src={`${base_public_url}${item.sim_customer}`}
                                                    alt="foto mobil"/>
                                            </TableCell>
                                        )}
                                    {item.bukti_pembayaran !== null &&
                                        // item.id_driver === null &&
                                        (
                                            <TableCell colSpan={2}>
                                                bukti pembayaran
                                                <img
                                                    className="h-48"
                                                    src={`${base_public_url}${item.bukti_pembayaran}`}
                                                    alt="foto mobil"/>
                                            </TableCell>
                                        )}
                                </TableRow>
                            </div>

                            {action(item)}
                        </div>

                    </Collapse>
                </TableCell>
            </TableRow>
        </>
    );
};

export default CollapsibleTransactionRow;
