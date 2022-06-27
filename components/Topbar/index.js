import React from 'react';
import Image from "next/image";
import Link from "next/link";
import person from "../../assets/person-svgrepo-com.svg"
import {Menu, Transition} from '@headlessui/react'
import {Fragment, useEffect, useRef, useState} from 'react'
import {ChevronDownIcon, LogoutIcon, UserCircleIcon} from '@heroicons/react/solid'
import {useRouter} from "next/router";
import {useDispatch, useSelector} from "react-redux";
import {logout} from "../../util/store/actions/auth";
import {FaHamburger} from "@react-icons/all-files/fa/FaHamburger";
import {GiHamburgerMenu} from "@react-icons/all-files/gi/GiHamburgerMenu";


const Index = ({username, profilepic, sideBarTrigger}) => {
    const dispatch = useDispatch()
    const router = useRouter()
    const profileAction = () => {
        // router.push('/profile')
        router.push('/profile/profile')
    }

    const logoutUser = () => {
        dispatch(logout())
        router.push('../')
    }

    return (
        <div className="bg-indigo-600">
            <div className="pt-4 py-2 sm:mx-auto sm:w-full sm:max-w-5xl
            flex justify-between items-center">

                <span className="flex items-center justify-center">
                    <button onClick={sideBarTrigger} className="mr-4">
                        <GiHamburgerMenu size={'1.5rem'} color={'white'}/>
                    </button>

                <Link href="/dashboard" rel="noopener noreferrer">
                    <a className="text-lg font-bold text-white cursor-pointer">AJR</a>
                </Link>
                </span>


                <div className="flex items-center">
                    <div className="rounded-full overflow-clip">
                        {profilepic === null ? (
                            <Image
                                src={person}
                                alt={""}
                                height={30}
                                width={30}
                            />
                        ) : (
                            <img
                                className="w-10 h-10 rounded-full border-2 border-white object-cover"
                                alt="profile picture"
                                src={profilepic}
                            />
                        )}

                    </div>

                    {/*<span className="text-sm">{username}</span>*/}

                    <div>
                        <Menu as="div" className="relative inline-block text-left z-10">
                            <div>
                                <Menu.Button
                                    className="inline-flex justify-center items-center w-full px-4 py-2 text-lg font-medium text-white bg-none rounded-md bg-opacity-20 hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                                    {username}
                                    <ChevronDownIcon
                                        className="w-5 h-5 ml-2 -mr-1 text-violet-200 hover:text-violet-100"
                                        aria-hidden="true"
                                    />
                                </Menu.Button>
                            </div>
                            <Transition
                                as={Fragment}
                                enter="transition ease-out duration-100"
                                enterFrom="transform opacity-0 scale-95"
                                enterTo="transform opacity-100 scale-100"
                                leave="transition ease-in duration-75"
                                leaveFrom="transform opacity-100 scale-100"
                                leaveTo="transform opacity-0 scale-95"
                            >
                                <Menu.Items
                                    className="absolute right-0 w-32 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                    <div className="px-1 py-1 ">
                                        <Menu.Item>
                                            <button
                                                className={'text-indigo-900 group flex rounded-md items-center w-full px-2 py-2 text-sm'}
                                                onClick={profileAction}
                                            >
                                                <UserCircleIcon
                                                    className="w-5 h-5 mr-2"
                                                    aria-hidden="true"
                                                />
                                                Profile
                                            </button>
                                        </Menu.Item>
                                        <Menu.Item>
                                            <button
                                                onClick={logoutUser}
                                                className={'text-indigo-900 group flex rounded-md items-center w-full px-2 py-2 text-sm'}
                                            >
                                                <LogoutIcon
                                                    className="w-5 h-5 mr-2"
                                                    aria-hidden="true"
                                                />
                                                Logout
                                            </button>
                                        </Menu.Item>
                                    </div>
                                </Menu.Items>
                            </Transition>
                        </Menu>
                    </div>

                </div>

            </div>
        </div>
    );
};

export default Index;
