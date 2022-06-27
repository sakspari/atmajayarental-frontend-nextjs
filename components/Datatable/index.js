import React, {useState} from 'react';
import TableRowItem from "./TableRowItem";
import Pagination from "./Pagination";
import {Table, TableBody, TableCell, TableHead, TablePagination, TableRow} from "@mui/material";
import TableHeadItem from "./TableHeadItem";
import CollapsibleTransactionRow from "./CollapsibleTransactionRow";

const Datatable = ({ data, column, actions }) => {

    const [page, setPage] = useState(0)
    const [numberOfData, setNumberOfData] = useState(10)

    const handleChangeRowsPerPage = (event) => {
        setNumberOfData(parseInt(event.target.value, 10));
        setPage(0);
    };

    //get current data
    const indexOfLastData = (page+1) * numberOfData
    const indexOfFirstData = indexOfLastData - numberOfData
    const currentDatas = data.slice(indexOfFirstData, indexOfLastData)

    const onPaginate = (event, number) => {
        setPage(number)
    }

    return (
        <div>
            <Table className="w-full border-none overflow-scroll">
                <TableHead className="bg-indigo-100">
                    <TableRow className="shadow shadow-indigo-100">
                        {column.map((item, index) =>
                            <TableCell
                                key={index}
                                align="center"
                            >
                                {item.heading}
                            </TableCell>
                        )}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {currentDatas.map((item, index) =>
                        <TableRowItem key={index} item={item} column={column} actions={actions}
                                      no={indexOfFirstData + index + 1}/>

                        // <CollapsibleTransactionRow key={index} item={item} column={column} actions={actions}
                        //               no={indexOfFirstData + index + 1}/>

                    )}

                </TableBody>
            </Table>
            {currentDatas.length === 0 && (
                <div className="text-center w-full mt-4 font-semibold"> empty... </div>
            )}

            <div className="w-full flex justify-end items-end pt-12">

                {/*<span className="text-xl mr-4 text-gray-600 mb-2">*/}
                {/*    Jumlah data per halaman*/}
                {/*</span>*/}

                {/*<select className="mr-4" onChange={(e) => {*/}
                {/*    setNumberOfData(e.target.value)*/}
                {/*    setPage(1)*/}
                {/*}} value={numberOfData}>*/}
                {/*    <option value={5}>5</option>*/}
                {/*    <option value={10}>10</option>*/}
                {/*    <option value={20}>20</option>*/}
                {/*    <option value={50}>50</option>*/}
                {/*    <option value={100}>100</option>*/}
                {/*</select>*/}

                <TablePagination
                    rowsPerPageOptions={[5, 10, 25, 50, 100]}
                    count={data.length}
                    page={page}
                    rowsPerPage={numberOfData}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    onPageChange={onPaginate}
                />

                {/*<Pagination dataPerPage={numberOfData} totalData={data.length} onPaginate={onPaginate}*/}
                {/*            currentPage={page}/>*/}

            </div>
        </div>
    );
};

export default Datatable;
