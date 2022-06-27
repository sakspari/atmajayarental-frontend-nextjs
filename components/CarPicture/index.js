import React, {useEffect, useState} from 'react';
import {MdEdit} from "@react-icons/all-files/md/MdEdit";
import blank_profile from "../../assets/blank_profile.png"
import {base_public_url} from "../../util/store/sagas/base_public_url";

const CarPicture = ({source="https://www.nicepng.com/png/detail/403-4032657_gray-car-transparent-car-icon-vector.png", onPictureChange}) => {

    console.log(imgSource)
    const [imgSource, setSource] = useState(source)

    const pickImage = () => {

        let input = document.createElement('input');
        input.type = 'file';
        input.accept='image/*';
        input.onchange = (e)=> {
            // you can use this method to get file and perform respective operations
            let file =   e.target.files[0]
            onPictureChange(e)
            setSource(URL.createObjectURL(file))
        };
        input.click()

    }

    return (
        <div>
            <div className="relative inline-block">
                <img
                    className="w-64 h-32 rounded-lg border-2 border-indigo-700 object-cover"
                    alt="profile picture"
                    src={base_public_url+imgSource}
                />

                {/*<div className="absolute inset-0 bg-indigo-300 flex items-center justify-center">*/}
                <button
                    onClick={pickImage}
                    className="w-7 h-7 rounded-full bg-indigo-700 border-2 border-white absolute -bottom-1 -right-1 flex items-center justify-center"
                >
                    <MdEdit color="white"/>
                </button>
                {/*</div>*/}
            </div>
        </div>
    );
};

export default CarPicture;
