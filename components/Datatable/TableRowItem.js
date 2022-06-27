import React from 'react';
import GenderDisplay from "./GenderDisplay";
import {useDispatch} from "react-redux";
import {addModifiedPegawai} from "../../util/store/actions/pegawai";
import EditInputPegawai from "../Modal/EditInputPegawai";
import StatusPromoDisplay from "./StatusPromoDisplay";
import TimeoutContractDisplay from "./TimeoutContractDisplay";
import {TableCell, TableRow} from "@mui/material";
import StatusTransaksi from "./StatusTransaksi";
import StatusDriverDisplay from "./StatusDriverDisplay";
import StatusUserDisplay from "./StatusUserDisplay";

const TableRowItem = ({item, column, actions, no}) => {
    const dispatch = useDispatch()
    const onEditClick = (targetAction) => {
        switch (targetAction) {
            case 'pegawai':
                dispatch(addModifiedPegawai(item))
                console.log(item)
                break;
            default:
                console.log(targetAction)
        }
    }

    return (
        <TableRow className="text-center shadow my-2">
            {column.map((columnItem, index) =>
                <TableCell
                    className="py-1.5 mx-0.5"
                    align="center"
                    key={index}
                >
                    {columnItem.value === 'no' && <div>{no}</div>}
                    {columnItem.value === 'aksi' && (
                        <div>

                            {actions(item)}

                        </div>
                    )}

                    {columnItem.value === 'gender' && (
                        <GenderDisplay genderType={item[`${columnItem.value}`]}/>
                    )}

                    {columnItem.value === 'status_promo' && (
                        <StatusPromoDisplay status={item[`${columnItem.value}`]}/>
                    )}

                    {columnItem.value === 'status' && (
                        <StatusDriverDisplay status={item[`${columnItem.value}`]}/>
                    )}

                    {columnItem.value === 'verified' && (
                        <StatusUserDisplay status={item[`${columnItem.value}`]}/>
                    )}

                    {columnItem.value === 'status_transaksi' && (
                        <StatusTransaksi status={item[`${columnItem.value}`]}/>
                    )}

                    {columnItem.value === 'periode_selesai' && (
                        <TimeoutContractDisplay periode_selesai={item[`${columnItem.value}`]}/>
                    )}

                    {columnItem.value !== 'gender' &&
                        columnItem.value !== 'status_promo' &&
                        columnItem.value !== 'status' &&
                        columnItem.value !== 'verified' &&
                        columnItem.value !== 'periode_selesai' &&
                        columnItem.value !== 'status_transaksi' &&
                        // item[`${columnItem.value}`] !== 'aksi' &&
                        (
                            <span> {item[`${columnItem.value}`]} </span>
                        )}
                </TableCell>
            )}
        </TableRow>
    );
};


export default TableRowItem
