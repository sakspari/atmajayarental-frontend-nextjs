import React from 'react';
import {TableCell} from "@mui/material";

const TableHeadItem = ({ item }) => {
    return (
        <th className="py-1.5">
            {item.heading}
        </th>
    );
};

export default TableHeadItem;
