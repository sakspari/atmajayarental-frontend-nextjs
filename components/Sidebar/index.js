import React from 'react';
import Link from 'next/link'

const Index = (props) => {
    const {isShow} = props
    return (
        <div className={`${!isShow && 'hidden'} bg-indigo-800 text-indigo-100 w-72 space-y-6 px-2 pt-6`}>
            <nav>
                {props.children}
            </nav>
        </div>
    );
};

export default Index;
