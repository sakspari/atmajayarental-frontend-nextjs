import React from 'react';
import {Button, Card, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";

const JadwalTable = ({isEditable = true, onItemClicked, detailJadwalList, roleIdFilter}) => {


    const header = [
        'selasa',
        'rabu',
        'kamis',
        'jumat',
        'sabtu',
        'minggu',
    ]

    const sesi = [
        "1",
        "2"
    ]

    const detail = []

    for (let h in header) {
        for (let s in sesi) {
            detail.push({hari: header[h], sesi: sesi[s], pegawai: null})
        }
    }

    return (
        <Card>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell
                                align="center"
                                className="bg-indigo-200"
                            >
                                <span className="font-semibold">Sesi</span>
                            </TableCell>
                            {header.map((item, index) =>
                                <TableCell
                                    key={index}
                                    align="center"
                                    className="bg-indigo-200"
                                >
                                    <span className="font-bold">
                                        {item}
                                    </span>
                                </TableCell>
                            )}
                        </TableRow>
                    </TableHead>
                    <TableBody>

                        {sesi.map((mapsesi, index) =>
                            <TableRow key={index}>
                                <TableCell
                                    key={index}
                                    align="center"
                                    className="bg-indigo-100"
                                >
                                    <span className="font-bold">
                                        {`sesi ${mapsesi}`}
                                    </span>
                                    <br/>
                                    <span className="">
                                        {mapsesi == 1 ? "08:00:00 - 15:00:00" : "15:00:00 - 22:00:00"}
                                    </span>
                                </TableCell>
                                {detail.map((item, index) =>
                                    item.sesi === mapsesi &&
                                    <TableCell
                                        key={index}
                                        align="center"
                                    >

                                        {detailJadwalList.filter((d) => d.hari === item.hari &&
                                            d.sesi.toString() === mapsesi.toString() &&
                                            d.role_id === roleIdFilter
                                        ).map((pegawai) =>
                                            <div
                                                key={pegawai.id}
                                            >
                                                <Button
                                                    disabled={!isEditable}
                                                    onClick={() => {
                                                        onItemClicked(pegawai, roleIdFilter)
                                                    }}
                                                    className=""
                                                >
                                                    {pegawai.nama_pegawai}
                                                </Button>
                                            </div>
                                        )}

                                        <Button
                                            disabled={!isEditable}
                                            onClick={() => {
                                                onItemClicked({
                                                    ...item,
                                                    jam_mulai: item.sesi === "1" ? "08:00:00" : "15:00:00",
                                                    jam_selesai: item.sesi === "1" ? "15:00:00" : "22:00:00"
                                                }, roleIdFilter)
                                            }}
                                            className=""
                                        >
                                            + add
                                        </Button>
                                    </TableCell>
                                )}
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </Card>
    );
};

export default JadwalTable;
