import React, {useEffect, useState} from 'react';
import {MdEdit} from "@react-icons/all-files/md/MdEdit";
import {base_public_url} from "../../util/store/sagas/base_public_url";

const Avatar = ({ source, onPictureChange, isEditable = true }) => {

    const [imgSource, setSource] = useState("https://www.weact.org/wp-content/uploads/2016/10/Blank-profile.png")
   const [filePath, setPath] = useState(null)

    const pickImage = () => {

        let input = document.createElement('input');
        input.type = 'file';
        input.accept='image/*';
        input.onchange = (e)=> {
            // you can use this method to get file and perform respective operations
            let file =   e.target.files[0]
            onPictureChange(e)
            setSource(URL.createObjectURL(file))
            setPath(URL.createObjectURL(file))
        };
        input.click()

    }

    useEffect(()=>{
        if(source !== null && source!==undefined && filePath===null)
            setSource(base_public_url+source)

        else if(filePath!==null)
            setSource(filePath)
        console.log("set source effect call")
    },[source])

    // useEffect(()=>{
    //     if
    //       setSource(imgSource)
    // },[source])

    return (
        <div>
            <div className="relative inline-block">
                {/*{source!==null ? (*/}
                    <img
                        className="w-28 h-28 rounded-full border-2 border-indigo-700 object-cover"
                        alt="profile picture"
                        src={imgSource}
                    />
                {/*// ):(*/}
                {/*//     <img*/}
                {/*//         className="w-28 h-28 rounded-full border-2 border-indigo-700 object-cover"*/}
                {/*//         alt="profile picture"*/}
                {/*//         src={imgSource}*/}
                {/*//     />*/}
                {/*// )}*/}

                {/*<div className="absolute inset-0 bg-indigo-300 flex items-center justify-center">*/}
                {isEditable && (
                    <button
                        onClick={pickImage}
                        className="w-7 h-7 rounded-full bg-indigo-700 border-2 border-white absolute bottom-0 right-0 flex items-center justify-center"
                    >
                        <MdEdit color="white"/>
                    </button>
                )}
                {/*</div>*/}
            </div>
        </div>
    );
};

export default Avatar;
