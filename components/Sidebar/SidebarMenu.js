import React from 'react';
import Link from "next/link";
import {useRouter} from "next/router";

const Index = (props) => {
    const { name, route } = props
    const router = useRouter()

    return (
        <div>
            <Link href={route}>
                <a className={`${route.toLowerCase() === router.pathname.toLowerCase() && 'bg-indigo-600'} block py-2.5 px-4 rounded transition duration-200 hover:bg-indigo-500 hover-text-white flex items-center text-lg`}>
                    {props.children}
                    <span className="ml-4">
                        {name}
                    </span>
                </a>
            </Link>
        </div>
    );
};

export default Index;
