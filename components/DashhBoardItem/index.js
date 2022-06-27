import React from 'react';
import Link from 'next/link';

const Index = (props) => {
    return (
        <a href={props.href}> rel=”noopener noreferrer”
            <div className="p-4 bg-indigo-50 rounded-lg flex flex-col items-center shadow-lg m-4 border-2 border-indigo-200">
                {props.children}
                <span className="text-center font-bold text-lg">
                    {props.name}
                </span>
            </div>
        </a>
    );
};

export default Index;