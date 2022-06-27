import React, {useState} from 'react';
import Layout from "../../components/Layout";
import Avatar from "../../components/Avatar";
import {useSelector} from "react-redux";
import {base_public_url} from "../../util/store/sagas/base_public_url";
import {MdEdit} from "@react-icons/all-files/md/MdEdit";
import {convertDate} from "../../util/converter/date_converter";
import {useRouter} from "next/router";

const MyComponent = () => {
    const {currentUser, userType} = useSelector(state => state.auth)
    const [profilePicture, setPP] = useState(null)
    const router = useRouter()
    name
    return (
        <Layout>

            {currentUser && (
                <div className="flex flex-col items-center">
                <span className="text-3xl text-indigo-500 font-semibold mb-8 flex items-center">
                    User Profile
                    <button
                        onClick={()=>{
                            router.push('/profile/update')
                        }}
                        className="ml-4  p-2 text-green-700 flex relative border-2 border-green-700 rounded-lg hover:border-none hover:bg-green-700 hover:text-white">
                        <MdEdit/>
                        <span className="absolute text-sm right-1 bottom-0">edit</span>
                    </button>
                </span>
                    <div className="">
                        {currentUser.picture ? (
                            <Avatar
                                isEditable={false}
                                source={currentUser.picture}
                                onPictureChange={(e) => {
                                    setPP(e.target.files[0])
                                }
                                }/>
                        ) : (
                            <Avatar
                                isEditable={false}
                                onPictureChange={(e) => {
                                    setPP(e.target.files[0])
                                }
                                }/>
                        )}

                    </div>
                    <div className="mt-8 flex flex-col text-xl space-y-2">
                    <span className="text-center font-bold">
                        USERID:
                    <span className="text-indigo-700">
                        {` ${currentUser.id}`}
                    </span>
                    </span>
                        <span>{`Nama: ${currentUser.name}`}</span>
                        <span>{`Role: ${userType.toLowerCase()}`}</span>
                        <span>{`gender: ${currentUser.gender == 1 ? 'Laki-laki' : 'Perempuan'}`}</span>
                        <span>{`Tanggal Lahir: ${convertDate(currentUser.birthdate)}`}</span>
                        <span>{`Telepon: ${currentUser.phone}`}</span>
                        <span>{`Email: ${currentUser.email}`}</span>
                        <span className="max-w-md">{`Alamat: ${currentUser.address}`}</span>
                    </div>
                </div>
            )}


        </Layout>
    );
};

export default MyComponent;
