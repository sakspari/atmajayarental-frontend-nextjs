import React from 'react';
import {number} from "tailwindcss/lib/util/dataTypes";

const Pagination = ({dataPerPage, totalData, onPaginate, currentPage}) => {
    const pageNumbers = []

    for (let i = 1; i <= Math.ceil(totalData / dataPerPage); i++) {
        pageNumbers.push(i)
    }
    let displayPageNumber = []
    if (currentPage < 3)
        displayPageNumber = pageNumbers.slice(currentPage-1, currentPage + 2)
    else
        displayPageNumber = pageNumbers.slice(currentPage - 2, currentPage + 1)

    return (
        <nav>
            <ul className="flex">
                <button onClick={() => {
                    if (currentPage !== 1)
                        onPaginate(currentPage - 1)
                }}
                        className={`hover:bg-indigo-100 rounded mx-0.5 border-2 border-indigo-500 px-4 py-2 border-collapse`}>
                    prev.
                </button>
                {displayPageNumber.map(number => (
                    <li key={number}>
                        <button onClick={() => onPaginate(number)}
                                className={`${currentPage === number && 'bg-indigo-200'} rounded hover:bg-indigo-100 mx-0.5 border-2 border-indigo-500 px-4 py-2 border-collapse`}>
                            {number}
                        </button>
                    </li>
                ))}
                <button onClick={() => {
                    if (currentPage !== pageNumbers[pageNumbers.length - 1])
                        onPaginate(currentPage + 1)
                }}
                        className={`hover:bg-indigo-100 rounded mx-0.5 border-2 border-indigo-500 px-4 py-2 border-collapse`}>
                    next
                </button>
            </ul>
        </nav>
    );
};

export default Pagination;